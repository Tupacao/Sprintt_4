var Dados = [

  { area: 1, quant_pacientes: 23, quant_enfermeiros: 5, quant_necessaria: 55 },
  { area: 2, quant_pacientes: 73, quant_enfermeiros: 30, quant_necessaria: 55 },
  { area: 3, quant_pacientes: 59, quant_enfermeiros: 15, quant_necessaria: 55 },
  { area: 4, quant_pacientes: 64, quant_enfermeiros: 13, quant_necessaria: 55 },
  { area: 5, quant_pacientes: 69, quant_enfermeiros: 9, quant_necessaria: 55 },
  { area: 6, quant_pacientes: 82, quant_enfermeiros: 55, quant_necessaria: 55 },

]
var notifications = [];
var currentPage = 1;
var notificationsPerPage = 8;

function showPopup() {
  var notificationPopup = document.getElementById("notificationPopup");
  var notificationList = document.getElementById("notificationList");
  var paginationContainer = document.getElementById("paginationContainer");

  notificationPopup.style.display = "block";
  populateNotificationList();

  function populateNotificationList() {
    notificationList.innerHTML = "";
    var totalPages = Math.ceil(notifications.length / notificationsPerPage);

    if (totalPages > 1) {
      createPagination(paginationContainer, totalPages);
    }

    var startIndex = (currentPage - 1) * notificationsPerPage;
    var endIndex = currentPage * notificationsPerPage;
    var currentPageNotifications = notifications.slice(startIndex, endIndex);

    currentPageNotifications.forEach(function (notification) {
      var li = document.createElement("li");
      var closeButton = document.createElement("span");
      closeButton.classList.add("close-button");
      closeButton.textContent = "×";
      closeButton.onclick = function () {
        deleteNotification(notification);
      };
      var text = document.createTextNode(notification.message);
      li.appendChild(text);
      li.appendChild(closeButton);
      notificationList.appendChild(li);
    });
  }
}

function createPagination(paginationContainer, totalPages) {
  paginationContainer.innerHTML = "";

  for (var i = 1; i <= totalPages; i++) {
    var pageButton = document.createElement("button");
    pageButton.textContent = i;
    pageButton.onclick = function () {
      goToPage(parseInt(this.textContent));
    };

    if (i === currentPage) {
      pageButton.classList.add("current-page");
    }

    paginationContainer.appendChild(pageButton);
  }
}

function goToPage(pageNumber) {
  currentPage = pageNumber;
  showPopup();
}

function closePopup() {
  var notificationPopup = document.getElementById("notificationPopup");
  notificationPopup.style.display = "none";
}

function addNotification(message) {
  var notification = {
    message: message,
    read: false
  };
  notifications.push(notification);
  localStorage.setItem("notifications", JSON.stringify(notifications));
  updateNotificationBadge();

  if (notifications.length > notificationsPerPage) {
    showPopupPageTwo();
  }
}

function showPopupPageTwo() {
  var notificationPopup = document.getElementById("notificationPopup");
  notificationPopup.classList.add("multi-page");

  var notificationList = document.getElementById("notificationList");
  notificationList.innerHTML = "";

  var notificationPageTwo = document.createElement("div");
  notificationPageTwo.classList.add("notification-page-two");

  var text = document.createTextNode("Segunda página de notificações");
  notificationPageTwo.appendChild(text);

  notificationList.appendChild(notificationPageTwo);
}

function deleteNotification(notification) {
  var index = notifications.indexOf(notification);

  if (index > -1) {
    notifications.splice(index, 1);
    localStorage.setItem("notifications", JSON.stringify(notifications));
    updateNotificationBadge();
    showPopup();
  }
}

function deleteAllNotifications() {
  notifications = [];
  localStorage.removeItem("notifications");
  currentPage = 1; // Reset currentPage to the first page
  var paginationContainer = document.getElementById("paginationContainer");
  paginationContainer.innerHTML = ""; // Clear the pagination container
  showPopup(); // Refresh the notification popup
  updateNotificationBadge();
}

function updateNotificationBadge() {
  var notificationBadge = document.getElementById("notificationBadge");
  var unreadCount = notifications.filter(function (notification) {
    return !notification.read;
  }).length;

  notificationBadge.textContent = unreadCount;
  notificationBadge.style.display = unreadCount > 0 ? "block" : "none";
}

document.addEventListener("DOMContentLoaded", function () {
  var notificationBadge = document.getElementById("notificationBadge");
  var notificationPopup = document.getElementById("notificationPopup");
  var notificationList = document.getElementById("notificationList");

  // Recupera as notificações do LocalStorage
  if (localStorage.getItem("notifications")) {
    notifications = JSON.parse(localStorage.getItem("notifications"));
  }

  updateNotificationBadge();

  setTimeout(function () {
    addNotification("Paralelepipedo\nParalelepipedo\nParalelepipedo\nParalelepipedo\nParalelepipedo\nParalelepipedo");
    addNotification("Paralelepipedo\nParalelepipedo\nParalelepipedo\nParalelepipedo\nParalelepipedo\nParalelepipedo");
    addNotification("Paralelepipedo\nParalelepipedo\nParalelepipedo\nParalelepipedo\nParalelepipedo\nParalelepipedo");
    addNotification("Paralelepipedo\nParalelepipedo\nParalelepipedo\nParalelepipedo\nParalelepipedo\nParalelepipedo");
    addNotification("Paralelepipedo\nParalelepipedo\nParalelepipedo\nParalelepipedo\nParalelepipedo\nParalelepipedo");
    addNotification("Paralelepipedo\nParalelepipedo\nParalelepipedo\nParalelepipedo\nParalelepipedo\nParalelepipedo");
    addNotification("Paralelepipedo\nParalelepipedo\nParalelepipedo\nParalelepipedo\nParalelepipedo\nParalelepipedo");
    addNotification("Nova notificação 8");
    addNotification("Nova notificação 9");
    addNotification("Nova notificação 10");
  }, 3000);
});

function openUserPopup() {
  var userPopup = document.getElementById("userPopup");
  userPopup.style.display = "block";
}

function closeUserPopup() {
  var userPopup = document.getElementById("userPopup");
  userPopup.style.display = "none";
}


document.addEventListener("DOMContentLoaded", function () {
  var closeButton = document.querySelector("#userPopup .close-button");
  closeButton.addEventListener("click", closePopup);
});

function showCustomPopup(text, event) {
  var popup = document.createElement("div");
  popup.classList.add("custom-popup");
  popup.textContent = text;
  document.body.appendChild(popup);
  positionPopup();

  function positionPopup() {
    var icon = event.target;
    var iconRect = icon.getBoundingClientRect();
    var popupRect = popup.getBoundingClientRect();
    var popupLeft = iconRect.left + iconRect.width + 10;
    var popupTop = iconRect.top + (iconRect.height - popupRect.height) / 2;
    popup.style.left = popupLeft + "px";
    popup.style.top = popupTop + "px";
  }
}

function hideCustomPopup() {
  var popup = document.querySelector(".custom-popup");
  if (popup) {
    document.body.removeChild(popup);
  }
}

function toggleNavigation() {
  var icons = document.querySelectorAll(".sidebar-item:not(.bar)");
  icons.forEach(function (icon) {
    icon.classList.toggle("hide");
  });
  var homeIcon = document.querySelector(".home");
  homeIcon.classList.toggle("clicked");
}


function closeAreaPopup() {
  var overlay = document.querySelector('.area-overlay');
  var popups = document.querySelectorAll('.area-popup');

  overlay.style.display = 'none';
  popups.forEach(function (popup) {
    popup.style.display = 'none';
  });
}

;

function Abrir() {
  let abrir = document.querySelector('.bolinha');
  abrir.addEventListener('click', function () {

    let popizinho = document.querySelector('#popup1');
    popizinho.style.display = 'block';
    let span11 = document.querySelector('.a1');
    let span22 = document.querySelector('.a2');
    let span33 = document.querySelector('.a3');

    let span1 = '';
    let span2 = '';
    let span3 = '';



    span1 += `${Dados[0].quant_pacientes}`
    span2 += `${Dados[0].quant_enfermeiros}`
    span3 += `${Dados[0].quant_necessaria}`


    span11.innerHTML = span1;
    span22.innerHTML = span2;
    span33.innerHTML = span3;
  })
}

function Abrir1() {
  let abrir = document.querySelector('.bolinha1');
  abrir.addEventListener('click', function () {
    let popizinho = document.querySelector('#popup2');
    popizinho.style.display = 'block';

    let span11 = document.querySelector('.a4');
    let span22 = document.querySelector('.a5');
    let span33 = document.querySelector('.a6');

    let span1 = '';
    let span2 = '';
    let span3 = '';



    span1 += `${Dados[1].quant_pacientes}`
    span2 += `${Dados[1].quant_enfermeiros}`
    span3 += `${Dados[1].quant_necessaria}`


    span11.innerHTML = span1;
    span22.innerHTML = span2;
    span33.innerHTML = span3;
  })
}

function Abrir2() {
  let abrir = document.querySelector('.bolinha2');
  abrir.addEventListener('click', function () {
    let popizinho = document.querySelector('#popup3');
    popizinho.style.display = 'block';

    let span11 = document.querySelector('.a7');
    let span22 = document.querySelector('.a8');
    let span33 = document.querySelector('.a9');

    let span1 = '';
    let span2 = '';
    let span3 = '';



    span1 += `${Dados[2].quant_pacientes}`
    span2 += `${Dados[2].quant_enfermeiros}`
    span3 += `${Dados[2].quant_necessaria}`


    span11.innerHTML = span1;
    span22.innerHTML = span2;
    span33.innerHTML = span3;
  })
}

function Abrir3() {
  let abrir = document.querySelector('.bolinha3');
  abrir.addEventListener('click', function () {
    let popizinho = document.querySelector('#popup4');
    popizinho.style.display = 'block';
    let span11 = document.querySelector('.a10');
    let span22 = document.querySelector('.a11');
    let span33 = document.querySelector('.a12');

    let span1 = '';
    let span2 = '';
    let span3 = '';



    span1 += `${Dados[3].quant_pacientes}`
    span2 += `${Dados[3].quant_enfermeiros}`
    span3 += `${Dados[3].quant_necessaria}`


    span11.innerHTML = span1;
    span22.innerHTML = span2;
    span33.innerHTML = span3;
  })
}

function Abrir4() {
  let abrir = document.querySelector('.bolinha4');
  abrir.addEventListener('click', function () {
    let popizinho = document.querySelector('#popup5');
    popizinho.style.display = 'block';
    let span11 = document.querySelector('.a13');
    let span22 = document.querySelector('.a14');
    let span33 = document.querySelector('.a15');

    let span1 = '';
    let span2 = '';
    let span3 = '';



    span1 += `${Dados[4].quant_pacientes}`
    span2 += `${Dados[4].quant_enfermeiros}`
    span3 += `${Dados[4].quant_necessaria}`


    span11.innerHTML = span1;
    span22.innerHTML = span2;
    span33.innerHTML = span3;
  })
}

function Abrir5() {
  let abrir = document.querySelector('.bolinha5');
  let span22 = document.querySelector('.a17');

  abrir.addEventListener('click', function () {
    let popizinho = document.querySelector('#popup6');
    popizinho.style.display = 'block';
    let span11 = document.querySelector('.a16');
    let span33 = document.querySelector('.a18');

    let span1 = `${Dados[5].quant_pacientes}`;
    let span2 = `${Dados[5].quant_enfermeiros}`;
    let span3 = `${Dados[5].quant_necessaria}`;

    span11.innerHTML = span1;
    span22.innerHTML = span2;
    span33.innerHTML = span3;

    let diff = parseInt(span2) - parseInt(span3);

    if (diff <= 5 && diff >= -5) {
      abrir.classList.add('verde');
      abrir.classList.remove('vermelho');
      abrir.classList.remove('amarelo');
    } else if (diff < -5) {
      abrir.classList.add('vermelho');
      abrir.classList.remove('verde');
      abrir.classList.remove('amarelo');
    } else if (diff > 5) {
      abrir.classList.add('amarelo');
      abrir.classList.remove('verde');
      abrir.classList.remove('vermelho');
    }
  });
}
