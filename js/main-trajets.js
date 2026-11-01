import { test } from './store.js';
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

afficherTrajets()


