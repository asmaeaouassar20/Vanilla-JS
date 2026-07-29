let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mode = 'create';
let indexOfProductToUpdate; //varibale global
let searchBy = 'title';
let lightMode = true;


let products = [];
getDataFromLocalStorage();

function getDataFromLocalStorage() {
    if (localStorage.products != null) {
        products = JSON.parse(localStorage.products);
    }
    if (localStorage.lightMode != null) {
        lightMode = JSON.parse(localStorage.lightMode);
    }
    manageLightDarkMode();
    showProducts()
}

function manageLightDarkMode() {
    if (lightMode) {
        document.getElementById('modeDisplay').innerText = 'dark mode'
        document.querySelectorAll(".elmMode").forEach(elm => {
            elm.classList.remove("dark")
        })
        document.querySelectorAll("input").forEach(elm => {
            elm.classList.remove("dark")
        })
        document.querySelectorAll("button").forEach(elm => {
            elm.classList.remove("dark")
        })
    } else {
        document.getElementById('modeDisplay').innerText = 'light mode'

        document.querySelectorAll(".elmMode").forEach(elm => {
            elm.classList.add("dark")
        })
        document.querySelectorAll("input").forEach(elm => {
            elm.classList.add("dark")
        })
        document.querySelectorAll("button").forEach(elm => {
            elm.classList.add("dark")
        })
    }
}
function switchLightDarkMode() {
    lightMode = !lightMode;
    localStorage.setItem('lightMode', JSON.stringify(lightMode));
    manageLightDarkMode();
    getTotal();
}



function displayProducts(productsTable) {
    let tbody = '';
    if (productsTable.length > 0) {
        for (let i = 0; i < productsTable.length; i++) {
            tbody += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${productsTable[i].title}</td>
                    <td>${productsTable[i].price}</td>
                    <td>${productsTable[i].taxes}</td>
                    <td>${productsTable[i].ads}</td>
                    <td>${productsTable[i].discount}</td>
                    <td>${productsTable[i].total}</td>
                    <td>${productsTable[i].category}</td>
                    <td><button onclick="prefillInputsToUpdate(${i})" >update</button></td>
                    <td><button onclick="deleteProductByIndex(${i})" >delete</button></td>
                </tr>
                `;
        }
    }
    else {
        tbody = "<tr ><td colspan='10'>No product Yet</td></tr>";
    }
    document.getElementById('tbody').innerHTML = tbody;

}


// get total
function getTotal() {

    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = lightMode ? 'rgb(146, 202, 146)' : 'rgb(29, 83, 29)'
        if(+price.value < +discount.value){
            console.log("tte")
        total.style.backgroundColor = lightMode ? '#eeb9b5' : '#a00d02';
        }
    } else {
        total.innerHTML = '';
        total.style.backgroundColor = lightMode ? '#eeb9b5' : '#a00d02';
    }
}


// create/update product
function createProduct(newProduct) {
    if (newProduct.count > 1) {
        for (let i = 0; i < newProduct.count; i++) {
            products.push(newProduct);
        }
    } else {
        products.push(newProduct);
    }
}
function prefillInputsToUpdate(i) {
    mode = 'update';
    indexOfProductToUpdate = i; // sauvegrader globalement l'indice du profuit à modifier
    title.value = products[i].title;
    price.value = products[i].price;
    taxes.value = products[i].taxes;
    ads.value = products[i].ads;
    discount.value = products[i].discount;
    category.value = products[i].category;
    getTotal();
    count.style.display = 'none';
    submit.innerText = 'update';
    scroll({
        top: 0,
        behavior: 'smooth'
    })
}
function updateProduct(newProduct) {
    products[indexOfProductToUpdate] = newProduct;
    mode = 'create';
    submit.innerText = 'create';
    count.style.display = 'block';
}
submit.onclick = function () {
    let product = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerText,
        count: count.value,
        category: category.value.toLowerCase()
    }
    if (cleanData(product)) {
        if (mode === 'create') {
            createProduct(product);
        } else if (mode === 'update') {
            updateProduct(product);
        }
        localStorage.setItem('products', JSON.stringify(products));
        clearInputs();
        showProducts();
    }
}




// clear inputs
function clearInputs() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerText = '';
    count.value = '';
    category.value = '';
    total.style.backgroundColor = '#eeb9b5';
}



// read
function showProducts() {
    getTotal()
    displayProducts(products);
    if (products.length > 0) {
        document.getElementById('deleteAllSection').style.display = 'block';
    } else {
        document.getElementById('deleteAllSection').style.display = 'none';
    }
    if (document.getElementById('totalProducts')) {
        document.getElementById('totalProducts').innerText = `(${products.length})`;
    }
}








// delete
function deleteProductByIndex(index) {
    products.splice(index, 1);
    localStorage.products = JSON.stringify(products);
    showProducts();
}
function deleteAll() {
    localStorage.clear();
    products.splice(0);
    showProducts();
}







// search
function changeSearchBy(searchByKeyWord) {
    searchBy = searchByKeyWord;
    const inputSearchElm = document.getElementById('search');
    inputSearchElm.style.display = "block";
    inputSearchElm.placeholder = "search by " + searchBy;
    inputSearchElm.focus();
    // inputSearchElm.value='';
}

function searchByTitle(value) {
    let result = [];
    for (let i = 0; i < products.length; i++) {
        if (products[i].title.includes(value.toLowerCase())) {
            result.push(products[i])
        }
    }
    displayProducts(result);
}
function searchByCategory(value) {
    let result = [];
    for (let i = 0; i < products.length; i++) {
        if (products[i].category.includes(value.toLowerCase())) {
            result.push(products[i])
        }
    }
    displayProducts(result);
}
function searchInProducts(value) {
    if (searchBy === 'title') {
        searchByTitle(value)
    }
    if (searchBy === 'category') {
        searchByCategory(value);
    }
}


// clean data
function cleanData(product) {
    return (
        product.title != ''
        && product.price != ''
        && +product.price >0
        && product.category != ''
        && +product.taxes>=0
        && +product.ads>=0
        && +product.discount>=0
        && product.count < 100
        && +product.price > +product.discount
    )
}

// save products in localstorage
// count