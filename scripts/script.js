import { data } from "../data/data.js";
let btnEnviar = document.getElementById('.btn-primary');
let desnutricion = 0;
let saludable = 0;
let sobrepeso = 0;
let obesidad = 0;
let obesidadextrema = 0;
let sexo = 0;
let masa = 0;
let formulario = document.getElementById('form');
const items = document.getElementById('items');

document.addEventListener('DOMContentLoaded', grafica())

formulario.addEventListener('submit', prueba);

function prueba(e) {
    e.preventDefault();
    capturardatos();
}

function capturardatos(masa) {
    let inputpeso = parseFloat(document.getElementById("inputpeso").value);
    let inputaltura = parseFloat(document.getElementById("inputaltura").value);
    let sexos = document.getElementById("sexos").value;
    let inputedad = document.getElementById("inputedad").value;
    masa = (inputpeso / [(inputaltura)] ** 2).toFixed(2);

    calcular(inputpeso, inputaltura, sexos, masa, inputedad)
}

function calcular(inputpeso, inputaltura, sexos, masa, inputedad) {
    let recomendado;

    if (sexos === "h") {
        if (inputaltura >= 1.52 && inputaltura < 1.64) {
            recomendado = "45 - 60"
            imprimir(inputpeso, inputaltura, masa, recomendado, sexos, inputedad);
        } else if (inputaltura >= 1.64 && inputaltura < 1.74) {
            recomendado = "54 - 67"
            imprimir(inputpeso, inputaltura, masa, recomendado, sexos, inputedad);
        } else if (inputaltura >= 1.74 && inputaltura < 1.84) {
            recomendado = "60 - 75"
            imprimir(inputpeso, inputaltura, masa, recomendado, sexos, inputedad);
        } else if (inputaltura >= 1.84 && inputaltura <= 1.96) {
            recomendado = "68 - 86"
            imprimir(inputpeso, inputaltura, masa, recomendado, sexos, inputedad);
        } else if (inputaltura >= 1.97 && inputaltura <= 2.8) {
            recomendado = "81 - 96";
            imprimir(inputpeso, inputaltura, masa, recomendado, sexos, inputedad)
        }
    } else if (sexos === "m") {
        if (inputaltura >= 1.5 && inputaltura < 1.64) {
            recomendado = "45 - 54"
            imprimir(inputpeso, inputaltura, masa, recomendado, sexos, inputedad);
        } else if (inputaltura >= 1.64 && inputaltura < 1.74) {
            recomendado = "56 - 64"
            imprimir(inputpeso, inputaltura, masa, recomendado, sexos, inputedad);
        } else if (inputaltura >= 1.74 && inputaltura < 1.84) {
            recomendado = "60 - 71"
            imprimir(inputpeso, inputaltura, masa, recomendado, sexos, inputedad);
        } else if (inputaltura >= 1.84 && inputaltura <= 1.96) {
            recomendado = "68 - 81"
            imprimir(inputpeso, inputaltura, masa, recomendado, sexos, inputedad);
        } else if (inputaltura >= 1.97 && inputaltura <= 2.8) {
            recomendado = "76 - 86";
            imprimir(inputpeso, inputaltura, masa, recomendado, sexos, inputedad)
        }
    }

}

function imprimir(inputpeso, inputaltura, masa, recomendado, sexos, inputedad) {
    let rango = (masa * 100) / 50
    if (isNaN(inputpeso) || isNaN(inputaltura)) {
        alert("solo se puede ingresar numeros en los campos");
    } else {
        items.innerHTML += ` 
        <div class="card" id="targeta" style="width: 18rem;">
        <div class="resultado">
            <h2 class="titulo">Resultados</h2>
            <h1 id="h1">${masa}</h1>
        </div>
        <div class="progress">
            <div class="progress-bar" id="barra" role="progressbar" style="width: 100%" aria-valuenow="100"
                aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <input id="rango" type="range" min="0" max="100" value="${rango}" disabled>
        <div class="card-body">
            <hr>
            <h4 class="titulo r">Peso Ideal:</h4>
            <h4 class="titulo r">${recomendado}</h4>
            <h4 class="titulo r">(KG)</h4><br>
            <img class="color" src="image/1.PNG" alt="azul">
            <h5>Bajo Peso</h5><br>
            <img class="color" src="image/2.PNG" alt="verde">
            <h5>Saludable</h5><br>
            <img class="color" src="image/3.PNG" alt="amarillo">
            <h5>Exceso de Peso</h5><br>
            <img class="color" src="image/4.PNG" alt="rojo">
            <h5>Obeso</h5>
        </div>
    </div>
       `
    }
    data.push({
        usu_sexo: sexos,
        usu_edad:  inputedad,
        usu_peso: inputpeso,
        usu_altura: inputaltura,
        "usu_masa": masa
    })
    localStorage.setItem('dato prueba', JSON.stringify(data))
}
function grafica() {
    data.forEach(personas => {
        const { usu_sexo, usu_edad, usu_peso, usu_altura, usu_masa } = personas;
        if (usu_masa < 18.5) {
            desnutricion++;
        } else if (usu_masa >= 18.5 && usu_masa <= 24.9) {
            saludable++;
        } else if (usu_masa >= 25.0 && usu_masa <= 29.9) {
            sobrepeso++;
        } else if (usu_masa >= 30.0 && usu_masa <= 39.9) {
            obesidad++;
        } else if (usu_masa >= 40.0) {
            obesidadextrema++;
        }
    })  
    new Morris.Bar({
        element: 'bar-example',
        data: [
            { y: 'desnutricion', a: desnutricion },
            { y: 'saludable', a: saludable },
            { y: 'sobre peso', a: sobrepeso },
            { y: 'obesidad', a: obesidad },
            { y: 'obesidad extrema', a: obesidadextrema }
        ],
        xkey: 'y',
        ykeys: ['a'],
        labels: ['Series A'] 
    }) 
}

