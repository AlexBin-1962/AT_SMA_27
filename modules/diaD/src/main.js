import { PATHS } from "../../../shared/config.js";
import { $, fmt } from "../../../shared/utils.js";

async function cargarCasillas(){
  let casillas = [];
  try { casillas = await fetch(PATHS.diaD + "casillas.json").then(r=>r.json()); }
  catch { casillas = [{Seccion:"0001", Casilla:"BÁSICA", Representante:"—", Estatus:"Pendiente"}]; }
  const tbody = $("#tabla-casillas tbody");
  tbody.innerHTML = casillas.map(c=>`<tr><td>${c.Seccion}</td><td>${c.Casilla}</td><td>${c.Representante}</td><td>${c.Estatus}</td></tr>`).join("");
  document.getElementById("kpi-incidencias").textContent = fmt(0);
  document.getElementById("kpi-turnout").textContent = "—";
}

document.getElementById("btn-incidencia").addEventListener("click", ()=>{
  alert("Placeholder de captura de incidencia — aquí irá el formulario.");
});

cargarCasillas();
