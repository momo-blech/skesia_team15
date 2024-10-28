let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
const moveSpeed = 0.1;
let isJumping = false;
const jumpHeight = 0.25;
const gravity = 0.01;
let verticalVelocity = 0;

function setupControls(character) {
    document.addEventListener('keydown', (event) => {

        switch (event.key) {
            case 'z': // Avancer
                moveForward = true;
                setAction(walkAction);
                break;
            case 's': // Reculer
                moveBackward = true;
                setAction(walkAction);
                break;
            case 'q': // Gauche
                moveLeft = true;
                setAction(walkAction);
                break;
            case 'd': // Droite
                moveRight = true;
                setAction(walkAction);
                break;
            case ' ': // Saut
                if (!isJumping) { // Lancer le saut seulement si le personnage n'est pas déjà en l'air
                    verticalVelocity = jumpHeight;
                    isJumping = true;
                    setAction(jumpAction);
                }
                break;
            case 'b': // Ouvrir/fermer le livre avec la touche "B"
                toggleBook(); // Appel à la fonction de bookToggle.js
                break;

        }
    });

    document.addEventListener('keyup', (event) => {

        switch (event.key) {
            case 'z':
                moveForward = false;
                break;
            case 's':
                moveBackward = false;
                break;
            case 'q':
                moveLeft = false;
                break;
            case 'd':
                moveRight = false;
                break;
        }

        // Si aucune touche de déplacement n'est active et que le personnage n'est pas en train de sauter, revenir à l'inactivité
        if (!moveForward && !moveBackward && !moveLeft && !moveRight && !isJumping) {
            setAction(idleAction);
        }
    });
}

// Fonction pour vérifier si l'opération est affichée, puis vérifier la réponse
function submitAnswer() {
    const operationDiv = document.getElementById("operationDiv");
    if (operationDiv && operationDiv.style.display === "block") {
        checkAnswer(); // Appeler checkAnswer seulement si l'opération est affichée
    }
}

function updateControls(character, camera) {
    if (character) {
        const direction = new THREE.Vector3();

        // Calcul de la direction en fonction de la caméra
        camera.getWorldDirection(direction);
        direction.y = 0;
        direction.normalize();

        // Déplacements avant et arrière
        if (moveForward) {
            character.position.add(direction.clone().multiplyScalar(moveSpeed));
            character.lookAt(character.position.x + direction.x, character.position.y, character.position.z + direction.z);
        }
        if (moveBackward) {
            character.position.add(direction.clone().multiplyScalar(-moveSpeed));
            character.lookAt(character.position.x + direction.x, character.position.y, character.position.z + direction.z);
        }

        // Déplacements gauche et droite
        const rightDirection = new THREE.Vector3();
        camera.getWorldDirection(rightDirection);
        rightDirection.cross(new THREE.Vector3(0, 1, 0));
        rightDirection.normalize();

        if (moveLeft) {
            character.position.add(rightDirection.clone().multiplyScalar(-moveSpeed));
        }
        if (moveRight) {
            character.position.add(rightDirection.clone().multiplyScalar(moveSpeed));
        }

        // Logique de saut
        if (isJumping) {
            character.position.y += verticalVelocity; // Appliquer la vitesse de saut
            verticalVelocity -= gravity; // Appliquer la gravité pour descendre après le saut

            if (character.position.y <= 0) { // Revenir au sol
                character.position.y = 0;
                isJumping = false;
                verticalVelocity = 0;
            }
        }
    }
}
