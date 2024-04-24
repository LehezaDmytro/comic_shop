//Імпорт товарів
import goods from "./data/goods.js";
//Відмальовування імпортованих товарів у секцію shop
const shopList = document.querySelector(".shop__list");
const markupGoods = goods.map((i) => {
  const article = Object.keys(i);
  return `<li class="shop__item">
              <img src="${i[article].image}" class="shop__img" />
              <p class="shop__product-name">${i[article].productName}</p>
              <div class="price">
                <span class="price__text"> মূল্য: </span>
                <span class="price__value">BDT ${i[article].price}</span>
              </div>
              <button class="shop__btn" data-id="${article}">ক্রয় করুন</button>
            </li>`;
});

shopList.innerHTML = markupGoods.join("");

//Створення кошика
let cart = JSON.parse(localStorage.getItem("cart"))
  ? JSON.parse(localStorage.getItem("cart"))
  : {};

//Додавання товарів в кошик
const addToCart = (id) => {
  if (cart[id] === undefined) {
    cart[id] = 1;
  } else {
    cart[id]++;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
};

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

//Відслідковування події кліку по кнопці для додавання товару в кошик
const shopSection = document.querySelector(".shop");
shopSection.addEventListener("click", (e) => {
  if (e.target.nodeName !== "BUTTON") {
    return;
  } else {
    addToCart(e.target.dataset.id);
    cartCounter();
  }
});
