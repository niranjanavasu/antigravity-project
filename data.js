const MOCK_RESTAURANTS = [
    {
        id: 'r1',
        name: 'Burger King',
        cuisine: 'American, Fast Food',
        rating: 4.3,
        time: '25-30 min',
        image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500&q=80',
        items: [
            { id: 'f1', name: 'Whopper', price: 199, desc: 'Flame-grilled beef patty, topped with tomatoes, cut lettuce.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80' },
            { id: 'f2', name: 'Chicken Fries', price: 149, desc: 'Breaded, crispy fried chicken strips.', image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&q=80' }
        ]
    },
    {
        id: 'r2',
        name: 'Pizza Hut',
        cuisine: 'Italian, Pizzas',
        rating: 4.1,
        time: '30-40 min',
        image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&q=80',
        items: [
            { id: 'f3', name: 'Margherita', price: 299, desc: 'Classic cheese pizza with basil.', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80' },
            { id: 'f4', name: 'Pepperoni', price: 399, desc: 'Pepperoni feast pizza.', image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&q=80' }
        ]
    },
    {
        id: 'r3',
        name: 'Green Bowl',
        cuisine: 'Healthy, Salads',
        rating: 4.8,
        time: '15-25 min',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80',
        items: [
            { id: 'f5', name: 'Caesar Salad', price: 249, desc: 'Romaine lettuce, croutons, parmesan cheese.', image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=500&q=80' },
            { id: 'f6', name: 'Quinoa Bowl', price: 299, desc: 'Healthy quinoa with roasted veg.', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80' }
        ]
    }
];

// Initialize Data if empty
if (!localStorage.getItem('restaurants')) {
    localStorage.setItem('restaurants', JSON.stringify(MOCK_RESTAURANTS));
}

// Ensure local storage keys exist
if (!localStorage.getItem('cart')) localStorage.setItem('cart', JSON.stringify([]));
if (!localStorage.getItem('orders')) localStorage.setItem('orders', JSON.stringify([]));
if (!localStorage.getItem('user')) localStorage.setItem('user', JSON.stringify(null));

const Data = {
    getRestaurants: () => JSON.parse(localStorage.getItem('restaurants')),
    getCart: () => JSON.parse(localStorage.getItem('cart')),
    getUser: () => JSON.parse(localStorage.getItem('user')),
    getOrders: () => JSON.parse(localStorage.getItem('orders')),
    
    addToCart: (item) => {
        const cart = Data.getCart();
        const existing = cart.find(x => x.id === item.id);
        if (existing) {
            existing.qty += 1;
        } else {
            cart.push({ ...item, qty: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        window.dispatchEvent(new Event('cart-updated'));
    },
    
    removeFromCart: (itemId) => {
        let cart = Data.getCart();
        cart = cart.filter(x => x.id !== itemId);
        localStorage.setItem('cart', JSON.stringify(cart));
        window.dispatchEvent(new Event('cart-updated'));
    },

    clearCart: () => {
        localStorage.setItem('cart', JSON.stringify([]));
        window.dispatchEvent(new Event('cart-updated'));
    },

    login: (username, password) => {
        if (username === 'admin' && password === 'admin') {
            const user = { name: 'Admin User', role: 'admin' };
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        }
        // Mock regular user login
        const user = { name: username, role: 'user' };
        localStorage.setItem('user', JSON.stringify(user));
        return user;
    },

    logout: () => {
        localStorage.setItem('user', JSON.stringify(null));
        window.location.href = 'index.html';
    }
};
