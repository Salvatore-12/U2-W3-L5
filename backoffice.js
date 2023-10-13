const addressBarContent = new URLSearchParams(location.search)
const eventId = addressBarContent.get('eventId')
console.log(eventId) // può essere una stringa, nel caso il parametro ci sia, oppure può essere null

// SE e solo SE siamo in modalità modifica, ovvero se eventId è una stringa (e non è null), facciamo una fetch
// aggiuntiva per prelevare i dettagli dell'evento, in modo da ripopolare il form!

if (eventId) {
  // se siamo in modalità modifica...
  fetch( "https://striveschool-api.herokuapp.com/api/product/", {
  headers: {
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI4Zjg2YjEzOWM0MzAwMTg4MTQ1NzIiLCJpYXQiOjE2OTcxODM4NTIsImV4cCI6MTY5ODM5MzQ1Mn0.SkMq7B8miLoO2GLE21MQ_MLGHHFhakNPXRHq_1NvYEc"
  }
  }+ eventId)
    .then((res) => {
      if (res.ok) {
        // la response è ok! estraiamo i dettagli
        return res.json()
      } else {
        throw new Error('ERRORE NEL RECUPERO DETTAGLIO')
      }
    })
    .then((eventDetails) => {
      // luce verde! abbiamo ottenuto i dettagli
      // dobbiamo ora ripopolare il form!
      const nameInput = document.getElementById('name')
      const descriptionInput = document.getElementById('description')
      const brandInput = document.getElementById('brand')
      const imageUrlInput = document.getElementById('imageUrl')
      const priceInput = document.getElementById('price')
     

      // li ripopolo con i dettagli di eventDetails
      nameInput.value = eventDetails.name
      descriptionInput.value = eventDetails.description
      priceInput.value = eventDetails.price
      brandInput.value=eventDetails.brand
      imageUrlInput.value=eventDetails.imageUrl
    })
    .catch((err) => {
      console.log('errore', err)
    })
}


// dobbiamo recuperare i dati dal form, impacchettarli, e spedirli alla API tramite una fetch con metodo POST

// prendiamo un riferimento al form, e lavoriamo con il suo submit
const formReference = document.getElementById('form')
formReference.addEventListener('submit', function (e) {
  e.preventDefault() // fermiamo il comportamento di default
  console.log("invio i dati all'API")

  // dobbiamo ora recuperare i valori individuali degli input
  const nameInput = document.getElementById('name')
  const descriptionInput = document.getElementById('description')
  const brandInput = document.getElementById('brand')
  const imageUrlInput = document.getElementById('imageUrl')
  const priceInput = document.getElementById('price')
 

  // ora mi basterà leggere le loro proprietà "value" per ottenere i valori correnti del form

  const newEvent = {
    name: nameInput.value,
    description: descriptionInput.value,
    brand:brandInput.value,
    imageUrl:imageUrlInput.value,
    price: priceInput.value,
    
  }

  console.log("Ecco l'oggetto che manderò alle API", newEvent)

  let methodToUse = 'POST'
  if (eventId) {
    methodToUse = 'PUT'
  }

  // la POST va sempre fatta sull'indirizzo GENERICO
  // una PUT va sempre fatta su un INDIRIZZO SPECIFICO, COMPLETO DI ID

  let urlToUse = "https://striveschool-api.herokuapp.com/api/product"
  if (eventId) {
    urlToUse ="https://striveschool-api.herokuapp.com/api/put-your-endpoint-here/"
  + eventId
  }

  fetch(urlToUse, {
    method: methodToUse, // dichiaro che questa chiamata non è una GET, ma una POST (o una PUT!)
    body: JSON.stringify(newEvent), // invio il mio evento alle API, ma devo prima trasformarlo in stringa!
    headers: {
      // headers è un oggetto in cui inseriamo le nostre "meta-informazioni"
      'Content-Type': 'application/json',
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI4Zjg2YjEzOWM0MzAwMTg4MTQ1NzIiLCJpYXQiOjE2OTcxODM4NTIsImV4cCI6MTY5ODM5MzQ1Mn0.SkMq7B8miLoO2GLE21MQ_MLGHHFhakNPXRHq_1NvYEc" // informiamo l'API che anche se il nostro body sta arrivando sotto forma
      // di stringa, in origine era un oggetto! e che quindi va ri-parsato a destinazione
    },
  })
    .then((res) => {
      console.log('OGGETTO RESPONSE DELLA NOSTRA CHIAMATA POST', res)
      if (res.ok) {
        // la nostra chiamata POST è andata a buon fine, e l'evento è stato salvato!
        alert('EVENTO SALVATO CORRETTAMENTE!')
      } else {
        // la nostra chiamata POST NON è andata a buon fine, e c'è stato un errore!
        // esplora il tab "Network" per capire cosa è andato storto
        alert("ERRORE NEL SALVATAGGIO DELL'EVENTO")
        throw new Error('Errore nella POST')
      }
    })
    .catch((err) => {
      console.log('Si è verificato un errore:', err)
    })
})