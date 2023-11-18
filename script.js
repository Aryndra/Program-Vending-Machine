// login admin
function toggleSection(sectionId) {
  var element = document.getElementById(sectionId);
  element.classList.add("active");
}
function closeSection(sectionId) {
  var close = document.getElementById(sectionId);
  close.classList.remove("active");
}

// active
function setActive(sectionId) {
  var menuItems = document.querySelectorAll(".menu a");
  for (var i = 0; i < menuItems.length; i++) {
    menuItems[i].classList.remove("active");
  }

  var selectedMenuItem = document.querySelector('a[href="#' + sectionId + '"]');
  selectedMenuItem.classList.add("active");
}

//cart
var cartItemsMap = {};
var a = 1;
function addToCart(product, price) {
  var cartSection = document.getElementById("cart");
  cartSection.style.display = "block";
  if (cartItemsMap[product]) {
    cartItemsMap[product].quantity++;
    a++;
  } else {
    cartItemsMap[product] = { quantity: 1, price: price };
  }

  renderCartItems();
}

//delete
function removeFromCart(product) {
  if (cartItemsMap[product].quantity === 1) {
    delete cartItemsMap[product];
  } else {
    cartItemsMap[product].quantity--;
    a--;
  }
  renderCartItems();
}

//slebew
function sideActive(sectionId) {
  var sidebar = document.getElementById(sectionId);
  sidebar.classList.add("active");
}

function heroSide(sectionId) {
  var hero = document.getElementById(sectionId);
  hero.classList.add("active");
}

function renderCartItems() {
  var cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";
  var totalPrice = 0;

  for (var i in cartItemsMap) {
    var li = document.createElement("li");
    var total = cartItemsMap[i].price * cartItemsMap[i].quantity;
    totalPrice += total;
    li.appendChild(
      document.createTextNode(
        i + " " + cartItemsMap[i].quantity + " " + "x  : " + total
      )
    );
    var removeButton = document.createElement("button");
    removeButton.classList.add("remove-button");
    removeButton.innerHTML = "-";
    removeButton.onclick = (function (product) {
      return function () {
        removeFromCart(product);
      };
    })(i);
    li.appendChild(removeButton);

    cartItems.appendChild(li);
  }
  if (totalPrice == 0) {
    var side = document.getElementById("side");
    side.classList.remove("active");
    var hero = document.getElementById("hero");
    hero.classList.remove("active");
  }
  document.getElementById("totalPrice").innerText = totalPrice;
}

// buy
function submitPayment(event) {
  event.preventDefault();
  var totalPrice = parseFloat(document.getElementById("totalPrice").innerText);
  var amount = parseFloat(document.getElementById("amount").value);

  if (amount >= totalPrice) {
    alert(
      "Pembelian berhasil!\nKembalian Anda: Rp. " +
        (amount - totalPrice).toFixed(2)
    );
    cartItemsMap = {};
    renderCartItems();
    document.getElementById("payment-form").reset();
  } else {
    alert("Jumlah uang yang dibayarkan tidak mencukupi!");
  }
}

//no content display

console.log("@aryndrxx");
