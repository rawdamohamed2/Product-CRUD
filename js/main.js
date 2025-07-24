const nameInput = document.getElementById('productName');
const priceInput = document.getElementById('productPrice');
const typeInput = document.getElementById('productType');
const descInput = document.getElementById('productDesc');
const searchInput = document.getElementById('secrchInput');
const addbutton = document.getElementById('AddButton');
const updatebutton = document.getElementById('UpdateButton');
let productList = []
const QuantityInput = document.getElementById('productQuantity');
const alertnamv = document.getElementById('alertName');
const alertpricev =document.getElementById('alertPrice');
const alerttypev =document.getElementById('alertType');
const alertdescv =document.getElementById('alertDesc');
const alertQuantity = document.getElementById('alertQuantity');

if (localStorage.getItem('products') != null) {
    productList = JSON.parse(localStorage.getItem('products'))
    display();
}

function addProduct(){
    if(namevalidation() && pricevalidation() && typevalidation() && descvalidation() && Quantityvalidation()){
        var product = {
            name: nameInput.value,
            price: priceInput.value,
            type: typeInput.value,
            Quantity: QuantityInput.value,
            desc: descInput.value,
        };
        productList.push(product)
        localStorage.setItem('products', JSON.stringify(productList));
        display();
        clearInput();
    }
}

function clearInput(){
    nameInput.value='';
    priceInput.value='';
    typeInput.value='';
    QuantityInput.value='';
    descInput.value='';
    priceInput.classList.remove('is-valid');
    nameInput.classList.remove('is-valid');
    typeInput.classList.remove('is-valid');
    QuantityInput.classList.remove('is-valid');
    descInput.classList.remove('is-valid');
}

function display(){
    var box ='';
    for(let i=0; i<productList.length;i++){
        box+=` <tr>
                <th scope="row">${i+1}</th>
                <td>${productList[i].name}</td>
                <td>${productList[i].price}</td>
                <td>${productList[i].type}</td>
                <td>${productList[i].Quantity}</td>
                <td>${productList[i].desc}</td>
                <td>
                    <button class="btn btn-danger text-white" onclick="deleteProduct(${i})">Delete</button>
                    <button class="btn btn-warning mt-md-0 mt-2" onclick="EditProduct(${i})">Edit</button>
                </td>
                </tr>`
    }
    tableBody.innerHTML=box;
}

function deleteProduct(index){
    productList.splice(index, 1);
    localStorage.setItem('products',JSON.stringify(productList))
    display();
}


function search(){
    let searchValue=searchInput.value.toLowerCase();
    let box='';
    let term='';
    for (let i = 0; i < productList.length; i++) {
        term=productList[i].name.toLowerCase();
        if(term.includes(searchValue)) {
              box+=` <tr>
                <th scope="row">${i+1}</th>
                <td>${productList[i].name}</td>
                <td>${productList[i].price}</td>
                <td>${productList[i].type}</td>
                <td>${productList[i].Quantity}</td>
                <td>${productList[i].desc}</td>
                <td>
                    <button class="btn btn-danger text-white" onclick="deleteProduct(${i})">Delete</button>
                    <button class="btn btn-warning btn" onclick="EditProduct(${i})">Edit</button>
                </td>
                </tr>`
     }         
    }
    tableBody.innerHTML=box;
}

let updateindex=0;

function EditProduct(index){
    updateindex=index;
    updatebutton.classList.replace("d-none","d-block");
    addbutton.classList.replace("d-block","d-none");
    
    nameInput.value=productList[index].name;
    priceInput.value=productList[index].price;
    typeInput.value=productList[index].type;
    descInput.value=productList[index].desc;
    QuantityInput.value=productList[index].Quantity;
    
}


function updateProduct() {
    var updatedProduct = {
        name: nameInput.value,
        price: priceInput.value,
        type: typeInput.value,
        desc: descInput.value,
        Quantity: QuantityInput.value
    };

    productList.splice(updateindex, 1, updatedProduct);

    localStorage.setItem('products', JSON.stringify(productList));
    display();
    clearInput();

    addbutton.classList.replace("d-none", "d-block");
    updatebutton.classList.replace("d-block", "d-none");
}
 

function namevalidation(){
     let regex=/[A-Z][a-z]{3,8}/;
     nameVal=nameInput.value;
     let nameresult =regex.test(nameVal);
      if (nameresult) {
        alertnamv.classList.replace('d-block','d-none');
        nameInput.classList.add('is-valid');
        nameInput.classList.remove('is-invalid');        
        return true;
    }
    else{
        alertnamv.classList.replace('d-none','d-block');
        nameInput.classList.add('is-invalid');
        nameInput.classList.remove('is-valid');
        return false;
    }
   
}

function pricevalidation(){
    let regexprice=/^\d+(\.\d{1,2})?$/;
    priceVal=priceInput.value;
    let priceresult =regexprice.test(priceVal);

    if (priceresult) {
        alertpricev.classList.replace('d-block','d-none');
        priceInput.classList.add('is-valid');
        priceInput.classList.remove('is-invalid');

        return true;
    }
    else{
        alertpricev.classList.replace('d-none','d-block');
        priceInput.classList.add('is-invalid');
        priceInput.classList.remove('is-valid');
        return false;
    }
}

function typevalidation(){
    let regextype=/^[A-Z][a-zA-Z]{1,11}$/;
    typeVal=typeInput.value;

    let typeresult =regextype.test(typeVal);

    if (typeresult) {

       alerttypev.classList.replace('d-block','d-none');
        typeInput.classList.add('is-valid');
        typeInput.classList.remove('is-invalid');
        
        return true;
    }
    else{
        alerttypev.classList.replace('d-none','d-block');
        typeInput.classList.add('is-invalid');
        typeInput.classList.remove('is-valid');

        return false;
    }
}

function Quantityvalidation(){
    let regexQuantity=/^[1-9]\d*$/;
    QuantityVal=QuantityInput.value;

    let Quantityresult =regexQuantity.test(QuantityVal);

    if (Quantityresult) {

       alertQuantity.classList.replace('d-block','d-none');
        QuantityInput.classList.add('is-valid');
        QuantityInput.classList.remove('is-invalid');
        
        return true;
    }
    else{
        alertQuantity.classList.replace('d-none','d-block');
        QuantityInput.classList.add('is-invalid');
        QuantityInput.classList.remove('is-valid');

        return false;
    }
}
function descvalidation(){
    let regexdesc=/^$|^[a-zA-Z0-9\s]{9,100}$/;
    descVal=descInput.value;
    let descresult =regexdesc.test(descVal);

    if (descresult) {
        alertdescv.classList.replace('d-block','d-none');
        descInput.classList.add('is-valid');
        descInput.classList.remove('is-invalid');    
        return true;
    }
    else{
        alertdescv.classList.replace('d-none','d-block');
        descInput.classList.add('is-invalid');
        descInput.classList.remove('is-valid');
        return false;
    }
   
}
