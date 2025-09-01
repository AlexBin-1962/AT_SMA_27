import { PATHS, APP } from "../../../shared/config.js";
import { $, fmt, safe } from "../../../shared/utils.js";

const map = L.map("map");
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19}).addTo(map);
map.setView([21.02, -101.25], 8);

let layerSecciones, layerPuntos;
let brigadas = [];

async function cargarSecciones(){
  try {
    const geo = await fetch(PATHS.geoSecciones).then(r=>r.json());
    layerSecciones = L.geoJSON(geo, {style:{color:"#7b2b36",weight:1,fillOpacity:.08}}).addTo(map);
    const b = layerSecciones.getBounds(); if(b.isValid()) map.fitBounds(b.pad(0.05));
  } catch (e) {
    console.warn("No se pudo cargar geo de secciones (coloca AT_Guanajuato.geojson en data/geo/)", e);
  }
}

async function cargarCampo(){
  // Placeholder: estructura esperada data/campo/brigadas.json
  // [{id, nombre},{...}]
  try {
    brigadas = await fetch(PATHS.campo + "brigadas.json").then(r=>r.json());
  } catch { brigadas = []; }
  const sel = $("#f-brigada");
  sel.innerHTML = '<option value="">Todas</option>' + brigadas.map(b=>`<option value="${b.id}">${b.nombre}</option>`).join('');
}

function aplicarFiltros(){
  // Aquí aplicarás filtros a layerPuntos (cuando existan datos reales de campo)
  console.log("Aplicando filtros", { brigada: $("#f-brigada").value, fecha: $("#f-fecha").value });
}

function exportarCSV(){
  const rows = [
    ["Seccion","Brigada","Visitas"], // ejemplo
    ["0001","B-01","25"]
  ];
  const csv = rows.map(r=>r.join(",")).join("\n");
  const blob = new Blob([csv], {type:"text/csv"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob); a.download = "campo_export.csv"; a.click();
  setTimeout(()=>URL.revokeObjectURL(a.href), 500);
}

document.getElementById("btn-aplicar").addEventListener("click", aplicarFiltros);
document.getElementById("btn-export").addEventListener("click", exportarCSV);

cargarSecciones();
cargarCampo();
