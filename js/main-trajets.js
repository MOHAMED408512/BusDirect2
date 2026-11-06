import { test } from './store.js';
import { estComplet } from './reservations.js'
test()
import {initialiser} from "./store.js"
import { renderCard } from './render.js';

function afficherStatistiques(trips) {
    const totalPassagers = trips.reduce((total,trip)=> total + trip.reservations.length , 0)

const totalRecette = trips.reduce((total,trip)=> {
    return total + (trip.reservations.length * trip.price)

}, 0)

const totalTrajets = trips.length


const totalAttente = trips.reduce((total,trip)=> total+trip.waitingList.length,0)



// ids in html 
document.getElementById("totalPassagers").textContent = totalPassagers
document.getElementById("totalRecette").textContent = totalRecette + "dh"
document.getElementById("totalTrajets").textContent = totalTrajets
document.getElementById("totalAttente").textContent= totalAttente


}
// main function 

async function afficherTrajets() {

    const trips = await initialiser()

afficherStatistiques(trips)

// get html elemnt

const container = document.getElementById("listeTrajets")

container.innerHTML = trips.map(trip => renderCard(trip)).join("")
}

let tousLesTrajets = []

// html elements
const container = document.getElementById("listeTrajets")
const searchInput = document.getElementById("search-input")
const statutSelect = document.getElementById("statut-select")

// keeps only the trips that match the search and the statut
function filtrerTrajets() {
    const texte = searchInput.value.toLowerCase()
    const statut = statutSelect.value

    const resultats = tousLesTrajets.filter(trip => {
        // search: lowercase on both sides
        const depart = trip.departure.toLowerCase()
        const arrivee = trip.destination.toLowerCase()
        const villeOk = depart.includes(texte) || arrivee.includes(texte)

        // statut
        let statutOk = true
        if (statut === "Disponible") {
            statutOk = !estComplet(trip) 
        }
        if (statut === "Complet") {
            statutOk = estComplet(trip)
        }

        // the trip stays only if both are true
        return villeOk && statutOk
    })

    return resultats
}

// start function
async function khadmha() {
    tousLesTrajets = await initialiser()
    afficherStatistiques(tousLesTrajets)
    afficherResultats()
}

// pagination  

const trajetsParPage = 6
let pageCourante = 1
const pagination = document.getElementById("pagination")

// drawing the buttons 
function afficherPagination (nombrePages) {

const style = "bg-blue-200 text-blue-900 px-3 py-1 rounded-lg"

let html = ""

// boutton precedent (disabled on page 1)

if (pageCourante === 1) {
    html += `<button data-page="${pageCourante-1}" disabled class ="${style} opacity-50">Precedent</button>`

}else  {
    html+= `<button data-page="${pageCourante-1}"  class ="${style}">Precdent</button>`


}
// bouton des numeros
for (let i = 1 ; i<=nombrePages ; i++ ) {
    if ( i === pageCourante) {
        html += `<boutton data-page = "${i}" class= "bg-white text-blue-700 font-bold px-3 py-1 rounded-lg">${i}</button>`
    } else {
        html += `<boutton data-page = "${i}" class= "${style}">${i}</button>`
    }
}

// bouton suivant ( disabled on the last page)

if (pageCourante === nombrePages) {
    html += `<button data-page="${pageCourante+1}" disabled class ="${style} opacity-50">Suivant</button>`
}else {
    html += `<button data-page="${pageCourante + 1}" class="${style}">Suivant</button>`
}
 pagination.innerHTML = html


}

//


function afficherResultats() {
    const resultats =filtrerTrajets()

    // no trip matchess

    if (resultats.length===0) {
        container.innerHTML = "<p class = 'col-span-full text-center text-white font-bold'>Aucun trajet ne correspnd</p>"
        pagination.innerHTML=""

        return
    }


// number of pages
const nombrePages = Math.ceil (resultats.length / trajetsParPage)

// keeping only the trajets of the current page

const debut = (pageCourante - 1) * trajetsParPage

const trajetsDeLaPage = resultats.slice(debut , debut + trajetsParPage)

container.innerHTML = trajetsDeLaPage.map(trip => renderCard(trip)).join("")
afficherPagination(nombrePages)
}

// new search back to page lwla

searchInput.addEventListener("input", () => {
    pageCourante = 1
    afficherResultats()

})


// newfiltrer knrj3o lpage 1

statutSelect.addEventListener("change" , () => {
    pageCourante = 1
    afficherResultats()
})

//one listener on #pagination kamla for all buttons

pagination.addEventListener("click", (e) => {
    const bouton = e.target.closest("[data-page]")
    if ( bouton === null) {
        return
    }

    pageCourante = parseInt(bouton.dataset.page)
    afficherResultats()

})

// one listener on #listetrajets for ouvrir bouton

container.addEventListener("click" , (e) =>{
    const bouton = e.target.closest("[data-id]")
    if(bouton === null ) {
        return
    }
    window.location.href = "cabine.html?id=" + bouton.dataset.id
}
)

khadmha()

