document.getElementById('searchButton').addEventListener('click', function(event) {
    event.preventDefault();
    fetchProducts();
});

function fetchProducts() {
    const query = document.getElementById('searchQuery').value;
    fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`)
        .then(response => response.json())
        .then(data => displayProducts(data.results))
        .catch(error => console.error('Error fetching products:', error));
}

function displayProducts(products) {
    const productList = document.getElementById('productList');
    productList.innerHTML = ''; 
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'col-md-4 product-card';

        const imageUrl = product.pictures ? product.pictures[0].url : product.thumbnail;

        productCard.innerHTML = `
            <div class="card">
                <img src="${imageUrl}" class="card-img-top" alt="${product.title}">
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">$${product.price}</p>
                    <a href="${product.permalink}" target="_blank" class="btn btn-primary btn-product">Ver producto</a>
                </div>
            </div>
        `;

        productList.appendChild(productCard);
    });
}
