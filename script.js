const apiKey = "AmAf8IczehTGLZEcHlAJrECstMGXhgv5";
const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&countryCode=US&segmentId=KZFzniwnSyZfZ7v7nn&size=20&page=0`

//////////////////////////////////////////////////////////////// виводить усі данні!!

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

////////////////////////////////////////////////////////////////////

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
