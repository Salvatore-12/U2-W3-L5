const renderEvents = function (arrayOfEvents) {
    // riferimento alla riga
    const row = document.getElementById('event-row')
  
    arrayOfEvents.forEach((event) => {
      // ora qua creerò una col nel DOM per ogni evento!
      const newCol = document.createElement('div')
      newCol.classList.add('col', 'col-12', 'col-sm-6', 'col-md-3')
      // <div class="col col-12 col-sm-6 col-md-3"></div>
      newCol.innerHTML = `
      <div class="card">
          <img src="${event.imageUrl}" class="card-img-top" alt="generic concert picture">
          <div class="card-body">
              <h5 class="card-title">${event.name}</h5>
              <p class="card-text">${event.description}</p>
              <p class="card-text">${event.brand}</p>
              <p>Prezzo: ${event.price}€</p>
              <a href="./detail.html?eventId=${
                event._id
              }" class="btn btn-primary">DETTAGLI</a>
          </div>
      </div>
      `
      row.appendChild(newCol)
    })
  }
  
  const hideSpinner = function () {
    // nascondo lo spinner, perchè la Promise non è più in pending
    const spinner = document.getElementById('loading-spinner')
    spinner.classList.add('d-none')
  }
  
  const getEvents = function () {
    fetch("https://striveschool-api.herokuapp.com/api/product", {
    headers: {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI4Zjg2YjEzOWM0MzAwMTg4MTQ1NzIiLCJpYXQiOjE2OTcxODM4NTIsImV4cCI6MTY5ODM5MzQ1Mn0.SkMq7B8miLoO2GLE21MQ_MLGHHFhakNPXRHq_1NvYEc"
    }
    })
      .then((res) => {
        hideSpinner()
  
        console.log('Response ottenuta dalla GET', res)
        if (res.ok) {
          // la chiamata è terminata correttamente con un 200
          return res.json()
        } else {
          throw new Error('Errore nel contattare il server')
        }
      })
      .then((events) => {
        console.log('EVENTS', events)
        // qua ora dovremmo creare delle cards per ogni evento ricevuto!
        // delego questo codice ad una funzione separata che chiamo renderEvents
        renderEvents(events)
      })
      .catch((err) => {
        hideSpinner()
        console.log('Si è verificato un errore:', err)
      })
  }
  
  getEvents()