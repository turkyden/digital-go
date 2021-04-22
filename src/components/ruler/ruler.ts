import * as utils from './utils';
export default class Ruler {
  readonly api: any;

  constructor(options: any) {
    this.api = this.builder();
    this.api.constructRulers.call(this, options);
  }

  private builder() {
    const VERTICAL = 1;
    const HORIZONTAL = 2;
    let CUR_DELTA_X = 0;
    let CUR_DELTA_Y = 0;
    let CUR_SCALE = 1;

    let options;
    const rulerz = {};
    let guides = [];
    let theRulerDOM = document.createElement('div');
    const corners = [];
    const defaultOptions = {
      rulerHeight: 15,
      fontFamily: 'arial',
      fontSize: '8px',
      strokeStyle: 'gray',
      sides: ['top', 'left'],
      cornerSides: ['TL'],
      lineWidth: 1,
      enableMouseTracking: true,
      enableToolTip: true,
    };

    const rotateRuler = (curRuler, angle) => {
      const rotation = 'rotate(' + angle + 'deg)';
      const origin =
        utils.pixelize(Math.abs(parseInt(curRuler.canvas.style.left))) +
        ' 100%';
      curRuler.canvas.style.webkitTransform = rotation;
      curRuler.canvas.style.MozTransform = rotation;
      curRuler.canvas.style.OTransform = rotation;
      curRuler.canvas.style.msTransform = rotation;
      curRuler.canvas.style.transform = rotation;
      curRuler.canvas.style.webkitTransformOrigin = origin;
      curRuler.canvas.style.MozTransformOrigin = origin;
      curRuler.canvas.style.OTransformOrigin = origin;
      curRuler.canvas.style.msTransformOrigin = origin;
      curRuler.canvas.style.transformOrigin = origin;
    };

    const positionRuler = (curRuler, alignment) => {
      curRuler.canvas.style.left = utils.pixelize(
        -(curRuler.canvas.width / 2 - curRuler.canvas.height),
      );
      switch (alignment) {
        case 'top':
          curRuler.orgPos = parseInt(curRuler.canvas.style.left);
          break;
        case 'left':
          curRuler.canvas.style.top = utils.pixelize(
            -curRuler.canvas.height - 1,
          );
          curRuler.orgPos = parseInt(curRuler.canvas.style.top);
          rotateRuler(curRuler, 90);
          break;
      }
    };

    const attachListeners = (container, curRul) => {
      const mousedown = (e: Event) =>
        constructGuide(curRul.dimension, e.clientX, e.clientY, e);
      curRul.canvas.addEventListener('mousedown', mousedown);
      curRul.clearListeners = () => {
        curRul.canvas.removeEventListener('mousedown', mousedown);
      };
    };

    const constructGuide = (dimension, x, y, e, isSet) => {
      let guideIndex: number;
      const moveCB = (line, x, y) => {
        const coor = line.dimension === VERTICAL ? x : y;
        if (!line.assigned()) {
          if (coor > options.rulerHeight) {
            line.assigned(true);
          }
          return;
        }

        if (coor < options.rulerHeight) {
          guides.some(function (guideLine, index) {
            if (guideLine.line === line) {
              guideIndex = index;
              return true;
            }
          });
          line.destroy();
          guides.splice(guideIndex, 1);
        }
      };

      let guide = document.createElement('div');
      const guideStyle = dimension === VERTICAL ? 'rul_lineVer' : 'rul_lineHor';
      const curDelta = dimension === VERTICAL ? CUR_DELTA_X : CUR_DELTA_Y;
      guide.title = 'Double click to delete';
      utils.addClasss(guide, ['rul_line', guideStyle]);
      guide = theRulerDOM.appendChild(guide);
      if (dimension === VERTICAL) {
        guide.style.left = utils.pixelize(
          x - options.container.getBoundingClientRect().left,
        );
        if (isSet)
          guide.style.left = utils.pixelize(
            Math.round(x / CUR_SCALE) + options.rulerHeight,
          );
      } else {
        guide.style.top = utils.pixelize(
          y - options.container.getBoundingClientRect().top,
        );
        if (isSet)
          guide.style.top = utils.pixelize(
            Math.round(y / CUR_SCALE) + options.rulerHeight,
          );
      }
      guides.push({
        dimension: dimension,
        line: this.guideLine(
          guide,
          options.container.querySelector('.rul_wrapper'),
          dimension,
          options,
          curDelta,
          moveCB,
          e,
        ),
      });
    };

    const constructRuler = (container, alignment) => {
      let canvas;
      const dimension =
        alignment === 'left' || alignment === 'right' ? VERTICAL : HORIZONTAL;
      const rulerStyle =
        dimension === VERTICAL ? 'rul_ruler_Vertical' : 'rul_ruler_Horizontal';
      const element = document.createElement('canvas');

      utils.addClasss(element, [
        'rul_ruler',
        rulerStyle,
        'rul_align_' + alignment,
      ]);
      canvas = container.appendChild(element);
      rulerz[alignment] = this.rulerConstructor(canvas, options, dimension);
      rulerz[alignment].drawRuler(container.offsetWidth, options.rulerHeight);
      positionRuler(rulerz[alignment], alignment);
      attachListeners(container, rulerz[alignment]);
    };

    const constructCorner = (container, cornerSides) => {
      const cornerDraw = (container, side) => {
        const corner = document.createElement('div');
        const cornerStyle = 'rul_corner' + side.toUpperCase();

        corner.title = 'Clear Guide lines';
        utils.addClasss(corner, ['rul_corner', cornerStyle]);
        corner.style.width = utils.pixelize(options.rulerHeight + 1);
        corner.style.height = utils.pixelize(options.rulerHeight);
        return container.appendChild(corner);
      };

      const mousedown = (e: Event) => {
        e.stopPropagation();
        clearGuides();
      };

      cornerSides.forEach((side) => {
        const corner = cornerDraw(container, side);
        corner.addEventListener('mousedown', mousedown);
        corner.destroy = () => {
          corner.removeEventListener('mousedown', mousedown);
          corner.parentNode.removeChild(corner);
        };
        corners.push(corner);
      });
    };

    const mouseup = (e: Event) => {
      guides.forEach(function (guide) {
        guide.line.stopDrag();
      });
    };

    const constructRulers = (curOptions) => {
      theRulerDOM = utils.addClasss(theRulerDOM, 'rul_wrapper');
      options = utils.extend(defaultOptions, curOptions);
      theRulerDOM = options.container.appendChild(theRulerDOM);
      options.sides.forEach(function (side) {
        constructRuler(theRulerDOM, side);
      });
      constructCorner(theRulerDOM, options.cornerSides);
      options.container.addEventListener('mouseup', mouseup);
    };

    const forEachRuler = (cb) => {
      let index = 0;
      for (let rul in rulerz) {
        if (rulerz.hasOwnProperty(rul)) {
          cb(rulerz[rul], index++);
        }
      }
    };

    const setPos = (values) => {
      let orgX = 0,
        orgY,
        deltaX = 0,
        deltaY = 0;
      forEachRuler((curRul) => {
        if (curRul.dimension === VERTICAL) {
          orgY = curRul.canvas.style.top;
          curRul.canvas.style.top = utils.pixelize(
            curRul.orgPos + parseInt(values.y),
          );
          deltaY = parseInt(orgY) - parseInt(curRul.canvas.style.top);
        } else {
          orgX = curRul.canvas.style.left;
          curRul.canvas.style.left = utils.pixelize(
            curRul.orgPos + parseInt(values.x),
          );
          deltaX = parseInt(orgX) - parseInt(curRul.canvas.style.left);
        }
      });
      guides.forEach((guide) => {
        if (guide.dimension === HORIZONTAL) {
          guide.line.guideLine.style.top = utils.pixelize(
            parseInt(guide.line.guideLine.style.top) - deltaY,
          );
          guide.line.curPosDelta(parseInt(values.y));
        } else {
          guide.line.guideLine.style.left = utils.pixelize(
            parseInt(guide.line.guideLine.style.left) - deltaX,
          );
          guide.line.curPosDelta(parseInt(values.x));
        }
      });
      CUR_DELTA_X = parseInt(values.x);
      CUR_DELTA_Y = parseInt(values.y);
    };

    const setScale = (newScale) => {
      let curPos, orgDelta, curScaleFac;
      forEachRuler((rul) => {
        rul.context.clearRect(0, 0, rul.canvas.width, rul.canvas.height);
        rul.context.beginPath();
        rul.setScale(newScale);
        rul.context.stroke();
        CUR_SCALE = newScale;
      });

      guides.forEach(function (guide) {
        if (guide.dimension === HORIZONTAL) {
          curPos = parseInt(guide.line.guideLine.style.top);
          orgDelta = options.rulerHeight + 1;
          curScaleFac = parseFloat(newScale) / guide.line.curScale();
          guide.line.guideLine.style.top = utils.pixelize(
            (curPos - orgDelta - CUR_DELTA_Y) / curScaleFac +
              orgDelta +
              CUR_DELTA_Y,
          );
          guide.line.curScale(newScale);
        } else {
          curPos = parseInt(guide.line.guideLine.style.left);
          orgDelta = options.rulerHeight + 1;
          curScaleFac = parseFloat(newScale) / guide.line.curScale();
          guide.line.guideLine.style.left = utils.pixelize(
            (curPos - orgDelta - CUR_DELTA_X) / curScaleFac +
              orgDelta +
              CUR_DELTA_X,
          );
          guide.line.curScale(newScale);
        }
      });
    };

    const clearGuides = () => {
      guides.forEach((guide) => {
        guide.line.destroy();
      });
      guides = [];
    };

    const toggleGuideVisibility = (val) => {
      const func = val ? 'show' : 'hide';
      guides.forEach(function (guide) {
        guide.line[func]();
      });
    };

    const toggleRulerVisibility = (val) => {
      const state = val ? 'block' : 'none';
      theRulerDOM.style.display = state;
      const trackers = options.container.querySelectorAll('.rul_tracker');
      if (trackers.length > 0) {
        trackers[0].style.display = state;
        trackers[1].style.display = state;
      }
    };

    const getGuides = () => {
      return guides.map((guide) => {
        return {
          posX: Math.round(
            (parseInt(guide.line.guideLine.style.left) -
              CUR_DELTA_X -
              options.rulerHeight) *
              CUR_SCALE,
          ),
          posY: Math.round(
            (parseInt(guide.line.guideLine.style.top) -
              CUR_DELTA_Y -
              options.rulerHeight) *
              CUR_SCALE,
          ),
          dimension: guide.dimension,
        };
      });
    };

    const setGuides = (_guides) => {
      if (!_guides) {
        return;
      }
      _guides.forEach((guide) =>
        constructGuide(guide.dimension, guide.posX, guide.posY, null, true),
      );
    };

    const destroy = () => {
      clearGuides();
      forEachRuler((ruler) => ruler.destroy());
      corners.forEach((corner) => corner.destroy());
      options.container.removeEventListener('mouseup', mouseup);
      theRulerDOM.parentNode.removeChild(theRulerDOM);
    };

    return {
      VERTICAL: VERTICAL,
      HORIZONTAL: HORIZONTAL,
      setPos: setPos,
      setScale: setScale,
      clearGuides: clearGuides,
      getGuides: getGuides,
      setGuides: setGuides,
      constructRulers: constructRulers,
      toggleRulerVisibility: toggleRulerVisibility,
      toggleGuideVisibility: toggleGuideVisibility,
      destroy: destroy,
    };
  }

  private rulerConstructor(_canvas, options, rulDimension) {
    const canvas = _canvas;
    const context = canvas.getContext('2d');
    let rulThickness = 0;
    let rulLength = 0;
    let rulScale = 1;
    const dimension = rulDimension || 2;
    const orgPos = 0;
    let tracker = document.createElement('div');

    const getLength = () => rulLength;

    const getThickness = () => rulThickness;

    const getScale = () => rulScale;

    const setScale = (newScale: string | number) => {
      rulScale = typeof newScale === 'number' ? newScale : parseFloat(newScale);
      drawPoints();
      return rulScale;
    };

    const drawRuler = (
      _rulerLength: number,
      _rulerThickness: number,
      _rulerScale: number,
    ) => {
      rulLength = canvas.width = _rulerLength * 4;
      rulThickness = canvas.height = _rulerThickness;
      rulScale = _rulerScale || rulScale;
      context.strokeStyle = options.strokeStyle;
      // Theme of ruler
      context.fillStyle = options.fillStyle;
      context.font = options.fontSize + ' ' + options.fontFamily;
      context.lineWidth = options.lineWidth;
      context.beginPath();
      drawPoints();
      context.stroke();
    };

    const drawPoints = () => {
      let pointLength = 0,
        label = '',
        delta = 0,
        draw = false;
      const lineLengthMax = 0,
        lineLengthMed = rulThickness / 2,
        lineLengthMin = rulThickness / 2;

      for (let pos = 0; pos <= rulLength; pos += 1) {
        delta = rulLength / 2 - pos;
        draw = false;
        label = '';

        if (delta % 50 === 0) {
          pointLength = lineLengthMax;
          label = Math.round(Math.abs(delta) * rulScale).toString();
          draw = true;
        } else if (delta % 25 === 0) {
          pointLength = lineLengthMed;
          draw = true;
        } else if (delta % 5 === 0) {
          pointLength = lineLengthMin;
          draw = true;
        }
        if (draw) {
          context.moveTo(pos + 0.5, rulThickness + 0.5);
          context.lineTo(pos + 0.5, pointLength + 0.5);
          context.fillText(label, pos + 1.5, rulThickness / 2 + 1);
        }
      }
    };

    const mousemove = (e: MouseEvent) => {
      const posX = e.clientX;
      const posY = e.clientY;
      if (dimension === 2) {
        tracker.style.left = utils.pixelize(
          posX - parseInt(options.container.getBoundingClientRect().left),
        );
      } else {
        tracker.style.top = utils.pixelize(
          posY - parseInt(options.container.getBoundingClientRect().top),
        );
      }
    };

    const destroy = function () {
      options.container.removeEventListener('mousemove', mousemove);
      tracker.parentNode?.removeChild(tracker);
      this.clearListeners && this.clearListeners();
    };

    const initTracker = () => {
      tracker = options.container.appendChild(tracker);
      utils.addClasss(tracker, 'rul_tracker');
      const height = utils.pixelize(options.rulerHeight);
      if (dimension === 2) {
        tracker.style.height = height;
      } else {
        tracker.style.width = height;
      }

      options.container.addEventListener('mousemove', mousemove);
    };

    if (options.enableMouseTracking) {
      initTracker();
    }

    return {
      getLength: getLength,
      getThickness: getThickness,
      getScale: getScale,
      setScale: setScale,
      dimension: dimension,
      orgPos: orgPos,
      canvas: canvas,
      context: context,
      drawRuler: drawRuler,
      drawPoints: drawPoints,
      destroy: destroy,
    };
  }

  private guideLine(
    line,
    _dragContainer,
    lineDimension,
    options,
    curDelta,
    moveCB = () => {},
    event,
  ) {
    let self,
      guideLine = line,
      _curScale = 1,
      _assigned = false,
      _curPosDelta = curDelta || 0,
      dragContainer = _dragContainer,
      dimension = lineDimension || 2;

    const curPosDelta = (val) => {
      if (typeof val === 'undefined') {
        return _curPosDelta;
      }
      return (_curPosDelta = val);
    };

    const assigned = (val) => {
      if (typeof val === 'undefined') {
        return _assigned;
      }
      return (_assigned = val);
    };

    const curScale = (val) => {
      if (typeof val === 'undefined') {
        return _curScale;
      }
      return (_curScale = val);
    };

    const draggable = {
      move: (xpos, ypos) => {
        guideLine.style.left = utils.pixelize(xpos);
        guideLine.style.top = utils.pixelize(ypos);
        updateToolTip(xpos, ypos);
        moveCB(self, xpos, ypos);
      },
      startMoving: (evt?: any) => {
        utils.addClasss(guideLine, ['rul_line_dragged']);
        evt = evt || window.event;
        let posX = evt ? evt.clientX : 0,
          posY = evt ? evt.clientY : 0,
          divTop = parseInt(guideLine.style.top || 0),
          divLeft = parseInt(guideLine.style.left || 0),
          eWi = parseInt(guideLine.offsetWidth),
          eHe = parseInt(guideLine.offsetHeight),
          cWi = parseInt(dragContainer.offsetWidth),
          cHe = parseInt(dragContainer.offsetHeight),
          cursor = dimension === 2 ? 'ns-resize' : 'ew-resize';

        options.container.style.cursor = cursor;
        guideLine.style.cursor = cursor;
        let diffX = posX - divLeft,
          diffY = posY - divTop;
        document.onmousemove = (evt) => {
          evt = evt || window.event;
          let posX = evt.clientX,
            posY = evt.clientY,
            aX = posX - diffX,
            aY = posY - diffY;

          if (aX < 0) {
            aX = 0;
          }
          if (aY < 0) {
            aY = 0;
          }

          if (aX + eWi > cWi) {
            aX = cWi - eWi;
          }
          if (aY + eHe > cHe) {
            aY = cHe - eHe;
          }

          draggable.move(aX, aY);
        };
        showToolTip();
      },
      stopMoving: () => {
        options.container.style.cursor = null;
        guideLine.style.cursor = null;
        document.onmousemove = () => {};
        hideToolTip();
        utils.removeClasss(guideLine, ['rul_line_dragged']);
      },
    };

    const showToolTip = () => {
      if (!options.enableToolTip) {
        return;
      }
      utils.addClasss(guideLine, 'rul_tooltip');
    };

    const updateToolTip = (x: number, y: number) => {
      if (y) {
        guideLine.dataset.tip =
          'Y: ' +
          Math.round((y - options.rulerHeight - 1 - _curPosDelta) * _curScale) +
          ' px';
      } else {
        guideLine.dataset.tip =
          'X: ' +
          Math.round((x - options.rulerHeight - 1 - _curPosDelta) * _curScale) +
          ' px';
      }
    };

    const hideToolTip = () => utils.removeClasss(guideLine, 'rul_tooltip');

    const destroy = () => {
      draggable.stopMoving();
      moveCB = null;
      guideLine.removeEventListener('mousedown', mousedown);
      guideLine.removeEventListener('mouseup', mouseup);
      guideLine.removeEventListener('dblclick', dblclick);
      guideLine.parentNode && guideLine.parentNode.removeChild(guideLine);
    };

    const hide = () => (guideLine.style.display = 'none');

    const show = () => (guideLine.style.display = 'block');

    const mousedown = (e) => {
      e.stopPropagation();
      draggable.startMoving();
    };

    const mouseup = (e) => draggable.stopMoving();

    const dblclick = (e) => {
      e.stopPropagation();
      destroy();
    };

    guideLine.addEventListener('mousedown', mousedown);

    guideLine.addEventListener('mouseup', mouseup);

    guideLine.addEventListener('dblclick', dblclick);
    if (event) draggable.startMoving(event);

    self = {
      setAsDraggable: draggable,
      startDrag: draggable.startMoving,
      stopDrag: draggable.stopMoving,
      destroy: destroy,
      curScale: curScale,
      assigned: assigned,
      curPosDelta: curPosDelta,
      guideLine: guideLine,
      dimension: dimension,
      hide: hide,
      show: show,
    };
    return self;
  }
}
