//import packages

const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const fs = require('fs')
const port= 8000

//create instance of express
const app = express()

//Middleware
//tell express to use EJS  as the view engine
app.set('view engine','ejs')
//tell express that we're using ejs layouts
app.use(ejsLayouts)
//body-parser middleware - will read the data we send to the post - tells express how to handle incoming form data
//this allows us to access to fomr data via req.body
app.use(express.urlencoded({extended:false}))

//ROUTES
//HOME
app.get('/',(req,res)=>{
    res.send(`Hello dinos`)
})

app.get('/dinosaurs',(req,res)=>{

    //pull in dinosaurs from the dinosaurs.json
    let dinosaurs= fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    // console.log(dinoData)
    res.render('index.ejs', {myDinos:dinoData})
 

})
app.get('/dinosaurs/new', (req, res) => {
    res.render('new.ejs');
  });

//show ie all info about a single dino

app.get('/dinosaurs/:idx',(req,res)=>{
    //this will console log whatever is entered after dinosaurs/ 
    //: indicates that the following is an urlparameter
// console.log('idx:'+req.params.idx)
let dinosaurs = fs.readFileSync('./dinosaurs.json')
let dinoData = JSON.parse(dinosaurs)
//this gets the data as a string
let dinoIndex = req.params.idx
//js sometimes will convt a string to number
let targetDino = dinoData[dinoIndex]
// console.log(targetDino)
res.render('show.ejs',{dino: targetDino})
//extract the corresponding data based on dinosaur searched
})

//POST a new dino
app.post('/dinosaurs',(req,res)=>{
    //get dino data just as before
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    // add the new dino to the dinoData array
    dinoData.push(req.body)
    //rewrite data back into json file
    //save new dino to json
    fs.writeFileSync('./dinosaurs.json',JSON.stringify(dinoData))
    //redirect back to index route
    res.redirect('/dinosaurs')
    // console.log(req.body)
    // console.log(dinoData)
})

    // let dinosaurs = fs.readFileSync('./dinosaurs.json')
    // let dinoData = JSON.parse(dinosaurs)
    // console.log(dinoData)

//Tell app to listen for the port
app.listen(port, ()=>{
    // console.log('Dino Crud Time')
})