// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".App {\n  text-align: center;\n}\n\n.App code {\n  top: 0;\n  box-sizing: content-box;\n  /* background: #FFF3; */\n  padding: 12px 32px;\n  border-radius: 6px;\n  border-color: #ffffff;\n  border-width: 2px;\n}\n\n.App p {\n  margin: 0.4rem;\n}\n\n.App-header {\n  background-image: url(\"./sand.jpg\");\n  background-repeat: no-repeat;\n  background-size: cover;\n  min-height: 100vh;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  font-size: calc(280px + 2vmin);\n  color: #dcdcdc;\n}\n\n.App-buttons {\n  margin-top: 36px;\n}\n\n.btn {\n  background-color: Transparent;\n  border: none;\n  display:inline-block;\n  float:left;\n  width:33%;\n  height:100%;\n  color: #bfbfbf;\n  outline:none;\n  text-align: center;\n  text-decoration: none;\n  font-size: calc(8px + 2vmin);\n}\n\n.btn:hover {\n  color: #dddddd;\n}\n\n@keyframes alarmAnimation {\n  0%   { border-color: red; }\n  100% { border-color: #888888; }\n}\n\n.alarmed {\n  border: solid;\n  margin: -8px;\n  animation-name: alarmAnimation;\n  animation-duration: 1s;\n  animation-iteration-count: 5;\n}\n\n.notAlarmed {\n  border: solid 4px #888888;\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}