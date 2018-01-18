;(function () {
  const submit = document.getElementsByClassName('variant-submit')[0];
  const count = document.getElementsByClassName('variant-count')[0];
  const cost = document.getElementsByClassName('variant-cost')[0];

  const countEvent = () => {
    cost.innerHTML = `Cost: ${ count.value * count.form.elements.cost.value }`;
  };
  
  count.addEventListener('click', countEvent);
  count.addEventListener('input', countEvent);
  
  const buttons = document.querySelectorAll('button.variant');
  let activeButton = buttons[0];
  activeButton.classList.add('active');

  for (let item of buttons) {
    item.addEventListener('click', () => {
      activeButton.classList.remove('active');
      item.classList.add('active');
      activeButton = item;
      const target = item.dataset.target;
      submit.setAttribute('form', target);
      count.setAttribute('form', target);
      countEvent();
    });
  };
  
  countEvent();
})();
