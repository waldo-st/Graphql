import composante_principal from "./component/component_principal.js";
import composante_login from "./component/component_login.js";
import composante_info from "./component/component_info.js";
import composante_level from "./component/component_level.js";
import composante_ratio from "./component/component_ratio.js";
import composante_xp from "./component/component_xp.js";
import composante_project from "./component/component_project.js";
import composante_skill from "./component/component_skill.js";
import query from "./schemaGraph.js";

customElements.define("com-info", composante_info);
customElements.define("com-level", composante_level);
customElements.define("com-ratio", composante_ratio);
customElements.define("com-xp", composante_xp);
customElements.define("com-skill", composante_skill);
customElements.define("com-project", composante_project);
customElements.define("com-login", composante_login);

const containe = document.querySelector("com-containe");
const bodyItem = document.querySelector("body");
const box = document.querySelector(".box");
const login = document.createElement("com-login");
box.appendChild(login);

let session = sessionStorage.getItem("token-store");

const Fetch = async (sessionToken) => {
  const url = "https://learn.zone01dakar.sn/api/graphql-engine/v1/graphql";
  const headers = new Headers({
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": `Bearer ${sessionToken}`,
  });
  return await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      query: query,
    }),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(response.status);
    }
  });
};

if (session) {
  Fetch(session)
  .then((data) => {
      box.remove();
      bodyItem.style.overflowY = "auto";
      customElements.define("com-containe", composante_principal);
      const info = containe.shadowRoot.querySelector("com-info");
      const level = containe.shadowRoot.querySelector("com-level");
      const xp = containe.shadowRoot.querySelector("com-xp");
      const ratio = containe.shadowRoot.querySelector("com-ratio");
      const project = containe.shadowRoot.querySelector("com-project");
      const skill = containe.shadowRoot.querySelector("com-skill");
      
      const result = data.data.user[0];
      result.attrs.campus = result.campus;

      const infoData = result.attrs;
      const levelData = result?.level[0].amount;
      const xpData = result.totalXp.aggregate.sum.amount;
      const totalUp = result.totalUp;
      const totalDown = result.totalDown;
      const auditRatio = result.auditRatio;
      const xpByProjet = result.xpByProjet;
      const skillData = result.skill;

      info.insertInto = infoData;
      level.insertInto = levelData;
      xp.insertInto = xpData;
      project.drawGraphBar(xpByProjet);
      project.hoverGraph()
      ratio.insertInto = { totalUp, totalDown, auditRatio };
      skill.drawGraphCirc(skillData)
    })
    .catch((error) => {
      location.reload();
      sessionStorage.removeItem("token-store");
    });
}
