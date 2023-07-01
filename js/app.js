// import file Path 
import productData from "./product.js";
import { addValueCartBox, addToCartProdect } from "./cart.js";

// all of variabons 
const cartAllProdect = document.getElementById("prodectAddingBox");
const displayProdect = document.getElementById("cartWrapper");
const containerBody = document.querySelector("#container");
const cartButton = document.getElementById("cartButton");
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


// display all of Data this function.
function displayFun() {
  // loop all of data
  productData.forEach((cart, index) => {
    // index + 1;
    displayProdect.innerHTML += `<div id="cart"
        data-id="${cart.id}" class="relative overflow-hidden rounded-xl flex flex-col bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300">
        <div id="hiddenCart" data-bKey="${index}" class="hidden absolute top-0 left-0 w-full h-full bg-slate-500 opacity-40 z-10"></div>
    <div class="relative flex items-center overflow-hidden rounded-xl flex-[2.5] border border-gray-300 shadow-md">
      <img src="${cart.img}" alt="Photo" />
    </div>

    <div class="mt-1 p-2 flex-[1.5] flex flex-col justify-end">
      <h2 class="text-slate-700">${cart.name}</h2>
      <p class="mt-1 text-sm text-slate-400">${cart.dis}</p>

      <div class="mt-3 flex items-end justify-between">
        <p class="text-lg font-bold text-blue-500">
          TK ${cart.price}
        </p>

        <div 
        id="cardButton"
          class="flex items-center cursor-pointer space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600"
          
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-4 w-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
          <button class="text-sm">Add to cart</button>
        </div>
      </div>
    </div>
  </div>`;
  });

  domStyle()
}
// show cart product box
function showCartBox() {
  cartButton.addEventListener("click", () => {
    cartAllProdect.classList.add("!left-0");
  });
  containerBody.addEventListener("click", () => {
    cartAllProdect.classList.remove("!left-0");
  });

}
displayFun();

export function domStyle() {
  let addToCartItem = document.querySelector("#cartProdectItem");
  const displayProdect = document.getElementById("cartWrapper");
  if (!displayProdect.querySelector('#cart') && !addToCartItem.querySelector('#cartIsProduct')) {
    console.log(null);
  } else {

    let hiddenCart = displayProdect.querySelectorAll('#cart')
    hiddenCart.forEach((hiddenDiv) => {
      let div = hiddenDiv.querySelector('#hiddenCart');
      addToCartItem.querySelectorAll('#cartIsProduct').forEach((c) => {
        currentCartProduct.forEach((e) => {
          productData.forEach((d) => {
            let cartKey = Number(hiddenDiv.getAttribute("data-id"));
            let listKey = Number(c.getAttribute("data-pitem"))
            if (cartKey === listKey) {
              hiddenDiv.classList.add('pointer-events-none');
              div.classList.add('!block');
            }
          })
        })
      })
    })
  }
}

// invock all of function
showCartBox();
addToCartProdect();
addValueCartBox();





