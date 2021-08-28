//find out the cart items from localstorage
if (localStorage.getItem('cart') == null) {
    var cart = {};
}
else {
    cart = JSON.parse(localStorage.getItem('cart'));
    document.getElementById('cart').innerHTML = Object.keys(cart).length;

}

//if the add to cart is clicked add  the item
// $('.cart').click(function () {
    $('.divpr').on('click','button.cart',function(){
    var idstr = this.id.toString();
    console.log(idstr);
    if (cart[idstr] != undefined) {
        qty = cart[idstr][0] + 1;
        name = "My Item";
        cart[idstr] = [qty,name];
    }
    else {
        qty = cart[idstr] + 1;
        name = "My Item";
        cart[idstr] = [qty,name];    
    }
    updateCart(cart);
    
    localStorage.setItem('cart', JSON.stringify(cart));
    document.getElementById('cart').innerHTML = Object.keys(cart).length;
});

//add popover to cart
$('#popcart').popover();
document.getElementById("popcart").setAttribute('data-content', '<h5>Cart for your items in my shopping cart</h5>');

updatePopover(cart);
function updatePopover(cart){
    console.log("We are in Popover0");
    var popStr = "";
    popStr = popStr+"<h5> Cart for you items in my shopping cart </h5> <div class ='mx-2 my-2'>";
    var i=1;
    for(var item in cart ){
        popStr=popStr+"<b>"+ i+"</b>. ";
        popStr=popStr+document.getElementById('name'+item).innerHTML.slice(0,19)+"....Qty:"+ cart[item][0]+'<br>';
        i=i+1;         
    } 
    popStr=popStr+"</div> <a href='/shop/checkout'><button class='btn btn-primary' id = 'checkout'>Checkout</button></a>  <button class='btn btn-primary' onclick='clearCart()' id = 'clearcart'>Clear cart</button>";
    document.getElementById('popcart').setAttribute('data-content',popStr);
    $('#popcart').popover('show');

}

function clearCart(){
    cart=JSON.parse(localStorage.getItem('cart'));
    for(var item in cart){
        document.getElementById('div'+item).innerHTML='<button id="'+item+'" class="btn btn-primary cart">Add to Cart</button>'
    }

    localStorage.clear();
    cart={};
    updateCart(cart);
}
function updateCart(cart) {
    var sum=0;
    for (var item in cart) {
        sum+=cart[item][0];
        document.getElementById('div' + item).innerHTML = "<button id='minus" + item + "' class='btn btn-primary minus'>-</button> <span id='val" + item + "''>" + cart[item][0] + "</span> <button id='plus" + item + "' class='btn btn-primary plus'> + </button>";
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    document.getElementById('cart').innerHTML = sum;
    console.log(cart);
    updatePopover(cart);
}
 
// If plus or minus button is clicked, change the cart as well as the display value
$('.divpr').on("click", "button.minus", function() {
    a = this.id.slice(7, );
    cart['pr' + a][0] = cart['pr' + a][0] - 1;
    cart['pr' + a] = Math.max(0, cart['pr' + a][0]);
    document.getElementById('valpr' + a).innerHTML = cart['pr' + a];
    updateCart(cart);
});
$('.divpr').on("click", "button.plus", function() {
    a = this.id.slice(6, );
    cart['pr' + a][0] = cart['pr' + a][0] + 1;
    document.getElementById('valpr' + a).innerHTML = cart['pr' + a][0];
    updateCart(cart);
});
