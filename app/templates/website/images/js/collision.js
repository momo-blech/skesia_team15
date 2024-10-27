function checkCollisions(character, walls, door) {
    // Créer une boîte de collision légèrement plus petite pour le personnage
    const characterBox = new THREE.Box3().setFromObject(character);

    // Réduire la boîte de collision du personnage
    const shrinkFactor = 0.1; // Ajustez ce facteur pour contrôler la distance aux murs
    characterBox.min.addScalar(shrinkFactor);
    characterBox.max.addScalar(-shrinkFactor);

    walls.forEach((wall, index) => {
        const wallBox = new THREE.Box3().setFromObject(wall);
        if (characterBox.intersectsBox(wallBox)) {
            console.log(`Collision détectée avec le mur ${index} !`);
            handleCollision(character, wallBox);
        }
    });

    if (door) {
        const doorBox = new THREE.Box3().setFromObject(door);
        if (characterBox.intersectsBox(doorBox)) {
            console.log("Collision détectée avec la porte !");
            handleCollision(character, doorBox);
        }
    }
}


// Fonction pour gérer la collision en empêchant le personnage de traverser
function handleCollision(character, obstacleBox) {
    // Boîte de délimitation actuelle du personnage
    const characterBox = new THREE.Box3().setFromObject(character);

    // Calcul de l'overlap sur les axes X et Z
    const overlapX = Math.min(
        characterBox.max.x - obstacleBox.min.x,
        obstacleBox.max.x - characterBox.min.x
    );
    const overlapZ = Math.min(
        characterBox.max.z - obstacleBox.min.z,
        obstacleBox.max.z - characterBox.min.z
    );

    // Vérifiez dans quelle direction la collision est la plus proche et ajustez la position
    if (Math.abs(overlapX) < Math.abs(overlapZ)) {
        // Collision principalement sur l'axe X, bloquer seulement sur cet axe
        if (character.position.x > obstacleBox.max.x) {
            character.position.x = obstacleBox.max.x + 1;
        } else {
            character.position.x = obstacleBox.min.x - 1;
        }
    } else {
        // Collision principalement sur l'axe Z, bloquer seulement sur cet axe
        if (character.position.z > obstacleBox.max.z) {
            character.position.z = obstacleBox.max.z + 1;
        } else {
            character.position.z = obstacleBox.min.z - 1;
        }
    }
}
