const inicioJuego = document.querySelector("#inicio-juego");
const finJuego = document.querySelector("#fin-juego");
//botones que contienen las respuestas correctas
const respCorrectUno = document.querySelector("#respuestaCorrectaUno");
const respCorrectDos = document.querySelector("#respuestaCorrectaDos");
const respCorrectTres = document.querySelector("#respuestaCorrectaTres");
const respCorrectCuatro = document.querySelector("#respuestaCorrectaCuatro");
const respCorrectCinco = document.querySelector("#respuestaCorrectaCinco");
const respCorrectSeis = document.querySelector("#respuestaCorrectaSeis");
//botones que contienen las respuestas incorrectas
const btnRespUnoIncorre = document.querySelectorAll(".respuestasUnoIncorrectas");
const btnRespDosIncorre = document.querySelectorAll(".respuestasDosIncorrectas");
const btnRespTresIncorre = document.querySelectorAll(".respuestasTresIncorrectas");
const btnRespCuatroIncorre = document.querySelectorAll(".respuestasCuatroIncorrectas");
const btnRespCincoIncorre = document.querySelectorAll(".respuestasCincoIncorrectas");
const btnRespSeisIncorre = document.querySelectorAll(".respuestasSeisIncorrectas");



let btnRespuestaCorrectas = [respCorrectUno, respCorrectDos, respCorrectTres, respCorrectCuatro, respCorrectCinco, respCorrectSeis];
let btnResInco = [btnRespUnoIncorre, btnRespDosIncorre, btnRespTresIncorre, btnRespCuatroIncorre, btnRespCincoIncorre, btnRespSeisIncorre];

let segundos = 60;
let temporizador;
let respuestasCorrectas = [];
let click = [];
//Inicia el temporizador

const botonesBloqueados = () => {
    btnResInco.forEach((item) => {
        item.forEach((item) => {
            item.disabled = true;
        })
    });

    btnRespuestaCorrectas.forEach((item) => {
        item.disabled = true;
    })
}


const inicioContador = () => {

    temporizador = setInterval(() => {
        timer();
    }, 1000);

    btnRespUnoIncorre.forEach((item) => {
        item.disabled = false;

    });
    respCorrectUno.disabled = false;
}
//Resetea el temporizador
const finalizarJuego = () => {
    clearInterval(temporizador);
    segundos = 60;
    document.getElementById('contador').innerText = segundos;
    const totalRespCorrectas = respuestasCorrectas.reduce((acumulador, e) => {
        return acumulador = acumulador + e;
    });
    if (totalRespCorrectas <= 2) {
        Swal.fire({
            imageUrl: "Imagen/Juego/derrota_.jpg",
            title: "Derrota",
            text: "Su sabiduria aun baja es, siga intentando",
            position: "top"

        })
    } else if (totalRespCorrectas <= 4) {
        Swal.fire({
            imageUrl: "Imagen/Juego/EmpateEdit.jpg",
            title: "Empate",
            text: "Sabe bastante, pero no lo suficiente como para ganar",
            position: "top"

        })
    } else if (totalRespCorrectas > 4) {
        Swal.fire({
            imageUrl: "Imagen/Juego/Victoria.jpg",
            title: "Victoria!!",
            text: "Muy sabio usted es, ah ganado el juego",
            position: "top"

        })
    }
    respuestasCorrectas = []
    inicioJuego.disabled = false;
    botonesBloqueados();
}

const respCorrectas = () => {
    click.push(1)
    respuestasCorrectas.push(1)
    clearInterval(temporizador);
    segundos = segundos + 10;
    document.getElementById('contador').innerText = segundos;
    inicioContador();
}
const respIncorrectas = () => {
    click.push(1)
    clearInterval(temporizador);
    segundos = segundos - 10;
    inicioContador();
    document.getElementById('contador').innerText = segundos;
    (segundos === 0 ? finJuego() : segundos);
}

const timer = () => {
    segundos--; //Decrementa los segundos
    let formatear = (segundos < 10 ? '0' + segundos : segundos);
    document.getElementById('contador').innerText = formatear;
    if (segundos === 0) {
        finalizarJuego()
    }
    return formatear;
}
inicioJuego.addEventListener("click", () => {
    inicioContador();
    inicioJuego.disabled = true;
});
finJuego.addEventListener("click", finalizarJuego)

btnRespuestaCorrectas.forEach((item) => {
    item.addEventListener("click", () => {
        respCorrectas();
        deshabilitarBoton();
    });
})

btnResInco.forEach((item) => {
    item.forEach((item) => {
        item.addEventListener("click", () => {
            respIncorrectas();
            deshabilitarBoton();
        })
    })
})

const deshabilitarBoton = () => {
    const totalClicks = click.reduce((acc, e) => {
        return acc = acc + e;
    })
    if (totalClicks === 1) {
        botonesBloqueados();
        btnRespDosIncorre.forEach((item) => {
            item.disabled = false;
        });
        respCorrectDos.disabled = false;
    }
    if (totalClicks === 2) {
        botonesBloqueados();
        btnRespTresIncorre.forEach((item) => {
            item.disabled = false;
        });
        respCorrectTres.disabled = false;
    }
    if (totalClicks === 3) {
        botonesBloqueados();
        btnRespCuatroIncorre.forEach((item) => {
            item.disabled = false;
        });
        respCorrectCuatro.disabled = false;
    }
    if (totalClicks === 4) {
        botonesBloqueados();
        btnRespCincoIncorre.forEach((item) => {
            item.disabled = false;
        });
        respCorrectCinco.disabled = false;
    }
    if (totalClicks === 5) {
        botonesBloqueados();
        btnRespSeisIncorre.forEach((item) => {
            item.disabled = false;
        });
        respCorrectSeis.disabled = false;
    }
    if (totalClicks === 6) {
        botonesBloqueados();
    }


}

botonesBloqueados();