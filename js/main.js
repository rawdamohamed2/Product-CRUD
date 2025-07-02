var nameInput = document.getElementById('productName');
var priceInput = document.getElementById('productPrice');
var typeInput = document.getElementById('productType');
var descInput = document.getElementById('productDesc');
var searchInput = document.getElementById('secrchInput');
var addbutton = document.getElementById('AddButton');
var updatebutton = document.getElementById('UpdateButton');
var productList = []

var alertnamv = document.getElementById('alertName');
var alertpricev =document.getElementById('alertPrice');
var alerttypev =document.getElementById('alertType');
var alertdescv =document.getElementById('alertDesc');



if (localStorage.getItem('products') != null) {
    productList = JSON.parse(localStorage.getItem('products'))
    display();
}

function addProduct(){
    if(namevalidation() && pricevalidation() && typevalidation() && descvalidation()){
        var product = {
        name: nameInput.value,
        price: priceInput.value,
        type: typeInput.value,
        desc: descInput.value,
        };
        productList.push(product)
        localStorage.setItem('products', JSON.stringify(productList));
        console.log(productList);
        display();
        clearInput();
    }
}

function clearInput(){
    nameInput.value='';
    priceInput.value='';
    typeInput.value='';
    descInput.value='';
}

function display(){
    var box ='';
    for(var i=0; i<productList.length;i++){
        box+=` <tr>
                <th scope="row">${i+1}</th>
                <td>${productList[i].name}</td>
                <td>${productList[i].price}</td>
                <td>${productList[i].type}</td>
                <td>${productList[i].desc}</td>
                <td>
                    <button class="btn btn-danger text-white" onclick="deleteProduct(${i})">Delete</button>
                    <button class="btn btn-warning" onclick="EditProduct(${i})">Edit</button>
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
    var searchValue=searchInput.value.toLowerCase();
    var box='';
    var term='';
    for (var i = 0; i < productList.length; i++) {
        term=productList[i].name.toLowerCase();
        if(term.includes(searchValue)) {
              box+=` <tr>
                <th scope="row">${i+1}</th>
                <td>${productList[i].name}</td>
                <td>${productList[i].price}</td>
                <td>${productList[i].type}</td>
                <td>${productList[i].desc}</td>
                <td>
                    <button class="btn btn-danger text-white" onclick="deleteProduct(${i})">Delete</button>
                    <button class="btn btn-warning" onclick="EditProduct(${i})">Edit</button>
                </td>
                </tr>`
     }         
    }
    tableBody.innerHTML=box;
}

var updateindex=0;

function EditProduct(index){
    updateindex=index;
    updatebutton.classList.replace("d-none","d-block");
    addbutton.classList.replace("d-block","d-none");
    
    nameInput.value=productList[index].name;
    priceInput.value=productList[index].price;
    typeInput.value=productList[index].type;
    descInput.value=productList[index].desc;

    console.log(updateindex);
}


function updateProduct() {
    var updatedProduct = {
        name: nameInput.value,
        price: priceInput.value,
        type: typeInput.value,
        desc: descInput.value,
    };

    productList.splice(updateindex, 1, updatedProduct);

    localStorage.setItem('products', JSON.stringify(productList));
    display();
    clearInput();

    addbutton.classList.replace("d-none", "d-block");
    updatebutton.classList.replace("d-block", "d-none");
}
 

function namevalidation(){
     var regex=/[A-Z][a-z]{3,8}/;
     nameVal=nameInput.value;
     var nameresult =regex.test(nameVal);
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
    var regexprice=/^(1000|[1-9][0-9]{3}|10000)$/;
    priceVal=priceInput.value;
    var priceresult =regexprice.test(priceVal);

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
    var regextype=/^(mobile|screen|watch)$/;
    typeVal=typeInput.value;

    var typeresult =regextype.test(typeVal);

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

function descvalidation(){
    var regexdesc=/^(?:\b\w+\b[\s\r\n]*){20,500}$/;
    descVal=descInput.value;
    var descresult =regexdesc.test(descVal);

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
