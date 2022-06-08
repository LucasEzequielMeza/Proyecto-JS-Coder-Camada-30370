const formulario = document.getElementById("formulario");
const nombreUsuario = document.getElementById("usuarioNombre");
const emailUsuario = document.getElementById("usuarioEmail");

const alertSuccess = document.getElementById("alertSuccess");
const aleraNombre = document.getElementById("alertaNombre");
const alertaEmail = document.getElementById("alertaEmail");

const regUserNombre = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
const regUserEmail = /^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/;

const pintarMensajeExito = () => {
    Swal.fire({
        icon: 'success',
        text: 'Mensaje enviado con exito',
    })
};

const pintarMensajeError = (errores) => {
    errores.forEach((item) => {
        item.tipo.classList.remove("d-none");
        item.tipo.textContent = item.msg;
    });
};

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    alertSuccess.classList.add("d-none");
    const errores = [];

    // validar nombre
    if (!regUserNombre.test(nombreUsuario.value) || !nombreUsuario.value.trim()) {
        nombreUsuario.classList.add("is-invalid");

        errores.push({
            tipo: aleraNombre,
            msg: "Formato no válido campo nombre, solo letras",
        });
    } else {
        nombreUsuario.classList.remove("is-invalid");
        nombreUsuario.classList.add("is-valid");
        aleraNombre.classList.add("d-none");
    }

    // validar email
    if (!regUserEmail.test(emailUsuario.value) || !emailUsuario.value.trim()) {
        emailUsuario.classList.add("is-invalid");

        errores.push({
            tipo: alertaEmail,
            msg: "Escriba un correo válido",
        });
    } else {
        emailUsuario.classList.remove("is-invalid");
        emailUsuario.classList.add("is-valid");
        alertaEmail.classList.add("d-none");
    }

    if (errores.length !== 0) {
        pintarMensajeError(errores);
        return;
    }

    console.log("Formulario enviado con éxito");
    pintarMensajeExito();
    nombreUsuario.classList.remove("is-valid");
    emailUsuario.classList.remove("is-valid");
    formulario.reset();
});