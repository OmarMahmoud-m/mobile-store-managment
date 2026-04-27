const prodcutNameInput = document.getElementById('ProductName');
const prodcutPriceInput = document.getElementById('ProductPrice');
const prodcutCategoryInput = document.getElementById('ProductCategory');
const prodcutDescriptionInput = document.getElementById('ProductDescription');
const prodcutImageInput = document.getElementById('ProductImage');
const rowData = document.getElementById('rowData');
const addBtn = document.getElementById('addBtn');
const saveBtn = document.getElementById('saveBtn');
let updatedindex;

let products=[];

if(localStorage.getItem('products')){
  products = JSON.parse(localStorage.getItem('products'));
}

function addProduct(){
  let product={
    name:prodcutNameInput.value,
    price:prodcutPriceInput.value,
    category:prodcutCategoryInput.value,
    description:prodcutDescriptionInput.value,
    image:'./phone.avif'
  }
  products.push(product);
  localStorage.setItem('products',JSON.stringify(products));
  display();
  //clearForm();
}

function display(){
  let container ='';
  for(let i = 0;i < products.length;i++){
    container+=`<div class="col-lg-4 col-md-6">
          <div class="card shadow-lg border-0">
            <img src="${products[i].image}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${products[i].name}</h5>
              <p class="card-text">${products[i].description}</p>

              <h6>
                <span class="fw-bold"> Price : </span> ${products[i].price}
              </h6>

              <h6>
                <span class="fw-bold"> Category : </span> ${products[i].category}
              </h6>
              
              <div class="d-flex justify-content-around">

               <a href ="#formStart"> <button class="btn btn-warning" onclick="setFormForUpdate(${i})">Update <i class="fa-regular fa-pen-to-square"></i></button> </a>
                <button class="btn btn-danger" onclick="deleteProduct(${i})">Delete <i class="fa-solid fa-trash"></i> </button>

              </div>
              

            </div>
          </div>
      </div>` 
      
  }
 rowData.innerHTML = container;
}

function clearForm(){
  prodcutNameInput.value=null;
  prodcutCategoryInput.value=null;
  prodcutDescriptionInput.value=null;
  prodcutPriceInput.value=null;
}


function deleteProduct(index){
  products.splice(index,1);
  localStorage.setItem('products',JSON.stringify(products));
  display();
}

function setFormForUpdate(index){
  prodcutNameInput.value = products[index].name;
  prodcutCategoryInput.value = products[index].category;
  prodcutDescriptionInput.value = products[index].description;
  prodcutPriceInput.value = products[index].price;
  saveBtn.classList.remove('d-none');
  addBtn.classList.add('d-none');
  updatedindex = index;
}

function save(){
  products[updatedindex].name = prodcutNameInput.value;
  products[updatedindex].price = prodcutPriceInput.value;
  products[updatedindex].category = prodcutCategoryInput.value;
  products[updatedindex].description = prodcutDescriptionInput.value;
  localStorage.setItem('products',JSON.stringify(products));
  addBtn.classList.remove('d-none');
  saveBtn.classList.add('d-none');
  clearForm();
  display();
}

function validate(element) {
  let value = element.value.trim();
  let regex;

  if (element.id === "ProductName") {
    regex = /^[A-Za-z ]{3,15}$/;
  } 
  else if (element.id === "ProductPrice") {
    regex = /^(2000|[2-9]\d{3}|[1-9]\d{4}|100000)$/;
  }

  if (regex.test(value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    return false;
  }
}

display();