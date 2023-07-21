// Globales
var gameOver = true;
var level = 0;
var score = 0;
var colors = ['red', 'blue', 'green', 'yellow'];
var gameSecuence = [];
var playerSecuence = [];
var time = 0;
var intervaloID;


// Botones
var btnBlue = document.getElementById('blue');
var btnYellow = document.getElementById('yellow');
var btnGreen = document.getElementById('green');
var btnRed = document.getElementById('red');

var startBtn = document.getElementById('start');
var resetBtn = document.getElementById('reset');
resetBtn.disabled = true;

// Spans
var levelSpan = document.getElementById('level');
var nameErrorSpan = document.getElementById("nameerror");
var scoreSpan = document.getElementById('score')
var checkIcon = document.getElementById("checkicon");
var xIcon = document.getElementById("x-icon");
var playedtimeSpan = document.getElementById('playedtime')

// Input
var nameInput = document.getElementById("name");

// Game Over Controles
var gameOverPopup = document.getElementById('popup');
var closeBtn = document.getElementById('closeBtn');

//------------ FUNCIONES ------------
// Funcion que Chequea las secuencias:
var checkAnswer = function (currentLevel) {

    if (gameSecuence[currentLevel] == playerSecuence[currentLevel]) {
        score++;
        scoreSpan.innerText = score;
        if (gameSecuence.length === playerSecuence.length) {
            showMessageSucces();
            nextSecuence();
        }
    } else {
        new Audio('assets/wrong.mp3').play();
        gameOver = true;
        resetGame();

        var gameScore = getGameResults();
        saveScoreLocalStorage(gameScore);
        showGameOverPopup(gameScore);

    }

}

var nextSecuence = function () {

    playerSecuence = [];
    gameSecuence.push(generateRandomColor())
    level++;
    levelSpan.innerText = level
    blinkSecuence();

}

var blinkSecuence = function () {

    gameSecuence.forEach((color, index) => {
        setTimeout(function () {
            blinkColor(color);
        }, (index + 1) * 750); // Esperar (index + 1) segundos
    });

};

// Funciones generales y Utiles
var resetGame = function () {

    // Reseteo juego y marcadores
    nameInput.disabled = false
    nameInput.value = ""
    checkIcon.style.display = "none";
    xIcon.style.display = "inline";

    gameOver = true;
    level = 0;
    score = 0;
    time = 0
    levelSpan.innerText = level;
    scoreSpan.innerText = score;
    playedtimeSpan.innerText = time;

    // Disponibilidad de los botones
    startBtn.disabled = false;
    resetBtn.disabled = true;

    // Limpio las secuencias
    cleanSecuence();
    clearInterval(intervaloID);

}

var generateRandomColor = function () {

    var num = Math.floor(Math.random() * 4);
    return colors[num]

}

var cleanSecuence = function () {

    gameSecuence = [];
    playerSecuence = [];

}

var blinkColor = function (color) {

    switch (color) {
        case 'red':
            btnRed.style.background = "tomato";
            new Audio('assets/simonSound1.mp3').play();
            break;
        case 'blue':
            btnBlue.style.background = "lightskyblue";
            new Audio('assets/simonSound2.mp3').play();
            break;
        case 'green':
            btnGreen.style.background = "lightgreen";
            new Audio('assets/simonSound3.mp3').play();
            break;
        case 'yellow':
            btnYellow.style.background = "yellow";
            new Audio('assets/simonSound4.mp3').play();
            break;
    };

    setTimeout(function () {
        clearColor();
    }, 250);

}

var clearColor = function () {

    btnRed.style.backgroundColor = "darkred";
    btnBlue.style.backgroundColor = "darkblue";
    btnGreen.style.backgroundColor = "darkgreen";
    btnYellow.style.backgroundColor = "goldenrod";

}

// Game Over
var showGameOverPopup = function (gameScore) {
    var firstRow = document.getElementById('firstrow');

    firstRow.cells[0].textContent = gameScore.get('nivel');
    firstRow.cells[1].textContent = gameScore.get('acertados');
    firstRow.cells[2].textContent = gameScore.get('tiempo');
    firstRow.cells[3].textContent = gameScore.get('puntaje_final');

    gameOverPopup.style.display = 'flex';

}

// Mensaje secuencia lograda
var showMessageSucces = function () {
    var msg = ['BIEN HECHO', 'EXCELENTE', 'ESPECTACULAR', 'GENIAL', 'SIGUE ASI']
    var random = Math.floor(Math.random() * msg.length);
    var finalMsg = msg[random] + " \u{1F44D}";
    message.textContent = finalMsg;
    message.classList.add('show');
    setTimeout(function () {
        message.classList.remove('show');
    }, 1000);

}

// Actualizar tiempo
var updateTime = function () {

    time++;
    playedtimeSpan.innerText = time;

}

// Calculo de resultados
var calculateFinalScore = function () {

    var penalization = time / (2 * Math.PI);
    console.log("penalization:" + penalization);
    var finalScore = Math.floor(score - penalization);
    console.log("finalScore:" + finalScore);
    if (finalScore < 0) return 0;
    return finalScore;

}

// Creo un map con todos los datos necesarios de la partida
var getGameResults = function () {

    var gameScore = new Map();
    gameScore.set("fecha", getDateFormatted());
    gameScore.set("nombre", nameInput.value);
    gameScore.set("nivel", level);
    gameScore.set("acertados", score);
    gameScore.set("tiempo", time);
    gameScore.set("puntaje_final", calculateFinalScore());
    return gameScore;

}

// Función para obtener la lista de puntajes del localStorage
var getScoreFromLocalStorage = function () {

    var scoreString = localStorage.getItem("puntajes");
    if (!scoreString) {
        console.log("No existe en local storage los puntajes");
        return [];
    }

    return JSON.parse(scoreString);

}

// Función para obtener la fecha y hora de hoy formateada
var getDateFormatted = function () {

    var fecha = new Date();

    var dia = String(fecha.getDate()).padStart(2, "0");
    var mes = String(fecha.getMonth() + 1).padStart(2, "0");
    var anio = fecha.getFullYear();

    var horas = String(fecha.getHours()).padStart(2, "0");
    var minutos = String(fecha.getMinutes()).padStart(2, "0");
    var segundos = String(fecha.getSeconds()).padStart(2, "0");

    return `${dia}/${mes}/${anio} - ${horas}:${minutos}:${segundos}`;
    
}

// Guardar en localstorage
var saveScoreLocalStorage = function (gameScore) {

    var scoreList = getScoreFromLocalStorage();

    console.log(scoreList)

    scoreList.push(Object.fromEntries(gameScore));
    console.log(scoreList);

    localStorage.setItem("puntajes", JSON.stringify(scoreList))

}

// Eventos de los botones Start y Reset
startBtn.addEventListener('click', function () {

    if (nameInput.value.length < 3) {
        nameErrorSpan.style.display = "block"
        setTimeout(function () {
            nameErrorSpan.style.display = "none"
        }, 2000);

        return
    }

    // Control del Tiempo:
    intervaloID = setInterval(updateTime, 1000);

    // Inicio del juego
    gameOver = false;
    levelSpan.innerText = 0;

    nameInput.disabled = true

    // Disponibilidad de los botones
    startBtn.disabled = true;
    resetBtn.disabled = false;

    // Generar un color y añadirlo a la secuencia del juego
    var color = generateRandomColor();
    gameSecuence.push(color);
    blinkColor(color);

});

// Eventos para los botones
btnBlue.addEventListener('click', function () {

    if (gameOver) return;

    playerSecuence.push('blue');
    blinkColor('blue');
    checkAnswer(playerSecuence.length - 1);

});

btnRed.addEventListener('click', function () {

    if (gameOver) return;

    playerSecuence.push('red');
    blinkColor('red');
    checkAnswer(playerSecuence.length - 1);

});

btnGreen.addEventListener('click', function () {

    if (gameOver) return;

    playerSecuence.push('green');
    blinkColor('green');
    checkAnswer(playerSecuence.length - 1);

});

btnYellow.addEventListener('click', function () {

    if (gameOver) return;

    playerSecuence.push('yellow');
    blinkColor('yellow');
    checkAnswer(playerSecuence.length - 1);

});

closeBtn.addEventListener('click', function () {

    gameOverPopup.style.display = 'none';

});

resetBtn.addEventListener('click', resetGame);

// Validacion del input:
nameInput.addEventListener("input", function () {

    nameInput.value = nameInput.value.toUpperCase();

    if (nameInput.value.length < 3) {
        checkIcon.style.display = "none";
        xIcon.style.display = "inline";
    } else {
        xIcon.style.display = "none";
        checkIcon.style.display = "inline";
    }

});