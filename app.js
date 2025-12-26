const carrito = [];

document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById("product-list");
    const cartDiv = document.getElementById("cart");
    const btnWhatsapp = document.getElementById("send-whatsapp");

    //  --- agrega cada producto 
    obtenerProductos().forEach(producto => {
        const productoHTML = crearTarjetaProducto(producto, agregarAlCarrito);
        productList.appendChild(productoHTML);
    });

    btnWhatsapp.addEventListener("click", enviarWhatsapp);

    function agregarAlCarrito(producto, cantidad) {
        const existe = carrito.find(p => p.id === producto.id);

        if (existe) {
            existe.cantidad += cantidad;
        } else {
            carrito.push({ ...producto, cantidad });
        }

        renderCarrito();
    }

    function renderCarrito() {
        cartDiv.innerHTML = "";

        carrito.forEach(p => {
            const item = document.createElement("p");
            item.textContent = `${p.nombre} (${p.marca}) x${p.cantidad}`;
            cartDiv.appendChild(item);
        });
    }

    function enviarWhatsapp() {
        if (carrito.length === 0) {
            alert("No hay productos seleccionados");
            return;
        }

        let mensaje = "Hola, quiero realizar el siguiente pedido:%0A%0A";
        let total = 0;

        carrito.forEach(p => {
            const subtotal = p.precio * p.cantidad;
            total += subtotal;

            mensaje += `- ${p.nombre} (${p.marca}) x${p.cantidad} = S/ ${subtotal}%0A`;
        });

        mensaje += `%0ATotal: S/ ${total}`;

        const telefono = "51921564575";
        const url = `https://wa.me/${telefono}?text=${mensaje}`;

        window.open(url, "_blank");
    }
});
