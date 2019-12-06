class DreamRenderer{
    
    renderDream(){
        this.getTeam().then( players => {
            localStorage.dreamTeam = JSON.stringify(players)

            $("#dream-team").empty()

            const source = $("#dream-template").html()
            const template = Handlebars.compile(source)

            let d = template({players})
            $("#dream-team").append(d)
        })
    }


    getTeam(){
        return $.get('/dream-team')
    }

}