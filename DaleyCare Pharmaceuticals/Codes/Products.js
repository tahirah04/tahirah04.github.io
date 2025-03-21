const cart = [];

function addtoCart(id, change) {
    var input = document.getElementById(id);
    var newValue = parseInt(input.value) + change;
    if (newValue > 0) {
        input.value = newValue;
    }
}

// Global arrays to track products, quantities, and prices
let products = [
    { id: 'prod1', name: 'Equate Ibuprofen Pain Reliever/Fever Reducer Coated Tablets, 200mg, 100 Count', price: 800, quantity: 1 },
    { id: 'prod2', name: 'Cetamol Cold & Flu Nightime (20 Tablets)', price: 650, quantity: 1 },
    { id: 'prod3', name: 'Flintstones Gummies', price: 3500, quantity: 1 },
    { id: 'prod4', name: 'Natures Bounty Hair Skin Nails Gummies With Biotin (1 Gummy)', price: 1850, quantity: 1 },
    { id: 'prod5', name: 'Band-Aid Flexible Fabric Adhesive Bandages 3/4" X 3" 100 Ct', price: 1500, quantity: 1 },
    { id: 'prod6', name: 'Carex Arm Slings Universal', price: 3360, quantity: 1 },
    { id: 'prod7', name: 'Medline Adjustable Quick-Fit Crutches', price: 6700, quantity: 1 },
    { id: 'prod8', name: 'Walker W/Wheels Folding', price: 15000, quantity: 1},
    { id: 'prod9', name: 'Medline Comfortable Folding Manual Wheelchair with Swing-Back Arms, Elevating Footrests, 20" Seat', price: 25800, quantity: 1 }
];

function addtoCart(productId, change) {
    let product = products.find(p => p.id === productId);
    if (!product) return;

    let inputField = document.getElementById(productId);
    let newQty = Math.max(1, parseInt(inputField.value) + change);
    inputField.value = newQty;
    product.quantity = newQty;
    updateCart();
}

function updateCart() {
    let totalItems = cart.reduce((sum, product) => sum + product.quantity, 0);
    document.getElementById("cart-count").innerText = totalItems;
}

document.querySelectorAll("#cart").forEach((button, index) => {
    button.addEventListener("click", () => {
        let product = products[index];
        if (product.quantity > 0) {
            let existingProduct = cart.find(p => p.id === product.id);
            if (existingProduct) {
                existingProduct.quantity = product.quantity;
            } else {
                cart.push({ ...product });
            }
            updateCart();
        }
    });
});

document.getElementById("checkout").addEventListener("click", () => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("checkoutInitiated", "true"); 
    window.location.href = "Invoice.html";
});

document.getElementById("cancel").addEventListener("click", () => {
    window.location.href = "Products.html";
});

document.getElementById("exit").addEventListener("click", () => {
    window.location.href = "Login.html";
});