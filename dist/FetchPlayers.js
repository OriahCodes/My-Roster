class FetchPlayers{
    constructor(team){
        this.data = this.getData(team)
    }

    getData(team){
        return $.get(`teams/${team}`)
    }

}