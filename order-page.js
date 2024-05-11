//Імпорт товарів
import goods from "./data/goods.js";

//Отримання кошика з локального сховища
const cart = JSON.parse(localStorage.getItem("cart"));

//Відмальовування списку товарів в замовленні
const ordersList = document.querySelector(".order-table__body");
const renderOrder = () => {
  //Очищення списку товарів замовлення
  ordersList.innerHTML = "";
  //Створення змінної в яку буде записана розмітка списку товарів
  let markup = "";
  //Перебираємо товари в кошику
  for (let article in cart) {
    //Перебираємо доступні товари
    for (let good of goods) {
      //Якщо товар з кошика співпадає з доступним товаром, відмальовуємо його розмітку і додаємо її в змінну markup
      if (good[article]) {
        markup += `<tr class="order__item">
                <td class="product">
                  <img src="${good[article].image}" class="product__img" />
                  <p class="product__description">${
                    good[article].productName
                  }</p>
                </td>
                <td class="product__price">BDT ${good[article].price}</td>
                <td class="quantity">
                  <button
                    class="quantity__btn minus"
                    type="button"
                    data-id="${article}"
                  >
                    -
                  </button>
                  <input class="quantity__input" type="number" min="1" value="${
                    cart[article]
                  }" data-id="${article}" name="quantity" />
                  <button
                    class="quantity__btn plus"
                    type="button"
                    data-id="${article}"
                  >
                    +
                  </button>
                </td>
                <td class="product__total-price">BDT ${
                  good[article].price * cart[article]
                }</td>
                <td class="product__delete-item">
                  <button
                    class="product__delete-button delete"
                    type="button"
                    data-id="${article}"
                  ></button>
                </td>
              </tr>`;
        break;
      }
    }
  }
  //Рендеримо отриману розмітку на сторінку
  ordersList.innerHTML = markup;
  inputChange();
};
renderOrder();

//Зміна значення лічильника кількості товарів у кошику
const cartCounter = () => {
  const couter = document.querySelectorAll(".counter");
  //Перевіряємо чи є щось у кошику
  if (cart) {
    const currentCounter = Object.values(cart);
    //Обчисюємо суму товарів у кошику
    let sum = 0;
    for (let number of currentCounter) {
      sum += number;
    }
    //Відмальовуємо суму товарів у всі елементи на сторінуці які мають клас .counter
    for (let i = 0; i < couter.length; i++) {
      couter[i].textContent = sum;
    }
  } else {
    //Якщо кошик пустий, всім елементам з класом .counetr присвоюємо 0
    for (let i = 0; i < couter.length; i++) {
      couter[i].textContent = 0;
    }
  }
};
cartCounter();

//Відслідковування кліку по кнопках збільшення кількості товарів, зменшення кількості товарів, та видалення товару
ordersList.addEventListener("click", (e) => {
  if (e.target.classList.contains("plus")) {
    plusFunction(e.target.dataset.id);
  }
  if (e.target.classList.contains("minus")) {
    if (cart[e.target.dataset.id] <= 1) {
      e.target.setAttribute("disabled", "");
    } else {
      minusFunction(e.target.dataset.id);
    }
  }
  if (e.target.classList.contains("delete")) {
    deleteFunction(e.target.dataset.id);
  }
});

//Збільшення кількості товарів
const plusFunction = (id) => {
  cart[id]++;
  localStorage.setItem("cart", JSON.stringify(cart));
  cartCounter();
  renderOrder();
};

//Зменшення кількості товарів
const minusFunction = (id) => {
  cart[id]--;
  localStorage.setItem("cart", JSON.stringify(cart));
  cartCounter();
  renderOrder();
};

//Видалення товару
const deleteFunction = (id) => {
  delete cart[id];
  localStorage.setItem("cart", JSON.stringify(cart));
  cartCounter();
  renderOrder();
};

//Зміна кількості товарів в input
function inputChange() {
  const inputs = document.querySelectorAll(".quantity__input");
  for (const input of inputs) {
    input.addEventListener("change", (e) => {
      const id = e.target.dataset.id;
      cart[id] = +e.target.value;
      localStorage.setItem("cart", JSON.stringify(cart));
      cartCounter();
      renderOrder();
    });
  }
}
inputChange();
