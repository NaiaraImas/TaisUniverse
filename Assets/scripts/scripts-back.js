document.addEventListener('DOMContentLoaded', function () {
  const productosContainer = document.getElementById('productos-container');

  if (!productosContainer) {
    console.warn('🛑 Contenedor de productos no encontrado');
    return;
  }

  // Traer productos desde el backend
  fetch('http://localhost:3000/api/products')
    .then(res => res.json())
    .then(data => {
      if (!Array.isArray(data)) {
        console.error('⚠️ Respuesta inesperada del backend:', data);
        return;
      }

      data.forEach(producto => {
        const card = document.createElement('div');
        card.classList.add('card-category'); 
        card.classList.add(`category-${producto.id}`); 


        card.innerHTML = `
          <h3>${producto.nombre}</h3>
          <p>${producto.descripcion || 'Sin descripción'}</p>
          <p><strong>$${producto.precio}</strong></p>
          <button class="add-to-cart" data-id="${producto.id}" data-name="${producto.nombre}" data-price="${producto.precio}">
            Agregar al carrito
          </button>
        `;

        productosContainer.appendChild(card);
      });

      // Eventos para los botones "Agregar al carrito"
      document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function () {
          const id = this.getAttribute('data-id');
          const name = this.getAttribute('data-name');
          const price = parseFloat(this.getAttribute('data-price'));

          // Función global del otro script
          if (typeof addToCart === 'function') {
            addToCart({ id, name, price });
          } else {
            alert('⚠️ La función addToCart no está disponible');
          }
        });
      });
    })
    .catch(error => {
      console.error('❌ Error al cargar productos desde el backend:', error);
    });
});
