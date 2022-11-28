const queryString = window.location.search
const alphaId = location.search.substring(4)
//const alphaId = queryString.slice(5)
console.log(alphaId)
//const urlParams = new URLSearchParams(queryString)
//const productId = urlParams.get('id')
////if (id != null) {
//    let imgUrl, altText
//
//}


fetch('http://localhost:3000/api/products/107fb5b75607497b96722bda5b504926',{})              // suite au pb avec les lignes audessus j'utilise seulement cette id='107fb5b75607497b96722bda5b504926'
    .then((response)=> response.json())
    .then((res) => handleData(res))
    // tout ce qui suit est à l'intérieur du fetch
function handleData(Kanap){                                 //je récupère toute les donnéees du Kanap
    console.log({Kanap})
    const {altTxt, colors, description, imageUrl,name, price}= Kanap//et je les passe à make... de chacun d'esu
    imgUrl= imageUrl
    altText = altTxt
    makeImage(imageUrl, altTxt)
    makeColor(colors)
    makeDescription(description)
    makeTitle(name)
    makePrice(price)
}
function makeImage(imageUrl, altTxt){                       //pour chaque donnée respective je lui associe un élement corresponddant du html 
    const image = document.createElement('img')
    image.src = imageUrl
    image.alt = altTxt
    const parent= document.querySelector(".item__img")
    parent.appendChild(image)
}
function makeTitle(name){
    const h1 = document.querySelector("#title")
    h1.textContent = name
}
function makePrice(price) {
    const span = document.querySelector("#price")               //attention le prix à ne pas mettre dans le localstorage
    const h3 = document.querySelector("#price")
    h3.textContent = price
}
function makeDescription(description){
    const p = document.querySelector("#description")
    p.textContent = description
}
function makeColor(colors){
    const select = document.querySelector("#colors")
    if (select != null){
        colors.forEach((color) =>{
            const option = document.createElement("option")
            option.value = color
            option.textContent = color
            select.appendChild(option)
        })
    }
}


const button = document.querySelector("#addToCart")                 //le bouton panier on le relie via docuement querry
if (button != null){                                                // si le button est non null
    button.addEventListener("click",(e) => {                        //
        const color = document.querySelector("#colors").value
        const quantity = document.querySelector("#quantity").value
        if (isCartInvalid(color, quantity)) return
        saveCart (color, quantity)
        window.location.href = "cart.html"                              // dès le clique du bouton panier on est redirigé vers le panier
    })
}

function saveCart(color,quantity){
    const donnee = {
      //  _id: _id,                                       //       // toujours le meme problème avec l'id//
       color: color,
       quantity: Number(quantity),
       imageUrl : imgUrl, 
       altTxt : altText
   }                                                   //        // message d'erreur à cause du id et aussi sur le localstorage

    localStorage.setItem(/*_id,*/ JSON.stringify(donnee))               // on aura en local le id, la quantité et la couleur
}
                        // localStorage.setItem(/*_id,*/ JSON.stringify un problème à résoudre

function isCartInvalid(color, quantity){
    if (color == null || color === '' || quantity == null || quantity == 0){
        alert("Séléctionnez la couleur et la quantité, Merci !")// si on a pas séléctionné le prix ou la couleur
        return true                                             // veut dire arrète toi
    }                                                           // alors la popup affichera le message alerte
    
} 




// dans le localStorage.setItem je n'ai pas l'Id ni l'image ni le alttext
// dans le localStorage.setItem je ne sais pas comment j'ai pu récupérer l'url du 0 avec l'id "0557...ee7" 
//alors que mon id est 107fb5b75607497b96722bda5b504926 