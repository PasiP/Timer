// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".App {\r\n  text-align: center;\r\n}\r\n\r\n.App input {\r\n  top: 0;\r\n  width: 90%;\r\n  padding: 25px 0px;\r\n  box-sizing: content-box;\r\n  background: Transparent;\r\n  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;\r\n  font-size: 11vw;\r\n  text-align: center;\r\n  color: #ffffff;\r\n  border-radius: 6px;\r\n  border-color: #ffffff;\r\n  border-width: 3px;\r\n}\r\n\r\n.App p {\r\n  margin: 0.4rem;\r\n}\r\n\r\n.App-header {\r\n  background-image: url(\"./sand.jpg\");\r\n  background-repeat: no-repeat;\r\n  background-size: cover;\r\n  min-height: 100vh;\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  justify-content: center;\r\n  font-size: calc(280px + 2vmin);\r\n  color: #dcdcdc;\r\n}\r\n\r\n.App-container {\r\n  max-width: 1000px\r\n}\r\n\r\n.App-buttons {\r\n  margin-top: 36px;\r\n}\r\n\r\n.btn {\r\n  background-color: Transparent;\r\n  border: none;\r\n  display:inline-block;\r\n  float:left;\r\n  width:33%;\r\n  height:100%;\r\n  color: #ffffff;\r\n  outline:none;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-size: calc(8px + 2vmin);\r\n}\r\n\r\n.btn:hover {\r\n  color: #cccccc;\r\n}\r\n\r\n@keyframes alarmAnimation {\r\n  0%   { border-color: red; }\r\n  100% { border-color: #888888; }\r\n}\r\n\r\n.alarmed {\r\n  border: solid;\r\n  animation-name: alarmAnimation;\r\n  animation-duration: 1s;\r\n  animation-iteration-count: 5;\r\n}\r\n\r\n.notAlarmed {\r\n  border: solid 3px #888888;\r\n}\r\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}