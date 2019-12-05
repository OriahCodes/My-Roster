class Renderer {

    _checkExists(url){
        return new Promise( (resolve, reject) => {
            var img = new Image()
    
            img.onload = function() { 
                resolve(true)
            }
    
            img.onerror = function() {
                resolve(false)
            }
    
            img.src = url
        })
    }

    renderNoResult(team){
        $("#load").empty()
        $("#no-results").text("Sorry, no results for team " + team)
    }
        
    _arrangeData(data){

        return new Promise( (resolve, reject) => {
            let playersInfo = []
            for (let player of data){
                let url = `https://nba-players.herokuapp.com/players/${player.lastName}/${player.firstName}`

                this._checkExists(url).then( imgExists => {

                    $.get(`/player-stats/?last=${player.lastName}&first=${player.firstName}`, gamesPlayed => {
                        
                        let playerInfo ={
                            id: player.firstName + player.lastName + player.jersey + player.pos,//Math.random().toString(36).substr(2, 6),
                            firstName: player.firstName,
                            lastName: player.lastName,
                            jersey: player.jersey,
                            pos: player.pos,
                            imgExists : imgExists,
                            img: url,
                            gamesPlayed : gamesPlayed,
                        }

                        // should make isStar function
                        let dreamTeam = JSON.parse(localStorage.dreamTeam)
                        let isStar = dreamTeam.filter(d => d.id == playerInfo.id)
                        if (isStar.length != 0){
                            playerInfo.star = true
                        } 
                        else{
                            playerInfo.star = false
                        }  

                        playersInfo.push(playerInfo)

                        if (playersInfo.length == data.length){
                            localStorage.playersInfo = JSON.stringify(playersInfo)
                            resolve(playersInfo)
                        }
                    })

                })
            }
        })

    }

    _renderPlayersInfo(players){
        $("#load").empty()

        const source = $("#results-template").html()
        const template = Handlebars.compile(source)
    
        let p = template({players})
        $("#results-container").append(p)
    }

    renderData(rawData){
        this._arrangeData(rawData).then( playersData => {
            this._renderPlayersInfo(playersData)
        })
    }
}