//seclector donde se va a setear la contraseña
let textPw = document.querySelector("#pw-text");
//selector para mostrar el tamaño de la contraseña
let displaySize = document.querySelector(".display-pw-size span");
//selector del boton
let btnGenerate = document.querySelector(".generate");
//icono copy
let clipboard = document.querySelector(".password a");

//selectores de los check box
let upper = document.querySelector("#upper");
let lower = document.querySelector("#lower");
let number = document.querySelector("#number");
let symbol = document.querySelector("#symbol");
let exclude = document.querySelector("#exclude");

let passwordAll = ""; //generate

//variables de los caracteres a utilizar
const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; //26
const upperLettersWithOut = "ABCDEFGHJKLMNPQRSTUVWXYZ"; // 24
const lowerLetters = "abcdefghijklmnopqrstuvwxyz"; //26
const lowerLettersWithOut = "abcdefghjkmnpqrstuvwxyz"; // 23
const numbers = "0123456789"; //10
const numbersWithOut = "23456789"; // 8
const symbols = "!@#$%^&*()_+="; //13

//funcion para agrupar todos los listeners: boton generate, copy
addEventLinsteners();
function addEventLinsteners() {
	btnGenerate.addEventListener("click", generatePw);
	clipboard.addEventListener("click", copyPw);
}

function copyPw(e) {
	e.preventDefault();
	const password = textPw.textContent;
	if (password) {
		const textArea = document.createElement("textarea");
		textArea.value = password;
		document.body.appendChild(textArea);
		textArea.select();
		document.execCommand("copy");
		textArea.remove();
	}
}

// logica del generate.
function generatePw(e) {
	passwordAll = ""; // resetear el password all para que no se concatene en consola
	if (upper.checked) {
		passwordAll += getUpperCase(); // mientras el upper este checked, concatenamos un caracter en mayuscula
	}
	if (lower.checked) {
		passwordAll += getLowerCase();
	}
	if (number.checked) {
		passwordAll += getNumberCase();
	}
	if (symbol.checked) {
		passwordAll += getSymbolCase();
	}
	if (upper.checked || lower.checked || number.checked || symbol.checked) {
		completePw(); /*  NECESITAMOS GRARANTIZAR QUE UNO DE ESTOS ESTEN CHECKED PARA QUE PUEDA ENTRAR EN LAS CONDICIONES DE FUNCTION COMPLETEPW,
		PORQUE LA LOGICA DEL GENERATE NO ME LOS MOSTRABA DESORDENADOS SI SELECCIONABA TODAS LAS CASILLAS AL MISMO TIEMPO*/
	
	}
}
// 
function completePw() {
	while (passwordAll.length < parseInt(displaySize.textContent)) {
		const numberR = getRandom(); /* va a llamar la funcion get ramdom porque en este caso una vez que garantiza que por lo menos tiene una mayuscula,
		 				minuscula, simbolo y caracter lo que necesita completar el password se complete aleatoriamente */
		
		if (upper.checked && numberR === 0) {
			passwordAll += getUpperCase();/*tiene la misma logica del generate pero se añade la condicional de "and"  
			 				donde se pregunta que numberR sea igual a 0, esta funcion get ramdom va a generar un numero de 0 a 3, 
							el cual nos va a servir para entrar aleatoriamente a las condicionales*/
		}					/* verificando que las mayusculas esten checked, 
							el getRandom nos devuelve un 0 entonces va a concatenar un caracter mayuscula*/
		if (lower.checked && numberR === 1) {
			passwordAll += getLowerCase();
		}
		if (number.checked && numberR === 2) {
			passwordAll += getNumberCase();
		}
		if (symbol.checked && numberR === 3) {
			passwordAll += getSymbolCase();
		}
	}

	textPw.innerHTML = passwordAll;
}

//funciones para obtener un caracter de cada uno de los strings

//return aleatorio de los caracteres a utilizar
function getRandomNumber(max) {
	return Math.floor(Math.random() * max); //"max" contenido maximo de la cadena de string
}
function getRandom() {
	return Math.floor(Math.random() * 4);
}
function getUpperCase() {
	if (exclude.checked) {
		return upperLettersWithOut[getRandomNumber(upperLettersWithOut.length)];
	} else {
		return upperLetters[getRandomNumber(upperLetters.length)];
	}
}
function getLowerCase() {
	if (exclude.checked) {
		return lowerLettersWithOut[getRandomNumber(lowerLettersWithOut.length)];
	} else {
		return lowerLetters[getRandomNumber(lowerLetters.length)];
	}
}
function getNumberCase() {
	if (exclude.checked) {
		return numbersWithOut[getRandomNumber(numbersWithOut.length)];
	} else {
		return numbers[getRandomNumber(numbers.length)];
	}
}
function getSymbolCase() {
	return symbols[getRandomNumber(symbols.length)];
}

//funcionalidad del input de tipo rango y cantidad de caracteres
function showVal(value) {
	displaySize.textContent = value;
}
