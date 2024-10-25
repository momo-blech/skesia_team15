function createDoor(scene, position) {
    const doorMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const doorHeight = 2;
    const doorWidth = 0.1;
    const doorDepth = 1;

    const geometry = new THREE.BoxGeometry(doorWidth, doorHeight, doorDepth);
    const door = new THREE.Mesh(geometry, doorMaterial);
    door.position.set(position.x, doorHeight / 2, position.z);
    door.castShadow = true;
    door.receiveShadow = true;

    scene.add(door);
    console.log("Door created at position:", position);
    return door; // Retourner la porte
}
