let container = document.querySelector('.container');
let me = document.querySelector('.me');

container.addEventListener('mousemove', e => {
  let x = e.offsetX;
  me.style.marginLeft = '' + x + 'px';
});
