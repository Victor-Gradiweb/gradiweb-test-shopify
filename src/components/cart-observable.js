console.log("VICTOR");
document.addEventListener("DOMContentLoaded", function () {
  // Seleccionamos el botón que agrega productos al carrito
  const addToCartButton = document.querySelector(
    ".btn-2 .btn-add-to-cart .btn-cart-js"
  );

  // Verificamos si el botón existe en el DOM
  if (addToCartButton) {
    // Escuchamos el evento de clic en el botón de agregar al carrito
    addToCartButton.addEventListener("click", function (event) {
      console.log("clicked");
      event.preventDefault(); // Prevenimos la acción por defecto, en caso de que sea un submit o enlace.

      // Aquí, puedes agregar el código necesario para agregar el producto al carrito.
      // Si estás usando el carrito Ajax de Shopify, puedes hacer una llamada Ajax aquí.
      console.log("Producto agregado al carrito");

      // Si estás usando el carrito Ajax, normalmente ejecutarías un llamado a la API de Shopify aquí,
      // como ejemplo:
      // Shopify.Cart.addItem(productId, quantity, function() {
      //    console.log("Producto agregado correctamente.");
      // });

      // Si no estás usando Ajax, Shopify manejará esto de forma automática,
      // pero puedes lanzar una acción adicional después de que se agregue el producto.

      // Ahora, llamamos al MutationObserver para que observe el carrito después de agregar el producto.
      observeCartChanges();
    });
  }

  // Función para observar los cambios en el carrito
  function observeCartChanges() {
    const cartItemsContainer = document.querySelector(".side-cart__items");

    if (cartItemsContainer) {
      const observer = new MutationObserver(function (mutationsList) {
        mutationsList.forEach(function (mutation) {
          // Reaccionamos solo si se han agregado nodos (productos) al carrito
          if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
            console.log("Nuevo item agregado al carrito!");
            // Aquí puedes realizar cualquier acción adicional, como actualizar la UI
            // o mostrar un mensaje de confirmación, etc.
          }
        });
      });

      const config = { childList: true }; // Observamos los cambios en los elementos hijos.
      observer.observe(cartItemsContainer, config);
    }
  }
});
