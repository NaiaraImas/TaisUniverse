document.addEventListener('DOMContentLoaded', function () {
  const cartItemsContainer = document.querySelector('.cart-items');
  const cartTotalElement = document.querySelector('.cart-total');
  const clearCartButton = document.getElementById('clearCart');
  const productosContainer = document.getElementById('productos-container');

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

  function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    alert(`${product.name} fue agregado al carrito`);
  }

  function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  }

  clearCartButton.addEventListener('click', () => {
    localStorage.removeItem('cart');
    renderCart();
  });

  renderCart();

  // --- Productos desde backend ---
  fetch('http://localhost:3000/api/products')
    .then(res => res.json())
    .then(data => {
      data.forEach(producto => {
        const card = document.createElement('div');
        card.classList.add('product-card');

        card.innerHTML = `
          <h3>${producto.nombre}</h3>
          <p>${producto.descripcion || 'Sin descripción'}</p>
          <p><strong>$${producto.precio}</strong></p>
          <button class="add-to-cart" data-id="${producto.id}" data-name="${producto.nombre}" data-price="${producto.precio}">Agregar al carrito</button>
        `;

        productosContainer.appendChild(card);
      });

      document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function () {
          const id = this.getAttribute('data-id');
          const name = this.getAttribute('data-name');
          const price = parseFloat(this.getAttribute('data-price'));
          addToCart({ id, name, price });
        });
      });
    })
    .catch(error => {
      console.error('❌ Error al cargar productos desde backend:', error);
    });
});
