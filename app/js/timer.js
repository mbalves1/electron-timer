const { ipcRenderer } = require('electron')
const moment = require('moment')
let segundos = 0
let timer
let tempo

module.exports = {

    iniciar (element) {
        tempo = moment.duration(element.textContent)
        segundos = tempo.asSeconds()
        clearInterval(timer)
        timer = setInterval(() => {
            segundos++
            element.textContent = this.segundosParaTempo(segundos)
        }, 1000)
    },segundosParaTempo(segundos) {
        return moment().startOf('day').seconds(segundos).format('HH:mm:ss')
    },parar (curso) {
        clearInterval(timer)
        let tempoEstudado = this.segundosParaTempo(segundos)
        ipcRenderer.send('curso-parado', curso, tempoEstudado)

    }
}