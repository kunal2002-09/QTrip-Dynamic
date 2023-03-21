import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
 try{

   let fetchdcities = await fetch(config.backendEndpoint + "/cities");
   let array= await fetchdcities.json();
 
   return array;
 }
 catch(err){
  return null;
 }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES

  // 1. Populate the City details and insert those details into the DOM
  const data=document.getElementById("data")
  const parentdiv=document.createElement('div')
  parentdiv.setAttribute("class", 'col-lg-3 p-3 col-md-6 col-sm-8');
   
  const atag=document.createElement("a")
  atag.setAttribute("href",`pages/adventures/?city=${id} `)

 const divtile=document.createElement('div')
  divtile.setAttribute("class","tile")

  const img=document.createElement('img')
  img.setAttribute("src",image)
  img.setAttribute("id",id)
   
  const divtileText=document.createElement("div")
  divtileText.setAttribute("class","tile-text")

  const h3=document.createElement("h3")
  const h3textNode=document.createTextNode(city)
  h3.appendChild(h3textNode)

  const h2=document.createElement("h2")
  const h2textNode=document.createTextNode(description)
  h2.appendChild(h2textNode)

data.appendChild(parentdiv);
parentdiv.appendChild(atag);
atag.appendChild(divtile);
divtile.appendChild(img);
divtile.appendChild(divtileText);
divtileText.appendChild(h3)
divtileText.appendChild(h2)




}

export { init, fetchCities, addCityToDOM };
