import { round } from "../tools.js";
const template = document.createElement("template");
template.innerHTML = /*html*/ `
<style>
    :host {
        background-color: #27283c;
        width: 350px;
        height: 190px;
        box-shadow:0 5px 25px rgba(0,0,0,0.65);
        border-radius: 5px;
        position: relative;
    }
    .xp{
        position: absolute;
        top:65px;
        left: 30px;
        color:#c9acfd;
        font-size: 55px;
        font-weight: 400;
    }
    .letxp{
        position: absolute;
        top:15px;
        right:25px;
        color:#c9acfd;
        font-size: 25px;
        font-weight: 400;
    }
    
</style>
<span class="letxp">Xp</span>
<span class="xp">600 kB</span>
`;
export default class composante_xp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.xp = this.shadowRoot.querySelector('.xp')
  }
  set insertInto(data){
    this.xp.textContent = round(data)+ " kB"
  }
}