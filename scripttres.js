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

const habitaciones = [ 
    { id: 1, tipo: "Plus", precio: 1250, tamano: "30m2", amenidades: "A/C, Wifi, Toiletries, WC Privado", imgUrl: "./imagenes/plus.jpg"},  // Esto es un objeto
    { id: 2, tipo: "Estandar", precio: 1100, tamano: "25m2", amenidades: "A/C, Wifi, Toiletries, WC Privado", imgUrl: "./imagenes/estandar.jpg"},
    { id: 3, tipo: "Micro", precio: 900, tamano: "15m2", amenidades: "A/C, Wifi, Toiletries, WC Compartido", imgUrl: "./imagenes/micro.jpg"},
    { id: 4, tipo: "Cabina", precio: 500, tamano: "5m2", amenidades: "A/C, Wifi, WC Compartido", imgUrl: "./imagenes/cabina.jpg"}
]

let contenedorHabitaciones = document.getElementById("contenedorHabitaciones")
let seleccion = document.getElementById("Habitacion Seleccionada")
let arrayHabitaciones = [ ]

renderizarHabitaciones(habitaciones)

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

let precioHabitacion = 0;

function tipoHabitacion(event) {
  precioHabitacion = habitaciones.find(habitacion => habitacion.tipo === event.currentTarget.tipoHabitacion).precio
  
  if (tipoHabitacion) {
    qtyNoches();

  }
}

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

function totalEstimado() { // resultado final de la cotizacion
  let precioEstimado = estimado(cantidadNoches, cantidadPersonas, precioHabitacion);


    Swal.fire({
        title: 'Tu precio estimado es de:',
        text: '$ ' + precioEstimado + 'MXN' ,
        icon: 'success',
        confirmButtonText: 'Cool'
      })
    
}

// ------------------------------------
 
//let precioEstimado = estimado(qtyNoches, qtyPersonas, precioHabitacion);
