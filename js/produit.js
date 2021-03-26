// insert le nom du teddies dans la page HTML

const insertName = (name,div) =>{
    const h2 = document.createElement("h2");
    h2.innerHTML=name;
    div.appendChild(h2)
}

// insert l'image correspondante dans la page HTML

const insertImage=(img,div)=>{
    const myImg=document.createElement("img");
    myImg.src=img;
    div.appendChild(myImg)
}

// insert le prix du produit dans la page HTML

const insertPrice = (price,div)=>{
    const h3 = document.createElement("h3");
    h3.innerHTML=price+"€";
    div.appendChild(h3)
}

// insert la description de l'ourson dans la page HTML

const insertDescription = (description,div)=>{
    const h4 = document.createElement("h4");
    h4.innerHTML=description;
    div.appendChild(h4)
}

// Fonction sur le choix de la couleur 

const insertChoices = (choices,div)=>{
    const select = document.createElement("select");
    div.appendChild(select)
    for (let index = 0; index < choices.length; index++) {
        const choice = choices[index];
        const option = document.createElement("option")
        option.value=choice;
        option.innerHTML=choice;
        select.appendChild(option)
    }
}

// Fonction pour ajouter les éléments dans la page HTLM

async function core(){
    const _id=window.location.search.substr(1).split('=')[1] // Obtiens l'id du produit

    const produit = await get("http://localhost:3000/api/teddies/" + _id) // Appel de l'api et l'id du produit

    const mySection = document.getElementById('choice');

    const myDiv=document.createElement('div');

    mySection.appendChild(myDiv);

    insertName(produit.name, myDiv)
    insertImage(produit.imageUrl, myDiv)
    insertPrice(produit.price, myDiv)
    insertDescription(produit.description, myDiv)
    insertChoices(produit.colors, myDiv)

    myDiv.classList.add(produit._id)

// Fonction pour le localStorage

    function addOurson(product)
    {
        let panier = JSON.parse(localStorage.getItem("panier")); // Création de notre stockage
        if (panier === null){
            panier= {};
        }

        let productIdentifier = product._id+product.variation;

        if (panier[productIdentifier]) {
            panier[productIdentifier].quantity++;
        }
            
        else {
            product.quantity=1;
            panier[productIdentifier] = product;
        }
        localStorage.setItem("panier", JSON.stringify(panier));
    }
// Création d'une alerte lors de l'ajout au panier

    const btn = document.createElement("button"); 
    btn.innerHTML = "ajouter au panier";

// Fonction pour l'ajout au panier

    btn.addEventListener('click', function(){ 
        const variation = document.getElementsByTagName("select");         
        const selectedVariation = variation[0].value;

        addOurson({
            _id: produit._id,
            imageUrl:produit.imageUrl,
            name: produit.name,
            variation: selectedVariation,
            prix: produit.price
        });
        alert(produit.name + " - " + selectedVariation + " ajouté au panier"); // Création d'une alerte reprenant le produit ajouter
        window.location.href = "panier.html";
        });

    myDiv.appendChild(btn);
}

core();

