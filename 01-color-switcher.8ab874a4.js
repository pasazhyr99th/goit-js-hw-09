function t(){return`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}let e=null;const n={btnStart:document.querySelector("[data-start]"),btnStop:document.querySelector("[data-stop]"),body:document.querySelector("body")};n.btnStop.disabled=!0,n.btnStart.addEventListener("click",(function(){n.btnStart.disabled=!0,n.btnStop.disabled=!1,n.body.style.backgroundColor=t(),e=setInterval((()=>{n.body.style.backgroundColor=t()}),1e3)})),n.btnStop.addEventListener("click",(function(){n.btnStart.disabled=!1,n.btnStop.disabled=!0,clearInterval(e)}));
//# sourceMappingURL=01-color-switcher.8ab874a4.js.map