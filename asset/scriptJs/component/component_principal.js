const template = document.createElement("template");
template.innerHTML = /*html*/ `
<style>
    :host {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 15px;
        height: 950px;
    }
    .up{
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 15px;
    }
    .info{
        background-color: #27283c;
        width: 300px;
        height: 400px;
        box-shadow:0 5px 25px rgba(0,0,0,0.65);
        border-radius: 10px;
    }
    .interne{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 15px;
        flex-direction: column;
    }
    
    .middle{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 15px;
    }
    .logout{
        position: absolute;
        right: 50px;
        top: 35px;
        cursor:pointer;
        display:flex;
        justify-content: center;
        align-items: center;
        background-color:#1e1d2d;
    }
    .logout svg{
        width: 25px;
        fill:var(--blues);
    }
    .logout::before{
      content :"Log-Out";
      z-index:-1;
      position:absolute;
      top:0;
      left:0;
      display:block;
      width: 25px;
      height:25px;
      font-size:5px;
      transition: all 0.4s ease-in-out;
    }
    .logout:hover::before{
      width: 100px;
      font-size: 20px;
      font-weight: 600;
      color: var(--blues);
      transform: translateX(-80px);
      transition: all 0.3s ease-in-out;
    }
    @media screen and (max-width:1000px) {
      .up{
        flex-wrap: wrap;
      }
      .middle{
        flex-wrap: wrap;
      }
      :host {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 15px;
        height: 100%;
      }
      com-project{
        transform: rotate(90deg);
        margin-top: 95px;
      }
      .logout{
        right: 20px;
        top: 10px;
      }
    }
</style>
<div class="logout"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/></svg></div>
<div class="up">
<com-info ></com-info>
<div class="interne">
   <com-xp ></com-xp>
   <com-ratio ></com-ratio>
</div>
<com-level ></com-level>
</div>
<div class="middle">
    <com-skill></com-skill>
    <com-project></com-project>
</div>
`;
export default class composante_principal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.logout = this.shadowRoot.querySelector('.logout')
  }
  connectedCallback(){
    this.logout.addEventListener('click',(e)=>{
        sessionStorage.removeItem("token-store");
        location.reload();
    })
  }
}
