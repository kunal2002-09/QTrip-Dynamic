import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let returnCityArray = search.split("=");
  let city = returnCityArray[1];
  return city;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES`

  // 1. Fetch adventures using the Backend API and return the data
  try {
    let fetchdcities = await fetch(config.backendEndpoint+
      `/adventures/?city=${city}`
    );
    let array = await fetchdcities.json();

    return array;
  } catch (err) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  // console.log(adventures)
  const data = document.getElementById("data");
  adventures.forEach((Element, i) => {
    const object = adventures[i];
    const category = object.category;
    const costPerHead = object.costPerHead;
    const currency = object.currency;
    const duration = object.duration;
    const id = object.id;
    const image = object.image;
    const name = object.name;

    return adventuresCards(
      category,
      costPerHead,
      currency,
      duration,
      id,
      image,
      name
    );
  });

  function adventuresCards(
    category,
    costPerHead,
    currency,
    duration,
    id,
    image,
    name
  ) {
    const div = document.createElement("div");
    div.setAttribute("class", " col-lg-3 p-3 col-md-6 col-sm-8");

    const cardDiv = document.createElement("div");
    cardDiv.setAttribute("class", "activity-card");

    const atag=document.createElement('a')
    atag.setAttribute('href',`detail/?adventure=${id}`)
    atag.setAttribute("id",id)

    const img = document.createElement("img");
    img.setAttribute("class", "activity-card img");
    img.setAttribute("src", image);

    const categoryDiv = document.createElement("div");
    categoryDiv.setAttribute("class", "category-banner");
    const categoryText = document.createTextNode(category);
    categoryDiv.append(categoryText);
     
    const infoDiv=document.createElement('div')
    infoDiv.setAttribute('class',"d-flex w-100 p-3 flex-column")
    
    
    const nameDiv=document.createElement('div')
    const nameText=document.createTextNode(name)
    nameDiv.append(nameText)

    const cosPerHeadDiv=document.createElement('div')
    const cosrPerHeadText=document.createTextNode(currency +' '+costPerHead)
    cosPerHeadDiv.append(cosrPerHeadText)
    const durationDiv=document.createElement('div')
    const durationText=document.createTextNode("Duration")
   durationDiv.append(durationText)

    const DurationDiv=document.createElement('div')
    const DurationText=document.createTextNode(duration+" Hours")
    DurationDiv.append(DurationText)

    const nameAndPriceDiv=document.createElement("div")
    nameAndPriceDiv.setAttribute('class','d-flex justify-content-between flex-md-row flex-sm-column')

    const TotalDurationDiv=document.createElement('div')
    TotalDurationDiv.setAttribute('class','d-flex justify-content-between')
    
nameAndPriceDiv.appendChild(nameDiv)
nameAndPriceDiv.appendChild(cosPerHeadDiv)
TotalDurationDiv.appendChild(durationDiv)
TotalDurationDiv.appendChild(DurationDiv)

infoDiv.appendChild(nameAndPriceDiv)
infoDiv.appendChild(TotalDurationDiv)
    cardDiv.appendChild(img);
    cardDiv.appendChild(categoryDiv);
    cardDiv.appendChild(infoDiv)
  
div.append(atag)
atag.appendChild(cardDiv)
    data.appendChild(div);
  }
  
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  function checkduration(list,low,high){
    // list.forEach((e,i)=>{
    //   if(low <= e[i].duration|| high >= e[i].duration){
    //   return e[i]
    //   }

    // })
    let durationlist=[]
    for(let i=0;i<list.length;i++){
      if(low <= list[i].duration && high >= list[i].duration){
         durationlist.push(list[i].duration)
          }
        }
        return durationlist
        
  }
  let durationlist=checkduration(list,low,high)
      // console.log(durationlist)

  let newlist=list.filter(element=> durationlist.includes(element.duration))
  // console.log(high)
  // console.log(newlist)
    return newlist
}


//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let newlist=list.filter(element=> categoryList.includes(element.category))
  
  return newlist;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods


  
  // let Category=filters.category
 
//  console.log(list)
  
if(filters.duration.length>0){
  let duration=filters.duration

  let low=duration.split('-')[0]

let high=duration.split('-')[1]


  list=filterByDuration(list,low,high)
}
  if(filters.category.length> 0)
  {
    list=filterByCategory(list,filters.category)
  }
 
  
  // console.log(filters)

  // Place holder for functionality to work in the Stubs
  return list;
}
//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  let jsonFilters=JSON.stringify(filters)
  localStorage.setItem('filters',jsonFilters)

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
JSON.parse(localStorage.getItem('filters'))
  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let category=filters.category
  
  let categorylist=document.getElementById("category-list")
  if(category.length>0){

    category.forEach((e,i)=>
    {
      let div= document.createElement('div')
      div.setAttribute('class','category-filter')
      let span=document.createElement('span')
      span.textContent=category[i]
     
      div.appendChild(span)
      categorylist.append(div)
      
    })
  }
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
                    
