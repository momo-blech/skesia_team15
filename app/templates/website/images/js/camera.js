let offset = new THREE.Vector3(0, 2, -5); // Position initiale de la caméra
let currentOffset = offset.clone(); // Offset ajustable
const raycaster = new THREE.Raycaster(); // Raycaster pour détecter les collisions

function setupCameraFollow(character) {
    if (character) {
        camera.position.set(
            character.position.x + currentOffset.x,
            character.position.y + currentOffset.y,
            character.position.z + currentOffset.z
        );
        camera.lookAt(character.position);
    }
}

function updateCamera(walls) {
    if (character) {
        // Calculer la position cible de la caméra avec l'offset normal
        const targetPosition = new THREE.Vector3(
            character.position.x + offset.x,
            character.position.y + offset.y,
            character.position.z + offset.z
        );

        // Configurer le raycaster pour vérifier les collisions de la caméra vers le personnage
        const direction = new THREE.Vector3().subVectors(character.position, targetPosition).normalize();
        raycaster.set(targetPosition, direction);

        // Vérifier les intersections entre la caméra et les murs
        const intersects = raycaster.intersectObjects(walls, true);

        if (intersects.length > 0 && intersects[0].distance < offset.length()) {
            // Si un mur est détecté, rapprocher la caméra du personnage
            const collisionDistance = intersects[0].distance - 0.5; // Ajouter une marge pour éviter de coller au mur
            currentOffset.setLength(collisionDistance); // Ajuster la longueur de l'offset
        } else {
            // Si aucun mur n'est détecté, revenir progressivement à la position normale
            currentOffset.lerp(offset, 0.1);
        }

        // Mettre à jour la position de la caméra en fonction de l'offset ajusté
        const cameraTargetPosition = character.position.clone().add(currentOffset);
        camera.position.lerp(cameraTargetPosition, 0.05);
        camera.lookAt(character.position);
    }
}
