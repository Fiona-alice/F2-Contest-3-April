
function getMenu() {
  const menuItemsContainer = document.getElementById("menu-item");

  fetch("https://free-food-menus-api-production.up.railway.app/burgers")
    .then((response) => response.json())
    .then((data) => {
      const filteredData = data.filter(
        (item) =>
          item.name === "Cheese Burger" ||
          item.name === "Bacon Burger" ||
          item.name === "Classic Burger"
      );
      filteredData.forEach((item) => {
        const menuItem = document.createElement("div");
        menuItem.innerHTML = `
          <h3>${item.name}</h3>
          <img src="${item.image}" onclick="selectBurgerType('${item.name}')">
          <p>Price: ${item.price}</p>
        `;
       /* menuItem.addEventListener('click', () => placeOrder(item)); */
        menuItemsContainer.appendChild(menuItem);
      });
       })
    .catch((error) => {
      console.error(error);
    });
}

// Take order function
function takeOrder() {
  return new Promise(resolve => {
    setTimeout(() => {
      const orderId = Math.floor(Math.random() * 1000) + 1;
      const status = 'Order received';
      const paymentStatus = 'Not paid';
      const order = {
        orderId,
        status,
        paymentStatus
      };
      resolve(order);
    }, 2500);
    });
  }
   
   function showOrderStatus(orderDetails) {
  const orderStatusElement = document.getElementById('order-status');
  
  if (orderDetails.order_status) {
    orderStatusElement.innerHTML = 'Your order is ready!';
    orderStatusElement.style.color = 'green';
  } else {
    orderStatusElement.innerHTML = 'Your order is being prepared...';
    orderStatusElement.style.color = 'orange';
  }
  
  if (orderDetails.paid) {
    alert('Thank you for eating with us today!');
  }
}

function placeOrder() {
  const burgerOptions = ['Classic Burger', 'Cheeseburger', 'Bacon Burger'];
  const selectedBurger = prompt(`Please choose a burger type:\n\n${burgerOptions.join('\n')}`);
  if (selectedBurger && burgerOptions.includes(selectedBurger)) {
    orderDetails.burger = selectedBurger;
    takeOrder(orderDetails).then(order => {
      console.log(order);
      orderDetails.orderId = order.orderId;
      orderDetails.status = order.status;
      orderDetails.paymentStatus = order.paymentStatus;
      showOrderStatus(orderDetails);
    });
  } else {
    alert('Invalid burger type!');
  }
}

// Call the getMenu() function on page load
getMenu();

// Order preparation function
function orderPrep() {
  return new Promise(resolve => {
    setTimeout(() => {
      const orderStatus = { order_status: true, paid: false };
      resolve(orderStatus);
    }, 1500);
  });
}

// Payment function
function payOrder() {
  return new Promise(resolve => {
    setTimeout(() => {
      const orderStatus = { order_status: true, paid: true };
      resolve(orderStatus);
    }, 1000);
  });
}

// Thank you function
function thankyouFnc() {
  alert('Thank you for eating with us today!');
}

// Order process function
function orderProcess() {
  takeOrder()
    .then(order => {
      console.log('Order:', order);
      return orderPrep();
    })
    .then(orderStatus => {
      console.log('Order Status:', orderStatus);
      return payOrder();
    })
    .then(orderStatus => {
      console.log('Order Status:', orderStatus);
      thankyouFnc();
    })
    .catch(error => console.error(error));
}

// Call getMenu function on page load
window.addEventListener('load', getMenu);

// Call orderProcess function when order button is clicked
const orderBtn = document.querySelector('#order-btn');
orderBtn.addEventListener('click', orderProcess);
