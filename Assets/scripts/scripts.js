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
    // Selecciona todos los botones "Añadir al carrito"
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    // Asociar eventos de clic a todos los botones
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productId = this.getAttribute('data-id');
            const productName = this.getAttribute('data-name');
            const productPrice = parseFloat(this.getAttribute('data-price'));

            // Añadir el producto al carrito
            addToCart({ id: productId, name: productName, price: productPrice });
        });
    });

    // Función para añadir un producto al carrito
    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        const existingProduct = cart.find(item => item.id === product.id);

        if (existingProduct) {
            existingProduct.quantity += 1; // Incrementa la cantidad si ya existe
        } else {
            cart.push({ ...product, quantity: 1 }); // Añade un nuevo producto
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${product.name} fue agregado al carrito`);
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotalElement = document.querySelector('.cart-total');
    const clearCartButton = document.getElementById('clearCart');

    // Renderizar el carrito en la página
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

            // Asociar evento de clic para eliminar
            cartItem.querySelector('.remove-item').addEventListener('click', function () {
                removeFromCart(item.id);
            });
        });

        cartTotalElement.textContent = total.toFixed(2);
    }

    // Función para eliminar un producto del carrito
    function removeFromCart(productId) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }

    // Vaciar el carrito
    clearCartButton.addEventListener('click', function () {
        localStorage.removeItem('cart');
        renderCart();
    });

    // Renderizar el carrito al cargar la página
    renderCart();
});


// Redirige a la página de pago
document.getElementById('finalizarcompra').addEventListener('click', function () {
    window.location.href = 'pago.html';
});

// Página de pago

document.getElementById('paymentForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Evita el envío del formulario
  
    let isValid = true;
  
    // Limpiar mensajes de error previos
    document.querySelectorAll('.error').forEach(el => el.textContent = '');
  
    // Validar nombre
    const name = document.getElementById('name').value.trim();
    if (name.length < 3) {
      isValid = false;
      document.getElementById('nameError').textContent = 'El nombre debe tener al menos 3 caracteres.';
    }
  
    // Validar correo
    const email = document.getElementById('email').value.trim();
    if (!/\S+@\S+\.\S+/.test(email)) {
      isValid = false;
      document.getElementById('emailError').textContent = 'Ingresa un correo válido.';
    }
  
    // Validar número de tarjeta
    const cardNumber = document.getElementById('cardNumber').value.trim();
    if (!/^\d{16}$/.test(cardNumber)) {
      isValid = false;
      document.getElementById('cardNumberError').textContent = 'El número de tarjeta debe tener 16 dígitos.';
    }
  
    // Validar fecha de expiración
    const expiration = document.getElementById('expiration').value.trim();
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiration)) {
      isValid = false;
      document.getElementById('expirationError').textContent = 'Ingresa una fecha válida (MM/AA).';
    }
  
    // Validar CVV
    const cvv = document.getElementById('cvv').value.trim();
    if (!/^\d{3}$/.test(cvv)) {
      isValid = false;
      document.getElementById('cvvError').textContent = 'El CVV debe tener 3 dígitos.';
    }
  
    // Mostrar mensaje de éxito si todo es válido
    if (isValid) {
      document.getElementById('successMessage').style.display = 'block';
      document.getElementById('paymentForm').style.display = 'none';
    }
  });

