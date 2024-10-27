let scene, camera, renderer, character;
let mazeWalls = []; // Tableau pour stocker les murs de la pièce
let door; // Variable pour la porte
let clock = new THREE.Clock(); // Initialiser le clock pour le delta time

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1E1E3F); // Couleur d'arrière-plan

    // Configuration de la caméra pour voir toute la pièce
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 10); // Position de la caméra pour être à l'avant du personnage
    camera.lookAt(0, 0, 0); // Oriente la caméra vers le centre de la scène

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);

    // Ajout de la lumière ambiante et directionnelle
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Utilisez `generateMaze` pour créer la pièce avec quatre murs autour du personnage
    mazeWalls = generateMaze(scene);

    // Charger le personnage (robot) et le placer au centre de la pièce
    loadCharacter(scene, (loadedCharacter) => {
        character = loadedCharacter;
        character.position.set(0, 0, 0); // Centré dans la pièce
        setupControls(character);
        setupCameraFollow(character);

        // Créer et positionner la porte dans le mur avant
        door = createDoor(); // Créer la porte en appelant createDoor()
        door.position.set(0, 1.4, 5); // Position de la porte dans le mur avant
        scene.add(door); // Ajouter la porte à la scène

        setupMouseControls(camera); // Initialiser les contrôles de la souris
        animate(); // Démarrer l'animation une fois les éléments chargés
    });
}

function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();

    if (character && mixer) mixer.update(delta);

    updateControls(character, camera, delta);

    if (character && Array.isArray(mazeWalls) && door) {
        checkCollisions(character, mazeWalls, door);
        updateMouseControls(camera, character);

        // Appeler la fonction d'indication pour afficher le message sur la porte
        displayOperationHint(door, character);
    }

    updateCamera(mazeWalls); // Met à jour la caméra en fonction des collisions

    renderer.render(scene, camera);
}

init();
