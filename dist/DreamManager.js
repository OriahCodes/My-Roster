class DreamManager{
    
    addToTeam(player){
        return $.ajax({
            url: `/dream-team`,
            method: "POST",
            data: JSON.stringify(player),
            contentType: "application/json",
            success: function(data){
                console.log("POST complete : " + data)
            }
        })
    } 

    deleteFromTeam (playerId){
        return new Promise ( (resolve, reject) => {
            $.ajax({
                url: `/dream-team/${playerId}`,
                method: "DELETE",
                success: response => {
                    console.log("DELETE complete")
                    resolve()
                }
            })
        })
    }

    checkTeam (player){
        return new Promise ( (resolve, reject) => {

            let playerId = $(player).closest("div").data("id")

            $.get('/dream-team').then( dreamTeam => {

                let doesExist = dreamTeam.filter( p => p.id == playerId)
                if (doesExist.length == 0) {
            
                    let playersInfo = JSON.parse(localStorage.playersInfo)
                    let dreamPlayer = playersInfo.filter(p => p.id == playerId)[0]
                    
                    this.addToTeam(dreamPlayer).then( result => {
                        $(player).css("color", "#e74c3c")
                        resolve()
                    })
                }

                else {
                    this.deleteFromTeam(playerId).then( result => {
                        $(player).css("color", "#3498db")
                        resolve()
                    })
                }

            })
        })
    }

}