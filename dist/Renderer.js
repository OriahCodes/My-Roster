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
                    if (!imgExists){ url = "http://www.repol.copl.ulaval.ca/wp-content/uploads/2019/01/default-user-icon.jpg"}

                    // $.get(`/player-stats/?first=james&last=lebron`, result => {

                    $.get(`/player-stats/?last=${player.lastName}&first=${player.firstName}`, gamesPlayed => {
                        
                    playersInfo.push({

                            firstName: player.firstName,
                            lastName: player.lastName,
                            jersey: player.jersey,
                            pos: player.pos,
                            imgExists : imgExists,
                            img: url,
                            gamesPlayed : gamesPlayed
                        })
                        
                        if (playersInfo.length == data.length){
                            resolve(playersInfo)
                        }
                    })

                })
            }
        })

    }

    _renderPlayersInfo(players){
        console.log(players)
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