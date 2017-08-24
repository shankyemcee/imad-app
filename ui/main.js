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
//var counter=0;
var button=document.getElementById('counter');
button.onclick = function(){
    
    //make a request to the counter endpoint
    var request=new XMLHttpRequest();
    
    //capture the response and store in a variable
    request.onreadystatechange = function(){
        if(request.readyState===XMLHttpRequest.Done ){
            //take some action
            if(request.status===200){
                var counter=request.responseText;
                var span=document.getElementById('count');
                  span.innerHTML = counter.toString();
            }
        }
    };
    
    //render the variable in the correct span
    
   
    request.open('GET','http://shankyemcee.imad.hasura-app.io/counter',true);
    request.send(null);
    
};
