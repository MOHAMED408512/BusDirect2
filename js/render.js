import { placesLibres , estComplet} from "./reservations.js"

export function renderCard(trip) {
    const { departure, destination, departureTime, arrivalTime, price, capacity, reservations , waitingList } = trip
    const libres = placesLibres(trip)
    const complet = estComplet(trip)


    const complete = complet ? "bg-red-500 text-white" : "bg-green-500 text-white"
    const isItComplete = complet ? "complet" : "Disponible"

    const recetteTotale= reservations.length * price

    return `
    <div class = "bg-blue-200 p-4 rounded-xl flex flex-col justify-between">
        <div class ="flex justify-between items-center mb-2">
        <h3 class ="font-bold text-blue-800">${departure} to ${destination} </h3>
        <span class ="${complete} text-[10px] font-bold px-2 py-1 rounded-full">
        ${isItComplete}
        
        </span>
        </div>
        <div class ="text-xs text-gray-700 mb-3">
        <p><b>Horaires: </b>${departureTime} to ${arrivalTime}</p>
        <p><b>Prix : </b><span class ="font-bold"> ${price} DH </span></p> 
        <p><b> Disponibilite : </b> ${libres} / ${capacity}</p>
        <p><b>Attente : </b> <span class ="text-red-600 font-bold"> ${waitingList.length}</span></p>
        </div>
    <div class ="flex justify-between items-center pt-2 text-xs">
    <span> Recette : <b> ${recetteTotale} DH </b></span>
    <button class = "bg-blue-600 text-white font-bold px-3 py-1 rounded-lg">Ouvrir</button>
    </div>
    </div>
    ` }
