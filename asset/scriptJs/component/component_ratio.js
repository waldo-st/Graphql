import { convertir } from "../tools.js";
const template = document.createElement("template");
template.innerHTML = /*html*/ `
<style>
    :host {
      background-color: #27283c;
      width: 350px;
      height: 190px;
      box-shadow:0 5px 25px rgba(0,0,0,0.65);
      border-radius: 5px;
      display:flex;
      align-items: center;
      justify-content: center;
      color: var(--blues);
    }
    .containe{
      width:90%;
      height:90%;
      display:flex;
      gap:10px;
      flex-direction: column;
    }
    .title{
      font-size: 25px;
      font-weight: 300;
    }
    
    .done, .receive{
      display: flex;
      align-items: center;
      position: relative;
      gap:20px;
      margin:0 0 0 30px
    }
    .receive div, .done div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size :11px;
    }
    .ratio{
      display:block;
      font-family: 'IBM Plex Sans', sans-serif;
      width:100%;
      font-size: 45px;
      font-weight: 100;
      text-align: center;
    }
    .done svg{
      background-color:  var(--gries);
      margin-top:13px;
    }

    .receive svg{
      margin-bottom: 12px;
      background-color:  var(--gries);
    }
    .down {
      animation: down 0.5s linear forwards;
      width:0;
      opacity:0;
      fill: var(--blues);
    }

    @keyframes down {
      from{
        width:0;
        opacity:0;
      }
      to{
        opacity:1;
      }
    }
    .up {
      animation: up 0.5s linear forwards;
      width:0;
      opacity:0;
    }

    @keyframes up {
      from{
        width:0;
        opacity:0;
      }
      to{
        opacity:1;
      }
    }
</style>
<div class="containe">
  <span class="title">Audits ratio</span>
  <div class="done">
    <svg width="150" height="5" viewBox="0 0 100">
      <rect width="100"height="5" x="0" y="0" fill= white class="up"/>
    </svg>
    <div><div class="Done">941 kB</div> <div><div>Done</div></i></div></div>
  </div>
  <div class="receive">
    <svg width="150" height="5" viewBox="0 0 100">
      <rect width="100" height="10" x="0" y="0" class="down"/>
    </svg>
    <div><div>Received</div> <div class="Received">1.08 MB</div></div>
  </div>
  <span class="ratio">0.8</span>
</div>
`;
export default class composante_ratio extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.down = this.shadowRoot.querySelector(".down");
    this.up = this.shadowRoot.querySelector(".up");
    this.Done = this.shadowRoot.querySelector(".Done");
    this.Received = this.shadowRoot.querySelector(".Received");
    this.ratio = this.shadowRoot.querySelector(".ratio");
  }
  set insertInto(data) {
    const up = convertir(data.totalUp);
    const down = convertir(data.totalDown);
    console.log(up, down)
    for (let i = 1; i <= 100; i++) {
      this.up.style.width = `${i}`;
      this.up.style.animationDelay = `${i/1000}s` 
    }
    if (up > down) {
      for (let i = 1; i <= 85; i++) {
        this.down.style.width = `${i}`;
        this.down.style.animationDelay = `${i/1000}s` 
      }
    }else if (up === down){
      for (let i = 1; i <= 100; i++) {
        this.down.style.width = `${i}`;
        this.down.style.animationDelay = `${i/1000}s` 
      }
    }else{
      for (let i = 1; i <= 115; i++) {
        this.down.style.width = `${i}`;
        this.down.style.animationDelay = `${i/1000}s` 
      }
    }
    this.Done.textContent = up;
    this.Received.textContent = down;
    this.ratio.textContent = data.auditRatio.toFixed(1);
    if(data.auditRatio > 0.9 && data.auditRatio < 1.2){
      this.up.style.fill = "#f0bb00";
      this.ratio.style.color = "#f0bb00";
    }else if (data.auditRatio >= 1.2) {
      this.up.style.fill = "#00ab81";
      this.ratio.style.color = "#00ab81";
    } else {
      this.up.style.fill = "#ffa482";
      this.ratio.style.color = "#ffa482";
    }
  }
}
