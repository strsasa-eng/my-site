document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.dropdown-content a.video-link');
  const preview = document.getElementById('videoPreview');
  const previewVideo = document.getElementById('previewVideo');

  let hoverTimer = null;  // таймер ожидания показа
  let hideTimer  = null;  // таймер скрытия

  links.forEach(link => {
    link.addEventListener('mouseenter', () => {
      const src = link.dataset.video;
      if (!src) return;

      // запускаем таймер на 1.5 секунды
      hoverTimer = setTimeout(() => {
        const rect = link.getBoundingClientRect();

        // позиция, чтобы не вылезло за край экрана
        const leftPos = Math.min(window.scrollX + rect.right + 10, window.innerWidth - 400);
        const topPos  = window.scrollY + rect.top;

        

        previewVideo.src = src;
        previewVideo.load();
        preview.style.display = 'block';
        previewVideo.currentTime = 0;
        previewVideo.play();
      }, 1500); // ← вот задержка (в мс)
    });

    link.addEventListener('mouseleave', () => {
      // если курсор ушёл — сбрасываем таймер
      if (hoverTimer) {
        clearTimeout(hoverTimer);
        hoverTimer = null;
      }

      // ставим лёгкий таймер на скрытие — если не зайдём на превью
      hideTimer = setTimeout(() => {
        preview.style.display = 'none';
        previewVideo.pause();
      }, 100);
    });
  });

  // курсор над превью — не скрываем
  preview.addEventListener('mouseenter', () => {
    if (hideTimer) {
      clearTimeout(hideTimer);
      hideTimer = null;
    }
  });

  // ушли с превью — скрыть
  preview.addEventListener('mouseleave', () => {
    preview.style.display = 'none';
    previewVideo.pause();
  });
});
const previewBox = document.getElementById("videoPreview");
const previewVideo = document.getElementById("previewVideo");

/* НАВЕДЕНИЕ НА ▶ */
document.querySelectorAll(".video-btn").forEach(btn => {
    btn.addEventListener("mouseenter", () => {
        const src = btn.dataset.video;
        if (!src) return;

        previewVideo.src = src;
        previewBox.style.display = "block";
        previewVideo.play();
    });

    btn.addEventListener("mouseleave", () => {
        previewVideo.pause();
        previewBox.style.display = "none";
    });

    /* КЛИК ПО ▶ — открыть видео в новом окне */
    btn.addEventListener("click", e => {
        e.stopPropagation();
        const src = btn.dataset.video;
        if (!src) return;

        const win = window.open("", "_blank", "width=900,height=550");
        win.document.write(`
            <html>
            <body style="margin:0;background:black;display:flex;align-items:center;justify-content:center;height:100vh;">
                <video src="${src}" controls autoplay style="width:100%;height:100%;"></video>
            </body>
            </html>
        `);
        win.document.close();
    });
});


document.addEventListener('DOMContentLoaded', () => {

  /* 📊 ГОДОВОЙ ГРАФИК */
  const yearlyGrafikURL = "https://nestle.sharepoint.com/:x:/t/StartFabryk/IQDNfMEFxFLfTaqy4aEfixPBAYEBPPKDSx15xHeoSM121io?e=2ZBh2h";

  const container = document.getElementById('monthsContainer');
  const previewBox = document.getElementById('previewBox');
  const previewImg = document.getElementById('previewImg');

  /* ГОДОВОЙ */
  const yearlyItem = document.createElement('div');
  yearlyItem.className = 'graph-item';
  yearlyItem.textContent = '📊 Grafik roczny';
  yearlyItem.onclick = () => window.open(yearlyGrafikURL, '_blank');
  container.appendChild(yearlyItem);

  const hr = document.createElement('div');
  hr.style.height = '1px';
  hr.style.margin = '6px 10px';
  hr.style.background = 'rgba(0,0,0,0.15)';
  container.appendChild(hr);

  const year = 2026;

  const basePath = "https://nestle.sharepoint.com/teams/StartFabryk/Shared%20Documents/Kalendarz";

  const monthsPL = [
    'Styczeń','Luty','Marzec','Kwiecień','Maj','Czerwiec',
    'Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień'
  ];

  const graphTypes = [
    { key: 'liderzy', label: 'Kierownik i Liderzy' },
    { key: 'ffs-proces', label: 'FFS i Proces' },
    { key: 'multipack', label: 'Multipack' },
    { key: 'mieso', label: 'Mięso' }
  ];

  // 🔹 Динамічне створення місяців
  monthsPL.forEach((month, index) => {
    const monthNr = String(index + 1).padStart(2, '0');
    let monthVisible = false;
    const block = document.createElement('div');

    graphTypes.forEach(type => {
      // Прямий URL на файл (динамічний)
      const file = `${basePath}/${year}-${monthNr}-${type.key}.jpg?v=${Date.now()}`;

      const img = new Image();
      img.src = file;

      img.onload = () => {
        if (!monthVisible) {
          const title = document.createElement('div');
          title.className = 'month-title';
          title.textContent = `${month} ${year}`;
          block.appendChild(title);
          monthVisible = true;
        }

        const item = document.createElement('div');
        item.className = 'graph-item';
        item.textContent = `🖼️ ${type.label}`;

        // 🔹 Відкриття тільки малюнка у новій вкладці
        item.onclick = () => {
          const newTab = window.open(file, "_blank");
          newTab.focus();
        };

        item.onmouseenter = () => {
          previewImg.src = file;
          previewBox.style.display = 'block';
        };

        item.onmouseleave = () => {
          previewBox.style.display = 'none';
        };

        block.appendChild(item);
        container.appendChild(block);
      };
    });
  });

});

// 🔹 Встановлення сьогоднішнього дня
function setTodayDate() {
    const today = new Date().getDate();
    const el = document.getElementById("dayNum");

    if (el) {
        el.textContent = today.toString().padStart(2, '0');
    }
}

setTodayDate();

/* =========================================================
   INFO BLOCK – JS
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* ---------- СВОРАЧИВАНИЕ КАРТОЧЕК ---------- */
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const box = btn.closest('.info-box');
            if (!box) return;

            box.classList.toggle('collapsed');
            btn.textContent = box.classList.contains('collapsed') ? '+' : '−';
        });
    });

    /* ---------- ПОИСК В AUTOMATYCY ---------- */
    const searchInput = document.querySelector('.local-search');
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const value = searchInput.value.toLowerCase();

            document.querySelectorAll('.person').forEach(person => {
                person.style.display =
                    person.textContent.toLowerCase().includes(value)
                        ? ''
                        : 'none';
            });
        });
    }

    /* ---------- TEAMS (ЗАГОТОВКА) ---------- */
    document.querySelectorAll('.person').forEach(person => {
        person.addEventListener('click', () => {
            const name = person.dataset.name;
            if (!name) return;

            console.log('Teams click:', name);
        });
    });

});
/* ======================================================
   PDF SHAREPOINT VIEWER
   ====================================================== */

const pdfLink = "https://nestle.sharepoint.com/teams/PULS_Fabryky/Shared%20Documents/BHP_WEeak/BHP2026.pdf";

document.addEventListener("DOMContentLoaded", () => {
    const frame = document.getElementById("pdfFrame");
    if (frame) {
        frame.src = pdfLink;
    }
});

    // добавляем embed режим + анти кеш
    const embedUrl =
        pdfLink +
        "&action=embedview&v=" +
        new Date().getTime();

    frame.src = embedUrl;


});


