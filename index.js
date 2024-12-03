var proName = document.getElementById("ProductName");
var proPrice = document.getElementById("ProductPrice");
var proCategory = document.getElementById("ProductCategory");
var proDescription = document.getElementById("ProductDescription");
var AddAndUpdateButton = document.getElementById("AddAndUpdate");
var sear = document.getElementById("sear");

var databody = document.getElementById("data")
var products;
var indexUpdate = 0;
if(localStorage.getItem("products")){
    let productstring = localStorage.getItem("products");
    products=JSON.parse(productstring);
    disPlayProducts(products)
}
else{
    let x = [];
    localStorage.setItem("products",JSON.stringify(x));
}
function AddOrUpdate(){
    event.preventDefault(); 



    if (AddAndUpdateButton.innerHTML == "Add Product" && proName.value != ""
        && proPrice.value != "" && proCategory.value != "" && proDescription.value != "")
    {
        AddProduct();
    }
    else if (proName.value != ""
        && proPrice.value != "" && proCategory.value != "" && proDescription.value != "")
    {
        UpdateProduct(indexUpdate);
    }
}
function AddProduct(){
    let pro = {};
    pro.Name=proName.value;
    pro.Price = proPrice.value;
    pro.Category = proCategory.value;
    pro.Description = proDescription.value;
    let productstring = localStorage.getItem("products");
    products = JSON.parse(productstring);
    products.push(pro);
    localStorage.setItem("products", JSON.stringify(products))
    clearValues();
    disPlayProducts(products)

}
function UpdateProductRe(index){
    let productstring = localStorage.getItem("products");
    products = JSON.parse(productstring);
    pro = products[index];
    proName.value = pro.Name;
    proPrice.value = pro.Price;
    proCategory.value = pro.Category;
    proDescription.value = pro.Description;
    AddAndUpdateButton.innerHTML="Update Product";
    indexUpdate=index;
   

}
function UpdateProduct(index){
    let pro = {};
    pro.Name = proName.value;
    pro.Price = proPrice.value;
    pro.Category = proCategory.value;
    pro.Description = proDescription.value;
    products[index]=pro ;
    localStorage.setItem("products",JSON.stringify(products));
    clearValues();
    disPlayProducts(products);
    AddAndUpdateButton.innerHTML = "Add Product";




}

function disPlayProducts(disProducts){
    databody.innerHTML="";
    for(let i = 0 ; i <disProducts.length ; i ++)
    {
        const pro = disProducts[i];
        databody.innerHTML += `
                <td>${i + 1}</td>
                <td>${pro.Name}</td>
                <td>${pro.Price}</td>
                <td>${pro.Category}</td>
                <td>${pro.Description}</td>
                <td><button class="btn btn-primary" onclick="UpdateProductRe(${i})">Update</button></td>
                <td><button class="btn btn-primary" onclick="DeleteProduct(${i})">Delete</button></td>


            `;



    }

}
function clearValues(){
    proName.value="";
    proPrice.value="";
    proCategory.value="";
    proDescription.value="";
}
function DeleteAll(){
    products=[];
    localStorage.setItem("products",JSON.stringify(products));
    disPlayProducts(products);
}
function DeleteProduct(index){
    products.splice(index,1);
    localStorage.setItem("products", JSON.stringify(products));
    disPlayProducts(products);

}


function Search(){
    event.preventDefault();
    let word = sear.value.toLowerCase();
    filterPro=products.filter((pro)=>{
        return pro.Name.toLowerCase().includes(word);
    });
    disPlayProducts(filterPro);

}