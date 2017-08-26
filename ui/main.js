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
        if(request.readyState===XMLHttpRequest.DONE ){
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

 console.log('Loaded!');

var nameInput=document.getElementById("name");console.log('Loaded!1');
//var namee=nameInput.value;console.log(namee);
var sub=document.getElementById('Submit');console.log(sub);
sub.onlick= function() {
    //make a request to the server and send the name
    console.log('Loaded!');
    //capture a list of names and render it as a list
    
    /*
    var names= ['name1','name2','name3','name4'];
    
    var list='';
    for(var i=0;i<names.length;i++){
        list+='<li>' + names[i] + '</li>';
    }
    console.log(list);
    var ul=document.getElementById('namelist');
    ul.innerHTML=list;
    */
};

