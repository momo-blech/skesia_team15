// Variable pour suivre l'état d'ouverture du livre
let isBookOpen = false;
let isTextAnimated = false; // Contrôle si l'animation de texte a déjà été jouée

// Fonction pour afficher le livre avec une animation de texte
function openBook() {
    // Désactive les contrôles du jeu
    isBookOpen = true;

    let bookDiv = document.createElement("div");
    bookDiv.id = "bookDiv";
    bookDiv.style.position = "fixed";
    bookDiv.style.top = "50%";
    bookDiv.style.left = "50%";
    bookDiv.style.width = "60vw";
    bookDiv.style.height = "70vh";
    bookDiv.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
    bookDiv.style.display = "flex";
    bookDiv.style.justifyContent = "center";
    bookDiv.style.alignItems = "center";
    bookDiv.style.opacity = 0;
    bookDiv.style.transform = "translate(-50%, -50%) scale(0.8)";
    bookDiv.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    bookDiv.style.zIndex = "1000";
    bookDiv.style.borderRadius = "10px";
    bookDiv.style.overflow = "hidden";

    // Ajouter l'image de fond
    const bookImage = document.createElement("img");
    bookImage.src = "/static/images/book.jpeg"; // Assurez-vous que l'image est bien accessible
    bookImage.style.width = "100%";
    bookImage.style.height = "100%";
    bookImage.alt = "Image de fond du livre";
    bookImage.style.position = "absolute";
    bookDiv.appendChild(bookImage);

    // Ajouter le texte par-dessus l'image avec animation
    const textOverlay = document.createElement("div");
    textOverlay.id = "textOverlay";
    textOverlay.style.position = "absolute";
    textOverlay.style.color = "black";
    textOverlay.style.fontSize = "2rem";
    textOverlay.style.textAlign = "center";
    textOverlay.style.width = "80%";
    textOverlay.style.top = "30%"; // Positionner le texte où vous le souhaitez
    textOverlay.style.padding = "10px";
    textOverlay.style.backgroundColor = "rgba(255, 255, 255, 0.8)"; // Fond semi-transparent
    textOverlay.style.borderRadius = "8px"; // Coins arrondis
    bookDiv.appendChild(textOverlay);

    if (!isTextAnimated) {
        animateText("Voici votre texte personnalisé sur l'image.", textOverlay);
        isTextAnimated = true; // Marquer l'animation comme jouée
    } else {
        textOverlay.textContent = "Voici votre texte personnalisé sur l'image."; // Texte complet sans animation
    }

    // Créer un bouton pour fermer le livre
    const closeButton = document.createElement("button");
    closeButton.textContent = "Fermer le livre";
    closeButton.style.position = "absolute";
    closeButton.style.bottom = "10px";
    closeButton.style.right = "10px";
    closeButton.style.zIndex = "3"; // Au-dessus de l'image et du texte
    closeButton.onclick = closeBook;
    bookDiv.appendChild(closeButton);

    document.body.appendChild(bookDiv);

    // Déclencher l'animation avec un léger délai pour laisser l'élément se charger
    setTimeout(() => {
        bookDiv.style.opacity = 1;
        bookDiv.style.transform = "translate(-50%, -50%) scale(1)";
    }, 10);
}

// Fonction d'animation de texte de type "machine à écrire"
function animateText(text, element) {
    let index = 0;
    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, 50); // Délai entre chaque lettre (ajustez pour accélérer ou ralentir l'animation)
        }
    }
    type();
}

// Fonction pour masquer le livre avec une animation de fermeture
function closeBook() {
    const bookDiv = document.getElementById("bookDiv");
    if (bookDiv) {
        bookDiv.style.opacity = 0;
        bookDiv.style.transform = "translate(-50%, -50%) scale(0.8)";
        setTimeout(() => {
            bookDiv.remove();
            isBookOpen = false; // Réactiver les contrôles du jeu
        }, 500);
    }
}

// Fonction pour basculer l'état d'ouverture du livre
function toggleBook() {
    if (isBookOpen) {
        closeBook();
    } else {
        openBook();
    }
}
