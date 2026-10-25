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



// DOM Elements
const availableCount = document.getElementById("available-count")
const occupiedCount = document.getElementById("occupied-count");
const revenueCount = document.getElementById("revenue-count");

const resNom = document.getElementById("res-nom");
const resSiege = document.getElementById("res-siege");
const btnReserver = document.getElementById("btn-reserver");
const msgRes = document.getElementById("msg-res");

const modPassager = document.getElementById("mod-passager");
const modNom = document.getElementById("mod-nom");
const modSiege = document.getElementById("mod-siege");
const btnModifier = document.getElementById("btn-modifier");
const msgMod = document.getElementById("msg-mod");

const supSiege = document.getElementById("sup-siege");
const btnSupprimer = document.getElementById("btn-supprimer");
const msgSupp = document.getElementById("msg-supp");