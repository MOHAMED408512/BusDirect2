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



// Fonction message temporaire 
function afficherMessage(box, text, erreur = false) {
    // 1  mettre le texte du message dans le div
    box.textContent = text;
    
    // 2 retirer la classe "hidden" pour afficher le message
    box.classList.remove("hidden");

    // 3if right color based on error or success
    if (erreur === true) {
        box.style.color = "red";
        box.style.backgroundColor = "#fee2e2"; // red
    } else {
        box.style.color = "green";
        box.style.backgroundColor = "#dcfce7"; // green
    }

    // 4 cacher le message après 3 secondes
    setTimeout(function() {
        box.classList.add("hidden");
    }, 3000);
}

