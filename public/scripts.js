;(function () {
  const submit = document.getElementsByClassName('variant-submit')[0];
  const count = document.getElementsByClassName('variant-count')[0];
  const cost = document.getElementsByClassName('variant-cost')[0];

  if (submit && count && cost) {
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
  }
})();

;(function () {
  const form = document.forms.basket;

  const addresses = document.getElementsByClassName('address');
  const basket = document.getElementsByClassName('product');

  function addressClick () {
    for (let item of addresses) {
      item.classList.remove('active');
    }
    this.classList.add('active');
  }

  function productClick () {
    const classes = this.classList;
    classes.toggle('active');
  }

  for (let item of addresses) {
    item.addEventListener('click', addressClick);
  }

  for (let item of basket) {
    item.addEventListener('click', productClick);
  }

  if (form) {
    form.addEventListener('submit', e => {
      const address = document.querySelector('.address.active');
      const goods = document.querySelectorAll('.product.active');
      if (address && goods.length > 0) {
        const goodsData = [];
        form.address.value = address.dataset.id;
        for (let item of goods) {
          goodsData.push(item.dataset);
        }
        form.goods.value = JSON.stringify(goodsData);
      } else {
        window.alert('Address or Product not choised');
        e.preventDefault();
      }
    });
  }
})();
