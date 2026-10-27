const NOMBRE_DE_SIEGES = 20;
const PRIX = 80;
const STORAGE = "busdirect_reservations";

let reservationsData = localStorage.getItem(STORAGE);
let reservations = reservationsData !== null ? JSON.parse(reservationsData) : [];

// DOM Elements
const availableCount = document.getElementById("available-count");
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




//  Temporary message

function afficherMessage(box, text, erreur = false) {
    box.textContent = text;
    box.classList.remove("hidden");

    if (erreur === true) {
        box.style.color = "red";
        box.style.backgroundColor = "#fee2e2";
    } else {
        box.style.color = "green";
        box.style.backgroundColor = "#dcfce7";
    }

    setTimeout(function() {
        box.classList.add("hidden");
    }, 3000);
}

//  Save data to LocalStorage
function sauvegarder() {
    localStorage.setItem(STORAGE, JSON.stringify(reservations));
}

//  Find trouver par siege
function trouverParSiege(siegeNumb) {
    return reservations.find(r => r.siege === parseInt(siegeNumb)) || null;
}

// Check if a seat is free
function estLibre(siegeNumb) {
    return trouverParSiege(siegeNumb) === null;
}

//  First available seat using estLibre
function premierLibre() {
    for (let i = 1; i <= NOMBRE_DE_SIEGES; i++) {
        if (estLibre(i)) return i;
    }
    return null;
}




// Main Actualiser Function
function actualiser() {
    // 1. Update the 20 seats (color and text)
    for (let i = 1; i <= NOMBRE_DE_SIEGES; i++) {  
        let li = document.getElementById("siege-" + i);
        let r = trouverParSiege(i);

        if (r) {
            li.className = "bg-red-100 border p-3 rounded text-red-600 font-bold text-center";
            li.innerHTML = "<span>" + i + "</span><br>👤 " + r.nom;
        } else {
            li.className = "bg-white border p-3 rounded text-center";
            li.innerHTML = "<span>" + i + "</span><br>Libre";
        }
    } 

    //Calculate stats and total revenue 80 dh x blayss    NOMBRE-DE-SIEGES=20       PRIX=80

    let occupes = reservations.length;
    availableCount.textContent = NOMBRE_DE_SIEGES - occupes;
    occupiedCount.textContent = occupes;
    revenueCount.textContent = (occupes * PRIX) + " DH";

    //   lists 
    resSiege.innerHTML = '<option value=""> Choisir un siège </option>';
    modPassager.innerHTML = '<option value=""> Choisir un passager </option>';
    modSiege.innerHTML = '<option value=""> Même siège </option>';
    supSiege.innerHTML = '<option value=""> Choisir un passager </option>';

    //  Add available seats to select lists using innerhtml
    for (let i = 1; i <= NOMBRE_DE_SIEGES; i++) {
        if (estLibre(i)) {
            resSiege.innerHTML += '<option value="' + i + '">Siège ' + i + '</option>';
            modSiege.innerHTML += '<option value="' + i + '">Siège ' + i + '</option>';
        }
    }
   
    //  Add passengers to modify and delete lists using innerHTML
    for (let r of reservations) {
        let texte = r.nom + " (Siège " + r.siege + ")";
        modPassager.innerHTML += '<option value="' + r.siege + '">' + texte + '</option>';
        supSiege.innerHTML += '<option value="' + r.siege + '">' + texte + '</option>';
    }
}

// ////////////////////////////////////////////////////////////////////////////////////


// Click event for reservation button
btnReserver.addEventListener("click", function() {
    let nom = resNom.value.trim();
    let siege;




 // checking if the name is empty

    if (nom === "") {
        afficherMessage(msgRes, "Veuillez entrer un nom !", true);
        return;
    }


// checking if a siege is selected



    if (resSiege.value !== "") {
        siege = parseInt(resSiege.value);
    } else {
        siege = premierLibre();
    }


 // check if the bus is full 


    if (siege === null) {
        afficherMessage(msgRes, "Le bus est complet !", true);
        return;
    }


// add reservation to the array


    reservations.push({ nom: nom, siege: siege });



// save and update 

    sauvegarder();
    actualiser();


    //show succes with a message


    resNom.value = "";
    afficherMessage(msgRes, "Reservation effectuee avec succes !");
});


//////////////////////////////////////////////////////////////////




// Click event for modification button
btnModifier.addEventListener("click", function() {
    let oldSiege = Number(modPassager.value);
    let nouveauNom = modNom.value.trim();


// 1 checking if a passanger is selected 


    if (modPassager.value === "") {
        afficherMessage(msgMod, "Veuillez choisir un passager !", true);
        return;
    }

    // find the passager reservation 

    let reservation = trouverParSiege(oldSiege);

     // update nom only if the input(nom)is not empty

    if (reservation) {


        if (nouveauNom !== "") {
            reservation.nom = nouveauNom;
        }


        //update seat only if a seat is chosen


        if (modSiege.value !== "") {
            reservation.siege = parseInt(modSiege.value);
        }
    }

    sauvegarder();
    actualiser();




// afficher msg when modification avec succes

    modNom.value = "";
    modSiege.value = "";
    afficherMessage(msgMod, "Modification effectuee avec succes !");
});
 
/////////////////////////////////////////////////////////////////////////////////////////////////////////


// Click event for suppression button (using filter)



btnSupprimer.addEventListener("click", function() {
    let siegeASupprimer = parseInt(supSiege.value);



// checking if a passanger is selected 


    if (supSiege.value === "") {
        afficherMessage(msgSupp, "Veuillez choisir un passager !", true);
        return;
    }

//  Keep only the reservations that DO NOT match the seat to delete


    reservations = reservations.filter(r => r.siege !== siegeASupprimer);

    sauvegarder();
    actualiser();


 // message  suppression effectuer en suucces 


    afficherMessage( msgSupp, "Supression effectuee avec succes !");
});

//  actualiser on page load
actualiser();