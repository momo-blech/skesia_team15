let mixer, walkAction, jumpAction, idleAction, currentAction;

function loadCharacter(scene, callback) {
    const loader = new THREE.GLTFLoader();
    loader.load('https://threejs.org/examples/models/gltf/RobotExpressive/RobotExpressive.glb', function (gltf) {
        const robot = gltf.scene;
        robot.scale.set(0.5, 0.5, 0.5);  // Ajuster l'échelle
        robot.position.set(0, 0, 0);     // Positionner le robot dans la scène
        robot.traverse(function (node) {
            if (node.isMesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });

        // Ajouter le modèle à la scène
        scene.add(robot);
        callback(robot);

        // Initialiser le mixer et les animations
        mixer = new THREE.AnimationMixer(robot);
        const animations = gltf.animations;

        if (animations && animations.length) {
            // Configurer les actions spécifiques
            walkAction = mixer.clipAction(animations.find(clip => clip.name === 'Walking'));
            jumpAction = mixer.clipAction(animations.find(clip => clip.name === 'Jump'));
            idleAction = mixer.clipAction(animations.find(clip => clip.name === 'Idle'));

            // Définir l'animation par défaut sur "Idle"
            currentAction = idleAction;
            currentAction.play();
        }

        console.log("GLTF model loaded successfully with animations");
    }, undefined, function (error) {
        console.error('An error occurred while loading the GLTF model:', error);
    });
}

function updateControls(character, camera, delta) {
    if (character) {
        const direction = new THREE.Vector3();
        camera.getWorldDirection(direction);
        direction.y = 0;
        direction.normalize();

        // Déplacements avant et arrière
        if (moveForward || moveBackward) {
            const moveDirection = moveForward ? 1 : -1;
            character.position.add(direction.clone().multiplyScalar(moveDirection * moveSpeed));
            character.lookAt(character.position.x + direction.x, character.position.y, character.position.z + direction.z);
            setAction(walkAction);  // Activer l'animation de marche
        } else if (!isJumping) {
            setAction(idleAction);  // Activer l'animation d'inactivité si aucune touche n'est pressée et que le personnage n'est pas en train de sauter
        }

        // Déplacements gauche et droite
        const rightDirection = new THREE.Vector3();
        camera.getWorldDirection(rightDirection);
        rightDirection.cross(new THREE.Vector3(0, 1, 0));
        rightDirection.normalize();

        if (moveLeft) {
            character.position.add(rightDirection.clone().multiplyScalar(-moveSpeed));
            setAction(walkAction);  // Activer l'animation de marche
        }
        if (moveRight) {
            character.position.add(rightDirection.clone().multiplyScalar(moveSpeed));
            setAction(walkAction);  // Activer l'animation de marche
        }

        // Logique de saut
        if (isJumping) {
            character.position.y += verticalVelocity; // Appliquer la vitesse de saut
            verticalVelocity -= gravity; // Appliquer la gravité pour redescendre

            if (character.position.y <= 0) { // Si le personnage touche le sol
                character.position.y = 0; // Réinitialiser la position au sol
                isJumping = false; // Terminer le saut
                verticalVelocity = 0; // Réinitialiser la vitesse verticale
                setAction(idleAction);  // Retour à l'animation d'inactivité
            }
        }

        // Mettre à jour le mixer pour que les animations se déroulent correctement
        if (mixer) mixer.update(delta);
    }
}

function setAction(action) {
    if (currentAction !== action) {
        if (currentAction) {
            currentAction.fadeOut(0.2);  // Atténuer l'ancienne animation
        }
        currentAction = action;
        currentAction.reset().fadeIn(0.2).play();  // Atténuer et démarrer la nouvelle animation
    }
}