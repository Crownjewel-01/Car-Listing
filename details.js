import { getAllCars } from "../carAPI.js";  // ...................................This works for all endpoints in the possible endpoints in the page


let images = [];  // We'll get the car's real images here
let index = 0;
let carousel = null;

window.onload = () => {
    // Retrieve the selected car object from localStorage
    const car = JSON.parse(localStorage.getItem("selectedCar"));

    if (!car) {
        document.body.innerHTML = "<p>No car selected.</p>";
        return;
    }

    // ✅ Assign the car's images dynamically
    images = car.images;  

    // ✅ Set the reference to your carousel container
    carousel = document.getElementById("carousel");

    // ✅ Display the first slide immediately
    showSlide(index);

    // You can also populate other car details here:
    document.getElementById("car-name").textContent = car.carName;
    document.getElementById("car-price").textContent = `₦${car.carPrice.toLocaleString()}`;
    document.getElementsByClassName("car-brand")[0].textContent = car.brand;
    document.getElementById("car-model").textContent = car.model;
    document.getElementsByClassName("body-type")[0].textContent = car.bodyType;
    document.getElementsByClassName("car-transmission")[0].textContent = car.transmission;
    document.getElementsByClassName("fuel-type")[0].textContent = car.fuelType;
    document.getElementsByClassName("car-colour")[0].textContent = car.colour;
    document.getElementsByClassName("car-mileage")[0].innerHTML = `${car.mileage.toLocaleString()}<span id="km">km</span>`;
    document.getElementsByClassName("car-year")[0].textContent = car.year;
};

// ✅ Function to show current image
function showSlide(i) {
    if (!images.length || !carousel) return; // safety check
    carousel.style.backgroundImage = `url(${images[i]})`;
}

// ✅ Function for next button
function nextSlide() {
    if (!images.length) return;
    index = (index + 1) % images.length;
    showSlide(index);
}

// ✅ Function for previous button
function prevSlide() {
    if (!images.length) return;
    index = (index - 1 + images.length) % images.length;
    showSlide(index);
}



// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< RANDOM DISPLAY OF CARS FROM API

async function showCars(limit = 20) {
    //  Get all cars from the backend
    const cars = await getAllCars();

    //  Select the container (fixing your selector)
    const container = document.querySelectorAll(".overflow"); // use . for class selector

    container.innerHTML = ""; //  Clear out any existing content

    //  Limit the cars shown to the specified number
    const limitedCars = cars.slice(0, limit);

    //  Loop through the cars and create car-profile divs
    limitedCars.forEach((car, index) => {
        const div = document.createElement("div");
        div.className = "car-profile";

        //  Add unique identifier so we can know which was clicked
        div.dataset.carId = car._id || car.id; // adjust according to your backend’s property

        //  Fill the HTML structure of the car card
        div.innerHTML = `
        <img src="${car.images[0]}" alt="${car.carName}" class="car-image">
        <div class="car-model">
            <p class="car-name">${car.carName}</p>
            <p class="core">
            <span class="engine-displacement">${car.engineDisplacement}L</span>
            <span class="engine">${car.engine} engine</span>,
            <span class="horse-power">${car.horsepower}hp</span> @
            <span class="rpm">${car.rpm.toLocaleString()}rpm</span>
            </p>
            <div class="first-properties">
            <div class="center">
                <i class='fas fa-map-marker-alt icon'></i>
                <span class="car-location px-16">${car.carLocation}</span>
            </div>
            <div class="center">
                <i class='fas fa-gas-pump' style='font-size: 1.45rem'></i>
                <span class="fuel px-16">${car.fuelType}</span>
            </div>
            </div>
            <div class="second-properties">
            <div class="center">
                <i class='fas fa-car' style='font-size: 1.45rem;'></i>
                <span class="body-type px-16">${car.bodyType}</span>
            </div>
            <div class="center">
                <i class='fas fa-gas-pump' style='font-size: 1.45rem'></i>
                <span class="fuel-tank px-16">${car.fuelCapacity} litres</span>
            </div>
            </div>
        </div>
        <h2 class="font car-price">₦ ${car.carPrice.toLocaleString()}</h2>
        `;

        //  Attach click event listener for the details page
        div.addEventListener("click", () => {
        // Store the entire car object in localStorage
        localStorage.setItem("selectedCar", JSON.stringify(car));

        // Redirect to car-details.html page
        window.location.href = "details.html";
        });

        //  Finally, add this card to the container
        container.appendChild(div);
    });
}

window.onload = () => showCars(20); // change 20 to how many you want displayed
