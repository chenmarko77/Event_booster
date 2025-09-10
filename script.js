//////////////////////////////////////////////////////////////////// api

let number = 0;
const apiKey = "AmAf8IczehTGLZEcHlAJrECstMGXhgv5";

function showCards() {
  const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&segmentId=KZFzniwnSyZfZ7v7nJ&size=20&page=${number}&sort=date,asc`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data._embedded && data._embedded.events) {
        const events = data._embedded.events.map((event) => ({
          url: event.images[0].url || "",
          name: event.name,
          date: event.dates.start.localDate,
          position: event.dates.timezone,
          time: event.dates.start.localTime,
          link: event.url,
        }));
        const source = document.getElementById("film-template").innerHTML;
        const template = Handlebars.compile(source);

        const context = { items: events };
        const html = template(context);
        document.getElementById("film-container").innerHTML = html;
      } else {
        console.log("Подій не знайдено");
      }
    })
    .catch((error) => console.error("Помилка запиту:", error));

  // ////////////////////////////////////////////////////////////// виводить усі данні!!

  // fetch(url)
  // .then(response => response.json())
  // .then(data => {
  //     if (data._embedded && data._embedded.events) {
  //         const events = data._embedded.events;
  //         events.forEach(event => {
  //             console.log(event); ////////////////// виводить усі данні!!
  //         });
  //     } else {
  //         console.log("Подій не знайдено");
  //     }
  //  })
  // .catch(error => console.error("Помилка запиту:", error));

  // ////////////////////////////////////////////////////////////////// end
}

showCards();

//////////////////////////////////////////////////////////////////// end

////////////////////////////////////////////////// pagination

const btnNext = document.querySelector(".btn-next");
const btnsBack = document.querySelectorAll(".btn-back");
const container1 = document.querySelector(".container1");
const container2 = document.querySelector(".container2");
const container3 = document.querySelector(".container3");
const btns = document.querySelectorAll(".btn");
const btnTest = document.querySelector(".btnTest");
const btnEnd = document.querySelector(".btnEnd");
const btnStart = document.querySelector(".btnStart");

btnNext.addEventListener("click", () => {
  number = btnNext.textContent - 1;
  let test1 =
    number >= 1
      ? (container2.style.display = "flex")
      : (container2.style.display = "none");
  if (number === 1) {
    btnNext.textContent = 3;
  }
  if (number >= 2) {
    btns.forEach((btn) => {
      btn.textContent = parseInt(btn.textContent) + 1;
    });
  }
  let test2 =
    number >= 49
      ? (btnNext.style.display = "none")
      : (btnNext.style.display = "flex");
  if (number >= 0) {
    btnsBack.forEach((btnBack) => {
      btnBack.classList.replace("btnStyle", "btnRest");
    });
  } else {
    btnsBack.forEach((btnBack) => {
      btnBack.classList.replace("btnRest", "btnStyle");
    });
  }
  let test4 =
    number >= 3
      ? (container1.style.display = "flex")
      : (container1.style.display = "none");
  let test5 =
    number >= 48
      ? (container3.style.display = "none")
      : (container3.style.display = "flex");
  showCards();
});

btnsBack.forEach((btnBack) => {
  btnBack.addEventListener("click", () => {
    if (number === 0) {
      console.log("ERROR!");
    } else {
      number = btnBack.textContent - 1;
      if (number === 0) {
        btnNext.textContent = 2;
      }
      if (number >= 1) {
        btns.forEach((btn) => {
          btn.textContent = parseInt(btn.textContent) - 1;
        });
        container2.style.display = "flex";
      } else {
        container2.style.display = "none";
      }
      let test2 =
        number <= 48
          ? (btnNext.style.display = "flex")
          : (btnNext.style.display = "none");
      let test3 =
        number <= 0
          ? btnBack.classList.replace("btnRest", "btnStyle")
          : btnBack.classList.replace("btnStyle", "btnRest");
      let test4 =
        number <= 2
          ? (container1.style.display = "none")
          : (container1.style.display = "flex");
      let test5 =
        number <= 46
          ? (container3.style.display = "flex")
          : (container3.style.display = "none");
      showCards();
    }
  });
});

btnEnd.addEventListener("click", () => {
  if (number <= 48) {
    number = 49;
    btnTest.textContent = 50;
    btnsBack.forEach((btnBack) => {
      btnBack.textContent = 49;
      let test3 =
        number <= 0
          ? btnBack.classList.replace("btnRest", "btnStyle")
          : btnBack.classList.replace("btnStyle", "btnRest");
    });
    btnNext.textContent = 51;
    console.log(number);
    let test5 =
      number >= 49
        ? (container3.style.display = "none")
        : (container3.style.display = "flex");
    let test4 =
      number >= 3
        ? (container1.style.display = "flex")
        : (container1.style.display = "none");
    let test2 =
      number <= 48
        ? (btnNext.style.display = "flex")
        : (btnNext.style.display = "none");
    let test1 =
      number >= 1
        ? (container2.style.display = "flex")
        : (container2.style.display = "none");
    showCards();
  }
});

btnStart.addEventListener("click", () => {
  if (number >= 1) {
    number = 0;
    btnsBack.forEach((btnBack) => {
      btnBack.textContent = 1;
      let test3 =
        number <= 0
          ? btnBack.classList.replace("btnRest", "btnStyle")
          : btnBack.classList.replace("btnStyle", "btnRest");
    });
    btnNext.textContent = 2;
    btnTest.textContent = 2;
    let test1 =
      number >= 1
        ? (container2.style.display = "flex")
        : (container2.style.display = "none");
    let test4 =
      number >= 3
        ? (container1.style.display = "flex")
        : (container1.style.display = "none");
    let test5 =
      number >= 49
        ? (container3.style.display = "none")
        : (container3.style.display = "flex");
    let test2 =
      number <= 48
        ? (btnNext.style.display = "flex")
        : (btnNext.style.display = "none");
    showCards();
  }
});

//////////////////////////////////////////////////////////////////// end

//////////////////////////////////////////////////////////////////// search

const searchInput = document.querySelector(
  ".header__hero__filters__search-input"
);

searchInput.addEventListener("input", function () {
  const filter = this.value.toLowerCase();
  const cards = document.querySelectorAll(".film"); // loop through the cards

  cards.forEach((card) => {
    const name = card.querySelector(".name")?.textContent.toLowerCase() || "";
    const position =
      card.querySelector(".position")?.textContent.toLowerCase() || "";

    if (name.includes(filter) || position.includes(filter)) {
      card.style.display = ""; // show
    } else {
      card.style.display = "none"; // hide
    }
  });
});

//////////////////////////////////////////////////////////////////// end

//////////////////////////////////////////////////////////////////// modal

document.addEventListener("click", (e) => {
  const film = e.target.closest(".film");

  if (film) {
    const modal = film.nextElementSibling;
    if (modal && modal.classList.contains("boxx")) {
      modal.style.display = "block";

      const closeBtn = modal.querySelector(".close");
      closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
      });
    }
  }
});
//////////////////////////////////////////////////////////////////// end



const dateInput = document.querySelector('.header__hero__filters__filter-date');

dateInput.addEventListener('change', function () {
    const selectedDate = new Date(this.value); // перетворюємо на Date
    const cards = document.querySelectorAll('.film');

    cards.forEach(card => {
        const cardDateText = card.querySelector('.date')?.textContent || "";
        const cardDate = new Date(cardDateText); // перетворюємо на Date

        // Порівнюємо тільки рік, місяць і день
        const sameDate = cardDate.getFullYear() === selectedDate.getFullYear() &&
                         cardDate.getMonth() === selectedDate.getMonth() &&
                         cardDate.getDate() === selectedDate.getDate();

        if (!this.value || sameDate) {
            card.style.display = ""; // показати
        } else {
            card.style.display = "none"; // сховати
        }
    });
});
