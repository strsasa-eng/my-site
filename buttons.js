function handleButtonClick(button) {                        /*change color after click button's*/
    var url = button.getAttribute('data-url')
    button.classList.add('clicked')

    setTimeout(function() {                                 
        button.classList.remove('clicked')
        window.open(url, '_blank')
    }, 100)                                                 /*return color after 100ms*/
}

function addLink() {
    var linkContainer = document.createElement('div');
    linkContainer.className = 'link-container';

    var linkInput = document.createElement('input');
    linkInput.type = 'text';
    linkInput.placeholder = 'Введите ссылку';

    var addButton = document.createElement('button');
    addButton.textContent = 'Добавить';
    addButton.onclick = function() {
        addLinkButton(linkInput.value);
    };

    linkContainer.appendChild(linkInput);
    linkContainer.appendChild(addButton);

    document.getElementById('container').appendChild(linkContainer);
}

function addLinkButton(link) {
    var linkButton = document.createElement('button');
    linkButton.textContent = link;

    document.getElementById('container').appendChild(linkButton);
}

function openInNewWindow(event, url) {
    event.preventDefault();  // Предотвращаем стандартное поведение
    window.open(url, '_blank', 'noopener,noreferrer');  // Открываем ссылку в новом окне
}

function openLink(event) {
    const url = event.currentTarget.getAttribute('data-url');
    if (url) {
        window.open(url, '_blank'); // открываем в новой вкладке
    }
}

document.querySelectorAll('.tooltip').forEach(button => {
    let tooltipTimeout;
    
    button.addEventListener('mouseenter', () => {
        tooltipTimeout = setTimeout(() => {
            button.classList.add('show-tooltip');
        }, 800); // задержка 3 секунды
    });
    
    button.addEventListener('mouseleave', () => {
        clearTimeout(tooltipTimeout); // очищаем таймер
        button.classList.remove('show-tooltip');
    });
});

// Функция для открытия карточки контактов
function openContactCard(event) {
    event.preventDefault();
    document.getElementById("contactCard").style.display = "block";
}

// Функция для закрытия карточки контактов
function closeContactCard() {
    document.getElementById("contactCard").style.display = "none";
}

    function openTabs() {
        let urls = [
            "http://plwroa0006/common/login/",
            "https://nestle.workplace.com/chat/t/5463452563719540",
            "https://globe7eur.nestle.com:26001/irj/portal#Shell-home",
            "https://plwrol0084.nestle.com/dmo",
            "https://web.telegram.org/k/#-4260954175",
            "https://chatgpt.com/c/67d5c614-dd84-8013-9e51-dce5e1a442df"
        ];
        urls.forEach(url => window.open(url, "_blank"));
    }
    function openTabsA() {
        let urls = [
            "http://plwroa0006/common/login/",
            "https://globe7eur.nestle.com:26001/irj/portal#Shell-home",
            "https://plwrol0084.nestle.com/dmo",
        ];
        urls.forEach(url => window.open(url, "_blank"));
    }

(function(){
  const btn   = document.getElementById('stanowiskoBtn');
  const panel = document.getElementById('stanowiskoPanel');

  function openPanel(){
    panel.hidden = false;
    // малый кадр, потом класс — чтобы сработала анимация
    requestAnimationFrame(()=> panel.classList.add('show'));
    btn.setAttribute('aria-expanded','true');
  }
  function closePanel(){
    panel.classList.remove('show');
    btn.setAttribute('aria-expanded','false');
    // дождаться анимации и спрятать из потока
    setTimeout(()=> { panel.hidden = true; }, 220);
  }

  btn.addEventListener('click', (e)=>{
    e.preventDefault();
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    expanded ? closePanel() : openPanel();
  });

  // ESC закрывает
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape' && btn.getAttribute('aria-expanded')==='true'){
      closePanel();
      btn.focus();
    }
  });
})();