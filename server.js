var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;
var crypto=require('crypto');
var bodyParser=require('body-parser');

var config={
    user:'shankyemcee',
    database:'shankyemcee',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};


var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool=new Pool(config);
app.get('/test-db', function(req,res){
    pool.query('SELECT * FROM test', function(err,result){
        
        if(err)
        {
            res.status(500).send(err.toString());
        }
        else
        {
            res.send(JSON.stringify(result.rows));
        }
    });
});





//Heres the general technique to reduce html code

var articles = {
    'article-two': {
    title: 'Article Two | Shankar kantharaj',
    heading: 'Article Two',
    date: '19-aug-2017',
    content:
    `
     <p>        This is the content of article This is the content of article This is the content of article This is the             content of article This is the content of article This is the content of article This is the content of article
            </p>
            
            <p>
                This is the content of article This is the content of article This is the content of article This is the content of article This is the content of article This is the content of article This is the content of article This is the content of article This is the content of article This is the content of article This is the content of article 
            </p>
            
            <p>
                This is the content of article This is the content of article This is the content of article This is the content of article This is the content of article This is the content of article This is the content of article This is the content of article This is the content of article This is the content of article This is the content of article 
            </p>
            
            `
    
},
        'article-three': {
    title: 'Article Three | Shankar kantharaj',
    heading: 'Article Three',
    date: '19-aug-2017',
    content:
    `
     <p>        This is the content of article This is the content of article This is the content of article This is the             content of article This is the content of article This is the content of article This is the content of article
            </p>
            
            <p>
                This is the content of article This is the content of article This is the content of article This is the content of article This is the content of article This is the content of article This is the content of article This is the content of article This is the content of article This is the content of article This is the content of article 
            </p>
            
            <p>
                This is the content of article This is the content of article This is the content of article This is the content of article This is the content of article This is the content of article This is the content of article This is the content of article This is the content of article This is the content of article This is the content of article 
            </p>
            
            `
    
}
};




function CreateTemplate(data){
 var title=data.title;
 var heading=data.heading;
 var content=data.content;
 var date=data.date;


var htmltemplate=`<html>
    <head>
        <title>
           ${title}
        </title>
        <meta name="viewport" content = "width=device-width, initial-scale=1" />
       <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
        
         
        
        <div class="container">
        
        <div>
            <a href='\'> HOME </a>
        </div>
        <hr/>
      <h3>
           ${heading}
        </h3>     
        
        
        
        <div>
          ${date.toDateString()}
        </div>
        <div>
            ${content}
        </div>
        
        </div>
    </body>
</html>

`;

return htmltemplate;
}

var names=[];
app.get('/Submit_name',function(req,res){
    var name=req.query.name;
    
    names.push(name);
    res.send(JSON.stringify(names));
});

app.get('/articles/:articleName', function (req, res) {

//to hack one can write select * from article where title='';DELETE WHERE a='asdf'
//select * from article where title='article-one'
//pool.query("SELECT * FROM dept WHERE title='"+ req.params.articleName + "'", function(err,result){
pool.query("SELECT * FROM dept WHERE title=$1" ,[req.params.articleName], function(err,result){
    if(err){
        res.status(500).send(err.toString());
    }
    else{
        if(result.rows.length===0){
            res.status(404).send('Article not found');
        }
        else{
            var articleData=result.rows[0];
            res.send(CreateTemplate(articleData));
            
        }
    }
});
  
});


function hash(input,salt)
{
    var hashed=crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    
    return ["pbkdf2","10000",salt,hashed.toString('hex')].join('$');
}




app.get('/hash/:input',function(req,res){
    
    var hashedString=hash(req.params.input,'this-is-some-random-value');
    res.send(hashedString);
});



app.post('/create-user',function(req,res){
    //username,password
    //JSON
    var username=req.body.username;
    var password=req.body.password;
    
    var salt=crypto.randomBytes(128).toString('hex');
    var dbString=hash(password,salt);
    
    pool.query('INSERT INTO person (username,password) VALUES($1,$2)',[username,dbString],function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            res.send('User succesfully created:' + username);
        }
    });
});

app.post('/login',function(req,res){
    //username,password
    //JSON
    var username=req.body.username;
    var password=req.body.password;
    
    
    
    pool.query('select * from person where username=$1',[username],function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            if(result.rows.length===0){
                res.send(403).send('username/password is invalid');
            }
            else
            {//match the password
            
                var dbString=result.rows[0].password;
                var salt=dbString.split('$')[2];
                var hashedPassword=hash(password,salt);//creating a hash based on the password submited and the salt value
                if(dbString==hashedPassword){
                 res.send('credentials correct');   
                }else{
                    res.send(403).send('username/password invalid');
                }
                 
            }
           
        }
    });
});


app.get('/article-one', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article-one.html'));
});

/*
app.get('/:articleName', function (req, res) {
    var articleName=req.params.articleName;
  res.send(CreateTemplate(articles[articleName]));
});

*/




app.get('/test-db', function(req,res){
   //submit request
   //receive response
});


var counter=0;
app.get('/counter', function(req,res){
    counter=counter+1;
    res.send(counter.toString());
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
