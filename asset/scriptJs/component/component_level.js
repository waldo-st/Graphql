const template = document.createElement("template");
template.innerHTML = /*html*/ `
<style>
    :host {
        background-color: #27283c;
        width: 300px;
        height: 400px;
        box-shadow:0 5px 25px rgba(0,0,0,0.65);
        border-radius: 5px;
        display:flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }
    .contentLevel{
      background-color:#e8e1f0;
      border-radius:50%;
      width:150px; 
      height:150px;
      box-shadow: 0 10px 8px rgba(0, 0, 0, 0.7);
      display:flex;
      flex-direction:column;
      align-items: center;
      justify-content: center;
      font-size: 50px;
      font-weight: 500;
      position:relative;
    }
    .lvl{
      font-size: 1.1rem;
    }
    .point{
      position:absolute;
      width:3px;
      height:3px;
      background:black;
      background-color:#e8e1f059;
      border-radius:50%;
      top:-20px;
      transform-origin:50% 95px;
      opacity:0;
      animation: animate 0.1s linear forwards;
    }
    @keyframes animate{
      to{
        opacity: 1;
      }
    }
    .title{
      position: absolute;
      top: 0;
      left: 2px;
      padding: 10px;
      font-size: 20px;
      font-weight: 300;
      color: var(--blues);
    }
</style>
<span class = "title">Current rank</span>
<div class="contentLevel">
  <span class="lvl">Level</span>
  <div class="level">26</div>
</div> 
`;
export default class composante_level extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.contentLevel = this.shadowRoot.querySelector('.contentLevel');
    this.point = this.shadowRoot.querySelectorAll('.point');
    this.level = this.shadowRoot.querySelector('.level');
  }
  set insertInto(data){
    this.level.textContent = data
  }
  connectedCallback() {
    for (let i = 0; i < 100; i++) {
      const point = document.createElement('div')
      point.classList.add('point')
      this.contentLevel.appendChild(point);
      point.style.transform = "rotate("+3.6*i+"deg)"
      point.style.animationDelay = `${i/100}s` 
    }
  }
}
