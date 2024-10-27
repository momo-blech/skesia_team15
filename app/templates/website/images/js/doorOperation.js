// Définir une distance de seuil pour afficher l'indication
const proximityThreshold = 3; // Ajustez cette distance pour déclencher l'affichage
let isOperationVisible = false; // Indicateur pour vérifier si la boîte modale est ouverte

// Générer une opération mathématique unique pour la session
const num1 = Math.floor(Math.random() * 10) + 1;
const num2 = Math.floor(Math.random() * 10) + 1;
const correctAnswer = num1 + num2;
const operationText = `${num1} + ${num2} = ?`;

// Fonction principale pour vérifier la proximité et afficher l'indication
function displayOperationHint(door, character) {
    const distance = door.position.distanceTo(character.position);

    if (distance < proximityThreshold && !isOperationVisible) {
        showHintOnDoor(door);
    } else {
        hideHint();
    }
}

// Fonction pour afficher l'indication sur la porte
function showHintOnDoor(door) {
    let hintDiv = document.getElementById("hintDiv");
    if (!hintDiv) {
        hintDiv = document.createElement("div");
        hintDiv.id = "hintDiv";
        hintDiv.style.position = "absolute";
        hintDiv.style.color = "white";
        hintDiv.style.fontSize = "18px";
        hintDiv.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
        hintDiv.style.padding = "8px";
        hintDiv.style.borderRadius = "5px";
        hintDiv.style.textAlign = "center";
        hintDiv.textContent = "Appuyez sur 'F' pour répondre à l'opération";
        document.body.appendChild(hintDiv);
    }

    const doorPosition = new THREE.Vector3();
    door.getWorldPosition(doorPosition);

    const canvas = document.querySelector("canvas");
    const doorScreenPosition = doorPosition.project(camera);
    hintDiv.style.left = `${(doorScreenPosition.x * 0.5 + 0.5) * canvas.clientWidth}px`;
    hintDiv.style.top = `${(-doorScreenPosition.y * 0.5 + 0.5) * canvas.clientHeight}px`;

    hintDiv.style.display = "block";
}

// Fonction pour masquer l'indication
function hideHint() {
    const hintDiv = document.getElementById("hintDiv");
    if (hintDiv) {
        hintDiv.style.display = "none";
    }
}

// Fonction pour afficher ou masquer la boîte modale avec l'opération mathématique
function toggleOperationModal() {
    if (isOperationVisible) {
        hideOperationModal(); // Masquer la boîte si elle est déjà visible
    } else {
        showOperationModal(); // Afficher la boîte si elle n'est pas visible
    }
}

// Fonction pour afficher la boîte modale avec l'opération
function showOperationModal() {
    let modalDiv = document.getElementById("operationModal");
    if (!modalDiv) {
        modalDiv = document.createElement("div");
        modalDiv.id = "operationModal";
        modalDiv.style.position = "fixed";
        modalDiv.style.top = "50%";
        modalDiv.style.left = "50%";
        modalDiv.style.transform = "translate(-50%, -50%)";
        modalDiv.style.color = "black";
        modalDiv.style.fontSize = "24px";
        modalDiv.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
        modalDiv.style.border = "2px solid black";
        modalDiv.style.borderRadius = "8px";
        modalDiv.style.padding = "20px";
        modalDiv.style.textAlign = "center";
        modalDiv.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.5)";
        modalDiv.style.zIndex = "1000";

        // Afficher l'opération
        const operationTextDiv = document.createElement("div");
        operationTextDiv.textContent = operationText;
        modalDiv.appendChild(operationTextDiv);

        // Ajouter un champ de saisie pour la réponse
        const answerInput = document.createElement("input");
        answerInput.type = "number";
        answerInput.id = "answerInput";
        answerInput.style.marginTop = "10px";
        modalDiv.appendChild(answerInput);

        // Ajouter une instruction pour soumettre avec "Enter"
        const submitHint = document.createElement("p");
        submitHint.style.fontSize = "14px";
        submitHint.style.color = "gray";
        submitHint.textContent = "Appuyez sur 'Enter' pour soumettre votre réponse";
        modalDiv.appendChild(submitHint);

        document.body.appendChild(modalDiv);
    }

    modalDiv.style.display = "block";
    isOperationVisible = true;
}

// Fonction pour masquer la boîte modale
function hideOperationModal() {
    const modalDiv = document.getElementById("operationModal");
    if (modalDiv) {
        modalDiv.style.display = "none";
    }
    isOperationVisible = false;
}

// Fonction pour vérifier la réponse du joueur
function checkAnswer() {
    const answerInput = document.getElementById("answerInput");
    const playerAnswer = parseInt(answerInput.value, 10);

    if (playerAnswer === correctAnswer) {
        hideOperationModal();
        showSuccessAnimation(); // Affiche l'animation de succès
        openDoorAnimation(); // Lance l'animation d'ouverture de la porte
    } else {
        alert("Mauvaise réponse, essayez encore !");
        answerInput.value = ""; // Effacer la réponse pour une nouvelle tentative
    }
}

// Fonction pour afficher une animation de succès
function showSuccessAnimation() {
    let successDiv = document.createElement("div");
    successDiv.textContent = "Bonne réponse !";
    successDiv.style.position = "fixed";
    successDiv.style.top = "50%";
    successDiv.style.left = "50%";
    successDiv.style.transform = "translate(-50%, -50%)";
    successDiv.style.fontSize = "32px";
    successDiv.style.color = "green";
    successDiv.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
    successDiv.style.padding = "20px";
    successDiv.style.borderRadius = "8px";
    successDiv.style.boxShadow = "0px 0px 10px rgba(0, 255, 0, 0.5)";
    successDiv.style.zIndex = "1000";
    successDiv.style.opacity = "0";
    successDiv.style.transition = "opacity 1s ease";

    document.body.appendChild(successDiv);

    // Animation d'affichage et de disparition
    setTimeout(() => {
        successDiv.style.opacity = "1";
    }, 100);
    setTimeout(() => {
        successDiv.style.opacity = "0";
        setTimeout(() => {
            successDiv.remove();
            // Rediriger vers la page missions après l'animation
            window.location.href = '/missions';
        }, 1000); // Attendre la fin de l'animation avant de retirer
    }, 2000);
}

// Fonction pour animer l'ouverture de la porte
function openDoorAnimation() {
    const doorOpenDuration = 2000; // Durée de l'animation en ms
    const initialPosition = door.position.z;
    const finalPosition = initialPosition + 3; // Distance de déplacement

    let startTime = null;

    function animateDoorOpening(time) {
        if (!startTime) startTime = time;
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / doorOpenDuration, 1);

        // Déplacer la porte le long de l'axe Z
        door.position.z = initialPosition + progress * (finalPosition - initialPosition);

        if (progress < 1) {
            requestAnimationFrame(animateDoorOpening);
        }
    }

    requestAnimationFrame(animateDoorOpening);
}

// Écouteur d'événements pour basculer ou soumettre la boîte modale avec "F" et soumettre avec "Enter"
document.addEventListener('keydown', (event) => {
    if (event.key === 'f') {
        if (!isOperationVisible) {
            showOperationModal(); // Affiche la boîte modale
        } else {
            checkAnswer(); // Vérifie la réponse si la boîte modale est déjà ouverte
        }
    } else if (event.key === 'Enter' && isOperationVisible) {
        checkAnswer(); // Vérifie la réponse si la boîte modale est ouverte
    }
});
