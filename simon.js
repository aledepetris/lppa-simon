// Globales
var gameOver = true;
var level = 0;
var score = 0;
var colors = ['red', 'blue', 'green', 'yellow'];
var gameSecuence = [];
var playerSecuence = [];

// Botones
var btnBlue = document.getElementById('blue');
var btnYellow = document.getElementById('yellow');
var btnGreen = document.getElementById('green');
var btnRed = document.getElementById('red');

var startBtn = document.getElementById('start');
var resetBtn = document.getElementById('reset');
resetBtn.disabled = true;

// Spans
var scoreSpan = document.getElementById('score');

// Game Over Controles
var gameOverPopup = document.getElementById('popup');
var closeBtn = document.getElementById('closeBtn');

//------------ FUNCIONES ------------
// Funcion que Chequea las secuencias:
var checkAnswer = function (currentLevel) {

    if (gameSecuence[currentLevel] == playerSecuence[currentLevel]) {
        score ++;
        console.log("Score: " + score)
        if (gameSecuence.length === playerSecuence.length) {
            showMessageSucces();
            nextSecuence();
        }
    } else {
        showGameOverPopup();
        new Audio('assets/wrong.mp3').play();
        gameOver = true;
    }

}

var nextSecuence = function () {
    playerSecuence = [];
    gameSecuence.push(generateRandomColor())
    level++;
    scoreSpan.innerText = level
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
    // Reseteo juego y marcador
    gameOver = true;
    level = 0;
    score = 0;
    console.log("Score: " + score)
    scoreSpan.innerText = level;
    // Disponibilidad de los botones
    startBtn.disabled = false;
    resetBtn.disabled = true;
    // Limpio las secuencias
    cleanSecuence();
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

    setTimeout(function() { 
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
var showGameOverPopup = function () {
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

// Eventos de los botones Start y Reset
startBtn.addEventListener('click', function () {
    // Inicio del juego
    gameOver = false;
    scoreSpan.innerText = 0;

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
    resetGame();
  });

resetBtn.addEventListener('click', resetGame);
