// Validación para formulario de ayuda

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.form-contacto');

    form.addEventListener('submit', function (e) {
        e.preventDefault(); 

        let isValid = true;

        
        const inputs = form.querySelectorAll('input, textarea');

        
        inputs.forEach(function (input) {
           
            const existingError = input.parentNode.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }

            
            if (input.value.trim() === '') {
                isValid = false;

                
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.style.color = 'red';
                errorMessage.style.fontSize = '12px';
                errorMessage.textContent = 'Este campo es obligatorio.';
                input.parentNode.appendChild(errorMessage);
            }
        });

        
        if (isValid) {
            alert('Formulario enviado con éxito! Gracias por comunicarte con nosotros, en breve nos pondremos en contacto!');
            form.submit(); 
        }
    });
});


// Validación de ingreso 

document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('registerForm');
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('emailRegister');
    const password = document.getElementById('passwordRegister');

    registerForm.addEventListener('submit', function (e) {
        e.preventDefault(); 

        let isValid = true;

       
        const errorMessages = registerForm.querySelectorAll('.error-message');
        errorMessages.forEach(function (msg) {
            msg.remove();
        });

       
        if (firstName.value.trim() === '') {
            isValid = false;
            showError(firstName, 'El nombre es obligatorio.');
        }

       
        if (lastName.value.trim() === '') {
            isValid = false;
            showError(lastName, 'El apellido es obligatorio.');
        }

       
        if (email.value.trim() === '') {
            isValid = false;
            showError(email, 'El email es obligatorio.');
        } else if (!validateEmail(email.value)) {
            isValid = false;
            showError(email, 'Por favor, ingresa un email válido.');
        }

     
        if (password.value.trim() === '') {
            isValid = false;
            showError(password, 'La contraseña es obligatoria.');
        } else if (password.value.length < 6) {
            isValid = false;
            showError(password, 'La contraseña debe tener al menos 6 caracteres.');
        }

        
        if (isValid) {
            localStorage.setItem('userName', firstName.value.trim());
            alert('Registro exitoso!');
            window.location.href = '../../index.html';
        }
    });

    
    function showError(input, message) {
        const error = document.createElement('div');
        error.className = 'error-message';
        error.style.color = 'red';
        error.style.fontSize = '12px';
        error.textContent = message;
        input.parentNode.appendChild(error);
    }

   
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});


// Modificador del Index cuando ingresamos. 

document.addEventListener('DOMContentLoaded', function () {
    const sessionButton = document.getElementById('sessionButton');
    const userName = localStorage.getItem('userName');

    if (userName) {
        sessionButton.innerHTML = `<span>¡Hola, ${userName}!</span>`;
        sessionButton.querySelector('a').remove(); 
    }
});


// Carrito 

document.addEventListener('DOMContentLoaded', function () {
    const addToCartButton = document.getElementById('addToCart');

    if (addToCartButton) {
        addToCartButton.addEventListener('click', function () {
            const productId = this.getAttribute('data-id');
            const productName = this.getAttribute('data-name');
            const productPrice = parseFloat(this.getAttribute('data-price'));

            addToCart({ id: productId, name: productName, price: productPrice });
        });
    }

    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        const existingProduct = cart.find(item => item.id === product.id);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${product.name} fue agregado al carrito`);
    }
});


document.addEventListener('DOMContentLoaded', function () {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotalElement = document.querySelector('.cart-total');
    const clearCartButton = document.getElementById('clearCart');

    function renderCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            total += item.price * item.quantity;

            const cartItem = document.createElement('li');
            cartItem.innerHTML = `
                ${item.name} - $${item.price} x ${item.quantity}
                <button class="remove-item" data-id="${item.id}">Eliminar</button>
            `;
            cartItemsContainer.appendChild(cartItem);

            cartItem.querySelector('.remove-item').addEventListener('click', function () {
                removeFromCart(item.id);
            });
        });

        cartTotalElement.textContent = total.toFixed(2);
    }

    function removeFromCart(productId) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }

    clearCartButton.addEventListener('click', function () {
        localStorage.removeItem('cart');
        renderCart();
    });

    renderCart();
});
