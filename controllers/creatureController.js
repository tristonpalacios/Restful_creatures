const express = require('express')
const router = express.Router()
const fs = require('fs')
module.exports = router

router.get('/',(req,res)=>{

    //pull in dinosaurs from the dinosaurs.json
    let creatures= fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(creatures)
    let nameFilter = req.query.nameFilter
    //if nameFilter has a value in it, run function, if not do nothing to dinoData
    if(nameFilter){
        creatureData = creatureData.filter(dino=>{
            return dino.type.toLowerCase() === nameFilter.toLowerCase()
        })
    }
    
    // console.log(dinoData)
    res.render('creatures/indexPre.ejs', {myCreatures:creatureData})
 

})
router.get('/new', (req, res) => {
    res.render('creatures/newPre.ejs');
  });

router.post('/prehistoric_creatures',(req,res)=>{
    //get dino data just as before
    let creatures= fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(creatures)
    // add the new dino to the dinoData array
    creatureData.push(req.body)
    //rewrite data back into json file
    //save new dino to json
    fs.writeFileSync('./prehistoric_creatures.json',JSON.stringify(creatureData))
    //redirect back to index route
    res.redirect('/prehistoric_creatures')
    // console.log(req.body)
    // console.log(dinoData)
})



router.put('/:idx',(req,res)=>{
    let creatures= fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(creatures)
    //replace dino fields with new data
    creatureData[req.params.idx].type = req.body.creatureType
    //rewrite JSON
    fs.writeFileSync('./prehistoric_creatures.json',JSON.stringify(creatureData))
    //redirect files
    res.redirect('/prehistoric_creatures')

})

router.delete('/:idx',(req,res)=>{
    // console.log(`You're trying to delete dino ${req.params.idx}`)
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(creatures)
    //remove deleted dino from dino date
    creatureData.splice(req.params.idx,1)
    //rewrite the file without the dino in it
    fs.writeFileSync('./prehistoric_creatures.json',JSON.stringify(creatureData))
    //redirect files
    res.redirect('/prehistoric_creatures')

})

router.get('/edit/:idx',(req,res)=>{
    //snatch the dino that needs to be updated
    let creatures= fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(creatures)
    let creatureIndex = req.params.idx
    let targetCreature = creatureData[creatureIndex]
res.render('creatures/edit.ejs',{dino:targetCreature,dinoId:creatureIndex})

})

router.get('/:idx',(req,res)=>{
    //this will console log whatever is entered after dinosaurs/ 
    //: indicates that the following is an urlparameter
// console.log('idx:'+req.params.idx)
let creatures= fs.readFileSync('./prehistoric_creatures.json')
let creatureData = JSON.parse(creatures)
//this gets the data as a string
let creatureIndex = req.params.idx
//js sometimes will convt a string to number
let targetCreature = creatureData[creatureIndex]
// console.log(targetDino)
res.render('creatures/showCreature.ejs',{dino: targetCreature})
//extract the corresponding data based on dinosaur searched
})
