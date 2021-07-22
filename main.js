const { app, BrowserWindow, ipcMain, Tray, Menu } = require('electron');
const data = require('./data')
const templateGenerator = require('./template')

let tray = null

app.on('ready', () => {
  console.log('Aplicação Iniciada')
  let mainWindow = new BrowserWindow({
    width: 600,
    height: 400,

    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  tray = new Tray(__dirname + '/app/img/icon-tray.png')
  let template = templateGenerator.geraTrayTEmplate()
  let trayMenu = Menu.buildFromTemplate(template)

  tray.setContextMenu(trayMenu)
  mainWindow.loadURL(`file://${__dirname}/app/index.html`)
});

app.on('window-all-closed', () => {
  app.quit()
})

let sobreWindow
ipcMain.on('abrir-janela-sobre', () => {
  if (sobreWindow == null) {
    sobreWindow = new BrowserWindow({
      width: 300,
      height: 220,
      alwaysOnTop: true,
      frame: false
    })

    sobreWindow.on('closed', () => {
      sobreWindow = null
    })
  }

  sobreWindow.loadURL(`file://${__dirname}/app/sobre.html`)
  
})

ipcMain.on('fechar-janela-sobre', () => {
  sobreWindow.close()
})

ipcMain.on('curso-parado', (event, curso, tempoEstudado) => {
  data.salvaDados(curso, tempoEstudado)
})