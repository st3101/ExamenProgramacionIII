// ---------------------------- Primer Ejercicios ---------------------------- //

//variable global
let arrayProductos = [];
let arrayCarrito = [];

//Cree un funcion que retorne un array de productos con los datos proporcionados y cree el precio de los productos.
function harcodearProductos() {
    return [
        { id: 1, nombre: "arandanos", precio: 1200, imagen: "./img/arandano.jpg" },
        { id: 2, nombre: "banana", precio: 1100, imagen: "./img/banana.jpg" },
        { id: 3, nombre: "frambuesa", precio: 1300, imagen: "./img/frambuesa.png" },
        { id: 4, nombre: "frutilla", precio: 1350, imagen: "./img/frutilla.jpg" },
        { id: 5, nombre: "kiwi", precio: 1400, imagen: "./img/kiwi.jpg" },
        { id: 6, nombre: "mandarina", precio: 1500, imagen: "./img/mandarina.jpg" },
        { id: 7, nombre: "manzana", precio: 900, imagen: "./img/manzana.jpg" },
        { id: 8, nombre: "naranja", precio: 1000, imagen: "./img/naranja.jpg" },
        { id: 9, nombre: "pera", precio: 1100, imagen: "./img/pera.jpg" },
        { id: 10, nombre: "anana", precio: 1300, imagen: "./img/anana.jpg" },
        { id: 11, nombre: "pomelo-amarillo", precio: 1700, imagen: "./img/pomelo-amarillo.jpg" },
        { id: 12, nombre: "pomelo-rojo", precio: 2000, imagen: "./img/pomelo-rojo.jpg" },
        { id: 13, nombre: "sandia", precio: 2000, imagen: "./img/sandia.jpg" },
    ];
}


// ---------------------------- Segundo Ejercicios ---------------------------- //
// Cree un obbjeto de alumno con mis datos
alumno = {
    dni: 42396337,
    nombre: "Santiago",
    apellido: "Leonardi"
};

// inserta en el html mi nombre y apellido y tambien lo imprime por consola
function imprimirDatosAlumno() {
    htmlIner = `<nav>${alumno.nombre}  ${alumno.apellido}</nav>`;
    console.log(`${alumno.nombre}  ${alumno.apellido}`)
    document.getElementById("nombreAlumno").innerHTML = htmlIner;
}

// ---------------------------- Tercer Ejercicios ---------------------------- //

// Cree una funcion que reciba un array de productos y un id de html y muestre los productos en el html, recorriendo la lista de elementos y mostrando uno por uno sus datos 
// Utilizando el html indicado en la consigna, 

//Agregue un boton a cada a producto llamando a la funcion "agregarAlCarrito" pasandole el id
function mostrarProductos(array, idHTML) {
    let htmlProductos = "";
    for (let i = 0; i < array.length; i++) {
        htmlProductos += `<div class="card-producto" >
                    <img src="${array[i].imagen}" alt="">
                    <h3>${array[i].nombre}</h3>
                    <p>$${array[i].precio}</p> 
                    <button class="btn-producto" onclick=agregarAlCarrito(${array[i].id}) >Agregar al carrito</button>
                    </div>`;
    }
    document.getElementById(idHTML).innerHTML = htmlProductos;
}

// ---------------------------- Cuarto Ejercicios ---------------------------- //

// Cree una funcion que reciba un array de productos y un id de html y muestre los productos en el html, escuchando el evento keyup, trayendo los valores de 
// buscador y transforamndolos a minusculas creando un nuevo array, filtrador por el nombre del elementos y llamando la funcion "mostrarProductos" previamente creada.
function filtrarPorNombre(array, textBox) {
    textBox.addEventListener("keyup", function () {
        let texto = textBox.value.toLowerCase();
        let productosFiltrados = array.filter(producto => producto.nombre.toLowerCase().includes(texto));
        mostrarProductos(productosFiltrados, "contenedor-productos");
    });
}

// ---------------------------- Quinto Ejercicio ---------------------------- //

// Cree el arrayCarrito como variable global 

// Funcion que recorre  el array un producto con el mismo id y lo retorna
function buscarProductoPorId(array, id) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].id == id) {
            return array[i];
        }
    }
}

// Funcion que reccorre el array y y retorna el index del producto con el mismo id
function buscarProductoPorIdIndex(array, id) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].id == id) {
            return i;
        }
    }
}

// Funcion que recorre el arrayCarrito y muuestra los productos en html, con un boton eliminar y con la llamada a la funcion "eliminarProducto" pasandole el id del producto
function mostrarCarrito(array, idHTML) {
    let htmlProductos = "";
    for (let i = 0; i < array.length; i++) {
        htmlProductos += `<li class="bloque-item">
                        <p class="nombre-item">${array[i].nombre} - ${array[i].precio}</p>
                        <button class="boton-eliminar" onclick=eliminarProducto(${array[i].id})>Eliminar</button>
                    </li>`;
    }
    document.getElementById(idHTML).innerHTML = htmlProductos;
}


// Funcion que recibe un id y busca el producto y lo elimina del arrayCarrito y emprime de nuevo el carrito
function eliminarProducto(id) {

    let indexBorrar = buscarProductoPorIdIndex(arrayCarrito, id);

    if (indexBorrar >= 0 && indexBorrar != null) {
        arrayCarrito.splice(indexBorrar, 1);
        actualizarCarrito()
        //mostrarCarrito(arrayCarrito, "items-carrito");
    }
}

// Agrega un producto al carrito y lo muestra en la consola y en el html
function agregarAlCarrito(id) {
    arrayCarrito.push(buscarProductoPorId(arrayProductos, id));
    console.table(arrayCarrito);
    actualizarCarrito();
}


// ---------------------------- Sexto Ejercicio ---------------------------- //

// Guarda el array con el nombre indicado en el localStorage y lo convirtiendolo a string
function guardarLocalStorage(nombre, array) {
    localStorage.setItem(nombre, JSON.stringify(array));
}

// Carga el array con el nombre indicado y actualiza el carrito
function cargarLocalStorage(nombre) {
    if (localStorage.getItem(nombre)) {
        arrayCarrito = JSON.parse(localStorage.getItem("Carrito"));
        actualizarCarrito();
    }
}

// Funcion que actualiza todo lo relacionado al carrito a travez de funciones ya creadas
function actualizarCarrito() {
    mostrarCarrito(arrayCarrito, "items-carrito")
    guardarLocalStorage("Carrito", arrayCarrito);
    actualizarContadorCarrito()
    actualizaPrecioTotal();
}

// ---------------------------- Septimo Ejercicio  ---------------------------- //

// Muestra el numero de productos en el carrito en el html indicado a travez de length que devuelve la cantidad de elementos de un array, luego es llamada por la funcion actualizarCarrito
function actualizarContadorCarrito() {
    let numeroProductos = arrayCarrito.length;
    document.getElementById("contador-carrito").innerText = numeroProductos;
}

// Suma el valor de los productos del carrito reccorriendo el array y muestra el total en el html indicado, luego es llamada por la funcion actualizarCarrito
function actualizaPrecioTotal() {
    let total = 0;
    for (let i = 0; i < arrayCarrito.length; i++) {
        total += arrayCarrito[i].precio;
    }
    document.getElementById("precio-total").innerText = `$${total}`;
}

// ---------------------------- Octavo Ejercicio  ---------------------------- //

// Funcion que ordena el array de productos cuando se le hace click al boton ordenar por nombre usando el metodo sort y una funcion retorna un numero negativo si el primer elemento es menos que el segundo
// o positivo si el primero es mayo que el segundo, o cero si son iguales, despues llama a la funcion mostrarProductos 
function ordenarPorNombre(array, btn) {
    function comprarSrings(text1, text2) {
        return text1.nombre.localeCompare(text2.nombre);
    }
    btn.addEventListener("click", function () {
        let arrayOrdenado = array.sort(comprarSrings);
        mostrarProductos(arrayOrdenado, "contenedor-productos");
    });
    
}

// Funcion similar a la anterior pero ordena por precio usando el metodo sort siendo mas simple ya que compara directamente los nummeros
function ordenarPorPrecio(array, btn) {
    btn.addEventListener("click", function () {
        let arrayOrdenado = array.sort((a, b) => a.precio - b.precio);
        mostrarProductos(arrayOrdenado, "contenedor-productos");
    });
}

// ---------------------------- Noveno Ejercicio  ---------------------------- //

// Funcion que escucha el evento "Vaciar Carrito" y sobrepisa el arrayCarrito con un array vacio y luego actualiza el carrito llamando a funcion
function eliminarTodoCarrito(btn) {
    btn.addEventListener("click", function () {
        console.log("Carrito vaciado");
        arrayCarrito = [];
        actualizarCarrito();
    });
}

// ---------------------------- Inicializacion ---------------------------- //
function init() {
    // Primer Ejercicio
    arrayProductos = harcodearProductos();
    // Segundo Ejercicio
    imprimirDatosAlumno();
    // Tercer Ejercicio
    mostrarProductos(arrayProductos, "contenedor-productos");
    // Cuarto Ejercicio
    filtrarPorNombre(arrayProductos, document.getElementById("buscador"));
    // sexto Ejercicio
    cargarLocalStorage("Carrito");
    // Octavo Ejercicio
    ordenarPorNombre(arrayProductos, document.getElementById("btn-nombre"));
    ordenarPorPrecio(arrayProductos, document.getElementById("btn-precio"));
    // Noveno Ejercicio
    eliminarTodoCarrito(document.getElementById("btn-vaciar-carrito"));
}

init();  