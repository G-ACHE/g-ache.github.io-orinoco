// Fonction sur l'appel de l'api avec l'insertion des teddies dans la page html
async function core(){
    const teddies=await get('http://localhost:3000/api/teddies');

    const mySection=document.getElementById('produit');

    const insertName = (name,div) =>{
        const h2 = document.createElement("h2");
        h2.innerHTML=name;
        div.appendChild(h2)
    }

    const insertImage=(img,div)=>{
        const myImg=document.createElement("img");
        myImg.src=img;
        div.appendChild(myImg)
    }

    const insertPrice = (price,div)=>{
        const h3 = document.createElement("h3");
        h3.innerHTML=price+"€";
        div.appendChild(h3)
    }

    const insertDescription = (description,div)=>{
        const h4 = document.createElement("h4");
        h4.innerHTML=description;
        div.appendChild(h4)
    }

    for(let i=0;i<teddies.length;i++){
        let myLink = document.createElement("a");
        myLink.href=`/produit.html?_id=${teddies[i]._id}`// Selection du produit avec son id
        myLink.classList.add(teddies[i]._id)
        mySection.appendChild(myLink)
        insertName(teddies[i].name,myLink)
        insertImage(teddies[i].imageUrl,myLink)
        insertPrice(teddies[i].price,myLink)
        insertDescription(teddies[i].description,myLink)
    }
}

core()

