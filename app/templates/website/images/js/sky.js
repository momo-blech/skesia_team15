// starrySky.js

let stars = null; // Variable pour stocker les étoiles

// Fonction pour créer les étoiles et les ajouter à la scène
function createStars() {
    if (typeof scene === 'undefined') {
        console.error("La scène n'est pas initialisée. Assurez-vous que `scene` est accessible globalement.");
        return;
    }

    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });

    const starVertices = [];
    const starCount = 2000; // Nombre d'étoiles

    for (let i = 0; i < starCount; i++) {
        const x = (Math.random() - 0.5) * 1000;
        const y = (Math.random() - 0.5) * 1000;
        const z = (Math.random() - 0.5) * 1000;
        starVertices.push(x, y, z);
    }

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));

    stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
}

// Fonction pour animer les étoiles (rotation subtile)
function animateStars() {
    if (stars) {
        stars.rotation.y += 0.0001; // Rotation subtile pour simuler le mouvement du ciel
    }
}

// Initialiser les étoiles lorsque le script est chargé
document.addEventListener("DOMContentLoaded", () => {
    createStars();
});

// Animation continue des étoiles
function animateStarrySky() {
    requestAnimationFrame(animateStarrySky);
    animateStars();
}

// Lancer l'animation en continu pour le ciel étoilé
animateStarrySky();
