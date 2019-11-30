const express = require('express')
const app = express()
const request = require('request')
const path = require('path')

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))

app.get('/', (req,res) => {
    console.log("Someone has come into the server.")
    res.send("Server is up and running smoothly")
})
//=============================================== team API

const teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756"
}

app.get('/teams/:teamName', (req,res) => {
    request('http://data.nba.net/10s/prod/v1/2018/players.json', (err, response) => {
        let teamName = req.params.teamName
        let teamId = teamToIDs[teamName]    
        
        let data =  JSON.parse(response.body).league.standard   
        let players = data.filter(player=> (player.teamId== teamId) && (player.isActive))
        
        // for (let player of players){
            
        // }
        
        // console.log(players)
        res.send(players)
    })
})


app.get(`/player-stats`, (req2,res2) => {
    let firstName = req2.query.first
    let lastName = req2.query.last
    console.log(firstName,lastName)
    request(`https://nba-players.herokuapp.com/players-stats/${lastName}/${firstName}`, (err2, response2) => {
        try {
            let gamesPlayed =  JSON.parse(response2.body).games_played  
            res2.send(gamesPlayed)
          }
        catch(error) {
            res2.send("unknown")   
          }
    })
})

//========================================================

const port = 3000
app.listen(port, function(){
    console.log(`Running server on port ${port}`)
})