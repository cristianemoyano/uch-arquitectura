/*
//Product:
let procut = {
    id : "",
    name : "vino",
    description : "",
    stock : 0,
    price : 0
};

//Create:
//Creates a new product.
POST /api/product/
BODY {
    name : "",
    description : "",
    stock : 0,
    price : 0
};

//Edit:
//Needs a product id. Edits that product information.
POST /api/product/<product.id>/edit/
BODY {
    name : "vino",
    description : "",
    stock : 0,
    price : 0
};

//List:
//Returns a list with all the products.
GET /api/product/

//Detail:
//Needs a product id. Returns that product details.
GET /api/product/<product.id>/detail/

//Remove:
//Needs a product id. Erases that product from the data base.
POST /api/product/<product.id>/remove/
*/