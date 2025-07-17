// Get cart elements
const cartToggle = document.getElementById('cartToggle');
const cartSlide = document.getElementById('cartSlide');
const closeCart = document.getElementById('closeCart');
const customizationPizzaSlide = document.getElementById('customizationPizza');
const closePizzaCustomization = document.getElementById('closePizzaCustomization');
const customizationBurgerSlide = document.getElementById('customizationBurger');
const closeBurgerCustomization = document.getElementById('closeBurgerCustomization');
const customizationDrinkSlide = document.getElementById('customizationDrink');
const closeDrinkCustomization = document.getElementById('closeDrinkCustomization');
const cartItems = document.getElementById('cartItems');
const emptyCartMessage = document.getElementById('emptyCartMessage');
const cartCount = document.getElementById('cartCount');
const totalPriceDisplay = document.getElementById('totalPriceDisplay');

// Confirmation alert elements
const confirmationAlert = document.getElementById('confirmationAlert');
const confirmRemove = document.getElementById('confirmRemove');
const cancelRemove = document.getElementById('cancelRemove');
const sizeAlert = document.getElementById('sizeAlert'); // Add size alert element

let cart = [];
let itemToRemoveIndex;

// Sample descriptions for items
const itemDescriptions = {

};

// Toggle cart slide
cartToggle.addEventListener('click', () => {
    cartSlide.classList.toggle('show');
});

// Close cart slide
closeCart.addEventListener('click', () => {
    cartSlide.classList.remove('show');
});

// Close customization slides
closePizzaCustomization.addEventListener('click', () => {
    customizationPizzaSlide.classList.remove('show');
});

closeBurgerCustomization.addEventListener('click', () => {
    customizationBurgerSlide.classList.remove('show');
});

closeDrinkCustomization.addEventListener('click', () => {
    customizationDrinkSlide.classList.remove('show');
});

// Variables for selected item details
let selectedItem = {};
let selectedQuantity = 1;

// Reset selections for quantity and ingredients
function resetSelections() {
    selectedQuantity = 1;
    document.getElementById('pizzaQuantity').innerText = selectedQuantity; // Reset pizza quantity display
    document.getElementById('burgerQuantity').innerText = selectedQuantity; // Reset burger quantity display
    document.getElementById('drinkQuantity').innerText = selectedQuantity; // Reset drink quantity display

    // Reset ingredients selections
    document.querySelectorAll('input[type="checkbox"]:checked').forEach(input => input.checked = false);
    document.querySelectorAll('input[type="radio"]:checked').forEach(input => input.checked = false);
}

// Select item button functionality
const selectButtons = document.querySelectorAll('.btn-select');
selectButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const itemName = e.currentTarget.dataset.item;
        const itemPrice = parseFloat(e.currentTarget.dataset.price);

        // Reset previous selections
        resetSelections();

        selectedItem = { name: itemName, price: itemPrice };

        // Show appropriate customization slide
        if (itemName.includes('Pizza')) {
            document.getElementById('selectedPizzaTitle').innerText = itemName;
            pizzaDescriptionText.innerText = itemDescriptions[itemName] || "No description available.";
            customizationPizzaSlide.classList.add('show');
        } else if (itemName.includes('Burger')) {
            document.getElementById('selectedBurgerTitle').innerText = itemName;
            burgerDescriptionText.innerText = itemDescriptions[itemName] || "No description available.";
            customizationBurgerSlide.classList.add('show');
        } else if (itemName.includes('Drink')) {
            document.getElementById('selectedDrinkTitle').innerText = itemName;
            drinkDescriptionText.innerText = itemDescriptions[itemName] || "No description available.";
            customizationDrinkSlide.classList.add('show');
        }
    });
});

// Quantity controls
function updateQuantity(itemType, action) {
    const quantityDisplay = document.getElementById(`${itemType}Quantity`);
    if (action === 'increase') {
        selectedQuantity++;
    } else if (action === 'decrease' && selectedQuantity > 1) {
        selectedQuantity--;
    }
    quantityDisplay.innerText = selectedQuantity;
}

// Quantity controls for pizzas
document.getElementById('decreasePizzaQuantity').addEventListener('click', () => updateQuantity('pizza', 'decrease'));
document.getElementById('increasePizzaQuantity').addEventListener('click', () => updateQuantity('pizza', 'increase'));

// Quantity controls for burgers
document.getElementById('decreaseBurgerQuantity').addEventListener('click', () => updateQuantity('burger', 'decrease'));
document.getElementById('increaseBurgerQuantity').addEventListener('click', () => updateQuantity('burger', 'increase'));

// Quantity controls for drinks
document.getElementById('decreaseDrinkQuantity').addEventListener('click', () => updateQuantity('drink', 'decrease'));
document.getElementById('increaseDrinkQuantity').addEventListener('click', () => updateQuantity('drink', 'increase'));



// Show size alert
function showSizeAlert() {
    sizeAlert.style.display = 'block'; // Show the alert
}

// Close size alert
function closeSizeAlert() {
    sizeAlert.style.display = 'none'; // Hide the alert
}

// Adding item to cart
function addToCart(itemType) {
    let customizationSlide, ingredientOptions, freeIngredientOptions;

    if (itemType === 'pizza') {
        customizationSlide = customizationPizzaSlide;
        ingredientOptions = document.querySelectorAll('#pizzaIngredientOptions input:checked');
        freeIngredientOptions = document.querySelectorAll('#pizzaFreeIngredientOptions input:checked');
    } else if (itemType === 'burger') {
        customizationSlide = customizationBurgerSlide;
        ingredientOptions = document.querySelectorAll('#burgerIngredientOptions input:checked');
        freeIngredientOptions = document.querySelectorAll('#burgerFreeIngredientOptions input:checked');
    } else if (itemType === 'drink') {
        customizationSlide = customizationDrinkSlide;
        ingredientOptions = document.querySelectorAll('#drinkIngredientOptions input:checked');
        freeIngredientOptions = document.querySelectorAll('#drinkFreeIngredientOptions input:checked');
    }

    // Get selected size
    const selectedSize = document.querySelector(`input[name="size${itemType.charAt(0).toUpperCase() + itemType.slice(1)}"]:checked`);

    if (itemType !== 'burger' && !selectedSize) {
        showSizeAlert(); // Show alert if size is not selected for pizza or drink
        return; // Stop execution if size is not selected
    }

    // Set size if applicable
    if (selectedSize) {
        selectedItem.size = selectedSize.value;
        const sizePrice = parseFloat(selectedSize.dataset.price);

        // Calculate total price
        let extraCost = 0;
        ingredientOptions.forEach(option => {
            extraCost += parseFloat(option.dataset.price);
        });

        // Calculate total price
        const totalPrice = (selectedItem.price + extraCost + sizePrice) * selectedQuantity;
        selectedItem.price = totalPrice;
        selectedItem.quantity = selectedQuantity;
        selectedItem.ingredients = Array.from(ingredientOptions).map(option => option.id);
        selectedItem.freeIngredients = Array.from(freeIngredientOptions).map(option => option.id);

        // Add item to cart
        cart.push({ ...selectedItem });
        updateCart();
        customizationSlide.classList.remove('show'); // Close the customization slide after adding
    } else {
        // For burger, add to cart without size
        const totalPrice = (selectedItem.price) * selectedQuantity;
        selectedItem.price = totalPrice;
        selectedItem.quantity = selectedQuantity;
        selectedItem.ingredients = Array.from(ingredientOptions).map(option => option.id);
        selectedItem.freeIngredients = Array.from(freeIngredientOptions).map(option => option.id);
        cart.push({ ...selectedItem });
        updateCart();
        customizationSlide.classList.remove('show'); // Close the customization slide after adding
    }
}

// Adding item to cart for each type
document.getElementById('addToCartPizzaButton').addEventListener('click', () => addToCart('pizza'));
document.getElementById('addToCartBurgerButton').addEventListener('click', () => addToCart('burger'));
document.getElementById('addToCartDrinkButton').addEventListener('click', () => addToCart('drink'));

function updateCart() {
    cartItems.innerHTML = '';
    let totalPrice = 0;

    if (cart.length === 0) {
        emptyCartMessage.style.display = 'block';
        totalPriceDisplay.innerText = "Total Price: ₹0.00";
        document.getElementById('checkoutButton').style.display = 'none'; // Hide checkout button when cart is empty
    } else {
        emptyCartMessage.style.display = 'none';
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

            cartItem.innerHTML = `
                <p><strong>${item.name}</strong> - ${item.size || 'No Size'} </p>
                <p><b>Quantity:</b> ${item.quantity}</p>
                <p><b>Charged Ingredients:</b> ${item.ingredients.join(', ') || 'None'}</p>
                <p><b>Removed Ingredients:</b> ${item.freeIngredients.join(', ') || 'None'}</p>
                <button class="btn btn-sm btn-danger" onclick="prepareRemoveCartItem(${index})">Remove</button>
            `;

            cartItems.appendChild(cartItem);
            totalPrice += item.price;
        });
        totalPriceDisplay.innerHTML = `<strong>Total Price:</strong> ₹${totalPrice.toFixed(2)}`;

        document.getElementById('checkoutButton').style.display = 'block'; // Show checkout button when cart has items
    }

    cartCount.innerText = cart.length;

    // Save cart to local storage after updating the cart display
    localStorage.setItem('cartItems', JSON.stringify(cart));
}

// Prepare to remove item from cart
function prepareRemoveCartItem(index) {
    itemToRemoveIndex = index; // Store index of the item to remove
    confirmationAlert.style.display = 'block'; // Show confirmation alert
}

// Confirm removal of item from cart
confirmRemove.addEventListener('click', () => {
    cart.splice(itemToRemoveIndex, 1); // Remove item from cart
    updateCart(); // Update cart display
    confirmationAlert.style.display = 'none'; // Hide confirmation alert
});

// Cancel removal of item
cancelRemove.addEventListener('click', () => {
    confirmationAlert.style.display = 'none'; // Hide confirmation alert
});

// Close size alert
document.getElementById('closeSizeAlert').addEventListener('click', closeSizeAlert);

// Close slides on outside click
document.addEventListener('click', (e) => {
    const isOutsideCart = !cartSlide.contains(e.target) && !cartToggle.contains(e.target);
    const isOutsideCustomizationPizza = !customizationPizzaSlide.contains(e.target) && !Array.from(selectButtons).some(btn => btn.contains(e.target));
    const isOutsideCustomizationBurger = !customizationBurgerSlide.contains(e.target) && !Array.from(selectButtons).some(btn => btn.contains(e.target));
    const isOutsideCustomizationDrink = !customizationDrinkSlide.contains(e.target) && !Array.from(selectButtons).some(btn => btn.contains(e.target));

    if (isOutsideCart) {
        cartSlide.classList.remove('show');
    }
    if (isOutsideCustomizationPizza) {
        customizationPizzaSlide.classList.remove('show');
    }
    if (isOutsideCustomizationBurger) {
        customizationBurgerSlide.classList.remove('show');
    }
    if (isOutsideCustomizationDrink) {
        customizationDrinkSlide.classList.remove('show');
    }
});

// Option Link Functionality
const optionLinks = document.querySelectorAll('.option');
const productCards = document.querySelectorAll('#productCards > div');

// Show pizza items by default on page load
document.addEventListener('DOMContentLoaded', () => {
    const pizzaCards = document.getElementById('pizzaCards');
    if (pizzaCards) {
        pizzaCards.classList.remove('d-none');  // Show pizza items by default
    }
});

// Option link functionality to toggle between product types
optionLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        // Hide all product cards
        productCards.forEach(card => {
            card.classList.add('d-none');
        });

        // Show the selected product cards
        const targetId = e.currentTarget.getAttribute('href').substring(1); // Remove the '#'
        const targetCards = document.getElementById(targetId);

        if (targetCards) {
            targetCards.classList.remove('d-none');
        }
    });
});




document.querySelectorAll('.btn-description').forEach(button => {
    button.addEventListener('click', function () {
        const descriptionText = this.getAttribute('data-description');
        const descriptionElement = this.nextElementSibling;

        // Toggle description display
        if (descriptionElement.style.display === 'none') {
            descriptionElement.textContent = descriptionText;
            descriptionElement.style.display = 'block';
        } else {
            descriptionElement.style.display = 'none';
        }
    });
});







// Get all description buttons (for pizza, burger, drinks, etc.)
const openButtons = document.querySelectorAll('.btn-description');

// Open the overlay for the clicked button
openButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Get the target overlay ID from the button's data-overlay attribute
        const overlayId = button.getAttribute('data-overlay');
        const targetOverlay = document.getElementById(overlayId);

        // Show the selected overlay and set opacity
        targetOverlay.style.visibility = "visible"; // Make the overlay visible
        targetOverlay.style.display = "block"; // Ensure it is displayed
        setTimeout(() => {
            targetOverlay.style.opacity = 1; // Fade-in the overlay
        }, 10);
    });
});

// Get all close buttons in the overlays
const closeButtons = document.querySelectorAll('.close-btn');

// Close the overlay
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const parentOverlay = button.closest('.overlay'); // Get the closest overlay element
        
        parentOverlay.style.opacity = 0; // Fade-out the overlay
        setTimeout(() => {
            parentOverlay.style.visibility = "hidden"; // Hide visibility after fade-out
            parentOverlay.style.display = "none"; // Ensure it is not displayed
        }, 500); // Wait for fade-out transition to finish
    });
});

    




