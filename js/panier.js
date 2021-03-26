// Création d'une variable incluant les éléments produits et le formulaire

const command={
    products:[],
    contact: {
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        email: ''
    },
};

const mySection = document.getElementById('detail');

const myDiv=document.createElement('div');

mySection.appendChild(myDiv);

// Création d'un bouton pour la validation de la commande

const btn = document.createElement("button"); 
btn.innerHTML = "Valider la commande";

// Fonction pour la saisie du formulaire

btn.addEventListener('click', function(event){ 
    event.stopPropagation();
    event.preventDefault();
    command.contact.firstName=document.getElementById('firstname').value;
    command.contact.lastName=document.getElementById('name').value;
    command.contact.address=document.getElementById('adresse').value;
    command.contact.city=document.getElementById('ville').value;
    command.contact.email=document.getElementById('email').value;
    if (command.contact.firstName.length < 1){
        return alert('Merci de préciser un prénom valide.')
    }
    if (command.contact.lastName.length < 1){
        return alert('Merci d\'indiquer un nom valide')
    }
    if (command.contact.address.length < 10){
        return alert('Merci de saisir une adresse valide')
    }
    if (command.contact.city.length < 2){
        return alert('Merci d\'indiquer une ville valide')
    }
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(command.contact.email))){ // Condition pour vérifier un email valide
        return alert('L\'adresse mail n est pas valide')
    }
    localStorage.setItem("firstName", command.contact.firstName);
    localStorage.setItem("lastName", command.contact.lastName);
    post("http://localhost:3000/api/teddies/order/", command).then( function(response) // Récupération de la requête POST
    {localStorage.setItem("panier", JSON.stringify({}));
    localStorage.setItem("orderConfirmation", response.orderId);})
    
    alert("Valider la commande");
    window.location.href = "confirmation.html";
    });
    
document.querySelector('form').appendChild(btn);

// Fonction sur la gestion du panier dans le local storage

function getPanier ()
{
    let panier = JSON.parse(localStorage.getItem("panier"));
    if (panier === null){
        panier= {};
    }

    return panier
}

const panier=getPanier()

const tbody=document.querySelector("table.styled-table tbody");

let totalPanier=0;

for (var productIdentifier in panier) 
{
    if (!panier.hasOwnProperty(productIdentifier )) continue;
    const produit = panier[productIdentifier];
    command.products.push(produit._id)
    // Création d'un tableau afin d'afficher les éléments du panier
    const produitLigne = `
        <tr data-product-identifier="${productIdentifier}">
            <td class="name">${produit.name}</td>
            <td class="image"><img src="${produit.imageUrl}"/></td>
            <td class="color">${produit.variation}</td>
            <td class="prix">${produit.prix} €</td>
            <td class="quantity">${produit.quantity}</td>
            <td class="total">${produit.quantity*produit.prix} €</td>
            <td class="actionContainer"><button class="delete">-1</button></td> 
        </tr>`;
    tbody.insertAdjacentHTML("beforeend", produitLigne);
    totalPanier+=(produit.quantity*produit.prix); // Calcul du total
    localStorage.setItem("totalPrice", totalPanier);
    document.querySelector(`tr[data-product-identifier="${productIdentifier}"] button.delete`).addEventListener('click', function(e){
        
        const parentTr = e.target.parentNode.parentNode
    
        const productIdentifierToUpdate=parentTr.dataset.productIdentifier;
        removeProductQuantityFromCart(productIdentifierToUpdate);
        window.location.href = "panier.html";
    });
}

const totalPanierContainer = document.querySelector("table.styled-table #total-price");
totalPanierContainer.innerHTML=totalPanier + " €";

// Fonction pour supprimer un élément du panier

function removeProductQuantityFromCart(productIdentifierToUpdate){
    
    const panierToUpdate=JSON.parse(localStorage.getItem('panier'));
    
    const productToUpdate=panierToUpdate[productIdentifierToUpdate];
   
    productToUpdate.quantity -=1;
    if (productToUpdate.quantity==0){
        delete panierToUpdate[productIdentifierToUpdate];
    }
    else{
        panierToUpdate[productIdentifierToUpdate]=productToUpdate;
    }
    localStorage.setItem("panier", JSON.stringify(panierToUpdate));
}


