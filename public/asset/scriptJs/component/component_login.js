const template = document.createElement("template");
template.innerHTML = /*html*/ `
<style>
    :host {
        background-color: #27283c;
        position:relative;
        width: 450px;
        height: 300px;
        box-shadow:0 5px 25px rgba(0,0,0,0.25);
        transition: 0.5s;
    }
    span{
        position: absolute;
        inset: -2px;
        overflow: hidden;
        z-index: -2;
    }
    span::before{
        content: '';
        position: absolute;
        inset: -2px;
        z-index: -2;
        background: repeating-conic-gradient(from 0deg, #45f3ff 0%,#45f3ff 10%,transparent 10%, transparent 80%, #45f3ff 100%);
        animation: animate 2s linear infinite;
    }
    @keyframes animate{
        0%
        {
            transform: rotate(0deg);
        }
        100%
        {
            transform: rotate(360deg);
        }
    }
    form{
        padding:0 50px;
    }
    h2{
        text-align:center;
        color:var(--blueLight);
        font-size:2em;
        margin: 0;
        padding: 0;
    }
    .input-box{
        width:100%;
        position:relative;
        margin:25px 0;
    }
    .input-box input{
        width:87%;
        height:50px;
        background:transparent;
        border:2px solid #2c4766;
        outline:none;
        border-radius:40px;
        color:var(--wites);
        padding:0 20px;
        transition:.5s ease;
    }
    .input-box input:focus,
    .input-box input:valid{
        border-color:var(--blueLight);
        color:var(--wites);
    }
    .input-box label{
        position:absolute;
        top:50%;
        left:20px;
        transform:translateY(-50%);
        font-size:1em;
        color:#fff;
        pointer-events:none;
        transition:.5s ease;
    }
    .input-box input:focus~label,
    .input-box input:valid~label{
        top:1px;
        font-size:.8em;
        background-color:#27283c;
        padding:0 6px;
        color:var(--blueLight);
    }
    .btn{
        width:100%;
        height:45px;
        background-color:var(--blueLight);
        border-radius:40px;
        outline:none;
        border:none;
        font-size:1em;
        font-weight: 600;
        color: solid #2c4766;
        cursor: pointer;
    }
</style>
<span></span>
<h2>Login</h2>
<form action="#" id='login'>
    <div class="input-box">
        <input type="text" name="nickname_email" required>
        <label>Email-Username</label>
    </div>
    <div class="input-box">
        <input type="password" name="password" required>
        <label>Password</label>
    </div>
    <input type="submit" class="btn" value="Log In">
</form>`;
export default class composante_login extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.form = this.shadowRoot.querySelector("form");
    this.btn = this.shadowRoot.querySelector(".btn");
  }
  getDataPost(idForm) {
    const formDataSingIn = new FormData(idForm);
    const ObjForm = ["nickname_email", "password"].reduce((obj, curr) => {
      obj[curr] = formDataSingIn.get(curr);
      return obj;
    }, {});
    return ObjForm;
  }

  Btoa(data) {
    const encoder = new TextEncoder();
    const uint8Format = encoder.encode(data);
    let encoding = "";
    uint8Format.forEach((byte) => {
      encoding += String.fromCharCode(byte);
    });
    return btoa(encoding);
  }
  async Signin() {
    const valueForm = this.getDataPost(this.form);
    const credential = this.Btoa(
      `${valueForm.nickname_email}:${valueForm.password}`,
    );
    const headers = new Headers({
      "Content-Type": "application/json",
      "Authorization": `Basic ${credential}`,
    });
    const url = "https://learn.zone01dakar.sn/api/auth/signin";
    return await fetch(url, {
      method: "POST",
      headers: headers,
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    });
  }
  connectedCallback() {
    this.btn.addEventListener("click", (e) => {
      e.preventDefault();
      const itemError = document.querySelector(".error");
      const button = document.querySelector(".button");
      const data = this.Signin();
      data.then((jwt) => {
        sessionStorage.setItem("token-store", jwt);
        location.reload();
      }).catch(() => {
        itemError.style.display = "flex";
        button.addEventListener("click", (event) => {
          event.stopPropagation();
          itemError.style.display = "none";
        });
      });
    });
  }
}
