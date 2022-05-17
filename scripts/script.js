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