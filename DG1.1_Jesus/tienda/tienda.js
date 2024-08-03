document.addEventListener('DOMContentLoaded', async () => {
    const listaProductos = document.querySelector('#Productos');

    try {
        const productos = await getProductos();
        let body = productos.map(({ image, title, price, category }) => `
            <div class="m-3 p-3 card" style="width: 18rem;">
                <img src="${image}" width="50px" class="card-img-top" alt="${title}">
                <div class="mt-2 card-body">
                    <h5 class="mt-5 card-title">${title.length >= 35 ? `${title.substring(0, 30)}...` : title}</h5>
                    <p class="card-text">${category}</p>
                    <h5 class="card-text">L${price.toFixed(2)}</h5>
                    
                </div>
            </div>
        `).join('');

        listaProductos.innerHTML = body;
    } catch (error) {
        console.error('Error al cargar los productos:', error);
        listaProductos.innerHTML = '<p>Error al cargar los productos.</p>';
    }
});

const getProductos = async () => {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error en la solicitud de productos:', error);
        throw error;
    }
};