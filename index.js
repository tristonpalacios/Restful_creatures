//import packages

const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const fs = require('fs')
const port= 8000
const methodOverride = require('method-override')
const router = express.Router()
module.exports = router

//create instance of express
const app = express()

//Middleware
//tell express to use EJS  as the view engine
app.set('view engine','ejs')
//tell express that we're using ejs layouts
app.use(ejsLayouts)
//Methid override configuration
app.use(methodOverride('_method'))
//body-parser middleware - will read the data we send to the post - tells express how to handle incoming form data
//this allows us to access to fomr data via req.body
app.use(express.urlencoded({extended:false}))

app.use('/prehistoric_creatures',require('./controllers/creatureController.js'))
app.use('/dinosaurs',require('./controllers/dinosaurController.js'))

//ROUTES
//HOME
app.get('/',(req,res)=>{
    res.send(`Hello dinos`)
})

// app.get('/dinosaurs',(req,res)=>{

//     //pull in dinosaurs from the dinosaurs.json
//     let dinosaurs= fs.readFileSync('./dinosaurs.json')
//     let dinoData = JSON.parse(dinosaurs)
//     let nameFilter = req.query.nameFilter
//     //if nameFilter has a value in it, run function, if not do nothing to dinoData
//     if(nameFilter){
//         dinoData = dinoData.filter(dino=>{
//             return dino.name.toLowerCase()===nameFilter.toLowerCase()
//         })
//     }
    
//     res.render('index.ejs', {myDinos:dinoData})
 

// })
// app.get('/dinosaurs/new', (req, res) => {
//     res.render('new.ejs');
//   });
// //edit form route(renders edit for)
// app.get('/dinosaurs/edit/:idx',(req,res)=>{
//     //snatch the dino that needs to be updated
//     let dinosaurs = fs.readFileSync('./dinosaurs.json')
//     let dinoData = JSON.parse(dinosaurs)
//     let dinoIndex = req.params.idx
//     let targetDino = dinoData[dinoIndex]
// res.render('edit.ejs',{dino:targetDino,dinoId: dinoIndex})
// })

// app.put('/dinosaurs/:idx',(req,res)=>{
//     let dinosaurs = fs.readFileSync('./dinosaurs.json')
//     let dinoData = JSON.parse(dinosaurs)
//     //replace dino fields with new data
//     dinoData[req.params.idx].name = req.body.name
//     dinoData[req.params.idx].type = req.body.type
//     //rewrite JSON
//     fs.writeFileSync('./dinosaurs.json',JSON.stringify(dinoData))
//     //redirect files
//     res.redirect('/dinosaurs')


// })

// //show ie all info about a single dino
// app.get('/dinosaurs/:idx',(req,res)=>{
//     //this will console log whatever is entered after dinosaurs/ 
//     //: indicates that the following is an urlparameter
// // console.log('idx:'+req.params.idx)
// let dinosaurs = fs.readFileSync('./dinosaurs.json')
// let dinoData = JSON.parse(dinosaurs)
// //this gets the data as a string
// let dinoIndex = req.params.idx
// //js sometimes will convt a string to number
// let targetDino = dinoData[dinoIndex]
// // console.log(targetDino)
// res.render('show.ejs',{dino: targetDino})
// //extract the corresponding data based on dinosaur searched
// })

// //POST a new dino
// app.post('/dinosaurs',(req,res)=>{
//     //get dino data just as before
//     let dinosaurs = fs.readFileSync('./dinosaurs.json')
//     let dinoData = JSON.parse(dinosaurs)
//     // add the new dino to the dinoData array
//     dinoData.push(req.body)
//     //rewrite data back into json file
//     //save new dino to json
//     fs.writeFileSync('./dinosaurs.json',JSON.stringify(dinoData))
//     //redirect back to index route
//     res.redirect('/dinosaurs')
//     // console.log(req.body)
//     // console.log(dinoData)
// })

// app.delete('/dinosaurs/:idx',(req,res)=>{
//     // console.log(`You're trying to delete dino ${req.params.idx}`)
//     let dinosaurs = fs.readFileSync('./dinosaurs.json')
//     let dinoData = JSON.parse(dinosaurs)
//     //remove deleted dino from dino date
//     dinoData.splice(req.params.idx,1)
//     //rewrite the file without the dino in it
//     fs.writeFileSync('./dinosaurs.json',JSON.stringify(dinoData))
//     //redirect files
//     res.redirect('/dinosaurs')

// })

//PREHISTORIC CREATURES

// app.get('/prehistoric_creatures',(req,res)=>{

//     //pull in dinosaurs from the dinosaurs.json
//     let creatures= fs.readFileSync('./prehistoric_creatures.json')
//     let creatureData = JSON.parse(creatures)
//     let nameFilter = req.query.nameFilter
//     //if nameFilter has a value in it, run function, if not do nothing to dinoData
//     if(nameFilter){
//         creatureData = creatureData.filter(dino=>{
//             return dino.type.toLowerCase() === nameFilter.toLowerCase()
//         })
//     }
    
//     // console.log(dinoData)
//     res.render('creatures/indexPre.ejs', {myCreatures:creatureData})
 

// })
// app.get('/prehistoric_creatures/new', (req, res) => {
//     res.render('creatures/newPre.ejs');
//   });

// app.post('/prehistoric_creatures',(req,res)=>{
//     //get dino data just as before
//     let creatures= fs.readFileSync('./prehistoric_creatures.json')
//     let creatureData = JSON.parse(creatures)
//     // add the new dino to the dinoData array
//     creatureData.push(req.body)
//     //rewrite data back into json file
//     //save new dino to json
//     fs.writeFileSync('./prehistoric_creatures.json',JSON.stringify(creatureData))
//     //redirect back to index route
//     res.redirect('/prehistoric_creatures')
//     // console.log(req.body)
//     // console.log(dinoData)
// })



// app.put('/prehistoric_creatures/:idx',(req,res)=>{
//     let creatures= fs.readFileSync('./prehistoric_creatures.json')
//     let creatureData = JSON.parse(creatures)
//     //replace dino fields with new data
//     creatureData[req.params.idx].type = req.body.creatureType
//     //rewrite JSON
//     fs.writeFileSync('./prehistoric_creatures.json',JSON.stringify(creatureData))
//     //redirect files
//     res.redirect('/prehistoric_creatures')

// })

// app.delete('/prehistoric_creatures/:idx',(req,res)=>{
//     // console.log(`You're trying to delete dino ${req.params.idx}`)
//     let creatures = fs.readFileSync('./prehistoric_creatures.json')
//     let creatureData = JSON.parse(creatures)
//     //remove deleted dino from dino date
//     creatureData.splice(req.params.idx,1)
//     //rewrite the file without the dino in it
//     fs.writeFileSync('./prehistoric_creatures.json',JSON.stringify(creatureData))
//     //redirect files
//     res.redirect('/prehistoric_creatures')

// })

// app.get('/prehistoric_creatures/edit/:idx',(req,res)=>{
//     //snatch the dino that needs to be updated
//     let creatures= fs.readFileSync('./prehistoric_creatures.json')
//     let creatureData = JSON.parse(creatures)
//     let creatureIndex = req.params.idx
//     let targetCreature = creatureData[creatureIndex]
// res.render('creatures/edit.ejs',{dino:targetCreature,dinoId:creatureIndex})

// })

// app.get('/prehistoric_creatures/:idx',(req,res)=>{
//     //this will console log whatever is entered after dinosaurs/ 
//     //: indicates that the following is an urlparameter
// // console.log('idx:'+req.params.idx)
// let creatures= fs.readFileSync('./prehistoric_creatures.json')
// let creatureData = JSON.parse(creatures)
// //this gets the data as a string
// let creatureIndex = req.params.idx
// //js sometimes will convt a string to number
// let targetCreature = creatureData[creatureIndex]
// // console.log(targetDino)
// res.render('creatures/showCreature.ejs',{dino: targetCreature})
// //extract the corresponding data based on dinosaur searched
// })





    // let dinosaurs = fs.readFileSync('./dinosaurs.json')
    // let dinoData = JSON.parse(dinosaurs)
    // console.log(dinoData)

//Tell app to listen for the port
app.listen(port, ()=>{
    // console.log('Dino Crud Time')
})