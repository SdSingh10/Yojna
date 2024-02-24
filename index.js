import bodyParser from "body-parser";
import express from "express";


const port=3300;
const app= express();
let username="user";
let password="user@";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.post("/login",(req,res)=>{
    const checkbox=req.body.check;
    password=req.body.pass;
    username=req.body.aadhar;
    
    res.redirect("/");
})

app.get("/login",(req,res)=>{
    res.render("index.ejs",{userName:username});
})
app.get("/logout",(req,res)=>{
    username="user";
    res.redirect("/login");
})
// app.get("/profile",(req,res)=>{
//     res.render("profile.ejs");
// })
app.get("/schemes",(req,res)=>{
    res.render("schemes.ejs");
})
app.get("/notifications",(req,res)=>{
    res.render("notification.ejs");
})
app.get("/feedback",(req,res)=>{
    res.render("feedback.ejs");
})

app.post("/feedback",(req,res)=>{
    
    res.redirect("/");
})



app.get("/",(req,res)=>{
    res.render("yojna.ejs");
})
app.get("/reset",(req,res)=>{
    res.render("setpass.ejs");
})
app.get("/profile",(req,res)=>{
    res.render("reportpage.ejs");
})



app.listen(port,()=>{
    console.log(`your running port is : ${port}`);
})