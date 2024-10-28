let fairy;
let messageElement;
let fairyMixer;
let droneLoaded = false; // Indicateur pour vérifier si le drone est déjà chargé
const loader = new THREE.GLTFLoader();

function createFairy() {
     // Vérifie si `scene` est défini et si le drone n'est pas déjà chargé
            loader.load(
                '/static/models/mech_drone.glb',
                (gltf) => {
                    console.log("Modèle de drone chargé");
                    fairy = gltf.scene;
                    fairy.scale.set(2, 2, 2);  // Ajustez l'échelle si nécessaire
                    fairy.position.set(0, 1, 0); // Placez le drone dans le champ de vision
                    //fairy.castShadow = true;
                    //fairy.receiveShadow = true;
                    scene.add(fairy); // Ajoutez le drone à la scène
                    fairyMixer = new THREE.AnimationMixer(fairy);

                     if (gltf.animations && gltf.animations.length > 0) {
                const action = fairyMixer.clipAction(gltf.animations[0]); // Prendre la première animation
                action.play(); // Démarrer l'animation
                console.log("Animation du drone activée");
            } else {
                console.log("Aucune animation trouvée dans le modèle de drone.");
            }
                    droneLoaded = true; // Marque le drone comme chargé

                },
                undefined,
                (error) => {
                    console.error("Erreur lors du chargement du modèle de drone:", error);
                }
            );
}

function setupFairy(scene) {
    createFairy();
}

function setupMessageElement() {
    // Créer l'élément DOM pour le message
    messageElement = document.createElement('div');
    messageElement.style.position = 'absolute';
    messageElement.style.color = 'white';
    messageElement.style.fontSize = '20px';
    messageElement.style.display = 'none';
    messageElement.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    messageElement.style.padding = '5px';
    messageElement.style.borderRadius = '5px';
    messageElement.textContent = "Message de la fée !";
    document.body.appendChild(messageElement);
}

setupMessageElement();

function updateMessagePosition(camera) {
    if (messageElement && fairy) {
        const fairyPosition = new THREE.Vector3();
        fairy.getWorldPosition(fairyPosition);

        // Projetez la position de la fée dans les coordonnées de l'écran
        fairyPosition.project(camera);

        // Convertissez les coordonnées normalisées en pixels pour l'écran
        const x = (fairyPosition.x * 0.5 + 0.5) * window.innerWidth;
        const y = (-(fairyPosition.y * 0.5) + 0.5) * window.innerHeight;

        // Placez le message exactement sur la fée
        messageElement.style.left = `${x}px`;
        messageElement.style.top = `${y}px`;
    }
}

function showMessage(message, camera) {
    if (messageElement) {
        messageElement.textContent = message;
        messageElement.style.display = 'block';
        updateMessagePosition(camera); // Assure que le message est bien placé dès son affichage
    }
}

// Écouteur pour afficher le message lorsque la touche "E" est pressée
document.addEventListener('keydown', (event) => {
    if (event.key === 'e') {
        console.log('Message affiché');
        showMessage("Message de la fée !", camera);
    }
});

function updateFairy(character, camera, delta) {
    if (fairy && character) {
         // Vérification de la fréquence d'appel

        const rightDirection = new THREE.Vector3(1, 0, 0);
        character.getWorldDirection(rightDirection);
        const offsetRight = new THREE.Vector3().crossVectors(rightDirection, new THREE.Vector3(0, 1, 0)).normalize();
        // Place la fée à droite du personnage avec un léger mouvement de haut en bas
        fairy.position.set(
            character.position.x + offsetRight.x * 1.5  , // Décalage à droite
            character.position.y + 1.5+ Math.sin(Date.now() * 0.003) * 0.5, // Légèrement au-dessus du sol
            character.position.z + offsetRight.z * 2
        );
        fairy.rotation.copy(character.rotation);
        updateMessagePosition(camera);
    }
     if (fairyMixer) {
        fairyMixer.update(delta);
    }
}
