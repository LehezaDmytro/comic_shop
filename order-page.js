//Імпорт товарів
import goods from "./data/goods.js";

const ordersList = document.querySelector(".order__items-list");

const cart = JSON.parse(localStorage.getItem("cart"));
console.log(cart);

//Відмальовування списку товарів в замовленні
const markupOrder = () => {
  ordersList.innerHTML = "";
  let markup = "";
  for (let article in cart) {
    for (let good of goods) {
      if (good[article]) {
        markup += `<li class="order__item">
                <div class="product">
                  <img src="${good[article].image}" class="product__img" />
                  <p class="product__description">${
                    good[article].productName
                  }</p>
                </div>
                <p class="product__price">BDT ${good[article].price}</p>
                <div class="quantity">
                  <button class="quantity__btn minus" type="button" data-id="${article}">-</button>
                  <input class="quantity__input" type="text" value="${
                    cart[article]
                  }"/>
                  <button class="quantity__btn plus" type="button" data-id="${article}">+</button>
                </div>
                <p class="product__total-price">BDT ${
                  good[article].price * cart[article]
                }</p>
                <button class="product__delete-button delete" type="button" data-id="${article}">
                </button>
              </li>`;
        break;
      }
    }
  }
  ordersList.innerHTML = markup;
};
markupOrder();
//Зміна значення лічильника кількості товарів у кошику
const cartCounter = () => {
  const couter = document.querySelectorAll(".counter");
  const obj = JSON.parse(localStorage.getItem("cart"));
  if (obj) {
    const currentCounter = Object.values(obj);

    let sum = 0;

    for (let number of currentCounter) {
      sum += number;
    }

    for (let i = 0; i < couter.length; i++) {
      couter[i].textContent = sum;
    }
  } else {
    for (let i = 0; i < couter.length; i++) {
      couter[i].textContent = 0;
    }
  }
};
cartCounter();

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
    console.log(e.target);
    deleteFunction(e.target.dataset.id);
  }
});

const plusFunction = (id) => {
  cart[id]++;
  localStorage.setItem("cart", JSON.stringify(cart));
  cartCounter();
  markupOrder();
};

const minusFunction = (id) => {
  cart[id]--;
  localStorage.setItem("cart", JSON.stringify(cart));
  cartCounter();
  markupOrder();
};

const deleteFunction = (id) => {
  console.log("YO");
  delete cart[id];
  localStorage.setItem("cart", JSON.stringify(cart));
  cartCounter();
  markupOrder();
};
