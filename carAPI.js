// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<    api/carApi.js
// This line stores your backend base address.
const BASE_URL = "https://autostore.onrender.com/api";

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<    FETCH ALL CARS

/** FETCH ALL CARS FROM THE API(BACK-END) */
export async function getAllCars() {
    try {
        //.......................................................................... SENDS A 'GET' REQUEST
        const response = await fetch(`${BASE_URL}/cars`);
        //...........................................................................  CHECKS IF SERVER REPLIED SUCCESSFULLY IF NOT THROWS AN ERROR
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        //...........................................................................  PARSES AND RETURNS JSON DATA WHICH ARE USABLE JS OBJECTS AND ARRAYS
        return await response.json();
    } 
    //...........................................................................  CATCHES AND LOGS ANY ERRORS DURING FETCHING PROCESS
    catch (error) {
        console.error("Error fetching cars:", error);
        return [];
    }
}

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<    FETCH ALL CARS BY ID

/** Add a new car */
// export async function createCar(carData) {
//     try {
//         //................................................................. SENDS A 'POST' REQUEST
//         const response = await fetch(`${BASE_URL}/cars`, {
//             method: "POST", //................................................. Tells the server that its a creat operation
//             headers: { "Content-Type": "application/json" },  //............... Tells the server we're sending a JSON
//             body: JSON.stringify(carData),  //................................. Converts your JavaScript object into a JSON string to send.
//         });
//         //................................................................. REPEAT THE SAME SUCCESS CHECK AND ERROR HANDLING AS THE 'GET REQUEST' FUNCTION
//         if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//         return await response.json();
//     } 
//     catch (error) {
//         console.error("Error creating car:", error);
//         return null;
//     }
// }

/** Update an existing car */
export async function updateCar(id, updatedData) {
    try {
        const response = await fetch(`${BASE_URL}/cars/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData),
        });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return await response.json();
    } 
    catch (error) {
        console.error("Error updating car:", error);
        return null;
    }
}

/** Delete a car by ID */
export async function deleteCar(id) {
    try {
        const response = await fetch(`${BASE_URL}/cars/${id}`, {
            method: "DELETE",
        })
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return await response.json();
    } 
    catch (error) {
        console.error("Error deleting car:", error);
        return null;
    }
}



// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<  CREATE CAR PROFILE

export async function addNewCar(data) {
    return fetch("https://autostore.onrender.com/products", {
        method: "POST",
        body: data,
    })
    .then(res => res.json())
    .catch(err => console.error(err));
}
