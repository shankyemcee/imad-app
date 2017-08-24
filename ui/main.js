/*

console.log('Loaded!');


var element=document.getElementById("main-text");
element.innerHTML="New Text";

var img=document.getElementById("madi");

img.onclick =function ()
{
    var interval=setInterval(moveRight,100);
   // img.style.marginLeft='100px';
};
var marginLeft=0;
function moveRight()
{
    marginLeft= marginLeft + 10;
    img.style.marginLeft= marginLeft + 'px';
}


*/

var button=document.getElementById('counter');
button.onclick = function(){
    
    //make a request to the counter endpoint
    
    //capture the response and store in a variable
    
    //render the variable in the correct span
    
    counter= counter + 1;
    var span=document.getElementById('count');
    span.innerHTML = counter.toString();
    
    
}
