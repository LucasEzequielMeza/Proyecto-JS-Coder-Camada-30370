const cardDinamicas = document.querySelector('#card-dinamica');
const productos = document.querySelector('#productos-agregados');
const datoCarrito = document.querySelector('#datos-carrito');
const templateCard = document.querySelector('#template-card').content
const templateCarrito = document.querySelector('#template-carrito').content
const templateDatosCarrito = document.querySelector('#template-datos-carrito').content
const fragment = document.createDocumentFragment();
let carrito = {};

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
    carritoDeCompras(".panel-btn", ".carrito-compras");
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'));
        mostrarCarrito()
    }
});

cardDinamicas.addEventListener('click', e => {
    agregarAlCarrito(e);
});

productos.addEventListener('click', e => {
    btnAumentarDisminuir(e)
})

const fetchData = async () => {
    try {
        const res = await fetch('productos.json')
        const data = await res.json();
        mostrarCards(data)
    } catch (error) {
        console.log(error)
    }
}

const mostrarCards = data => {
    data.forEach(productos => {
        templateCard.querySelector('img').setAttribute("src", productos.imagen);
        templateCard.querySelector('#nombre-producto').textContent = productos.nombre;
        templateCard.querySelector('#precio-producto').textContent = productos.precio;
        templateCard.querySelector('#btn-agregar').dataset.id = productos.id;

        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone)
    });

    cardDinamicas.appendChild(fragment)
}

const agregarAlCarrito = e => {
    //  console.log(e.target.classList.contains('btn'))
    if (e.target.classList.contains('btn')) {
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}

const setCarrito = objeto => {
    const producto = {
        id: objeto.querySelector('#btn-agregar').dataset.id,
        nombre: objeto.querySelector('#nombre-producto').textContent,
        precio: objeto.querySelector('#precio-producto').textContent,
        cantidad: 1
    }

    if (carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1;
    }

    carrito[producto.id] = { ...producto }
    mostrarCarrito()
}

const mostrarCarrito = () => {
    productos.innerHTML = '';
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('#nombre-producto-carrito').textContent = producto.nombre;
        templateCarrito.querySelector('#agregar').dataset.id = producto.id;
        templateCarrito.querySelector('#quitar').dataset.id = producto.id;
        templateCarrito.querySelector('#cantidad-producto-carrito').textContent = producto.cantidad;
        templateCarrito.querySelector('#precio-producto-carrito').textContent = producto.cantidad * producto.precio;


        const clone = templateCarrito.cloneNode(true);
        fragment.appendChild(clone);
    });

    productos.appendChild(fragment);
    mostrarProdcutosTotal();

    localStorage.setItem('carrito', JSON.stringify(carrito));
}

const mostrarProdcutosTotal = () => {
    datoCarrito.innerHTML = '';
    if (Object.keys(carrito).length === 0) {
        datoCarrito.innerHTML = `
        <th scope="row" colspan="5">No hay productos agregados</th>
        `
        return
    }

    const cantidadTotal = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0);
    const precioTotal = Object.values(carrito).reduce((acc, { cantidad, precio }) => acc + cantidad * precio, 0);

    templateDatosCarrito.querySelector('#total-productos').textContent = cantidadTotal;
    templateDatosCarrito.querySelector('#precio-total').textContent = precioTotal;

    const clone = templateDatosCarrito.cloneNode(true);
    fragment.appendChild(clone);
    datoCarrito.appendChild(fragment);

    const btnVaciar = document.querySelector('#vaciar-carrito');
    btnVaciar.addEventListener('click', () => {
        carrito = {};
        mostrarCarrito();
    })

    const btnCompar = document.querySelector('#comprar');
    btnCompar.addEventListener('click', () => {
        carrito = {};
        mostrarCarrito();
        Swal.fire({
            icon: "success",
            title: "Compra realizada con exito",
            text: "Gracias por confiar en nosotros",
            position: "top"

        })
    })
};

const btnAumentarDisminuir = e => {
    if (e.target.classList.contains('btn-info')) {
        const producto = carrito[e.target.dataset.id];
        producto.cantidad = carrito[e.target.dataset.id].cantidad + 1;
        carrito[e.target.dataset.id] = { ...producto }
        mostrarCarrito()
    }
    if (e.target.classList.contains('btn-danger')) {
        const producto = carrito[e.target.dataset.id];
        producto.cantidad = carrito[e.target.dataset.id].cantidad - 1;
        if (producto.cantidad === 0) {
            delete carrito[e.target.dataset.id];
        }
        mostrarCarrito()
    }

    e.stopPropagation()
}
function carritoDeCompras(panelBtn, carritoCompras) {
    const d = document;
    d.addEventListener("click", e => {
        if (e.target.matches(panelBtn) || e.target.matches(`${panelBtn} *`)) {
            d.querySelector(carritoCompras).classList.toggle("is-active");
        }
        if (e.target.matches(carritoCompras)) {
            d.querySelector(carritoCompras).classList.remove("is-active");
        }
    })
}


