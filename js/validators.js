// return the error message or 

export function validerNom(nom,trip , siegeIgnore) {
    //  nom 5awy
    if (nom === "") {
        return "Le nom dyal passager est obligatoire"

    }

    // name already f trip mataln ( safi to marrakech) // some =true or false
    const dejaKaynNom = trip.reservations.some(reservation => reservation.name.toLowerCase() === nom.toLowerCase() === nom.toLowerCase() && reservation.seat !== siegeIgnore)


    if ( dejaKaynNom === true ) {
        return "Ce nom existe deja sur ce trajet"

    }

    return ""
}


// returns an error message or ""


export function validerNmra(tel,trip , siegeIgnore) {
    // form dyl 0  6 or 7 then 8 numb

    const regex = /^0[67]\d{8}$/

    if(regex.test(tel)=== false) {
        return "you should start with 06 ou 07"
    }
 // already kayn ola used f reservations ola f waiting list

 const dejaDansReservations = trip.reservations.some(reservation => reservation.phone === tel && reservation.seat !== siegeIgnore)
 const dejaDansAttente = trip.waitingList.some( personne => personne.phone === tel)


 if (dejaDansReservations === true || dejaDansAttente === true) {
    return "ce numero est deja utilise sur ce trajet"
 
 }
 return ""

}