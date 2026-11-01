 export const test = () => console.log("store OK");

export async function tripsJSON() {
    try {
         const response = await fetch("./data/trips.json")
         return await response.json() 
        
    } catch (error) {
        console.error("Erreur 4000", error)
        return[] 
    }
}

//sauvegarder tableau in localstoarge using json.stirngify
export function sauvegarder(trips) {
    localStorage.setItem("trips",JSON.stringify(trips))
}




 // function to get the informations from trips.json 

 export async function initialiser() {

    // if the info are already in the localStorage
    const savedInfo = localStorage.getItem("trips")
    if(savedInfo) {
        return JSON.parse(savedInfo)
    }
 
    const trips = await tripsJSON()
    sauvegarder(trips)

return trips

 
}

