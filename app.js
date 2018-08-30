var express=require("express");
var app= express();
var mongoose=require("mongoose");
var bodyParser=require("body-parser");
var methodOverride=require("method-override");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.set("view engine","ejs");


mongoose.connect("mongodb://localhost/blogapp1");
var blogSchema=new mongoose.Schema(
      {
         title :  String,
         image:  String,
         body : String,
         created:{type:Date,default: Date.now}
      }
   );
//Create a model for Campgrounds================
 var Blog= mongoose.model("Blog",blogSchema);

//Create new Element into Database=============
// Blog.create(
//    {
//     title:"iceland",
//     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkL-p-8YBDe8eEKqwfPXg03l8_OGFIJSNveVSYBKqbWcmf7chZ",
//     body: "more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
//    },
//    function(err,blogs)
//    {
//       if(err)
//       console.log(err);
//       else
//       {
//          console.log("New Data Created");
//          console.log(blogs);
//       }
//    }
   
// );
app.get("/",function(req, res) {
   res.redirect("/blogs"); 
});
app.get("/blogs",function(req,res)
{//retriev all data
     
     Blog.find({},function(err,blogs)
     {
         if(err)
         console.log("Error");
         else
         res.render("index",{blogs:blogs});
         
     });
    
});
//New Blog Route=============
app.get("/blogs/new",function(req, res) {
   res.render("newblog"); 
});
//Create and Post Route=========
app.post("/blogs",function(req,res)
{
   Blog.create(req.body.blog,function(err,newblog)
   {
      if(err)
      res.render("/new");
      else
      res.redirect("/blogs");
      
   });
});
//Show Route==============
app.get("/blogs/:id",function(req, res) {
   Blog.findById(req.params.id,function(err,showblog)
   {
      if(err)
      res.send("Blog not found......")
      else
      res.render("showblog",{showblog:showblog}); 
   });
   
});
//Edit and Update Route============
app.get("/blogs/:id/edit",function(req,res)
{
   Blog.findById(req.params.id,function(err,editblog)
   {
      if(err)
      res.send("Cann't Edit...");
      else
      res.render("editblog",{blog:editblog});
   });
});
//Update with put Route=============
app.put("/blogs/:id",function(req,res)
{
   Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,editblog)
   {
      if(err)
      res.render("editblog");
      else
      res.redirect("/blogs")
   });
});
//Delete with put request===========
app.delete("/blogs/:id",function(req,res)
{
   Blog.findByIdAndRemove(req.params.id,function(err)
   {
      if(err)
      res.redirect("/blogs/req.params.id");
      else
       res.redirect("/blogs");
    //  res.send("deleted");
      
   });
   
});
app.listen(process.env.PORT,process.env.IP,function()
{
   console.log("Resturant server Started"); 
});

