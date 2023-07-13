// Globales
var gameOver = true;
var level = 0;
var secuence = 0;
var colors = ['red', 'blue', 'green', 'yellow']
var gameSecuence = [];
var playerSecuence = [];

// Botones
var btnBlue = document.getElementById('blue');
var btnYellow = document.getElementById('yellow');
var btnGreen = document.getElementById('green');
var btnRed = document.getElementById('red');

var startBtn = document.getElementById('start')
var resetBtn = document.getElementById('reset')
resetBtn.disabled = true;

// Spans
var scoreSpan = document.getElementById('score');


// Eventos de los botones Start y Reset 
startBtn.addEventListener('click', function () {
    // Inicio el juego
    gameOver = false;
    scoreSpan.innerText = 0;

    // Disponibilidad de los botones
    startBtn.disabled = true;
    resetBtn.disabled = false;

    // Generar un color y pushear a la secuencia del juego
    var color = generateRandomColor();
    gameSecuence.push(color);
    blinkColor(color);

    console.log(gameSecuence)

})

resetBtn.addEventListener('click', function () {
    resetGame();
})

// Eventos para los botones de Colores
btnBlue.addEventListener('click', function () {
    if (gameOver) return

    playerSecuence.push('blue')
    blinkColor('blue')
    checkAnswer(playerSecuence.length - 1)

})

btnRed.addEventListener('click', function () {
    if (gameOver) return

    playerSecuence.push('red')
    blinkColor('red')
    checkAnswer(playerSecuence.length - 1)

})

btnGreen.addEventListener('click', function () {
    if (gameOver) return

    playerSecuence.push('green')
    blinkColor('green')
    checkAnswer(playerSecuence.length - 1)

})

btnYellow.addEventListener('click', function () {
    if (gameOver) return

    playerSecuence.push('yellow')
    blinkColor('yellow')
    checkAnswer(playerSecuence.length - 1)

})


// Funcion que Chequea las secuencias:
var checkAnswer = function (currentLevel) {

    if (gameSecuence[currentLevel] == playerSecuence[currentLevel]) {
        if (gameSecuence.length === playerSecuence.length) {
            nextSecuence();
        }
    } else {
        resetGame();
        gameOver = true;
        scoreSpan.innerText = "PERDISTE BOBO"
    }

}

var nextSecuence = function () {
    playerSecuence = [];
    gameSecuence.push(generateRandomColor())
    level++;
    scoreSpan.innerText = level
    console.log(gameSecuence)
    blinkSecuence();
}

var blinkSecuence = function () {
    gameSecuence.forEach((color, index) => {
        setTimeout(() => {
            blinkColor(color);
        }, (index + 1) * 500); // Esperar (index + 1) segundos
    });
};


// Funciones generales y Utiles

var resetGame = function () {
    // Reseteo juego y marcador
    gameOver = true;
    scoreSpan.innerText = 'X';
    // Disponibilidad de los botones
    startBtn.disabled = false;
    resetBtn.disabled = true;
    // Limpio las secuencias
    limpiarSecuencias();
}

var generateRandomColor = function () {
    var num = Math.floor(Math.random() * 4);
    return colors[num]
}

var limpiarSecuencias = function () {
    gameSecuence = [];
    playerSecuence = [];
}

var blinkColor = function (color) {
    switch (color) {
        case 'red': 
            btnRed.style.background = "tomato"; 
            break;
        case 'blue': 
            btnBlue.style.background = "lightskyblue"; 
            break;
        case 'green': 
            btnGreen.style.background = "lightgreen";
            break;
        case 'yellow': 
            btnYellow.style.background = "yellow";
            break;
    };

    setTimeout(() => { clearColor(); }, 200);

}

var clearColor = function () {
    btnRed.style.backgroundColor = "darkred";
    btnBlue.style.backgroundColor = "darkblue";
    btnGreen.style.backgroundColor = "darkgreen";
    btnYellow.style.backgroundColor = "goldenrod";
}
