const express = require('express')
const request = require('request')
const router = express.Router()


router.get('/', (req,res) => {
    console.log("Someone has come into the server.")
    res.send("Server is up and running smoothly")
})

//=============================================== team API

let teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756"
}

router.get('/teams/:teamName', (req,res) => {
    request('http://data.nba.net/10s/prod/v1/2018/players.json', (err, response) => {
        let teamName = req.params.teamName
        let teamId = teamToIDs[teamName]    
        
        let data =  JSON.parse(response.body).league.standard   
        let players = data.filter(player=> (player.teamId== teamId) && (player.isActive))
    
        res.send(players)
    })
})


router.get(`/player-stats`, (req,res) => {
    let firstName = req.query.first
    let lastName = req.query.last
    console.log(firstName,lastName)
    request(`https://nba-players.herokuapp.com/players-stats/${lastName}/${firstName}`, (err, response) => {
        try {
            let gamesPlayed =  JSON.parse(response.body).games_played  
            res.send(gamesPlayed)
          }
        catch(error) {
            res.send("unknown")   
          }
    })
})

//====================================================== dreamTeam
let dreamTeam = []

router.get('/dream-team', (req,res) => {
    res.send(dreamTeam)
})

router.post('/dream-team', (req,res) => {
    let player = req.body
    console.log(player)
    dreamTeam.push(player)
    res.end()
})

router.delete('/dream-team/:playerId', (req,res) => {
    let playerId = req.params.playerId
    dreamTeam = dreamTeam.filter(p => p.id !== playerId)
	res.end()
})

//====================================================== update teamToIDs -admin operation
// teamToIDs = '{"lakers": "1610612747", "warriors": "1610612744", "heat": "1610612748", "suns": "1610612756"}'

router.post('/teams', (req,res) => {
    let newTeamInfo = req.body

    let teamName = newTeamInfo.teamName
    let teamId = newTeamInfo.teamId
    teamToIDs[teamName] = teamId 
    res.send("Just added a new team called " + teamName)
})

router.get('/teams', (req,res) => {
    res.send(teamToIDs)
})

module.exports ={
    router : router
} 
