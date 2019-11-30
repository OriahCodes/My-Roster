$("#get-roster").on("click", () => {

    $("#load").empty()
    $("#load").append(`
        <div id="loading">
            <img src="images/basketball.png"/>
        </div>`)
    
    $("#results-container").empty()
    $("#no-results").empty()


    let team = $("#team-input").val()
    team = team.toLowerCase()

    const fetchPlayers = new FetchPlayers(team)
    fetchPlayers.data.then(rawData => {
        
        const renderer = new Renderer
        
        if (rawData.length == 0){
            renderer.renderNoResult(team)
            console.log("No results")
        }
        else{
            renderer.renderData(rawData)
        }    
    })    
})

console.log(
    "Team names: lakers, warriors, heat, suns"
)


