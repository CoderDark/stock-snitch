const path = require('path');
const {app, BrowserWindow} = require('electron');

const main = () => {
  const win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  });

  //win.removeMenu();
  win.loadFile(path.join(__dirname, 'src/index.html'));
};

app.whenReady().then(main);