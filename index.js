import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";

const port=3300;
const app= express();
// let username="user";
// let password="user@";
mongoose.connect('mongodb://localhost:27017/YOJNA')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Create a schema for your user model
const userSchema = new mongoose.Schema({
  Aadhar_no: String,
  Password: String
}, { collection: 'AADHAR_INFO'});

// Create a model based on the schema
const User = mongoose.model('AADHAR_INFO', userSchema);

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

// app.post('/login', async (req, res) => {
//   const { Aadhar_no, Password } = req.body;

//   try {
//     // Find the user in the database by Aadhar_no
//     const user = await User.findOne({ Aadhar_no }).exec();
    
//     // If user found, check password
//     if (user && user.Password === Password) {
//       // Render index page with user's information
//       res.render("index.ejs", { userName: user.Aadhar_no }); // Assuming Aadhar_no is the username
//     } else {
//       res.send('Invalid Aadhar_no or password');
//     }
//   } catch (error) {
//     console.error('Error finding user:', error);
//     res.send('Error finding user');
//   }
// });
app.post('/login', async (req, res) => {
  const { Aadhar_no, Password } = req.body;
  console.log(Aadhar_no)
  console.log(Password)
  try {
    console.log("Attempting to log in with Aadhar_no:", Aadhar_no);
    
    // Find the user in the database by Aadhar_no
    const user = await User.findOne({ Aadhar_no }).exec();
    
    console.log("Retrieved user from the database:", user);
    
    // If user found, check password
    if (user) {
      console.log("User found, checking password...");
      if (user.Password === Password) {
        console.log("Login successful!");
        // Render index page with user's information
        res.render("schemes.ejs", { userName: user.Aadhar_no }); // Assuming Aadhar_no is the username
      } else {
        console.log("Invalid password!");
        res.send('Invalid password');
      }
    } else {
      console.log("User not found!");
      res.send('User not found');
    }
  } catch (error) {
    console.error('Error finding user:', error);
    res.send('Error finding user');
  }
});

app.get("/login",(req,res)=>{
    res.render("index.ejs",{userName:"username"});
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
    res.render("landing.ejs");
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