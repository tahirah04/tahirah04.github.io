let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
const taxRate = 0.10;
const discountRate = 0.05;
const discountMin = 5;

function generateInvoiceNumber() {
    return "INV-" + Math.floor(100000 + Math.random() * 900000);
}

function getCurrentDate() {
    const today = new Date();
    return today.toLocaleString();
}

window.onload = function () {
    if (!localStorage.getItem("checkoutInitiated")) {
        localStorage.removeItem("cart");
    } else {
        localStorage.removeItem("checkoutInitiated");
        populateInvoice();
    }
};

function populateInvoice() {
    if (cartItems.length === 0) {
        document.getElementById("invoice-items").innerHTML = "";
        return;
    }

    let subtotal = 0;
    let totalQuantity = 0;
    let invoiceItemsContainer = document.getElementById("invoice-items");
    invoiceItemsContainer.innerHTML = "";

    let totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cart-count").innerText = totalItems;

    cartItems.forEach(item => {
        let total = item.quantity * item.price;
        subtotal += total;
        totalQuantity += item.quantity;

        let row = `<tr>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>$${total.toFixed(2)}</td>
        </tr>`;
        invoiceItemsContainer.innerHTML += row;
    });

    let discount = (totalQuantity >= discountMin) ? subtotal * discountRate : 0;
    let tax = (subtotal - discount) * taxRate;
    let totalAmount = subtotal - discount + tax;

    document.getElementById("invoice-number").innerText = generateInvoiceNumber();
    document.getElementById("invoice-date").innerText = getCurrentDate();
    document.getElementById("subtotal").innerText = `$${subtotal.toFixed(2)}`;
    document.getElementById("discount").innerText = `$${discount.toFixed(2)}`;
    document.getElementById("tax").innerText = `$${tax.toFixed(2)}`;
    document.getElementById("total").innerText = `$${totalAmount.toFixed(2)}`;
    document.getElementById("amount-due").innerText = `$${totalAmount.toFixed(2)}`;
}

document.getElementById("cancel").addEventListener("click", function() {
    window.location.href = "Invoice.html";
});

document.getElementById("exit").addEventListener("click", function() {
    window.location.href = "Login.html";
});
