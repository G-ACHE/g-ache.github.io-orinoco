// Fonction pour la confirmation de la commande
function addConfirmationText(){
    const confirmationId = localStorage.getItem("orderConfirmation");
    const totalPrice = localStorage.getItem("totalPrice");
    const prenomConfirmation = localStorage.getItem("firstName");
    const nomConfirmation = localStorage.getItem("lastName")
    const confirmation = document.getElementById("confirmation");
    const visualName = document.createElement("p");
    const messageConfirmation = document.createElement("p");
    const confirmationPrice = document.createElement("p");
    visualName.innerHTML = "Bonjour "+ prenomConfirmation+ " "+ nomConfirmation;
    messageConfirmation.innerHTML = "Nous vous remercions pour votre commande n° "+ confirmationId;
    confirmationPrice.innerHTML = "Prix total de votre commande: "+ totalPrice + "€";
    messageConfirmation.setAttribute("class", "confirmation-title")
    confirmation.appendChild(visualName);
    confirmation.appendChild(messageConfirmation);
    confirmation.appendChild(confirmationPrice);
}

addConfirmationText();

