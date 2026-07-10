const coffeeList = document.getElementById("coffeeList");

async function getCoffees() {
    const response = await fetch("/api/coffees");
    const coffees = await response.json();

    coffeeList.innerHTML = "";

    coffees.forEach((coffee) => {
        coffeeList.innerHTML += `
            <div class="coffee-card">
                <h2>${coffee.name}</h2>
                <p>Price: ₹${coffee.price}</p>
                <p>Votes: <b>${coffee.votes}</b></p>
                <button onclick="voteCoffee('${coffee._id}')">Vote</button>
            </div>
        `;
    });
}

async function voteCoffee(id) {
    await fetch(`/api/coffees/${id}/vote`, {
        method: "PUT"
    });

    getCoffees();
}

getCoffees();