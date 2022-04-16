//selector donde se va a setear la contraseña 
let textPw = document.querySelector("#pw-text");
//selector para mostrar el tamaño de la contraseña
let displaySize =  document.querySelector(".display-pw-size span");
//selector del boton 
let btnGenerate = document.querySelector(".generate");
//icono copy
let clipboard =  document.querySelector(".password a");


//selectores de los check box
let upper = document.querySelector("#upper");
let lower = document.querySelector("#lower");
let number = document.querySelector("#number");
let symbol = document.querySelector("#symbol");


let passwordAll = '';//generate
//variables de los caracteres a utilizar
const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; //26
const lowerLetters = "abcdefghijklmnopqrstuvwxyz";  //26
const numbers = "0123456789"; //10
const symbols = "!@#$%^&*()_+="; //13


//funcion para agrupar todos los listeners: boton generate, copy
addEventLinsteners();
function addEventLinsteners(){
    btnGenerate.addEventListener('click', generatePw);

    clipboard.addEventListener('click', copyPw);
}

function copyPw(e){
    e.preventDefault();
    const password = textPw.textContent;
    if (password) {
        const textArea = document.createElement('textarea');
        textArea.value = password;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        textArea.remove();
    }


}

// logica del generate. 
function generatePw(e){
    passwordAll = '';// resetear el password all para que no se concatene en consola
    if (upper.checked) {
        passwordAll += getUpperCase();// mientras el upper este checked, concatenamos un caracter en mayuscula 
    }if (lower.checked) {
        passwordAll += getLowerCase();
    }if (number.checked) {
        passwordAll += getNumberCase();
    }if (symbol.checked) {
        passwordAll += getSymbolCase();
    }
    if (upper.checked || lower.checked || number.checked || symbol.checked) {
        completePw();// garantiza que salga un caracter de cada uno 
    }


   
}

function completePw(){ //funcion que completa los caracteres 
    while (passwordAll.length < parseInt(displaySize.textContent)) {
        const numberR = getRandom();
        if (upper.checked && numberR === 0) {
            passwordAll += getUpperCase();
        }if (lower.checked && numberR === 1) {
            passwordAll += getLowerCase();
        }if (number.checked && numberR === 2) {
            passwordAll += getNumberCase();
        }if (symbol.checked && numberR === 3) {
            passwordAll += getSymbolCase();
        }
    }

    textPw.innerHTML = passwordAll;
}


//funciones para obtener un caracter de cada uno de los strings

//return aleatorio de los caracteres a utilizar 
function getRandomNumber(max){
    return Math.floor(Math.random() * max); //"max" contenido maximo de la cadena de string
}
function getRandom(){
    return Math.floor(Math.random() * 4);
}
function getUpperCase(){
    return upperLetters[getRandomNumber(upperLetters.length)];
    
}
function getLowerCase(){
    return lowerLetters[getRandomNumber(lowerLetters.length)];
}
function getNumberCase(){
    return numbers[getRandomNumber(numbers.length)];
}
function getSymbolCase(){
    return symbols[getRandomNumber(symbols.length)];
}
//funcionalidad del input de tipo rango y cantidad de caracteres
function showVal(value){
    displaySize.textContent = value;
}
