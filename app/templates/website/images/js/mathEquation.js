let equationElement; // Élément DOM pour afficher l'équation
let answerElement; // Élément DOM pour afficher la réponse
let correctAnswer; // Réponse correcte de l'équation
let equationVisible = false; // Indique si l'équation est visible

function setupMathDisplay() {
    // Créer l'élément DOM pour afficher l'équation
    equationElement = document.createElement('div');
    equationElement.style.position = 'absolute';
    equationElement.style.top = '50%'; // Position verticale centrée
    equationElement.style.left = '50%'; // Position horizontale centrée
    equationElement.style.transform = 'translate(-50%, -50%)'; // Centrer l'élément
    equationElement.style.color = 'white';
    equationElement.style.fontSize = '20px';
    equationElement.style.display = 'block'; // Afficher l'équation dès le début
    equationElement.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'; // Arrière-plan semi-transparent
    equationElement.style.padding = '10px'; // Ajoutez un peu de remplissage
    document.body.appendChild(equationElement);

    // Créer l'élément DOM pour afficher la réponse
    answerElement = document.createElement('input');
    answerElement.type = 'text';
    answerElement.placeholder = 'Votre réponse';
    answerElement.style.position = 'absolute';
    answerElement.style.top = 'calc(50% + 40px)'; // Position sous l'équation
    answerElement.style.left = '50%'; // Position horizontale centrée
    answerElement.style.transform = 'translate(-50%, 0)'; // Centrer l'élément
    document.body.appendChild(answerElement);

    // Ajouter un événement pour vérifier la réponse
    answerElement.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            checkAnswer(answerElement.value);
        }
    });

    // Générer l'équation immédiatement
    generateEquation();
}

function generateEquation() {
    const num1 = Math.floor(Math.random() * 10) + 1; // Un nombre aléatoire entre 1 et 10
    const num2 = Math.floor(Math.random() * 10) + 1; // Un autre nombre aléatoire
    const operator = '+'; // Vous pouvez ajouter d'autres opérateurs comme '-', '*', '/'
    correctAnswer = num1 + num2; // Calculer la réponse correcte

    equationElement.textContent = `Résoudre : ${num1} ${operator} ${num2} = ?`;
    equationVisible = true; // Indiquer que l'équation est visible
}

function checkAnswer(userAnswer) {
    if (parseInt(userAnswer) === correctAnswer) {
        alert('Bien joué !'); // Afficher le message de réussite
        equationElement.style.display = 'none'; // Masquer l'équation
        answerElement.value = ''; // Réinitialiser le champ de réponse
        equationVisible = false; // Indiquer que l'équation n'est plus visible
    } else {
        alert('Mauvaise réponse, réessayez !'); // Message d'erreur
    }
}

function updateMathDisplay(character, door) {
    const characterBox = new THREE.Box3().setFromObject(character);
    const doorBox = new THREE.Box3().setFromObject(door);

    // Vérifiez si le personnage est proche de la porte
    if (characterBox.intersectsBox(doorBox) && !equationVisible) {
        generateEquation(); // Générer l'équation si le personnage est proche
    }
}

// Initialiser l'affichage de l'équation
setupMathDisplay();
