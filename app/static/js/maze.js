function generateMaze(scene, width, height) {
    const maze = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 1, 0, 0, 0, 1],
        [1, 0, 1, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 1, 0, 1],
        [1, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];

    const wallMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const wallHeight = 1;
    const walls = []; // Tableau pour stocker les murs

    for (let row = 0; row < maze.length; row++) {
        for (let col = 0; col < maze[row].length; col++) {
            if (maze[row][col] === 1) {
                const geometry = new THREE.BoxGeometry(1, wallHeight, 1);
                const wall = new THREE.Mesh(geometry, wallMaterial);
                wall.position.set(col - maze[0].length / 2 + 0.5, wallHeight / 2, row - maze.length / 2 + 0.5);
                wall.castShadow = true;
                wall.receiveShadow = true;
                scene.add(wall);
                walls.push(wall); // Ajouter le mur au tableau
            }
        }
    }
    return walls; // Retourner le tableau des murs
}
