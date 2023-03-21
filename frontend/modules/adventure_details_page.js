import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL

let returnAdventureIdArray = search.split("=");
  let AdventureId = returnAdventureIdArray[1];
 
  return AdventureId;
  // Place holder for functionality to work in the Stubs
  return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    let fetchAdventureDetails = await fetch(config.backendEndpoint+
      `/adventures/detail?adventure=${adventureId}`
    );
    let data = await fetchAdventureDetails.json();

    return data;
  } catch (err) {
    return null
  }
  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
let name=document.getElementById('adventure-name')
name.textContent=adventure.name

let subtitle=document.getElementById('adventure-subtitle')
subtitle.textContent=adventure.subtitle

let content=document.getElementById('adventure-content')
content.textContent=adventure.content
let images=adventure.images
let photoGallery=document.getElementById('photo-gallery')
images.forEach(element => {
  let div=document.createElement('div')
  let image=document.createElement('img')
  image.setAttribute('src',element)
  image.setAttribute('class','activity-card-image')
  div.append(image)
  photoGallery.append(div)
  
});
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
{/* <div class="carousel-item active">
 <img src="${images[0]}" class="d-block w-100 activity-card-image" alt="...">
 </div>

<div class="carousel-item ">
<img src="${images[1]}" class="d-block w-100 activity-card-image" alt="...">
</div>
<div class="carousel-item">
<img src="${images[2]}" class="d-block w-100 activity-card-image" alt="...">
</div> */}
 

  
let photoGallery=document.getElementById('photo-gallery')
photoGallery.innerHTML=`<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
<div class="carousel-indicators">
  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
</div>
<div class="carousel-inner" id="carousel-inner">


</div>
<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Previous</span>
</button>
<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
  <span class="carousel-control-next-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Next</span>
</button>
</div>`
document.getElementsByClassName('carousel-inner').innerHTML=

images.forEach((element, i)  => {
  // let carouselinner=document.getElementsByClassName('carousel-inner')
    let carouselitem=document.createElement('div')
    carouselitem.className=`carousel-item${ i === 0 ?" active":""}`;
    carouselitem.innerHTML=
      ` 
      <img src="${element}" class="d-block w-100 activity-card-image" alt="...">
    `
 document.getElementById('carousel-inner').appendChild(carouselitem)
  });
 }

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
if(adventure.available == true){
document.getElementById('reservation-panel-sold-out').style.display='none'
document.getElementById('reservation-panel-available').style.display='block'
document.getElementById('reservation-person-cost').innerHTML=adventure.costPerHead

}
else{
  document.getElementById('reservation-panel-available').style.display='none'
document.getElementById('reservation-panel-sold-out').style.display='block'
  
}
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
document.getElementById('reservation-cost').innerHTML=adventure.costPerHead * persons
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  let form=document.getElementById('myForm')
  form.onsubmit  = (event) => {
 
    const formdata=new FormData(form)
       const update = {
      name: formdata.get('name'),
      date: formdata.get('date'),
      person: formdata.get('person'),
      adventure:adventure.id
      };
      const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(update),
        };

        fetch(config.backendEndpoint + '/reservations/new', options)
        .then(data=>{
          if (!data.ok) {
            throw Error(data.status);
           }
           alert("Success!")
           location.reload()
           return data.json();
           
        })
        .catch(e=>{
          alert('Failed!')
location.reload()
        })
    console.log(update)
  
   };
 
    
   
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved == true){
    document.getElementById('reserved-banner').style.display='block'
  }
  else{
    document.getElementById('reserved-banner').style.display='none'

  }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
