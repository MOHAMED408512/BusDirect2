const NOMBRE_DE_SIEGES = 20;
const PRIX = 80;
const CLE_STORAGE = "busdirect_reservations";



let reservationsData = localStorage.getItem(CLE_STORAGE)
let reservations ;
if (reservationsData !== null) {
    reservations = JSON.parse(reservationsData);
 } else {
        reservations = [];
 }

