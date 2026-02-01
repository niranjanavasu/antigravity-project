document.addEventListener('DOMContentLoaded', () => {
    updateNavAuth();
    updateCartCount();

    // Listen for custom events
    window.addEventListener('cart-updated', updateCartCount);
});

function updateNavAuth() {
    const user = Data.getUser();
    const navLinks = document.querySelector('.nav-links');

    if (user) {
        let linksHtml = `
            <span>Welcome, ${user.name}</span>
            <a href="index.html" class="nav-link">Home</a>
        `;

        if (user.role === 'admin') {
            linksHtml += `<a href="admin.html" class="nav-link">Dashboard</a>`;
        } else {
            linksHtml += `<a href="orders.html" class="nav-link">My Orders</a>`;
        }

        linksHtml += `
            <a href="cart.html" class="nav-link">Cart <span id="cart-count" class="badge">0</span></a>
            <button onclick="Data.logout()" class="btn btn-secondary" style="padding: 4px 12px; font-size: 0.9rem;">Logout</button>
        `;
        navLinks.innerHTML = linksHtml;
    } else {
        navLinks.innerHTML = `
            <a href="index.html" class="nav-link">Home</a>
             <a href="cart.html" class="nav-link">Cart <span id="cart-count" class="badge">0</span></a>
            <a href="login.html" class="btn btn-primary">Login</a>
        `;
    }
}

function updateCartCount() {
    const cart = Data.getCart();
    const count = cart.reduce((acc, item) => acc + item.qty, 0);
    const badge = document.getElementById('cart-count');
    if (badge) badge.textContent = count;
}

// Utilities for rendering
function formatPrice(price) {
    return '₹' + price;
}
