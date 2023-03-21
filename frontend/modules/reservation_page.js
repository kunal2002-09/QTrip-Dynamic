import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them

  try {
    let reservations = await fetch(config.backendEndpoint + `/reservations/`);
    let array = await reservations.json();

    return array;
  } catch (err) {
    return null;
  }
  // Place holder for functionality to work in the Stubs
  return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  console.log(reservations.length)
  if(reservations.length 
    === 0){
    document.getElementById('no-reservation-banner').style.display='block'
    document.getElementById('reservation-table-parent').style.display='none'

  }
  else{
    document.getElementById('no-reservation-banner').style.display='none'
    document.getElementById('reservation-table-parent').style.display='block'


  }

  //Conditionally render the no-reservation-banner and reservation-table-parent
  let table = document.getElementById("reservation-table");
  reservations.forEach((element) => {
    let row = document.createElement("tr");
    let date = new Date(element.date).toLocaleDateString("en-IN");
    let time = new Date(element.time).toLocaleTimeString("en-IN");
    let bookingDate = new Date(element.time).toLocaleString("en-IN", {
      day: "numeric",
      year: "numeric",
      month: "long"
    });
    console.log(date.toLocaleDateString);
    row.innerHTML = `  
<th>${element.id}</th>
<td>${element.name}</td>
<td>${element.adventureName}</td>
<td>${element.person}</td>
<td>${date}</td>
<td>${element.price}</td>
<td>${bookingDate + ", " + time}</td>
<td><div id=${element.id}><a href="../detail/?adventure=${element.adventure}"><button class="reservation-visit-button">Visit Adventure</button></a></div></td>


`;
    table.appendChild(row);
  });

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
}

export { fetchReservations, addReservationToTable };
