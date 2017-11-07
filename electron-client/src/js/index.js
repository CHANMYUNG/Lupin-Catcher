const colorPickers = document.querySelectorAll('.main__colorpicker');
const hexCodeInputs = document.querySelectorAll('.main__hexcode');
const shareInput = document.getElementById('share-colors');
const radioInputs = document.querySelectorAll('.radio__input');

function handleColorPickerUpdate() {
  document.documentElement.style.setProperty(`--${this.id}`, this.value);
  const hexcodeDiv = document.querySelectorAll(`.main__hexcode[data-color='${this.id}']`);

  hexcodeDiv[0].value = this.value;
  generateShareString();
}

colorPickers.forEach(input => {
  input.addEventListener('change', handleColorPickerUpdate);
});

function updateShareInput(newStr, presetThemeId) {
  if (!newStr) newStr = '#4D394B,#3E313C,#4C9689,#FFFFFF,#3E313C,#FFFFFF,#38978D,#EB4D5C';

  if (!presetThemeId) presetThemeId = 'aubergine';

  shareInput.value = newStr;
  const evt = new CustomEvent('change');
  shareInput.dispatchEvent(evt);

  localStorage.setItem('slack-demo-theme', newStr);
  if (presetThemeId) {
    document.getElementById(presetThemeId).checked = true;
    localStorage.setItem('slack-demo-theme-id', presetThemeId);
  } else {
    localStorage.removeItem('slack-demo-theme-id');
  }
}

function generateShareString() {
  let shareArr = [];

  colorPickers.forEach(input => {
    const colorHex = window.getComputedStyle(document.body).getPropertyValue(`--${input.id}`).trim();
    input.value = colorHex;

    const hexcodeDiv = document.querySelectorAll(`.main__hexcode[data-color='${input.id}']`);

    hexcodeDiv[0].value = colorHex;
    shareArr.push(colorHex);
  });
  const themeStr = shareArr.join(',');

  if (shareInput.value.toUpperCase() !== themeStr.toUpperCase()) updateShareInput(themeStr);
}

function handleShareUpdate() {
  const newShareArr = shareInput.value.split(',');

  newShareArr.forEach((hexcode, i) => {
    const trimmedHex = hexcode.trim();
    const colorPicker = colorPickers[i];

    if (colorPicker.value === trimmedHex || !/^#[0-9a-f]{3}[0-9a-f]{3}?$/i.test(trimmedHex)) return;
    colorPicker.value = trimmedHex;
    const evt = new CustomEvent('change');
    colorPicker.dispatchEvent(evt);
  });
}

shareInput.addEventListener('keyup', handleShareUpdate);
shareInput.addEventListener('change', handleShareUpdate);

function handleHexCodeInputChange() {
  const hexCode = this.value;
  if (/^#[0-9a-f]{3}[0-9a-f]{3}?$/i.test(hexCode)) {
    const colorPicker = document.getElementById(this.getAttribute('data-color'));
    colorPicker.value = hexCode;
    const evt = new CustomEvent('change');
    colorPicker.dispatchEvent(evt);
  }
}

hexCodeInputs.forEach(input => {
  ['keyup', 'change'].forEach(evt => {
    input.addEventListener(evt, handleHexCodeInputChange);
  });
});

function updateTheme() {
  let hexString;

  switch (this.id) {
    case 'aubergine':
      hexString = '#4D394B,#3E313C,#4C9689,#FFFFFF,#3E313C,#FFFFFF,#38978D,#EB4D5C';
      break;
    case 'hoth':
      hexString = '#F8F8FA,#F8F8FA,#CAD1D9,#FFFFFF,#FFFFFF,#383F45,#60D156,#FF8669';
      break;
    case 'monument':
      hexString = '#0D7E83,#076570,#F79F66,#FFFFFF,#D37C71,#FFFFFF,#F79F66,#F15340';
      break;
    case 'chocolate':
      hexString = '#544538,#42362B,#5DB09D,#FFFFFF,#4A3C30,#FFFFFF,#FFFFFF,#5DB09D';
      break;
    case 'ochin':
      hexString = '#303E4D,#2C3849,#6698C8,#FFFFFF,#4A5664,#FFFFFF,#94E864,#78AF8F';
      break;
    case 'workhard':
      hexString = '#4D5250,#444A47,#D39B46,#FFFFFF,#434745,#FFFFFF,#99D04A,#DB6668';
      break;
    case 'solanum':
      hexString = '#4F2F4C,#452842,#8C5888,#FFFFFF,#3E313C,#FFFFFF,#D0FF00,#889100';
      break;
    case 'brinjal':
      hexString = '#4F2F4C,#452842,#8C5888,#FFFFFF,#3E313C,#FFFFFF,#00FFB7,#DE4C0D';
      break;
  }

  updateShareInput(hexString, this.id);
}

radioInputs.forEach(radio => {
  radio.addEventListener('click', updateTheme);
});

updateShareInput(localStorage.getItem('slack-demo-theme'), localStorage.getItem('slack-demo-theme-id'));

function toIndex2() {
  alert("I'm going to index2.html")
  location.href = "./index2.html";
}




function printProcesses() {
  const ps = require('ps-node');
  var nodeConsole = require('console');
  const url = require('url');
  const path = require('path');
  var myConsole = new nodeConsole.Console(process.stdout, process.stderr);
  myConsole.log("SDASD");
  let div = document.getElementById("div");
  div.innerHTML = "";
  myConsole.log('Hello World!');
  ps.lookup({}, (err, results) => {
    myConsole.log(results);
    for (let i = 0; i < results.length; i++) {
      myConsole.log("PROCESS :: " + (i + 1));
      myConsole.log("PID : " + results[i].pid);
      myConsole.log("COMMAND :" + results[i].command);
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
  let child = new remote.BrowserWindow({
    parent: top,
    modal: true
  })

  child.loadURL(url.format({
    pathname: path.join(__dirname, '/../html/index2.html'),
    protocol: 'file:',
    slashes: true
  }));
}