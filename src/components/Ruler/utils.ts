export function extend() {
  for (var i = 1; i < arguments.length; i++)
    for (var key in arguments[i])
      if (arguments[i].hasOwnProperty(key))
        arguments[0][key] = arguments[i][key];
  return arguments[0];
}

export function pixelize(val) {
  return val + 'px';
}

export function prependChild(container, element) {
  return container.insertBefore(element, container.firstChild);
}

export function addClasss(element, classNames) {
  if (!(classNames instanceof Array)) {
    classNames = [classNames];
  }

  classNames.forEach(function (name) {
    element.className += ' ' + name;
  });

  return element;
}

export function removeClasss(element, classNames) {
  var curCalsss = element.className;
  if (!(classNames instanceof Array)) {
    classNames = [classNames];
  }
  classNames.forEach(function (name) {
    curCalsss = curCalsss.replace(name, '');
  });
  element.className = curCalsss;
  return element;
}
