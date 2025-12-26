function obtenerProductos() {
    return database;
}

function crearTarjetaProducto(producto, onAdd) {
    const article = document.createElement("article");
    article.classList.add("product-card");

    article.innerHTML = `
            <section class="product-brand">
                <p>${producto.marca}</p>
            </section>
            <header class="product-header">
                <div class="product-title">
                    <h3>${producto.nombre}</h3>
                </div>
            </header>
            <section class="product-storage">
                <p>${producto.capacidad}</p>
            </section>
            <section class="product-price">
                <p>S/ ${producto.precio}</p>
            </section>

            <footer class="product-action">
                <div class="quantity-control">
                        <button type="button " class="btn-qty btn-minus"> - </button>
                        <span class="qty-value">1</span>
                        <button type="button" class="btn-qty btn-plus">  +  </button>
                </div>
                <button type="button" class="btn-add" aria-label="Agregar al carrito">Agregar</button>
             </footer>
    `;

    let cantidad = 1;

    const btnMinus = article.querySelector(".btn-minus");
    const btnPlus = article.querySelector(".btn-plus");
    const qtyValue = article.querySelector(".qty-value");
    const btnCart = article.querySelector(".btn-add");

    btnMinus.addEventListener("click", () => {
        if (cantidad > 1) {
            cantidad--;
            qtyValue.textContent = cantidad;
        }
    });

    btnPlus.addEventListener("click", () => {
        // si quieres limitar por stock
        if (producto.stock && cantidad >= producto.stock) return;

        cantidad++;
        qtyValue.textContent = cantidad;
    });

    btnCart.addEventListener("click", () => {
        onAdd(producto, cantidad);
        cantidad = 1;
        qtyValue.textContent = cantidad;
    });

    return article;
}