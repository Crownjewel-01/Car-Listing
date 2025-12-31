// import { getAllCars } from "../carAPI.js";  // ...................................This works for all endpoints in the possible endpoints in the page

// Carousel functionality


// document.addEventListener("DOMContentLoaded", () => {
//     const images = [
//     'image/Car-Images/auto-2179220_1920.jpg',
//     'image/Car-Images/bentley-5588541_1920.jpg',
//     'image/Car-Images/car-5729688_1920.jpg',
//     'image/Car-Images/ferrari-6615334_1920.jpg',
//     'image/Car-Images/lamborghini-6011781_1920.jpg',
//     'image/Car-Images/porsche-7770665_1920.jpg',
//     'image/Car-Images/porsche-8182100_1920.jpg',
//     'image/Car-Images/vintage-car-7300881_1280.jpg'
//     ];

//     let index = 0;
//     const carousel = document.getElementById("carousel");

//     function changeBackground() {
//         carousel.style.backgroundImage = `url(${images[index]})`;
//         index = (index + 1) % images.length;
//     }

//     changeBackground(); // Initial
//     setInterval(changeBackground, 8000); // Change every 8 seconds

//     console.log(carousel);

// });


const image = [
    'image/Car-Images/auto-2179220_1920.jpg',
    'image/Car-Images/bentley-5588541_1920.jpg',
    'image/Car-Images/car-5729688_1920.jpg',
    'image/Car-Images/ferrari-6615334_1920.jpg',
    'image/Car-Images/lamborghini-6011781_1920.jpg',
    'image/Car-Images/porsche-7770665_1920.jpg',
    'image/Car-Images/porsche-8182100_1920.jpg',
    'image/Car-Images/vintage-car-7300881_1280.jpg'
];

let index = 0;
const carousel = document.getElementById("carousel");

function changeBackground() {
    carousel.style.backgroundImage = `url(${image[index]})`;
    index = (index + 1) % image.length;
}

changeBackground(); // Initial
setInterval(changeBackground, 8000); // Change every 8 seconds




// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< DROPDOWN FUNCTIONALITY USING VANILLA JS
// // Toggle dropdown visibility
// document.querySelectorAll('.dropdown-btn').forEach(btn => {
//     btn.addEventListener('click', function (e) {
//     // Close all dropdowns first
//     document.querySelectorAll('.dropdown-content').forEach(menu => menu.classList.remove('show'));

//         // Open the one related to this button
//         const menu = this.nextElementSibling;
//         menu.classList.toggle('show');

//         // Stop event from bubbling to window click listener
//         e.stopPropagation();
//     });
// });

// // Set option text into button and close dropdown
// document.querySelectorAll('.dropdown-content a').forEach(option => {
//     option.addEventListener('click', function () {
//         const btn = this.closest('.dropdown').querySelector('.dropdown-btn');
//         btn.textContent = this.textContent;
//         this.parentElement.classList.remove('show');
//     });
// });

// // Close dropdowns if clicked outside
// window.addEventListener('click', function () {
//     document.querySelectorAll('.dropdown-content').forEach(menu => menu.classList.remove('show'));
// });






// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< RANDOM DISPLAY OF CARS FROM API

// import { getAllCars } from "../carAPI.js";  // ...................................This works for all endpoints in the possible endpoints in the page

async function showCars(limit = 10) {
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

window.onload = () => showCars(15); // change 15 to how many you want displayed























// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< FILTERED DISPLAY OF CARS FROM API BASED ON USER SELECTION



// ...............................Function to display cars in the containers
async function showCars(filteredCars) {
    const containers = document.querySelectorAll(".overview");



    // Clear all containers before displaying new results
    containers.forEach(container => (container.innerHTML = ""));  

    // Calculate how many cars go into each container
    const carsPerContainer = Math.ceil(filteredCars.length / containers.length); 


    // Loop through each container
    containers.forEach((container, index) => {
        const start = index * carsPerContainer;
        const end = start + carsPerContainer;
        const carsForThisContainer = filteredCars.slice(start, end);


        // Loop through filtered car list meant for this container
        carsForThisContainer.forEach(car => {
            const div = document.createElement("div");
            div.className = "car-profile";

            div.innerHTML = `
            <img src="${car.images?.[0] || 'default.jpg'}" alt="" class="car-image">
            <div class="car-model">
                <p class="car-name">${car.carName}</p>
                <p class="core"><span class="engine-displacement">${car.engineDisplacement}L</span> <span class="engine">${car.engine} engine</span>, <span class="horse-power">${car.horsepower}hp</span> @ <span class="rpm">${Number(car.rpm || 0).toLocaleString()}rpm</span> </p>
                <div class="first-properties">
                    <div class="center">
                        <i class='fas fa-map-marker-alt icon'></i> <span class="car-location px-16">${car.carLocation}</span>
                    </div>
                    <div class="center">
                        <i class='fas fa-gas-pump' style='font-size: 1.45rem'></i> <span class="fuel px-16">${car.fuelType}</span>
                    </div>
                </div>
                <div class="second-properties">
                    <div class="center">
                        <i class='fas fa-car' style='font-size: 1.45rem;'></i> <span class="body-type px-16">${car.bodyType}</span>
                    </div>
                    <div class="center">
                        <i class='fas fa-gas-pump' style='font-size: 1.45rem'></i> <span class="fuel-tank px-16">${car.fuelCapacity} litres</span>
                    </div>
                </div>
            </div>
            <h2 class="font car-price">₦ ${Number(car.carPrice || 0).toLocaleString()}</h2>
            `;
            
            // ✅ Add event listener for each car-profile
            div.addEventListener("click", () => {
                // Save clicked car's data into localStorage
                localStorage.setItem("selectedCarId", car.id);
                window.location.href = "details.html";


                // Redirect to car details page
                window.location.href = "details.html";
            });

            // Append each car to the container
            container.appendChild(div);
        });
    });
}

// ...............................Function that runs when FIND is clicked
async function filterCars() {
    const cars = await getAllCars();

    // Get filter values
    const brand = document.getElementById("filterBrand").value.trim();
    const model = document.getElementById("filterModel").value.trim();
    const bodyType = document.getElementById("filterBodyType").value.trim();
    const minPrice = document.getElementById("filterMinPrice").value;
    const maxPrice = document.getElementById("filterMaxPrice").value;

    // Filter cars based on user selection
    const filteredCars = cars.filter(car => {
        const matchBrand = !brand || car.brand.toLowerCase() === brand.toLowerCase();
        const matchModel = !model || car.model.toLowerCase() === model.toLowerCase();
        const matchBody = !bodyType || car.bodyType?.toLowerCase() === bodyType.toLowerCase();
        const matchMin = !minPrice || car.price >= parseFloat(minPrice);
        const matchMax = !maxPrice || car.price <= parseFloat(maxPrice);

        return matchBrand && matchModel && matchBody && matchMin && matchMax;
    });

    showCars(filteredCars);

    if (filteredCars.length === 0) {
        alert("No cars match your filter.");
    }

}

// ...............................Trigger filtering on button click
document.getElementById("button").addEventListener("click", filterCars);

// ...............................Display all cars by default
window.onload = async () => {
    const cars = await getAllCars();
    showCars(cars);
};



















