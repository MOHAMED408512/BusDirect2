import { initialiser , sauvegarder } from "./store.js";
import { placesLibres , VIP , prixSiege, estComplet } from "./reservations.js";  // using it in part 2
import { validerNom , validerNmra } from "./validators.js";

// reads the id from cabina.html

const i3dadat = new URLSearchParams(location.search)

const id = parseInt (i3dadat.get("id"))

// empty bc i will fill them later
let trips = []
let trip = null

//html elemente


const titre = document.getElementById("trajet-titre")

const prix = document.getElementById("trajet-prix")

const heures = document.getElementById("trajet-horaires")

const availableCount = document.getElementById("available-count")

const occupiedCount = document.getElementById("occupied-count")
const recetteCount = document.getElementById("revenue-count")

const planBus = document.getElementById("planBus")
// reserver

const reserverSection = document.getElementById("reserver-section")
const fieldsetReserver = document.getElementById("fieldset-reserver")
const reservationNom = document.getElementById("res-nom")

const reservationTele = document.getElementById("res-tele")

const selectSiege = document.getElementById("res-siege")

const errorNom = document.getElementById("erreur-nom")

const errorTele = document.getElementById("erreur-tele")

const messageRes = document.getElementById("msg-res")


// new modifier 
const formModifier = document.getElementById("form-modifier")
const modPassager = document.getElementById("mod-passager")
const modNom = document.getElementById("mod-nom")
const modTele = document.getElementById("mod-tele")
const modSiege = document.getElementById("mod-siege")
const errorPassager = document.getElementById("erreur-passager")
const errorModNom = document.getElementById("erreur-mod-nom")

const errorModTele = document.getElementById("erreur-mod-tele")
const messageMod = document.getElementById("msg-mod")

// supprimer


const supSiege = document.getElementById("sup-siege")

const btnSupprimer = document.getElementById("btn-supprimer")
const errorSupp = document.getElementById("erreur-supp")
const messageSupp = document.getElementById("msg-supp")




// lista dattente

const formAttente = document.getElementById("attente-section")
const fieldsetAttente = document.getElementById("fieldset-attente")
const attenteNom = document.getElementById("att-nom")
const attenteTele = document.getElementById("att-tele")
const errorAttNom = document.getElementById("erreur-att-nom")
const errorAttTele = document.getElementById("erreur-att-tele")
const messageAtt = document.getElementById("msg-att")

const listeAttente = document.getElementById("liste-attente")





async function afficherCabine() {
    trips = await initialiser()


    //  find trip li fiha had id

    trip = trips.find(t=> t.id === id)

    //ila ml9a walu

    if ( trip === undefined) {
        titre.textContent="trajet introuvable"
        prix.textContent =""
        heures.textContent=""
        planBus.innerHTML = ""

        return
    

    }
    afficherTout ()

} 

afficherCabine()






    function afficherTout() {
        afficherHeader(trip)
        afficherSeats(trip)
        afficherSelectSeats(trip)
        afficherSelectPassagers(trip)
        afficherListeAttente(trip)
        afficherFormulaires(trip)
    }
    
    // 2 selec free reserver modifier

    function afficherSelectSeats(trip) {
        let options = ""


        for (let i = 1 ; i<= trip.capacity ; i++) {
            const occupied = trip.reservations.some(reservation => reservation.seat === i)

            if ( occupied === false) {
                let texteVIP = ""

                if (VIP(i) === true ) {
                    texteVIP = "VIP "
                }
                options += `<option value = "${i}">Siege ${i} - ${texteVIP}${prixSiege(trip.price , i )} DH </option>`
            }
        }
selectSiege.innerHTML = "<option value = ''>Premier siege libre</option>" + options
modSiege.innerHTML = "<option value = ''>Garder le meme siege</option>" + options


    }


    // select of passengers ( modifier w supprimer)

    function afficherSelectPassagers(trip) {
        let htmlModSup = "<option value = ''>Choisir un passager</option>"

        for (let i = 0 ;i < trip.reservations.length ;i++) {
            const reserv = trip.reservations[i]

            htmlModSup += `<option value ="${reserv.seat}">Siege ${reserv.seat} - ${reserv.name}</option>`

        }

modPassager.innerHTML = htmlModSup
supSiege.innerHTML = htmlModSup
    }



    // lsite attente position ofeach passanger



    function afficherListeAttente(trip) {
        if (trip.waitingList.length === 0) {
            listeAttente.innerHTML = "<li class = 'text-xs text-gray-500'>Personne en attente</li>"

            return
        }
        let htmlWait = ""

        for (let i =0 ; i< trip.waitingList.length ; i++) {
            const personne = trip.waitingList[i]

            htmlWait += `<li class = "flex justify-between items-center text-xs border py-1">
            <span>${i+1}. ${personne.name} - ${personne.phone}</span>
            <button type = "button" data-index ="${i}" class ="bg-red-500 text-white px-2 py-1 rounded">Retirer</button>
            </li>`
        }
        listeAttente.innerHTML = htmlWait
    }




    // trip complet = reserver xe blassa blocked wlkn attente active vice versa

    function afficherFormulaires(trip) {
        if (estComplet(trip)===true) {
            fieldsetReserver.disabled = true
            fieldsetAttente.disabled = false
        } else {
            fieldsetReserver.disabled = false
            fieldsetAttente.disabled = true
        }
    }




function afficherHeader (trip)  {
    const libres = placesLibres(trip)
    const occupes = trip.reservations.length
    const recette = trip.reservations.reduce((total , r) => total + prixSiege(trip.price, r.seat),0)

    titre.textContent = trip.departure + " ➡️ " + trip.destination
    prix.textContent = trip.price + "DH"

    heures.textContent = trip.departureTime + " ➡️ " + trip.arrivalTime



    availableCount.textContent = libres

    occupiedCount.textContent = occupes

    recetteCount.textContent = recette + "DH"

} 


// adding the 20 seats sieges

function afficherSeats(trip) {
    let html =""


    // seats number mn 1 tel 20

    for (let i = 1 ; i <= trip.capacity; i++ ) {

        // wx had seat ViP 

        const vip = VIP(i)







        // badge dyal nass VIP

        let badge = ""
if (vip === true) {
    badge = `<span class =" text-black text-[10px] font-bold px-1 rounded">VIP</span>`

}



// color of a free seat : yellow for VIP , white for normal

let couleur = "bg-white"
if(vip === true) {
    couleur = "bg-yellow-200"
}



        // is this seat taken   some = true or false

        const occupied = trip.reservations.some(r => 
            r.seat === i )
        

            if (occupied === true) {
                // we need the name so we search the reservations

                const reservation = trip.reservations.find(r=> r.seat === i)
                html += `<div class = "bg-red-500 border text-black rounded-lg p-2 text-center text-xs">
                <p class = "font-bold">${i} ${badge}</p> 
                <p>${reservation.name}</p>
                </div>
                `   
            } else {

                html+= `<div class = "${couleur} border text-black rounded-lg p-2 text-center text-xs">
                                      <p class = "font-bold">${i} ${badge} </p> 
                                      <p>Libre</p>
                                      <p>${prixSiege(trip.price , i)} DH </p>
                                      </div>`

 
            }

            // espace bin seats 2,6,10,14,18   and 3,7,11,15,19   leryduz mnu nass
// i = seat wla siege
            if (i === 2 || i === 6 || i === 10 || i === 14 || i===18 ) {
                html += "<div></div>"
            }


        }
        planBus.innerHTML = `<div class = "grid grid-cols-5 gap-2">${html}</div>`


}

function afficherMessage ( box ,message) {
    box.textContent = message
    box.classList.remove("hidden")

    setTimeout(() => {
        box.classList.add("hidden")

    } , 3000 )  // 3second message 
}


reserverSection.addEventListener("submit" , (event) => {
    event.preventDefault()   //page reload no



    const nom = reservationNom.value.trim()

    const tel = reservationTele.value.trim()



    // checking step 3 w 4

    const erreurNom = validerNom(nom,trip)

    const erreurTele = validerNmra(tel , trip)

    errorNom.textContent = erreurNom

    errorTele.textContent = erreurTele


    if(erreurNom !== "" || erreurTele!== "") {
        return // kayn xe error we stop nothing is reserved
    }


    // which seat ?

    let siege = parseInt(selectSiege.value)


    if ( isNaN(siege)) {
        for (let i = 1 ; i<= trip.capacity ; i++) {

            const occupied = trip.reservations.some(selected => selected.seat === i)

            if ( VIP(i)  === false && occupied === false) {
                siege = i


                break
            }
        }
    }



    // change + save


    const nouveau = { seat : siege , name : nom , phone : tel }

    trip.reservations = [...trip.reservations , nouveau]

    sauvegarder(trips)


    reserverSection.reset()
    afficherTout()
    afficherMessage(messageRes ,"Reservation confirmee")
})



// modifier challenge 10


// when we choose a passanger kn3mro name and his phone

modPassager.addEventListener("change" , () => {
    const seat = parseInt(modPassager.value)
    


    // choose passager = empty


    if (isNaN(seat)) {
        modNom.value = ""
        modTele.value = ""
        return
    }

    const reservation = trip.reservations.find(reservation => reservation.seat === seat)

    modNom.value = reservation.name
    modTele.value = reservation.phone
})


formModifier.addEventListener("submit" , (event) => {
event.preventDefault()


// reading the inputs

const ancienSiege = parseInt(modPassager.value)
const nom = modNom.value.trim()
const tel = modTele.value.trim()



// no passanger choosen


if (isNaN(ancienSiege)) {
    errorPassager.textContent = "choisis un passager"

    return
}

errorPassager.textContent =""

//checking 


const erreurNom = validerNom(nom , trip , ancienSiege)
const erreurTele = validerNmra(tel , trip , ancienSiege)


errorModNom.textContent = erreurNom
errorModTele.textContent = erreurTele


if (erreurNom !== "" || erreurTele !== "") {
    return
}


// new seat the choosen one wla nafss seat nit

let nouveauSiege = parseInt(modSiege.value)

if(isNaN(nouveauSiege)) {
    nouveauSiege = ancienSiege
}


// change w save map 

trip.reservations = trip.reservations.map(reservation => {
    if (reservation.seat === ancienSiege) {
        return {...reservation ,name : nom , phone : tel , seat : nouveauSiege}
    }
    return reservation
})


sauvegarder(trips)



formModifier.reset()
afficherTout()
afficherMessage(messageMod , "modification confirmee")


})



// supprimer challenge 10 11

btnSupprimer.addEventListener("click",() => {
    const siegeLibre = parseInt(supSiege.value)


    // no passanger chosen

    if (isNaN(siegeLibre)) {
        errorSupp.textContent = "Choisis un passager"
        return
    }
    errorSupp.textContent =""



    // we keep evrybody ila seat le t5tar ytsuppirma

    trip.reservations = trip.reservations.filter(reservation => reservation.seat !== siegeLibre)

    let message = "Reservation annulee"


    // if chiwahd in waiting list he takes the free seat

    if (trip.waitingList.length > 0) {
        const [lwl , ... libqaw] = trip.waitingList

        const nouveau = {seat : siegeLibre , name: lwl.name , phone : lwl.phone }
        trip.reservations = [... trip.reservations , nouveau]
        trip.waitingList = libqaw 

        // 

        message = lwl.name + " a obtenu le siege " + siegeLibre

    }

    sauvegarder(trips)



        afficherTout()
        afficherMessage(messageSupp , message)


})



// loista dattente challenge 11


formAttente.addEventListener("submit" , (event) => {
    event.preventDefault()


    //

    const nom = attenteNom.value.trim()
    const tel = attenteTele.value.trim()


    //  checking same validators


    const erreurNom = validerNom(nom , trip)
    const erreurTele = validerNmra(tel, trip)


    errorAttNom.textContent = erreurNom
    errorAttTele.textContent = erreurTele


    if(erreurNom !== ""|| erreurTele !== "") {
        return
    }


    // change w save fl5r dyl waiting list

     const personne = { name : nom , phone : tel }
    trip.waitingList = [...trip.waitingList , personne]
    sauvegarder(trips)



    formAttente.reset()
    afficherTout()
    afficherMessage(messageAtt , "ajoute a la liste d'attente")

})



// one lsitener f list for all the retire button

listeAttente.addEventListener("click" , (event) => {
    const bouton = event.target.closest("[data-index]")



    if ( bouton === null) {
        return 
    }


    const index = parseInt(bouton.dataset.index)


    // kn5lew kolxe ila had position

    trip.waitingList = trip.waitingList.filter((personne , i) => i!== index)
    sauvegarder(trips)

    afficherTout()

})

