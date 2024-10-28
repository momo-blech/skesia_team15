let spherePanels = []; // Tableau pour stocker les panneaux sphériques
let ledLights = []; // Tableau pour stocker les lumières LED
const ceilingHeight = 10; // Hauteur du plafond
const roomSize = 50; // Taille de la pièce en termes de distance autour du centre

// Fonction pour créer un plafond futuriste avec des panneaux lumineux dynamiques et des tubes lumineux autour de la pièce
function createFuturisticCeiling(centerX, centerZ) {
    if (typeof scene === 'undefined') {
        console.error("La scène n'est pas initialisée. Assurez-vous que `scene` est accessible globalement.");
        return;
    }

    // Supprimer les anciennes sphères si la fonction est appelée plusieurs fois
    spherePanels.forEach((panel) => scene.remove(panel));
    ledLights.forEach((light) => scene.remove(light));
    spherePanels = [];
    ledLights = [];

    // Créer des panneaux lumineux sphériques
    const sphereGeometry = new THREE.SphereGeometry(1.5, 32, 32); // Géométrie sphérique
    const sphereMaterial = new THREE.MeshStandardMaterial({
        color: 0x00ffff,
        emissive: 0x0033ff,
        emissiveIntensity: 1.0,
        metalness: 0.6,
        roughness: 0.3
    });

    const spacing = 10; // Espacement entre les sphères

    // Générer les sphères uniquement dans la zone de la pièce
    for (let x = centerX - roomSize / 2; x <= centerX + roomSize / 2; x += spacing) {
        for (let z = centerZ - roomSize / 2; z <= centerZ + roomSize / 2; z += spacing) {
            let sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
            sphereMesh.position.set(x, ceilingHeight, z);
            scene.add(sphereMesh);
            spherePanels.push(sphereMesh);

            // Ajouter des lumières LED pour chaque sphère
            const ledLight = new THREE.PointLight(0x00ffff, 1, 15, 2);
            ledLight.position.set(x, ceilingHeight - 1, z);
            scene.add(ledLight);
            ledLights.push(ledLight);
        }
    }

    // Créer des tubes lumineux traversant le plafond
    const tubeMaterial = new THREE.MeshStandardMaterial({ emissive: 0xff00ff, emissiveIntensity: 2.0 });
    const tubeGeometry = new THREE.CylinderGeometry(0.2, 0.2, 100, 32); // Long tube

    for (let i = 0; i < 5; i++) {
        let tubeMesh = new THREE.Mesh(tubeGeometry, tubeMaterial);
        tubeMesh.position.set(
            (Math.random() - 0.5) * roomSize + centerX, // Limité à la zone de la pièce
            ceilingHeight - 1, // Position légèrement au-dessus des sphères
            (Math.random() - 0.5) * roomSize + centerZ // Limité à la zone de la pièce
        );
        tubeMesh.rotation.z = Math.PI / 2; // Tube à l'horizontal
        scene.add(tubeMesh);
    }

    // Changer la couleur du fond de la scène pour une couleur sombre
    scene.background = new THREE.Color(0x111111); // Gris très foncé pour un effet plus immersif
}

// Fonction pour animer le plafond (effet de lumière dynamique)
function animateFuturisticCeiling() {
    spherePanels.forEach((panel) => {
        panel.material.emissiveIntensity = 1.0 + 0.5 * Math.sin(Date.now() * 0.005);
    });

    // Animer les lumières LED pour un effet de scintillement futuriste
    ledLights.forEach((light) => {
        light.intensity = 1.5 + 0.5 * Math.sin(Date.now() * 0.01 + light.position.x);
    });
}

// Initialiser le plafond lorsque le script est chargé
document.addEventListener("DOMContentLoaded", () => {
    const centerX = 0; // Coordonnées du centre de la pièce
    const centerZ = 0;
    createFuturisticCeiling(centerX, centerZ); // Créer le plafond autour de la pièce
});

// Animation continue du plafond
function animateFuturisticCeilingLoop() {
    requestAnimationFrame(animateFuturisticCeilingLoop);
    animateFuturisticCeiling();
}

// Lancer l'animation en continu pour le plafond futuriste
animateFuturisticCeilingLoop();
