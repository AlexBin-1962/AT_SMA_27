import { PATHS } from "../../../shared/config.js";
import { $, fmt } from "../../../shared/utils.js";

async function cargarMetas(){
  let metas = [];
  try { metas = await fetch(PATHS.estructura + "metas.json").then(r=>r.json()); }
  catch { metas = [{Seccion:"0001", Meta:100, Avance:25},{Seccion:"0002", Meta:150, Avance:80}]; }
  const tbody = $("#tabla-metas tbody");
  tbody.innerHTML = metas.map(m=>`<tr><td>${m.Seccion}</td><td>${fmt(m.Meta)}</td><td>${fmt(m.Avance)}</td><td>${((m.Avance||0)/(m.Meta||1)*100).toFixed(1)}%</td></tr>`).join("");
}

cargarMetas();
