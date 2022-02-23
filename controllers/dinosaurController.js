const express = require('express')
const router = express.Router()
const fs = require('fs')
module.exports = router

router.get('/',(req,res)=>{

    //pull in dinosaurs from the dinosaurs.json
    let dinosaurs= fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    let nameFilter = req.query.nameFilter
    //if nameFilter has a value in it, run function, if not do nothing to dinoData
    if(nameFilter){
        dinoData = dinoData.filter(dino=>{
            return dino.name.toLowerCase()===nameFilter.toLowerCase()
        })
    }
    
    res.render('index.ejs', {myDinos:dinoData})
 

})
router.get('/new', (req, res) => {
    res.render('new.ejs');
  });
//edit form route(renders edit for)
router.get('/edit/:idx',(req,res)=>{
    //snatch the dino that needs to be updated
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    let dinoIndex = req.params.idx
    let targetDino = dinoData[dinoIndex]
res.render('edit.ejs',{dino:targetDino,dinoId: dinoIndex})
})

router.put('/:idx',(req,res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    //replace dino fields with new data
    dinoData[req.params.idx].name = req.body.name
    dinoData[req.params.idx].type = req.body.type
    //rewrite JSON
    fs.writeFileSync('./dinosaurs.json',JSON.stringify(dinoData))
    //redirect files
    res.redirect('/dinosaurs')


})

//show ie all info about a single dino
router.get('/:idx',(req,res)=>{
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
router.post('/',(req,res)=>{
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

router.delete('/:idx',(req,res)=>{
    // console.log(`You're trying to delete dino ${req.params.idx}`)
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    //remove deleted dino from dino date
    dinoData.splice(req.params.idx,1)
    //rewrite the file without the dino in it
    fs.writeFileSync('./dinosaurs.json',JSON.stringify(dinoData))
    //redirect files
    res.redirect('/dinosaurs')

})