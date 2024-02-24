document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('guessField').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkGuess();
        }
    });
});

let minNumber, maxNumber;
let randomNumber;
let remainingGuesses;
let guesses;
let attemptCount;

function startGame() {
    minNumber = parseInt(document.getElementById('minRange').value);
    maxNumber = parseInt(document.getElementById('maxRange').value);
    
    if (isNaN(minNumber) || isNaN(maxNumber) || minNumber >= maxNumber) {
        document.getElementById('rangeMessage').textContent = "Por favor, insira um intervalo válido de números.";
        return;
    } else {
        document.getElementById('rangeMessage').textContent = "";
    }

    randomNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
    remainingGuesses = Math.ceil(Math.log2(maxNumber - minNumber + 1));
    guesses = 0;
    attemptCount = 0;

    document.getElementById('minNumDisplay').textContent = minNumber;
    document.getElementById('maxNumDisplay').textContent = maxNumber;
    document.getElementById('game').classList.add('fade-out');
    setTimeout(function() {
        document.getElementById('game').style.display = 'none';
        document.getElementById('guessing').style.display = 'block';
        document.getElementById('guessing').classList.add('fade-in');
    }, 500);
    document.getElementById('remainingGuesses').textContent = remainingGuesses;
    document.getElementById('attemptCount').textContent = attemptCount;
}

function checkGuess() {
    const guess = parseInt(document.getElementById('guessField').value);
    const message = document.getElementById('message');

    if (isNaN(guess) || guess < minNumber || guess > maxNumber) {
        message.textContent = `Por favor, insira um número válido entre ${minNumber} e ${maxNumber}.`;
        document.getElementById('guessField').focus();
        return;
    }

    guesses++;
    remainingGuesses--;
    attemptCount++;

    if (guess === randomNumber) {
        message.innerHTML = `Parabéns! Você acertou em <span style="color: green">${guesses}</span> tentativas!`;
        document.getElementById('guessField').style.borderColor = 'green';
        document.getElementById('guessField').disabled = true;
        document.getElementById('guessField').classList.add('fade-out');
        document.getElementById('message').classList.add('fade-in');
        document.getElementById('guessing').classList.add('fade-out');
    } else if (remainingGuesses === 0) {
        message.textContent = `Suas tentativas acabaram. O número correto era ${randomNumber}.`;
        endGame();
    } else {
        const difference = Math.abs(randomNumber - guess);
        let feedback;
        if (difference <= 5) {
            feedback = 'Muito quente!';
        } else if (difference <= 10) {
            feedback = 'Quente.';
        } else if (difference <= 20) {
            feedback = 'Morno.';
        } else {
            feedback = 'Frio.';
        }
        message.textContent = `${feedback} Tente novamente.`;
        document.getElementById('remainingGuesses').textContent = remainingGuesses;
        document.getElementById('attemptCount').textContent = attemptCount;
        document.getElementById('guessing').classList.add('animate');
        setTimeout(() => {
            document.getElementById('guessing').classList.remove('animate');
        }, 500);
    }
}

function endGame() {
    document.getElementById('guessing').classList.add('fade-out');
    setTimeout(function() {
        document.getElementById('guessing').style.display = 'none';
        document.getElementById('game').style.display = 'block';
        document.getElementById('game').classList.add('fade-in');
    }, 500);
}

function restartGame() {
    document.getElementById('game').classList.add('fade-out');
    setTimeout(function() {
        document.getElementById('game').style.display = 'block';
        document.getElementById('guessing').style.display = 'none';
        document.getElementById('minRange').value = '';
        document.getElementById('maxRange').value = '';
        document.getElementById('rangeMessage').textContent = "";
        document.getElementById('guessField').value = '';
        document.getElementById('message').textContent = '';
        document.getElementById('game').classList.remove('fade-out');
    }, 500);
}

function showHelp() {
    alert("Dicas:\n\n1. Use o botão 'Verificar' ou pressione 'Enter' para enviar seu palpite.\n2. A cada palpite, você receberá uma dica sobre a proximidade do número correto.\n3. Você tem um número limitado de tentativas. Boa sorte!");
}
