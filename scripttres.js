fetch("./data.json")
.then(respuesta => respuesta.json())
.then(habitaciones => {

// ------------------------------------ LOGICA PRINCIPAL

function estimado(noches, personas, precioHab) { 
    let personaExtra = 250;
    let costoExtra = 0;
    let extraQty = 0;
    let precioNoches = 0;
    precioNoches = noches * precioHab;

    if (personas > 1 && personas < 5 ) {
        extraQty = personas - 1;
        costoExtra = (personaExtra * extraQty) * noches;
    }

    let precioEstimado = precioNoches + costoExtra;
    return precioEstimado;
}

// ------------------------------------ CARRITO

function miPrograma(seleccion)
let contenedorSeleccion = document.getElementById("contenedorHabitaciones")
let carrito = document.getElementById("carrito")
let arrayCarrito = [] 

renderizarHabitaciones(habitaciones)

// ------------------------------------ CARDS

function renderizarHabitaciones(arrayHabitaciones) {
    contenedorHabitaciones.innerHTML = ''
    for (const habitacion of arrayHabitaciones) {
        let tarjetaHabitacion = document.createElement("div")
        tarjetaHabitacion.className = "container";

        tarjetaHabitacion.innerHTML = `
        <div class="card">

        <img class="card-img" src=${habitacion.imgUrl}>
        <h4 class="card-title pt-2">${habitacion.tipo}</h4>
        <p class="card-text">Amenidades: ${habitacion.amenidades}</p>
        <p class="card-text">Capacidad: ${habitacion.capacidad} persona(s)</p>
        <h6 class="card-subtitle pb-2">${"$" + habitacion.precio + " MXN"}</h6>
        <button type="button" class="btn btn-danger bg-gradient justify-content-center" id=${habitacion.id}>Seleccionar</button>
        
        </div>
        `
        contenedorHabitaciones.append(tarjetaHabitacion)

        let boton = document.getElementById(habitacion.id)
        boton.addEventListener("click", tipoHabitacion)
        boton.tipoHabitacion = habitacion.tipo;
    }
}


// ------------------------------------

let precioHabitacion = 0;

function tipoHabitacion(event) {
  precioHabitacion = habitaciones.find(habitacion => habitacion.tipo === event.currentTarget.tipoHabitacion).precio
  
  if (tipoHabitacion) {
    qtyNoches();
  }
}

// ------------------------------------

let cantidadNoches = 0;
async function qtyNoches() { // Cuantas noches
    const ipAPI = '//api.ipify.org?format=json'

    const inputValue = fetch(ipAPI)
    .then(response => response.json())
    .then(data => data.ip)

    const { value: quantityNights } = await Swal.fire({
    title: '¿Por cuántas noches sera tu estadia?',
    input: 'text',
    showCancelButton: true,
    inputValidator: (value) => {
        if (!value) {
        return 'Necesitas escribir algo!'
        }
    }
    })

    if (quantityNights) {
      cantidadNoches = quantityNights;
      qtyPersonas();
    }
}

// ------------------------------------

let cantidadPersonas = 0;
async function qtyPersonas() { // Cuantas noches
  const ipAPI = '//api.ipify.org?format=json'

  const inputValue = fetch(ipAPI)
  .then(response => response.json())
  .then(data => data.ip)

  const { value: quantityPersons } = await Swal.fire({
  title: '¿Cuantás personas se hospedan en la misma habitación?',
  input: 'text',
  showCancelButton: true,
  inputValidator: (value) => {
      if (!value) {
      return 'Necesitas escribir algo!'
      }
  }
  })

  if (quantityPersons) {
    cantidadPersonas = quantityPersons;
    totalEstimado();
  }
}

// ------------------------------------ TOTAL

function totalEstimado() { 
  let precioEstimado = estimado(cantidadNoches, cantidadPersonas, precioHabitacion);

    Swal.fire({
        title: 'Tu precio estimado es de:',
        text: '$ ' + precioEstimado + 'MXN' ,
        icon: 'success',
        confirmButtonText: 'Cool'
      })
}

// ------------------------------------

function agregarAlCarrito(e) {
  let habitacionBuscado = habitacion.find(habitacion => habitacion.id == e.target.id)
  let posicionHabitacion = arrayCarrito.findIndex(habitacion => habitacion.id == e.target.id)

  if (posicionHabitacion != -1) {
    arrayCarrito[posicionHabitacion] = {
      id: arrayCarrito[posicionHabitacion].id, 
      tipo: arrayCarrito[posicionHabitacion].tipo, 
      precio: arrayCarrito[posicionHabitacion].precio
    }
  } else {
    arrayCarrito.push({
      id: productoBuscado.id, 
      nombre: productoBuscado.tipo, 
      precio: productoBuscado.precio
    })
  }

  renderizarCarrito()
}

// ------------------------------------

function renderizarCarrito() {
  carrito.innerHTML = ""
  for (const itemCarrito of arrayCarrito) {
    carrito.innerHTML += `
  <div class="itemCarrito">
  <h4>${itemCarrito.tipo}</h4>
  <h4>${itemCarrito.precio}</h4>
  </div>
  `
  }
}

// ------------------------------------

}) // FETCH


 
//let precioEstimado = estimado(qtyNoches, qtyPersonas, precioHabitacion);
