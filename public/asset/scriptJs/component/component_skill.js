import { formatDate, round, strToDom } from "../tools.js";
const template = document.createElement("template");
template.innerHTML = /*html*/ `
<style>
    :host {
        background-color: #27283c;
        width: 400px;
        height: 400px;
        box-shadow:0 5px 25px rgba(0,0,0,0.65);
        border-radius: 5px;
        display: flex;
        justify-content: start;
        padding-left: 10px;
        align-items: center;
        position: relative;
    }
    path{
      cursor:pointer;
      opacity:1;
    }
    path:hover{
      opacity:0.7;
      transition: all 0.4s ease-in-out;
    }
    .text{
      text-align: center;
      position: absolute;
      font-size: 1.1rem;
      top:0;
      left:0;
      width: 130px;
      padding: 0 5px 0 5px;
      z-index: 5;
      transform: translate(-70%, -58%);
      opacity: 0;
      background: #27283c;
      box-shadow:0 5px 25px rgba(0,0,0,0.65);
      transition: opacity 0.3s ease-in-out;
    }
    .textActive{
      opacity:1;
      transition: opacity 0.3s ease-in-out;
    }
    .title{
      position: absolute;
      top: 0;
      right: 0;
      padding: 10px;
      font-size: 20px;
      font-weight: 300;
      color: var(--blues);
    }
    .legend{
      display: flex;
      justify-content: center;
      flex-direction: column;
      position: absolute;
      top: 45px;
      right: 5px;
      gap: 2px;
    }
    .nb{
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
      font-size: 15px;
      font-weight: 300;
      color: var(--blues);
    }
  </style>
  <span class="nb">Survolez le graphique</span>
  <span class="title">Technical skills</span>
  <div class="legend"></div>
`;
export default class composante_skill extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.svg = strToDom(
      `<svg width="300" height="300" viewBox="-1 -1 2 2">
        <g mask="url(#graphMask)"></g>
        <mask id="graphMask">
          <rect fill="white" x="-1" y="-1" width="2" height="2"/>
          <circle r="0.1" fill="black"/>
        </mask>
      </svg>`,
    );
    this.legend = this.shadowRoot.querySelector('.legend')
    this.shadowRoot.appendChild(this.svg);
    this.pathGroup = this.shadowRoot.querySelector('g')
    this.maskGroup = this.shadowRoot.querySelector('mask')
    this.colors = ["#f15a24","#7CFC00","#9A7D0A","#7FAFA5","#EDBB99","#E0FFFF","#66CDAA","#AFEEEE","#00FFFF","#6C3483","#228B22","#d281f5","#2980B9","#ADFF2F","#FF6347",];
  }
  
  drawGraphCirc(data) {
    let angle = 0;
    data.sort((a, b)=>{
      return b.amount-a.amount
    })
    const paths = data.map((_, k) => {
      const color = this.colors[k % (this.colors.length - 1)];
      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path",
      );
      path.setAttribute("fill", color);
      this.pathGroup.appendChild(path);
      path.addEventListener('mouseover',()=>{
        texts[k].classList.add('textActive')
      })
      path.addEventListener('mouseout',()=>{
        texts[k].classList.remove('textActive')
        
      })
      return path;
    });
    const texts = data.map((v, k) => {
      const color = this.colors[k % (this.colors.length - 1)];
      const text = document.createElement('div');
      const legend = document.createElement('span');
      console.log(v.type)
      legend.style.color = color
      text.classList.add('text')
      const namesTechno = v.type.split('_')
      text.textContent = "Skill "+namesTechno[namesTechno.length-1] +": \n"+ v.amount +"%"
      text.style.color = '#F2F2F2';
      legend.textContent = namesTechno[namesTechno.length-1];
      this.legend.appendChild(legend)
      this.shadowRoot.appendChild(text);
      return text;
    });
    const lines = data.map(() => {
      const line = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line",
      );
      line.setAttribute("stroke", "#000");
      line.setAttribute("stroke-width", "0.03");
      line.setAttribute("x1", "0");
      line.setAttribute("y1", "0");
      this.maskGroup.appendChild(line);
      return line;
    });

    const total = data.reduce((acc, v) => acc + v.amount, 0);
    let start = new Point(1, 0);
    
    for (let k = 0; k < data.length; k++) {
      const ratio = data[k].amount / total
      angle += ratio * 2 * Math.PI;
      let end = Point.returnPointFromAngle(angle);
      const largeFlag = ratio > 0.5 ? '1' : '0'
      paths[k].setAttribute(
        "d",
        `M 0 0 L ${start.newPoint()} A 1 1 0 ${largeFlag} 1 ${end.newPoint()} L 0 0`,
      );
      lines[k].setAttribute('x2', end.x)
      lines[k].setAttribute('y2', end.y)
      this.textPosition(texts[k], angle - ratio*Math.PI)
      start = end;
    }
  }
 
  textPosition(text, angle){
    const point = Point.returnPointFromAngle(angle)
    text.style.setProperty('top', `${(point.y * 0.5 + 0.5)*100}%`)
    text.style.setProperty('left', `${(point.x * 0.5 + 0.5)*100}%`)
  }
  connectedCallback() {
  }
}

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  newPoint() {
    return `${this.x} ${this.y}`;
  }
  static returnPointFromAngle(angle) {
    return new Point(Math.cos(angle), Math.sin(angle));
  }
}
