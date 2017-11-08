let remote = require('electron').remote;

function printProcesses() {
  const ps = require('ps-node');
  let div = document.getElementById("div");
  div.innerHTML = "";
  ps.lookup({
    "command": /.{0,}kakao.{0,}/
  }, (err, results) => {
    for (let i = 0; i < results.length; i++) {
      div.innerHTML += "PROCESS :: " + i + "<br>";
      div.innerHTML += 'PID : ' + results[i].pid + "<br>";
      div.innerHTML += 'COMMAND : ' + results[i].command + "<br>";
      div.innerHTML += 'Arguments : ' + results[i].arguments + "<br>" + "<br>";
    }
  });

  const {
    remote
  } = require('electron')
  let top = remote.getCurrentWindow();

  //top.close();
  // let child = new remote.BrowserWindow({
  //   parent: top,
  //   modal: true
  // })

  // child.loadURL(url.format({
  //   pathname: path.join(__dirname, '/../html/index2.html'),
  //   protocol: 'file:',
  //   slashes: true
  // }));
}