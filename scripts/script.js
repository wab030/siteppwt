const checkForm = {
    productName: false,
    productDescription: false,
    productPrice: false,
    urlProductImage: false,
}

document.getElementById('productName').addEventListener('input', function (e) {
    console.log(checkForm);
    const productName = e.target.value;
    if (productName.length > 50) {
        console.log('O nome do produto deve ter no máximo 50 caracteres');
        document.getElementById('productname-error').style.display = "block";
        checkForm.productName = false;
    } else {
        document.getElementById('productname-error').style.display = "none";
        checkForm.productName = true;
    }
    enableButton();
});

document.getElementById('productDescription').addEventListener('input', function (e) {
    const productDescription = e.target.value;
    if (productDescription.length > 200 || productDescription.length < 5) {
        console.log('A descrição do produto deve ter entre 5 e 200 caracteres');
        document.getElementById('productdescription-error').style.display = "block";
        checkForm.productDescription = false;
    } else {
        document.getElementById('productdescription-error').style.display = "none";
        checkForm.productDescription = true;
    }
    enableButton();
});

document.getElementById('productPrice').addEventListener('input', function (e) {
    console.log('Monitorando o preÃ§o do produto');
    const productPrice = e.target.value;
    if (isNaN(productPrice)) {
        document.getElementById('productprice-error').style.display = 'block';
        checkForm.productPrice = false;

    } else {
        document.getElementById('productprice-error').style.display = 'none';
        checkForm.productPrice = true;

    }
    enableButton();
});

document.getElementById('urlProductImage').addEventListener('input', function (e) {
    console.log('Monitorando url');
    const urlProductImage = e.target.value;
    console.log(urlProductImage);
    if (validURL(urlProductImage)) {
        console.log('A imagem deve ser uma url');
        document.getElementById('urlProductImage-error').style.display = 'block';
        checkForm.urlProductImage = false;
    } else {
        document.getElementById('urlProductImage-error').style.display = 'none';
        checkForm.urlProductImage = true;
    }
    enableButton();
});

function validURL(str) {
    let pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !pattern.test(str);
}

function enableButton() {
    const butcad = document.getElementById("butcad");
    if (checkForm.productName &&
        checkForm.productDescription &&
        checkForm.productPrice &&
        checkForm.urlProductImage) {
        butcad.disabled = false;
    } else {
        butcad.disabled = true;
    }
}

const showProducts = (products) => {
    // console.log('Cheguei no show products');
    console.log(products);

    // console.log(products.length);

    for (let i = 0; i < products.length; i++) {
        console.log(products[i].name);

        let tagDivCard = document.createElement('div');
        tagDivCard.setAttribute('class', 'card mb-2');
        tagDivCard.setAttribute('style', 'width: 300px;');


        let tagImage = document.createElement('img');
        tagImage.setAttribute('class', 'card-img-top');
        tagImage.setAttribute('src', products[i].urlProductImage);
        tagImage.setAttribute('alt', products[i].name);

        tagDivCard.appendChild(tagImage);

        let tagDivCardBody = document.createElement('div');
        tagDivCardBody.setAttribute('class', 'card-body');
        tagDivCard.appendChild(tagDivCardBody);

        let tagH5 = document.createElement('h5');
        tagH5.setAttribute('class', 'card-title text-center');
        let textNode = document.createTextNode(products[i].name);
        tagH5.appendChild(textNode);
        tagDivCardBody.appendChild(tagH5);

        let tagH6 = document.createElement('h6');
        tagH6.setAttribute('class', 'text-center');
        textNode = document.createTextNode(products[i].category);
        tagH6.appendChild(textNode);
        tagDivCardBody.appendChild(tagH6);

        let tagP = document.createElement('p');
        tagP.setAttribute('class', 'card-text text-center');
        textNode = document.createTextNode(products[i].description);
        tagP.appendChild(textNode);
        tagDivCardBody.appendChild(tagP);

        tagP = document.createElement('p');
        tagP.setAttribute('class', 'text-center price');
        textNode = document.createTextNode(products[i].price);
        tagP.appendChild(textNode);
        tagDivCardBody.appendChild(tagP);

        let tagA = document.createElement('a');
        tagA.setAttribute('href', '#');
        tagA.setAttribute('class', 'btn btn-primary mx-auto');
        tagA.setAttribute('style', 'width: 100%');
        textNode = document.createTextNode('Adicionar ao carrinho.');
        tagA.appendChild(textNode);
        tagDivCardBody.appendChild(tagA);

        let tagDivFemProducts = document.getElementById('femproducts');
        tagDivFemProducts.appendChild(tagDivCard);
    }
}

const fetchProducts = () => {
    console.log("Cheguei na script para carregar os produtos");
    //Carrega os produtos do banco de dados. 
    //Endereço da api http://localhost:8000/GetProducts.php
    fetch('http://localhost:8000/GetProducts.php')
        .then((response) => {
            if (response.status >= 200 && response.status < 300) {
                return response.json()
            }
            throw new Error(response.statusText);
        })
        .then((products) => {
            showProducts(products);
        })
        .catch((error) => {
            console.log(error);
        });
}

