//objetos html
const textoEntrada = document.querySelector('.input');
const divTextoSalida = document.querySelector(".text");
const botonCopiar = document.querySelector('.copiar');
const botonEncriptar = document.querySelector('.encriptar');
const botonDesencriptar = document.querySelector('.desencriptar');
const mensajeError = document.querySelector('.not-found');
const alerta = document.querySelector('.alerta');
const salida = document.querySelector('.output');
const parrafoSalida = document.querySelector('.texto-salida');

//funcion para saber si la cadena de entrada contiene Mayúsculas
function hayMayusculas(str) { return /[A-Z]/.test(str); }

//funcion para saber si la cadena de entrada contiene caráteres especiales
function hayCEspeciales(str) { 
  return /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(str) ;
}

//funcion para saber si hay algún carácter tildado (buscar acentos)
function hayAcentos(str) { var regex = /[áéíóúü]/.test(str); }

//verifica que la cadena de entrada no tenga mayusculas, caracteres especiales
//ni acentos
function entradaInvalida(str) {
  return hayMayusculas(str) || hayCEspeciales(str) || hayAcentos(str);
}

//checa si la cadena esta vacía
function estaVacia(str) { return /^\s*$/.test(str); }

//funcion asincrona para copiar
async function copiarSalida() {
  try {
    await navigator.clipboard.writeText(divTextoSalida.innerText);
  } catch (error) {
    alert(error.message);
  }
}

//cambia el mensaje de alerta *
//borra el texto de entrada *
//intercambia el parrafo de salida por el mensaje notfound *
function notFound(str) {
  alerta.innerText = estaVacia(str) ? 'Ningún mensaje fue encontrado' : 'El texto de entrada no es válido';
  textoEntrada.value = '';
  salida.style.display = 'none';
  mensajeError.style.display = 'block';  
}

function muestraSalida() {
  mensajeError.style.display = 'none';
  salida.style.display = 'block';  
}

//función para encriptar
function encriptar() {
  let texto = textoEntrada.value.slice();
  //si la cadena de entrada es válida
  //intercambia el mensaje de notfound por el parrafo y botón de salida *
  //encripta el texto de entrada *
  //imprime el texto en la salida *
  if ( !(entradaInvalida(texto) || estaVacia(texto)) ) {
    muestraSalida();
    texto = texto.replace(/e/g,'enter').replace(/i/g,'imes');
    texto = texto.replace(/a/g,'ai').replace(/o/g,'ober');
    texto = texto.replace(/u/g,'ufat');
    parrafoSalida.innerText = texto;
    return;    
  }
  notFound(texto);
}

//función para desencriptar
function desencriptar() {
  let texto = textoEntrada.value.slice();
  //si la cadena de entrada es válida
  //intercambia el mensaje de notfound por el parrafo y botón de salida *
  //desencripta el texto de entrada *
  //imprime el texto en la salida *
  if ( !(entradaInvalida(texto) || estaVacia(texto)) ){
    muestraSalida();
    texto = texto.replace(/enter/g,'e').replace(/imes/g,'i');
    texto = texto.replace(/ai/g,'a').replace(/ober/g,'o');
    texto = texto.replace(/ufat/g,'u');
    parrafoSalida.innerText = texto;
    return;
  }
  notFound(texto);
}

//asignar las funciones a los eventos
botonCopiar.onclick = copiarSalida;
botonEncriptar.onclick = encriptar;
botonDesencriptar.onclick = desencriptar;