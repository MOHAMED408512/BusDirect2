export function placesLibres(trip) {
    return trip.capacity - trip.reservations.length
}
export function estComplet(trip) {
return placesLibres(trip) === 0
} 

// seats 1 to 4 are VIP
export function VIP(seatNumber) {
    if (seatNumber >= 1 && seatNumber <=4) {
        return true 
    }
    return false
}

// VIP seats = price + 10 %  woth round

export function prixSiege (prix , seatNumber) {
    if ( VIP (seatNumber) === true) {
        return Math.round(prix * 1.1)
    }
    return prix
}
