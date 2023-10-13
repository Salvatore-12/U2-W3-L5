const addressBarContent = new URLSearchParams(location.search)
// questo crea un oggetto di tipo URLSearchParams a partire dal contenuto della barra degli indirizzi
// recupero nello specifico eventId
const eventId = addressBarContent.get('eventId') // <-- recupero solamente il valore di eventId
console.log(eventId)

// ora facciamo una fetch molto specifica per ottenere i dettagli dell'evento su cui ho cliccato
// utilizzerò l'indirizzo "standard", /agenda, e ci concatenerò l'id che ho prelevato dal parametro nella barra degli indirizzi

const deleteEvent = function () {
  // questa funzione servirà ad eliminare l'evento corrente
  fetch( "https://striveschool-api.herokuapp.com/api/put-your-endpoint-here/", {
  headers: {
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI4Zjg2YjEzOWM0MzAwMTg4MTQ1NzIiLCJpYXQiOjE2OTcxODM4NTIsImV4cCI6MTY5ODM5MzQ1Mn0.SkMq7B8miLoO2GLE21MQ_MLGHHFhakNPXRHq_1NvYEc"
  }
  } + eventId, {
    method: 'DELETE',
  })
    .then((res) => {
      if (res.ok) {
        // EVENTO ELIMINATO CORRETTAMENTE!
        alert('EVENTO ELIMINATO')
        location.assign('./index.html') // facciamo tornare l'utente in homepage
      } else {
        alert("Problema con l'eliminazione dell'evento")
        throw new Error('Errore nella DELETE')
      }
    })
    .catch((err) => {
      console.log('ERRORE!', err)
    })
}

const generateEventDetails = function (details) {
  // prendo un riferimento alla row
  const row = document.getElementById('event-detail')
  row.innerHTML = `
        <div class="col col-12 col-lg-6">
            <h2 class="text-center">DETTAGLI DELL'EVENTO</h2>
            <img
              src="${details.imageUrl}"
              class="w-100"
              alt="generic concert picture"
            />
            <h3 class="text-center mt-4">${details.name}</h3>
            <p>
              ${details.description}
            </p>
            <p>${details.brand}</p>
          
            
            <p>Prezzo: ${details.price}€</p>
            <button class="btn btn-danger" onclick="deleteEvent()">ELIMINA</button>
            <a class="btn btn-warning" href="backoffice.html?eventId=${
              details._id
            }">MODIFICA</a>
        </div>
    `
}


const getSingleEventDetails = function () {
  fetch( "https://striveschool-api.herokuapp.com/api/product/", {
  headers: {
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI4Zjg2YjEzOWM0MzAwMTg4MTQ1NzIiLCJpYXQiOjE2OTcxODM4NTIsImV4cCI6MTY5ODM5MzQ1Mn0.SkMq7B8miLoO2GLE21MQ_MLGHHFhakNPXRHq_1NvYEc"
  }
  } + eventId)
    .then((res) => {
      if (res.ok) {
        // abbiamo ottenuto i dettagli del singolo evento su cui abbiamo cliccato
        // recuperiamo il suo JSON
        return res.json()
      } else {
        throw new Error('Errore nel caricamento dei dettagli')
      }
    })
    .then((eventData) => {
      // eventData è UN OGGETTO! sono i singoli dettagli dell'evento, il suo name, il suo price, etc.
      generateEventDetails(eventData)
    })
    .catch((err) => console.log('ERRORE', err))
}

getSingleEventDetails()