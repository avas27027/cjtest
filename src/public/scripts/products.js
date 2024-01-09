const logoutBut = document.querySelector('#but-logOut');
const butAdd = document.querySelector('#but-add');
const newProd = document.querySelector('#newProduct');
const productsContainer = document.querySelector('.products-container');

const renderProducts = () => {
    productsContainer.innerHTML = ""
    Http.get('/api/product/all').then((e) => e.json())
        .then(e => {
            e.prodList.forEach((element, i) => {
                productsContainer.innerHTML += getProductsDisplay(element, i);
            });
            e.prodList.forEach((e, i) => {
                document.getElementById(`bDelete-${i}`)
                    .addEventListener("click", (el) => {
                        Http.post('/api/product/delete', { "sku": document.getElementById(`pName-${i}`).textContent })
                            .then(_ => { renderProducts() })
                    });
            });
        })
}

renderProducts()

butAdd.addEventListener("click", (e) => {
    Http.post('/api/product/add', { "sku": newProd.value })
        .then(() => {
            renderProducts()
            newProd.value = ""
        })
});
logoutBut.addEventListener("click", (e) => {
    Http.get('/api/user/logout')
    window.location.replace("/login")
});

const getProductsDisplay = (product, i) => {
    return (`
    <div class="product-container">
        <h2>${product.productNameEn}</h2>
        <div class="product-detail">
            <h3 id="pName-${i}">${product.productSku}</h3>
            <button id="bDelete-${i}" class="prod-delete-but">Delete</button>
        </div>
    </div>`)
}

