// import file Path 
import productData from "./product.js";
import { domStyle } from "./app.js";

// all of variabons
const sideBarBox = document.querySelector("#prodectAddingBox div.actionButton");
const countsQty = document.getElementById("qty");

// chack in the localStorage
if (!localStorage.getItem('CartProduct')) {
  let emtyArray = new Array();
  localStorage.setItem('CartProduct', JSON.stringify(emtyArray));
}
// current Cart Product data
let currentCartProduct = JSON.parse(localStorage.getItem('CartProduct'));
let dataLength = currentCartProduct?.length;
countsQty.innerText = dataLength;



// add to cart function
export function addToCartProdect() {
  let clickCart = document.querySelectorAll('#cart');
  clickCart.forEach((item) => {
    // click the button and set the data in localStorage
    const cartKeys = Number(item.getAttribute("data-id"));
    let hiddenCart = item.querySelector('#hiddenCart')
    item.querySelector("#cardButton").addEventListener("click", () => {
      let filterData = productData.filter((itemValue, index) => {
        return index === cartKeys;
      });
      currentCartProduct.push(filterData[0]);
      localStorage.clear();
      localStorage.setItem("CartProduct", JSON.stringify(currentCartProduct));
      addValueCartBox();
      domStyle()
      // updeates all qty
      countsQty.innerText = currentCartProduct.length;
      item.classList.add('pointer-events-none');
      hiddenCart.classList.add('!block');
    })

  })
}

addToCartProdect();

// cart product data add cartBox
let addToCartItem = document.getElementById("cartProdectItem");

export function addValueCartBox() {
  addToCartItem.innerHTML = "";

  if (currentCartProduct.length < 1) {
    addToCartItem.innerHTML = `<span class="font-semibold absolute w-[90%] text-center top-[50%]">You don't cart your prodect..</span>`
  }

  let totalPrice = currentCartProduct.reduce(function (prevPrice, currPrice) {
    return prevPrice + currPrice.price;
  }, 0)

  currentCartProduct.forEach((itemProduct) => {
    let currentPrice = itemProduct.price;
    addToCartItem.innerHTML += `<li data-pItem="${itemProduct.id}" id="cartIsProduct">
        <div
          class="isCartItem flex items-center bg-gray-100 p-2 gap-3 rounded-md"
        >
          <div
            class="prodectImg flex-1 border border-gray-300 shadow-md h-full p-2 bg-white rounded-md overflow-hidden"
          >
            <img src="${itemProduct.img}" alt="prodect" />
          </div>
          <div class="prodectInfo flex-[2]">
            <h3 class="font-semibold text-lg">${itemProduct.name}</h3>
            <p class="text-xs">${itemProduct.dis}</p>
            <div class="mt-3 flex justify-between">
              <span id="price" class="text-lg font-semibold text-gray-700"
                >TK <span>${currentPrice}</span> </span>
            </div>
          </div>
          <div
            class="action rounded-md flex  items-center justify-center p-2"
          >
            <div class="counting p-1 gap-1 rounded-md bg-slate-300 flex items-center justify-center flex-col">
              <button id="decrement"
                class="bg-purple-400 text-white w-6 h-6 flex justify-center items-center rounded-full text-2xl text-center font-semibold"
              >
                -
              </button>
              <span>1</span>
              <button id="increment"
                class="bg-purple-400 text-white w-6 h-6 flex justify-center items-center rounded-full text-2xl text-center font-semibold"
              >
                +
              </button>
            </div>
            <button class="hidden">
              <img
                class="w-5 h-5 mt-4"
                src="https://www.rokomari.com/static/200/images/icon_trash.png"
                alt="delete"
              />
            </button>
          </div>
        </div>
      </li>`
    // ================
    sideBarBox.innerHTML = `<p id="totalPrice" class="bg-green-400 text-white mt-4 px-6 mb-3 py-2 w-[90%] mx-auto rounded-full flex place-content-evenly items-center gap-3 font-semibold">
    Total : <span>${totalPrice}</span>TK
  </p>
  <button class="w-[90%] mx-auto bg-red-400 hover:bg-red-500 duration-200 mb-3 p-2 font-semibold rounded-full text-white">
    Clear To Cart
  </button>`
  })

  let totalPriceSection = document.querySelector("#totalPrice span");
  document.querySelectorAll('#cartIsProduct').forEach((item) => {
    let thisDataKey = Number(item.getAttribute('data-pItem'));
    let countTag = item.querySelector('.counting span');
    let priceSection = item.querySelector('#price > span');

    // this is the increment button 
    item.querySelector('.counting #increment').addEventListener('click', function () {
      let countValue = Number(countTag.innerText) + 1;
      let filterData = productData.filter((itemValue, index) => {
        return index === thisDataKey;
      });
      let tageValue = Number(priceSection.innerHTML);
      let currentPrice = filterData[0].price;

      let setAllTotal = Number(totalPriceSection.innerHTML) + currentPrice;
      let currentPriceSet = String(tageValue + currentPrice)
      priceSection.innerHTML = currentPriceSet;
      totalPriceSection.innerHTML = setAllTotal;
      let currentCountValue = countValue++
      countTag.innerText = String(currentCountValue);

    })

    // this is the decrement button 
    item.querySelector('.counting #decrement').addEventListener('click', function () {
      let countValue = Number(countTag.innerText) - 1;
      if (0 >= countValue) {
        alert('Please enter a value greater than or equal to 1')
      } else {
        let filterData = productData.filter((itemValue, index) => {
          return index === thisDataKey;
        });
        let tageValue = Number(priceSection.innerHTML);
        let currentPrice = filterData[0].price;
        let setAllTotal = Number(totalPriceSection.innerHTML) - currentPrice;
        let currentPriceSet = String(tageValue - currentPrice)
        priceSection.innerHTML = currentPriceSet;
        totalPriceSection.innerHTML = setAllTotal;
        let currentCountValue = countValue--
        countTag.innerText = String(currentCountValue);
      }

    })

  })

  // clear localStorage all data 
  sideBarBox.querySelector('button').addEventListener('click', function () {
    addToCartItem.innerHTML = "";
    addToCartItem.innerHTML = `<span class="font-semibold absolute w-[90%] text-center top-[50%]">You don't cart your prodect..</span>`
    currentCartProduct = [];
    localStorage.clear();
    localStorage.setItem("CartProduct", JSON.stringify(currentCartProduct));
    domStyle();
    countsQty.innerText = dataLength;
    sideBarBox.querySelector('p').innerHTML = `Total : TK &nbsp; 0`;
    addValueCartBox();
  });

  domStyle();
}
