let number = 0
const apiKey = "AmAf8IczehTGLZEcHlAJrECstMGXhgv5";

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

// //////////////////////////////////////////////////////////////////
function showCards(){
    const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&countryCode=US&segmentId=KZFzniwnSyZfZ7v7nn&size=20&page=${number}`
fetch(url)
.then(response => response.json())
.then(data => {
    if (data._embedded && data._embedded.events) {
        const events = data._embedded.events.map(event => ({
            url: event.images[0].url || '',
            name: event.name,
            date: event.dates.start.localDate,
            position: event.dates.timezone
        }));
        const source = document.getElementById('film-template').innerHTML;
        const template = Handlebars.compile(source);

        const context = { items: events };
        const html = template(context);
        document.getElementById('film-container').innerHTML = html;
    } else {
        console.log("Подій не знайдено");
    }
 })
.catch(error => console.error("Помилка запиту:", error));
}

showCards()


const btnBack = document.querySelector(".btn-back");
const btnNext = document.querySelector(".btn-next");
const text = document.querySelector(".text");

btnNext.addEventListener("click", ()=> {
    number++
    text.textContent = number
    showCards()
})


btnBack.addEventListener("click", ()=> {
    number--
    text.textContent = number
    showCards()
})

////////////////////////////////////////////////////////////////////

const searchInput = document.querySelector('.header__hero__filters__search-input');

searchInput.addEventListener('input', function () {
  const filter = this.value.toLowerCase();
  const cards = document.querySelectorAll('.film'); // loop through the cards

  cards.forEach(card => {
    const name = card.querySelector('.name')?.textContent.toLowerCase() || "";
    const position = card.querySelector('.position')?.textContent.toLowerCase() || "";

    if (name.includes(filter) || position.includes(filter)) {
      card.style.display = ""; // show
    } else {
      card.style.display = "none"; // hide
    }
  });
});
