import React, { useState } from 'react';
import { Resizable, ResizeCallbackData } from 'react-resizable';
import Draggable from 'react-draggable';
import Scaler from '@/components/Scaler';

interface CanvasProps {
  children: React.ReactNode;
}

const Canvas: React.FC<CanvasProps> = ({ children }) => {
  // resize the viewport
  const initalScale = 100;
  const [scale, setScale] = useState(initalScale);
  const onZoomUp = () => setScale(scale + 10);
  const onZoomDown = () => scale > 10 && setScale(scale - 10);
  const onReset = () => setScale(initalScale);
  const onWheel = (event: any) => {
    if (!event.ctrlKey) return;
    event.deltaY > 0 ? onZoomDown() : onZoomUp();
  };

  const [width, setWidth] = useState(1366);
  const [height, setHeight] = useState(768);

  const onResize = (
    event: React.SyntheticEvent,
    { size }: ResizeCallbackData,
  ) => {
    setWidth(size.width);
    setHeight(size.height);
  };

  const [title, setTitle] = useState('xxx 数字大屏');

  return (
    <>
      <div
        className="relative top-0 left-0 w-full h-full overflow-auto"
        onWheel={onWheel}
      >
        <Draggable scale={scale / 100} handle="#handle">
          <div className="absolute top-12 left-12">
            <Resizable
              className="absolute top-12 left-12"
              height={height}
              width={width}
              transformScale={scale / 100}
              onResize={onResize}
            >
              <div
                className="border border-solid border-gray-200 border-opacity-25 hover:border-blue-500"
                style={{
                  backgroundImage:
                    'url(https://digital.e-cology.com.cn/cloudstore/release/ca1c4c441fe24c1c97a54b8ff9257cd2/resources/bg.png)',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  width: width,
                  height: height,
                  transform: `scale(${scale / 100})`,
                }}
              >
                <div
                  id="handle"
                  className="absolute text-sm cursor-move"
                  style={{ top: '-1.75rem' }}
                >
                  {title}
                </div>
                {children}
              </div>
            </Resizable>
          </div>
        </Draggable>
      </div>
      <Scaler onZoomUp={onZoomUp} onZoomDown={onZoomDown} onReset={onReset} />
    </>
  );
};

export default Canvas;
