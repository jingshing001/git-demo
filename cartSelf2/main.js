import 'regenerator-runtime/runtime';
import axios  from "./node_modules/axios";
 

 
 //變數命名
 let  addCartBtn;
 let relcartItem;
 let cartItem; 
 let  cartItemID=1;
 const navbarBtn=document.querySelector('.navbar-btn');
 const navbar=document.querySelector('.nav-bar');
 const productList=document.querySelector(".product-list")
 const cartIcon=document.querySelector('.cart-icon');
 const cartContainer=document.querySelector('.cart-container');
 const cartCountInfo=document.querySelector('#cart-count-info');
 const cartTotalValue=document.querySelector('#cart-total-value');
 const cartList=document.querySelector('.cart-list')

 const ax = axios.create({
    baseURL: 'http://127.0.0.1:3300'
  });
 
 
 

 //監聽響應
(function(){
    window.addEventListener('DOMContentLoaded',()=>{
        loadJSON();
        loadCart();
    })
    
    navbarBtn.addEventListener('click',navbarToggle);
    cartIcon.addEventListener('click',cartToggle)
}())
 

 
//切換navbar
function navbarToggle(){   
    console.log(addCartBtn);
    navbar.classList.toggle('show');
    if(navbar.className==="nav-bar show"){
        document.documentElement.style.overflowY="hidden" 
        navbar.style="z-index:3";
        }else{
        document.documentElement.style.overflowY="scroll"
        navbar.style="z-index:0";
        }
   
    }

//購物車內容切換
function cartToggle(){ 
  
    if(!cartContainer.classList.contains('showCartContainer')){
        cartContainer.className="cart-container showCartContainer";
    }else{
        cartContainer.className="cart-container";
    }

     //雙擊消除購物車清單
    document.addEventListener('dblclick',function(){
            cartContainer.className="cart-container";
        })
    
}
   
        
  

   
//遍歷監聽
function bindElement(element,callback){
    element.forEach((v)=>{
        v.addEventListener('click',callback);
    })
}

//刪除Item
function deleteItem(e){
     if(e.target.className=="cart-del-btn"){
            this.remove();
     }else if(e.target.className=="fas fa-times"){
             this.remove();
     }
     

     let products=getProductFromStorage();
     let updatedProducts=products.filter(v =>{
         return v.id !== parseInt(this.dataset.id);
     })

     localStorage.setItem('products',JSON.stringify(updatedProducts));
     updateCartInfo();
    
}


//讀取JSON
function loadJSON(){
    ax.get('/furniture.json').then( response=>{ 
        let html='';
        response.data.forEach(v=>{

           html += `
                 <div class="col-md-6  col-xl-4  col-xxl-3 pt-2">
                        <div class="card">
                        
                        <img src="${v.imgSrc}" class="card-img-top" alt="...">
                        
                        <div class="card-body">
                       
                        <h4 class="card-title">${v.name}</h4>
                        <p class="card-price">TW$${v.price}</p>
                        
                        <button href="#" class="btn btn-primary text-white cart-btn">Add Cart</button>
                            </div>
                    </div>
                    </div>
                   `;
        })
        productList.innerHTML = html;
        getproductInfo();
    }).catch( error=>{
        console.log(error);
        productList.parentElement.innerHTML=`<h1 style="color:red;font-size:2rem; text-align:center">remember open server</h1>`
    })

}


//增加購物清單
function getproductInfo(){
    addCartBtn=document.querySelectorAll('.cart-btn')

    bindElement(addCartBtn,function(){
       let product=this.parentElement.parentElement
       let productInfo={
           id:cartItemID,
           imgSrc:product.querySelector('.card-img-top').src,
           name:product.querySelector('.card-title').textContent,
           price:product.querySelector('.card-price').textContent
       }
       cartItemID++;
       createCartItem(productInfo);
       saveProductInStorage(productInfo);
    });
}
   

//創建購物車清單列表
function createCartItem(product){
    cartItem=document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.setAttribute('data-id',`${product.id}`);
    cartItem.innerHTML=`
    <img src="${product.imgSrc}" alt="" class="img-fluid">
    <div class="cart-item-info">
        <h3 class="cart-item-name">${product.name}</h3>
        <span class="cart-item-price">${product.price}</span>
    </div>
   
    <button type = "button" class = "cart-del-btn">
      <i class = "fas fa-times"></i>
    </button>
    `
    cartList.appendChild(cartItem);

    relcartItem=document.querySelectorAll('.cart-item')
    bindElement(relcartItem,deleteItem);
    console.log(cartItem);
}

//LocalStorage SetItem儲存資料
function  saveProductInStorage(item){
    let products=getProductFromStorage();
    products.push(item)
    localStorage.setItem('products',JSON.stringify(products));
    updateCartInfo();
}


//更新數量和總價錢
function updateCartInfo(){
    let cartInfo=findCartInfo();
    cartCountInfo.innerHTML=cartInfo.productCount;
    cartTotalValue.innerHTML=cartInfo.total;
}

//LocalStorage GetItem取得資料
function getProductFromStorage(){
    return localStorage.getItem('products')? JSON.parse(localStorage.getItem('products')): [];
}

//取的總共價錢和數量
function findCartInfo(){
    let products=getProductFromStorage();
    let total=products.reduce((pre,cur)=>{
        let price=parseInt(cur.price.substring(3));
            return pre+=price;
    },0);

    return{
        total:total,
        productCount:products.length
    }
}
     


//創建購物車Item 更新購物車資料
function loadCart(){
    let products=getProductFromStorage();
    if(products.length<1){
        cartItemID=1;
    }else{
        cartItemID=products[products.length-1].id;
        cartItemID++
    }
    products.forEach(v=> createCartItem(v));

    updateCartInfo();
}

