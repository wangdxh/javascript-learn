function component() {
  var element = document.createElement('div');

  // Lodash��Ŀǰͨ��һ�� script �ű����룩����ִ����һ���Ǳ����
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

document.body.appendChild(component());