function generateMaze(scene) {
    const textureLoader = new THREE.TextureLoader();

    // Charger la texture de mur
    const wallTexture = textureLoader.load(
        '/static/images/wall-texture.jpg', // Chemin vers la texture des murs
        function (texture) {
            console.log("Texture des murs chargée avec succès");
        },
        undefined,
        function (err) {
            console.error("Erreur lors du chargement de la texture des murs :", err);
        }
    );

    // Charger la texture du sol
    const floorTexture = textureLoader.load(
        '/static/images/stone.jpg', // Chemin vers la texture du sol
        function (texture) {
            console.log("Texture du sol chargée avec succès");
        },
        undefined,
        function (err) {
            console.error("Erreur lors du chargement de la texture du sol :", err);
        }
    );

    // Appliquer la texture aux matériaux
    const wallMaterial = new THREE.MeshStandardMaterial({
        map: wallTexture,
        roughness: 0.8, // Ajustez pour donner un aspect réaliste aux murs
    });

    const floorMaterial = new THREE.MeshStandardMaterial({
        map: floorTexture,
        roughness: 0.9, // Ajustez pour donner un aspect réaliste au sol
    });

    const wallThickness = 0.5;
    const wallHeight = 3; // Hauteur des murs
    const roomSize = 10; // Taille de la pièce

    const walls = []; // Tableau pour stocker les murs

    // Création des murs (comme avant)
    const leftWall = new THREE.Mesh(new THREE.BoxGeometry(wallThickness, wallHeight, roomSize), wallMaterial);
    leftWall.position.set(-roomSize / 2, wallHeight / 2, 0);
    leftWall.castShadow = true;
    scene.add(leftWall);
    walls.push(leftWall);

    const rightWall = new THREE.Mesh(new THREE.BoxGeometry(wallThickness, wallHeight, roomSize), wallMaterial);
    rightWall.position.set(roomSize / 2, wallHeight / 2, 0);
    rightWall.castShadow = true;
    scene.add(rightWall);
    walls.push(rightWall);

    const backWall = new THREE.Mesh(new THREE.BoxGeometry(roomSize, wallHeight, wallThickness), wallMaterial);
    backWall.position.set(0, wallHeight / 2, -roomSize / 2);
    backWall.castShadow = true;
    scene.add(backWall);
    walls.push(backWall);

    const frontWallLeft = new THREE.Mesh(new THREE.BoxGeometry(roomSize / 2 - 1, wallHeight, wallThickness), wallMaterial);
    frontWallLeft.position.set(-3, wallHeight / 2, roomSize / 2);
    frontWallLeft.castShadow = true;
    scene.add(frontWallLeft);
    walls.push(frontWallLeft);

    const frontWallRight = new THREE.Mesh(new THREE.BoxGeometry(roomSize / 2 - 1, wallHeight, wallThickness), wallMaterial);
    frontWallRight.position.set(3, wallHeight / 2, roomSize / 2);
    frontWallRight.castShadow = true;
    scene.add(frontWallRight);
    walls.push(frontWallRight);

    // Création du sol
    const floor = new THREE.Mesh(new THREE.BoxGeometry(roomSize, wallThickness, roomSize), floorMaterial);
    floor.position.set(0, -wallThickness / 2, 0); // Positionné au niveau du sol
    floor.receiveShadow = true;
    scene.add(floor);

    return walls;
}
