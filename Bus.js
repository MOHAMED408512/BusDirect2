const NOMBRE_DE_SIEGES = 20;
const PRIX = 80;
const CLE_STORAGE = "busdirect_reservations";

let reservationsData = localStorage.getItem(CLE_STORAGE);
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

// Helper Temporary message
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

// Helpe Save data to LocalStorage
function sauvegarder() {
    localStorage.setItem(CLE_STORAGE, JSON.stringify(reservations));
}

// Helper Find by seat number
function trouverParSiege(num) {
    return reservations.find(r => r.siege === Number(num)) || null;
}

// Helper Check if a seat is free
function estLibre(num) {
    return trouverParSiege(num) === null;
}

// Helper First available seat using estLibre
function premierLibre() {
    for (let i = 1; i <= NOMBRE_DE_SIEGES; i++) {
        if (estLibre(i)) return i;
    }
    return null;
}

// Main Actualiser Function
function actualiser() {
    // 1 Update the 20 seats (color and text)
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

    // 2 Calculate stats and total revenue
    let occupes = reservations.length;
    availableCount.textContent = NOMBRE_DE_SIEGES - occupes;
    occupiedCount.textContent = occupes;
    revenueCount.textContent = (occupes * PRIX) + " DH";

    // 3 Clear select dropdown lists
    resSiege.innerHTML = '<option value="">-- Choisir un siège --</option>';
    modPassager.innerHTML = '<option value="">-- Choisir un passager --</option>';
    modSiege.innerHTML = '<option value="">-- Même siège --</option>';
    supSiege.innerHTML = '<option value="">-- Choisir un passager --</option>';

    // 4 Add available seats to select lists using estLibre
    for (let i = 1; i <= NOMBRE_DE_SIEGES; i++) {
        if (estLibre(i)) {
            resSiege.add(new Option("Siège " + i, i));
            modSiege.add(new Option("Siège " + i, i));
        }
    }

   
    // 5  passengers to modify and delete sieges
    for (let r of reservations) {
        let texte = r.nom + " (Siège " + r.siege + ")";
        modPassager.add(new Option(texte, r.siege));
        supSiege.add(new Option(texte, r.siege));
    }
}







 //////////////////////////////////////////////////////////////



//click event for resrvation button
btnReserver.addEventListener("click",function(){
    let nom = resNom.value
    let siege = parseInt(resSiege.value)

  


  // checking if the name is empty
   if (nom === "") {
    afficherMessage(msgRes, "Veuillez entrer un nom !",true)
   return
   }

   // checking if a siege is selected
   if (resSiege.value === "") {
    afficherMessage(msgRes , " Veuillez choisir un siege !" , true)
    return
   } 
     

   // check if the bus is full 
if(siege===null){
    afficherMessage(msgRes, " le Bus est full get out !!! ", true)
    return
}


   // add reservation to the array 
   reservations.push({nom: nom, siege :siege })

// save and update 

sauvegarder()
actualiser()

//show succes with a message

resNom.value = ""
afficherMessage(msgRes, "Reservation effectuee en succes!")
})
  


//////////////////////////////////////////////////////////////////


// Click event for modification button
btnModifier.addEventListener("click", function() {
    let oldSiege = Number(modPassager.value);
    let nouveauNom = modNom.value.trim();

    // 1 checking if a passanger is selected 
    if(modPassager.value==="") {
        afficherMessage(msgMod, " Veuillez choisir un passager !",true)
        return
    }

    // find the passager reservation 
    let reservation = trouverParSiege(oldSiege)

    // update nom only if the input(nom)is not empty
    if (nouveauNom!=="" ){
        reservation.nom = nouveauNom
    }

    //update seat only if a seat is chosen

    if (modSiege.value!=="") {
        reservation.siege = parseInt(modSiege.value)
    }

    sauvegarder()
    actualiser()
// afficher msg when modification avec succes
    modNom.value = ""
    afficherMessage(msgMod , " modification effectue avec succes")
})

////////////////////////////////////////////////////////////////////////////



//click event for supprimer with addEventListener and with splice

btnSupprimer.addEventListener("click", function () {
    let siegeASupprimer = parseInt(supSiege.value)

    // checking if a passanger is selected 

    if (supSiege.value === "" ) {
        afficherMessage(msgSupp, " Veuillez choisir un passager ! " , true )
    return
    }
     
// 2. Keep only the reservations that DO NOT match the seat to delete
    reservations = reservations.filter(r => r.siege !== siegeASupprimer);
    