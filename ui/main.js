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



/*

var sub=document.getElementById('Submit_btn');
sub.onlick= function () {
  //  make a request to the server and send the name
    console.log('Loaded!');
   //    capture a list of names and render it as a list
    
    
    var names= ['name1','name2','name3','name4'];
    
    var list='';
    for(var i=0;i<names.length;i++){
        list+='<li>' + names[i] + '</li>';
    }
    console.log(list);
    var nameInput=document.getElementById("name");console.log('Loaded!1');
    var ul=document.getElementById('namelist');
    ul.innerHTML=list;
    var namee=nameInput.value;
};

*/



var submit=document.getElementById('Submit_btn');
submit.onclick =function(){
   
    var request=new XMLHttpRequest();
    
    //capture the response and store in a variable
    request.onreadystatechange = function(){
        if(request.readyState===XMLHttpRequest.DONE ){
            //take some action
            if(request.status===200){
                var names=request.responseText;
                names=JSON.parse(names);
                var list='';
                for(var i=0;i<names.length;i++)
                {
                    list+='<li>' + names[i] + '</li>';
                }
                var ul=document.getElementById('namelist');
                ul.innerHTML=list;
            }
        }
    };
  
    var nameInput=document.getElementById('name');
    var name=nameInput.value;
    request.open('GET','http://shankyemcee.imad.hasura-app.io/Submit_name?name=' + name,true);
    request.send(null);
};



//this is for login credentials


var subm=document.getElementById('cred_but');
subm.onclick =function(){
   
    var request=new XMLHttpRequest();
    
    //capture the response and store in a variable
    request.onreadystatechange = function(){
        if(request.readyState===XMLHttpRequest.DONE ){
            //take some action
            if(request.status===200){
               alert('Logged in successfully');
            }else if(request.status==403){
                 alert('username/password invalid');
                
            }else if(request.status==500){
                 alert('something went wrong on the server');
                
            }
            
        }
    };
  
    var username=document.getElementById('username'); 
    var password=document.getElementById('password');
    console.log(username);
    console.log(password);
    request.open('POST','http://shankyemcee.imad.hasura-app.io/login' + name,true);
    request.setRequestHeader('Content-Type','application/json');
    request.send(JSON.stringify({username:username,password:password}));
};


