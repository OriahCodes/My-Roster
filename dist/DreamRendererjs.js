class DreamRenderer{
    
    renderDream(){
        this.getTeam().then( players => {
            localStorage.dreamTeam = JSON.stringify(players)

            $("#dreamTeam-container").empty()

            const source = $("#dream-template").html()
            const template = Handlebars.compile(source)

            let d = template({players})
            $("#dreamTeam-container").append(d)
        })
    }


    getTeam(){
        return $.get('/dream-team')
    }

}