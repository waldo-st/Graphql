import { formatDate, strToDom, round } from "../tools.js";
const template = document.createElement("template");
template.innerHTML = /*html*/ `
<style>
  :host {
    background-color: #27283c;
    width: 575px;
    height: 400px;
    box-shadow:0 5px 25px rgba(0,0,0,0.65);
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: end;
    position: relative;
  }
  .rect{
    fill:transparent;
    stroke:var(--blues);
    stroke-width:1;
  }
  .graph-x, .graph-y{
    text-anchor:middle;
    fill: var(--blues);
    font-size: 8px;
  }
  .graph{
    text-anchor: middle;
    fill: var(--blues);
    stroke: var(--bodyColor);
    stroke-width: 1;
    position: relative;
    z-index: 2;
    cursor: pointer;
  }
  .legend{
    position: absolute;
    width: 10px;
    font-size:2px;
    z-index:-1;
    transform: translateY(30px);
    transition: all 0.4s ease-in-out;
    display: flex;
    justify-content: center;
    text-align:center;
    flex-direction: column;
  }
  .showLegend{
    position: absolute;
    width: 200px;
    color: var(--blues);
    background: #27283c;
    box-shadow:0 5px 25px rgba(0,0,0,0.65);
    z-index: 1;
    font-size:0.9em;
    font-weight: 600;
    transform: translate(-90px, -50px);
    transition: all 0.4s ease-in-out;
    display: flex;
  }
  .title{
    position: absolute;
    top: 0;
    right: 150px;
    padding: 10px;
    font-size: 20px;
    font-weight: 300;
    color: var(--blues);
  }
   .nb{
      position: absolute;
      bottom: 0;
      left: 50;
      padding: 10px;
      font-size: 15px;
      font-weight: 300;
      color: var(--blues);
    }
</style>
<span class="nb">Survolez le graphique</span>
<span class = "title">Distribution of projects by XP</span>
`;
export default class composante_project extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.svg = strToDom(`<svg width="560" height="370"></svg>`);
    this.shadowRoot.appendChild(this.svg);
    this.rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    this.rect.setAttribute("x", "30");
    this.rect.setAttribute("y", "-1");
    this.rect.setAttribute("width", "531");
    this.rect.setAttribute("height", "332");
    this.rect.classList.add("rect");
    this.svg.appendChild(this.rect);
    this.g_x = document.createElementNS("http://www.w3.org/2000/svg", "g");
    this.g_x.classList.add("graph-x");
    this.svg.appendChild(this.g_x);
    this.g_y = document.createElementNS("http://www.w3.org/2000/svg", "g");
    this.g_y.classList.add("graph-y");
    this.svg.appendChild(this.g_y);
    this.g_grah = document.createElementNS("http://www.w3.org/2000/svg", "g");
    this.g_grah.classList.add("graph");
    this.svg.appendChild(this.g_grah);
  }
  drawGraphBar(data) {
    const widthCoordX = this.rect.getAttribute("width");
    const heightCoordY = this.rect.getAttribute("height");
    const decalCoordX = this.rect.getAttribute("x");
    const axeX = Math.floor(widthCoordX / data.length);
    const maxAmounts = Math.max(...data.map((el) => el.amount));
    let point = {};
    let copiePoint;
    let TabPoint = [];
    let x = Number(decalCoordX);

    for (let i = 0; i < data.length; i++) {
      point.x = x;
      copiePoint = { ...point };
      TabPoint.push(copiePoint);
      x += axeX;
      const amount = data[i].amount;
      const text = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text",
      );
      text.setAttribute("x", `25`);
      text.setAttribute(
        "y",
        `${Number(heightCoordY) - Math.floor((amount * 315) / maxAmounts)}`,
      );
      text.setAttribute("text-anchor", "end");
      text.textContent = `${round(amount)} kb`;

      TabPoint[i].y = Number(heightCoordY) -
        Math.floor((amount * 315) / maxAmounts);
      this.g_y.appendChild(text);
    }

    for (let i = 0; i < TabPoint.length; i++) {
      let infoGraph = document.createElement('div')
      infoGraph.classList.add('legend')
      infoGraph.style.setProperty('top', `${TabPoint[i].y}px`)
      infoGraph.style.setProperty('left', `${TabPoint[i].x + 9}px`)
      infoGraph.innerHTML = `<span>Project: ${data[i].object.name}</span><span>Xp: ${Math.round(data[i].amount/1000)} kB</span><span>Date: ${formatDate(data[i].createdAt)}</span>`
      let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      rect.classList.add('rectGraph')
      rect.setAttribute("x", `${TabPoint[i].x}`);
      rect.setAttribute("y", `${TabPoint[i].y}`);
      rect.setAttribute("height", `${Number(heightCoordY) - TabPoint[i].y -1}`);
      rect.setAttribute("width", `${12}`);
      this.g_grah.appendChild(rect);
      this.shadowRoot.appendChild(infoGraph)
    }
  }
  hoverGraph(){
    const divInfo = this.shadowRoot.querySelectorAll('.legend')
    const rectGraph = this.shadowRoot.querySelectorAll('.rectGraph')
    rectGraph.forEach((item, i)=>{
      item.addEventListener('mouseover',()=>{
        divInfo[i].classList.add('showLegend')
      })
      item.addEventListener('mouseout',()=>{
        divInfo[i].classList.remove('showLegend')
      })
    })
  }
}
