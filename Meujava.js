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

    currentPageNotifications.forEach(function(notification) {
      var li = document.createElement("li");
      var closeButton = document.createElement("span");
      closeButton.classList.add("close-button");
      closeButton.textContent = "×";
      closeButton.onclick = function() {
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
    pageButton.onclick = function() {
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
  var unreadCount = notifications.filter(function(notification) {
    return !notification.read;
  }).length;

  notificationBadge.textContent = unreadCount;
  notificationBadge.style.display = unreadCount > 0 ? "block" : "none";
}

document.addEventListener("DOMContentLoaded", function() {
  var notificationBadge = document.getElementById("notificationBadge");
  var notificationPopup = document.getElementById("notificationPopup");
  var notificationList = document.getElementById("notificationList");

  // Recupera as notificações do LocalStorage
  if (localStorage.getItem("notifications")) {
    notifications = JSON.parse(localStorage.getItem("notifications"));
  }

  updateNotificationBadge();

  setTimeout(function() {
    addNotification("Paralelepipedo\nParalelepipedo\nParalelepipedo\nParalelepipedo\nParalelepipedo\nParalelepipedo");
    addNotification("Nova notificação 2");
    addNotification("Nova notificação 3");
    addNotification("Nova notificação 4");
    addNotification("Nova notificação 5");
    addNotification("Nova notificação 6");
    addNotification("Nova notificação 7");
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

  
  document.addEventListener("DOMContentLoaded", function() {
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
  
  
document.addEventListener('DOMContentLoaded', function() {
  // Dados dos retângulos
    var rectangles = [
        {
            title: 'Financeiro',
            description: 'Informações financeiras',
            link: 'arthur/financias.html',
            image: 'https://conube.com.br/blog/wp-content/uploads/2017/07/Gerenciar-o-setor-financeiro-da-empresa-com-sucesso.jpg'
        },
        {
            title: 'Entrada de dados - Enfermeiros',
            description: 'Entrada de dados dos enfermeiros.',
            link: 'matheus/cadastrodados.html',
            image: 'https://fasig.com.br/wp-content/uploads/2019/03/FASIG_MARCO_TESTEIRA_BLOG_QUALIDADE_VIDA_2560x1343.png'
        },
        {
            title: 'Entrada de Dados - Pacientes',
            description: 'Entrada de dados dos pacientes',
            link: 'davisad/Sprint 2/pacientes.html',
            image: 'https://thumbs.dreamstime.com/z/ilustra%C3%A7%C3%A3o-paciente-do-vetor-cart%C3%A3o-original-de-papel-liso-informe-m%C3%A9dico-dos-desenhos-animados-com-informa%C3%A7%C3%A3o-da-sa%C3%BAde-100645046.jpg'
        },
        {
            title: 'Info- Enfermeiros',
            description: 'Informações dos enfermeiros',
            link: 'ana/sprint2/ana1.html',
            image: 'https://vivomeunegocio.com.br/vivo-b2b/wp-content/uploads/2020/05/08130207/tecnologia-na-enfermagem.jpg'
        },
        {
            title: 'Info-Pacientes',
            description: 'Comparação de dados totais',
            link: 'ana/sprint3/ana1.html',
            image: 'https://blog.medcloud.com.br/wp-content/uploads/2020/01/telefono-inteligente-aplicacion-servicios-medicos_24877-51676-626x508.jpg'
        },
        {
            title: 'A contratar',
            description: 'Área de contratação',
            link: 'arthur/contratacao.html',
            image: 'https://blog.me.com.br/wp-content/uploads/2020/03/4379-scaled-e1585676622446.jpg'
        },
        {
          title: 'Espaços',
          description: 'Áreas do hospital',
          link: '/Filipe Sprint 3/espacos.html',
          image: 'https://static.vecteezy.com/ti/vetor-gratis/p1/3685591-exame-para-virus-cor-plana-ilustracao-clinica-diagnostico-tirando-amostras-pacientes-e-medicos-2d-cartoon-personagens-com-espaco-hospital-espaco-azul-interior-sobre-fundo-vetor.jpg'
        }
    ];



// Função para criar os retângulos
function createRectangles() {
  var container = document.getElementById('dynamicCount');

  rectangles.forEach(function (rectangle) {
    var link = document.createElement('a');
    link.href = rectangle.link;
    link.className = 'vai';
    link.style.backgroundImage = 'url(' + rectangle.image + ')';

    var title = document.createElement('h1');
    title.textContent = rectangle.title;

    var description = document.createElement('p');
    description.textContent = rectangle.description;

    var arrow = document.createElement('span');
    arrow.innerHTML = '&#8250;';

    link.appendChild(title);
    link.appendChild(description);
    link.appendChild(arrow);

    container.appendChild(link);
  });
}

// Chamada da função para criar os retângulos
createRectangles();



});