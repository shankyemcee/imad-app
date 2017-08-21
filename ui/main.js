console.log('Loaded!');


var element=document.getElementById("main-text");
element.innerHTML="New Text";

var img=document.getElementById("madi");

img.onclick = function()
{
    var interval=setInterval(moveRight,100);
   // img.style.marginLeft='100px';
}