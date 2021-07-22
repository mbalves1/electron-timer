const data = require('./data')

module.exports = {
  geraTrayTEmplate() {
    let template = [
      {
        'label': 'Cursos'
      },
      {
        type: 'separator'
      }
    ]
    let cursos = data.pegaNomeCursos()
    cursos.forEach((curso) => {
      let menuItem = {
        label: curso,
        type: 'radio'
      }
      template.push(menuItem)
    })

    return template
  }
}