const { useState } = React;

const G = “#4a6741”, GD = “#2d3f28”, GL = “#e8f0e0”;
const AM = “#d97706”, RD = “#dc2626”, GR = “#6b7280”;

const USERS = {
admin:   { nombre: “Administración”, pass: “sar2026”,    rol: “admin”,    emoji: “👩‍💼”, color: G,       acceso: [“ventas”,“finanzas”,“produccion”,“recetas”] },
sergio:  { nombre: “Sergio”,         pass: “sergio2026”, rol: “director”, emoji: “👔”,  color: GD,      acceso: [“ventas”,“finanzas”] },
nina:    { nombre: “Nina”,           pass: “nina2026”,   rol: “cocina”,   emoji: “👩‍🍳”, color: “#7c3aed”, acceso: [“produccion”,“recetas”] },
rodrigo: { nombre: “Rodrigo”,        pass: “rod2026”,    rol: “ventas”,   emoji: “🤝”,  color: AM,      acceso: [“ventas”] },
helen:   { nombre: “Helen”,          pass: “helen2026”,  rol: “fábrica”,  emoji: “👷‍♀️”, color: “#0891b2”, acceso: [“produccion”] },
claudis: { nombre: “Claudis”,        pass: “claudis2026”,rol: “fábrica”,  emoji: “👷‍♀️”, color: “#0891b2”, acceso: [“produccion”] },
};

// ── DATOS DE EJEMPLO ────────────────────────────
const ventasMes = [
{ cliente: “Grupo Disco”,    feb: 884, mar: 1023, abr: 570,  color: G },
{ cliente: “Tienda Inglesa”, feb: 225, mar: 245,  abr: 210,  color: AM },
{ cliente: “BQB”,            feb: 80,  mar: 40,   abr: 140,  color: “#0891b2” },
{ cliente: “Pedidos Ya”,     feb: 100, mar: 70,   abr: 0,    color: “#7c3aed” },
{ cliente: “Provaca”,        feb: 0,   mar: 60,   abr: 10,   color: GR },
];

const sabores = [
{ s: “Choco”,    feb: 408, mar: 241, color: “#3a1f10” },
{ s: “Pistacho”, feb: 429, mar: 260, color: G },
{ s: “Avellana”, feb: 365, mar: 269, color: “#6a4030” },
{ s: “Caramelo”, feb: 315, mar: 190, color: AM },
];

const gastos = [
{ concepto: “Sueldos Nina + Rodrigo + Admin”, monto: 7500,  cat: “fijo” },
{ concepto: “Helen y Claudis”,                monto: 1667,  cat: “fijo” },
{ concepto: “Liz (consultora)”,               monto: 1900,  cat: “temporal” },
{ concepto: “Alquiler fábrica”,               monto: 1000,  cat: “fijo” },
{ concepto: “Logística”,                      monto: 1000,  cat: “variable” },
{ concepto: “Servicios / extras fábrica”,     monto: 500,   cat: “variable” },
];

const produccionHoy = [
{ sabor: “Chocolate Amargo 180g”,    objetivo: 80, producido: 72 },
{ sabor: “Maní y Caramelo 180g”,     objetivo: 60, producido: 60 },
{ sabor: “Limón y Pistacho 180g”,    objetivo: 40, producido: 35 },
{ sabor: “Choco con Avellanas 900g”, objetivo: 20, producido: 18 },
];

const recetas = [
{
nombre: “Base frutos secos estándar”,
ingredientes: [“Almendras 200g”, “Castañas 150g”, “Maní 100g”, “Aceite de coco 50ml”],
pasos: [“Procesar frutos secos en cutter 3 min”, “Agregar aceite de coco”, “Presionar en molde”, “Abatir 15 min”],
},
{
nombre: “Relleno Chocolate Amargo”,
ingredientes: [“Cacao puro 80g”, “Proteína cáñamo 60g”, “Eritritol 40g”, “Extracto vainilla 5ml”],
pasos: [“Mezclar secos”, “Incorporar líquidos”, “Dosificar sobre base”, “Abatir 20 min”],
},
];

// ── HELPERS ─────────────────────────────────────
const Bar = ({ pct, color, h = 8 }) => (
React.createElement(“div”, { style: { background: “#e5e7eb”, borderRadius: 4, height: h, overflow: “hidden” } },
React.createElement(“div”, { style: { background: color, width: `${Math.min(pct,100)}%`, height: h, borderRadius: 4 } })
)
);

const KPI = ({ label, value, sub, color = G }) =>
React.createElement(“div”, { style: { background: “#fff”, borderRadius: 8, padding: “12px 14px”, borderTop: `3px solid ${color}`, flex: 1, minWidth: 110 } },
React.createElement(“div”, { style: { fontSize: 9, color: GR, textTransform: “uppercase”, letterSpacing: 1, marginBottom: 3 } }, label),
React.createElement(“div”, { style: { fontSize: 20, fontWeight: 900, color } }, value),
sub && React.createElement(“div”, { style: { fontSize: 10, color: GR, marginTop: 2 } }, sub)
);

// ── SECCIONES ────────────────────────────────────
function SecVentas() {
const totalAbr = ventasMes.reduce((s,r)=>s+r.abr,0);
const totalMar = ventasMes.reduce((s,r)=>s+r.mar,0);
return React.createElement(“div”, null,
React.createElement(“div”, { style: { display: “flex”, gap: 8, marginBottom: 16, flexWrap: “wrap” } },
React.createElement(KPI, { label: “Unidades abril”, value: totalAbr, sub: “equiv. 180g”, color: G }),
React.createElement(KPI, { label: “vs marzo”, value: `${totalMar>totalAbr?"▼":"▲"} ${Math.abs(Math.round((totalAbr-totalMar)/totalMar*100))}%`, sub: “tendencia”, color: totalMar>totalAbr?RD:G }),
React.createElement(KPI, { label: “Facturación est.”, value: `$${(totalAbr*270/42).toFixed(0)} USD`, sub: “prom. $270 UYU”, color: AM }),
),
React.createElement(“div”, { style: { background: “#fff”, borderRadius: 8, overflow: “hidden”, marginBottom: 12 } },
React.createElement(“div”, { style: { background: GD, color: “#fff”, padding: “8px 12px”, fontWeight: 700, fontSize: 12 } }, “Consumo por cliente — unidades 180g equiv.”),
React.createElement(“table”, { style: { width: “100%”, borderCollapse: “collapse”, fontSize: 11 } },
React.createElement(“thead”, null,
React.createElement(“tr”, { style: { background: “#f9fafb” } },
[“Cliente”,“Feb”,“Mar”,“Abr”,“Tendencia”].map(h =>
React.createElement(“th”, { key: h, style: { padding: “7px 10px”, textAlign: h===“Cliente”||h===“Tendencia”?“left”:“right”, color: GD, fontWeight: 700 } }, h)
)
)
),
React.createElement(“tbody”, null,
ventasMes.map((r,i) =>
React.createElement(“tr”, { key: r.cliente, style: { background: i%2===0?”#fff”:”#f9fafb” } },
React.createElement(“td”, { style: { padding: “7px 10px”, fontWeight: 600, color: r.color } }, r.cliente),
React.createElement(“td”, { style: { padding: “7px 10px”, textAlign: “right”, color: GR } }, r.feb||”—”),
React.createElement(“td”, { style: { padding: “7px 10px”, textAlign: “right”, color: GR } }, r.mar||”—”),
React.createElement(“td”, { style: { padding: “7px 10px”, textAlign: “right”, fontWeight: 700, color: r.abr===0?RD:G } }, r.abr||“⚠️ 0”),
React.createElement(“td”, { style: { padding: “7px 10px”, width: 120 } },
React.createElement(Bar, { pct: (r.abr/Math.max(…ventasMes.map(x=>x.abr)))*100, color: r.color })
)
)
)
)
)
),
React.createElement(“div”, { style: { background: “#fff”, borderRadius: 8, padding: 14 } },
React.createElement(“div”, { style: { fontWeight: 700, fontSize: 12, color: GD, marginBottom: 10 } }, “Ventas por sabor — 180g”),
sabores.map(s =>
React.createElement(“div”, { key: s.s, style: { marginBottom: 10 } },
React.createElement(“div”, { style: { display: “flex”, justifyContent: “space-between”, fontSize: 11, marginBottom: 3 } },
React.createElement(“span”, { style: { fontWeight: 600, color: s.color } }, s.s),
React.createElement(“span”, { style: { color: GR } }, `Mar: ${s.mar} · Feb: ${s.feb}`)
),
React.createElement(Bar, { pct: (s.mar/Math.max(…sabores.map(x=>x.mar)))*100, color: s.color, h: 10 })
)
)
)
);
}

function SecFinanzas() {
const totalGastos = gastos.reduce((s,g)=>s+g.monto,0);
const ingresos = 4285;
const deficit = ingresos - totalGastos;
return React.createElement(“div”, null,
React.createElement(“div”, { style: { display: “flex”, gap: 8, marginBottom: 16, flexWrap: “wrap” } },
React.createElement(KPI, { label: “Ingresos abril”, value: `$${ingresos.toLocaleString()}`, sub: “USD estimado”, color: G }),
React.createElement(KPI, { label: “Gastos fijos”, value: `$${totalGastos.toLocaleString()}`, sub: “USD/mes”, color: AM }),
React.createElement(KPI, { label: “Resultado”, value: deficit>=0?`+$${deficit}`:`-$${Math.abs(deficit)}`, sub: “neto del mes”, color: deficit>=0?G:RD }),
React.createElement(KPI, { label: “Equilibrio”, value: “145 uds/día”, sub: “objetivo mínimo”, color: “#7c3aed” }),
),
React.createElement(“div”, { style: { background: “#fff”, borderRadius: 8, overflow: “hidden”, marginBottom: 12 } },
React.createElement(“div”, { style: { background: GD, color: “#fff”, padding: “8px 12px”, fontWeight: 700, fontSize: 12 } }, “Estructura de gastos mensuales”),
React.createElement(“table”, { style: { width: “100%”, borderCollapse: “collapse”, fontSize: 11 } },
React.createElement(“thead”, null,
React.createElement(“tr”, { style: { background: “#f9fafb” } },
[“Concepto”,“USD/mes”,“Tipo”,”%”].map(h =>
React.createElement(“th”, { key: h, style: { padding: “7px 10px”, textAlign: h===“Concepto”?“left”:“right”, color: GD, fontWeight: 700 } }, h)
)
)
),
React.createElement(“tbody”, null,
gastos.map((g,i) =>
React.createElement(“tr”, { key: g.concepto, style: { background: i%2===0?”#fff”:”#f9fafb” } },
React.createElement(“td”, { style: { padding: “7px 10px”, fontWeight: 600, color: GD } }, g.concepto),
React.createElement(“td”, { style: { padding: “7px 10px”, textAlign: “right” } }, `$${g.monto.toLocaleString()}`),
React.createElement(“td”, { style: { padding: “7px 10px”, textAlign: “right” } },
React.createElement(“span”, { style: { fontSize: 9, padding: “2px 7px”, borderRadius: 10, fontWeight: 700,
background: g.cat===“fijo”?”#dcfce7”:g.cat===“variable”?”#fef9c3”:”#ede9fe”,
color: g.cat===“fijo”?G:g.cat===“variable”?AM:”#7c3aed” } }, g.cat)
),
React.createElement(“td”, { style: { padding: “7px 10px”, width: 100 } },
React.createElement(Bar, { pct: (g.monto/totalGastos)*100, color: g.cat===“fijo”?G:g.cat===“variable”?AM:”#7c3aed” })
)
)
)
),
React.createElement(“tfoot”, null,
React.createElement(“tr”, { style: { background: GD, color: “#fff” } },
React.createElement(“td”, { style: { padding: “7px 10px”, fontWeight: 700 } }, “TOTAL”),
React.createElement(“td”, { style: { padding: “7px 10px”, textAlign: “right”, fontWeight: 700 } }, `$${totalGastos.toLocaleString()}`),
React.createElement(“td”), React.createElement(“td”)
)
)
)
)
);
}

function SecProduccion({ user }) {
const [prod, setProd] = useState(produccionHoy.map(p=>({…p})));
const [texto, setTexto] = useState(””);
const [novedades, setNovedades] = useState([
{ autor: “Helen”, texto: “Faltó eritritol para lote de caramelo”, hora: “08:42”, color: “#0891b2” },
{ autor: “Claudis”, texto: “Abatidor tarda más de lo normal hoy”, hora: “10:15”, color: “#0891b2” },
]);
const total = prod.reduce((s,p)=>s+p.producido,0);
const objetivo = prod.reduce((s,p)=>s+p.objetivo,0);

const enviar = () => {
if (!texto.trim()) return;
setNovedades(n=>[…n,{ autor: user.nombre, texto, hora: new Date().toLocaleTimeString(“es-UY”,{hour:“2-digit”,minute:“2-digit”}), color: user.color }]);
setTexto(””);
};

return React.createElement(“div”, null,
React.createElement(“div”, { style: { display: “flex”, gap: 8, marginBottom: 16, flexWrap: “wrap” } },
React.createElement(KPI, { label: “Objetivo hoy”, value: objetivo, sub: “tortas equiv.”, color: G }),
React.createElement(KPI, { label: “Producido”, value: total, sub: “hasta ahora”, color: AM }),
React.createElement(KPI, { label: “Avance”, value: `${Math.round(total/objetivo*100)}%`, sub: “del objetivo”, color: “#0891b2” }),
),
React.createElement(“div”, { style: { background: “#fff”, borderRadius: 8, overflow: “hidden”, marginBottom: 12 } },
React.createElement(“div”, { style: { background: GD, color: “#fff”, padding: “8px 12px”, fontWeight: 700, fontSize: 12 } }, `📋 Producción del día — ${new Date().toLocaleDateString("es-UY")}`),
prod.map((p,i) =>
React.createElement(“div”, { key: p.sabor, style: { padding: “12px 14px”, borderBottom: “1px solid #f3f4f6”, background: i%2===0?”#fff”:”#f9fafb” } },
React.createElement(“div”, { style: { display: “flex”, justifyContent: “space-between”, marginBottom: 6 } },
React.createElement(“span”, { style: { fontWeight: 600, fontSize: 12, color: GD } }, p.sabor),
React.createElement(“span”, { style: { fontSize: 11, color: GR } }, `Objetivo: ${p.objetivo}`)
),
React.createElement(“div”, { style: { display: “flex”, alignItems: “center”, gap: 10 } },
React.createElement(“div”, { style: { flex: 1 } }, React.createElement(Bar, { pct: (p.producido/p.objetivo)*100, color: p.producido>=p.objetivo?G:AM, h: 12 })),
React.createElement(“button”, { onClick: ()=>setProd(pr=>pr.map((x,j)=>j===i?{…x,producido:Math.max(0,x.producido-1)}:x)), style: { width:28,height:28,borderRadius:4,border:“1px solid #e5e7eb”,background:”#fff”,cursor:“pointer”,fontWeight:700,fontSize:16 } }, “-”),
React.createElement(“span”, { style: { fontWeight:900,fontSize:14,color:p.producido>=p.objetivo?G:AM,minWidth:32,textAlign:“center” } }, p.producido),
React.createElement(“button”, { onClick: ()=>setProd(pr=>pr.map((x,j)=>j===i?{…x,producido:x.producido+1}:x)), style: { width:28,height:28,borderRadius:4,border:`1px solid ${G}`,background:GL,cursor:“pointer”,fontWeight:700,color:G,fontSize:16 } }, “+”)
)
)
),
React.createElement(“div”, { style: { padding:“10px 14px”,background:GD,display:“flex”,justifyContent:“space-between” } },
React.createElement(“span”, { style:{color:”#fff”,fontWeight:700,fontSize:12} }, “Total producido”),
React.createElement(“span”, { style:{color:”#fff”,fontWeight:900,fontSize:14} }, `${total} uds`)
)
),
React.createElement(“div”, { style:{background:”#fff”,borderRadius:8,overflow:“hidden”} },
React.createElement(“div”, { style:{background:GD,color:”#fff”,padding:“8px 12px”,fontWeight:700,fontSize:12} }, “💬 Novedades del día”),
React.createElement(“div”, { style:{padding:12,maxHeight:180,overflowY:“auto”} },
novedades.map((n,i) =>
React.createElement(“div”, { key:i, style:{marginBottom:8,padding:“8px 10px”,background:”#f9fafb”,borderRadius:6,borderLeft:`3px solid ${n.color}`} },
React.createElement(“div”, { style:{display:“flex”,justifyContent:“space-between”,marginBottom:2} },
React.createElement(“span”, { style:{fontWeight:700,fontSize:11,color:n.color} }, n.autor),
React.createElement(“span”, { style:{fontSize:10,color:GR} }, n.hora)
),
React.createElement(“div”, { style:{fontSize:11,color:”#374151”} }, n.texto)
)
)
),
React.createElement(“div”, { style:{padding:10,borderTop:“1px solid #e5e7eb”,display:“flex”,gap:8} },
React.createElement(“input”, { value:texto, onChange:e=>setTexto(e.target.value), onKeyDown:e=>e.key===“Enter”&&enviar(), placeholder:“Reportar novedad o incidencia…”, style:{flex:1,padding:“8px 10px”,border:“1px solid #e5e7eb”,borderRadius:6,fontSize:11,outline:“none”} }),
React.createElement(“button”, { onClick:enviar, style:{background:G,color:”#fff”,border:“none”,borderRadius:6,padding:“8px 14px”,fontWeight:700,cursor:“pointer”,fontSize:11} }, “Enviar”)
)
)
);
}

function SecRecetas() {
const [abierta, setAbierta] = useState(null);
return React.createElement(“div”, null,
React.createElement(“div”, { style:{background:”#fff”,borderRadius:8,padding:14} },
React.createElement(“div”, { style:{fontWeight:700,fontSize:12,color:GD,marginBottom:10} }, “📖 Manual de recetas — Confidencial”),
recetas.map((r,i) =>
React.createElement(“div”, { key:r.nombre },
React.createElement(“div”, { onClick:()=>setAbierta(abierta===i?null:i), style:{display:“flex”,justifyContent:“space-between”,alignItems:“center”,padding:“10px 12px”,background:abierta===i?GL:”#f9fafb”,borderRadius:6,cursor:“pointer”,marginBottom:4,border:`1px solid ${abierta===i?G:"#e5e7eb"}`} },
React.createElement(“span”, { style:{fontWeight:600,fontSize:12,color:abierta===i?G:GD} }, r.nombre),
React.createElement(“span”, { style:{color:G} }, abierta===i?“▲”:“▼”)
),
abierta===i && React.createElement(“div”, { style:{padding:“12px 14px”,background:”#fff”,border:“1px solid #e5e7eb”,borderRadius:“0 0 6px 6px”,marginBottom:8} },
React.createElement(“div”, { style:{display:“grid”,gridTemplateColumns:“1fr 1fr”,gap:14} },
React.createElement(“div”, null,
React.createElement(“div”, { style:{fontSize:10,fontWeight:700,color:G,textTransform:“uppercase”,letterSpacing:1,marginBottom:8} }, “Ingredientes”),
r.ingredientes.map(ing=>React.createElement(“div”, { key:ing, style:{fontSize:11,color:”#374151”,padding:“3px 0”,borderBottom:“1px solid #f3f4f6”} }, `→ ${ing}`))
),
React.createElement(“div”, null,
React.createElement(“div”, { style:{fontSize:10,fontWeight:700,color:AM,textTransform:“uppercase”,letterSpacing:1,marginBottom:8} }, “Proceso”),
r.pasos.map((p,j)=>React.createElement(“div”, { key:p, style:{fontSize:11,color:”#374151”,padding:“3px 0”,borderBottom:“1px solid #f3f4f6”} }, `${j+1}. ${p}`))
)
)
)
)
)
)
);
}

// ── APP ──────────────────────────────────────────
const secciones = [
{ id:“ventas”,    label:“📊 Ventas”,    desc:“Tablero comercial”,  color:G },
{ id:“finanzas”,  label:“💰 Finanzas”,  desc:“Solo directivos”,    color:AM },
{ id:“produccion”,label:“🏭 Producción”,desc:“Producción del día”, color:”#0891b2” },
{ id:“recetas”,   label:“📖 Recetas”,   desc:“Manual interno”,     color:”#7c3aed” },
];

function App() {
const [user, setUser] = useState(null);
const [seccion, setSeccion] = useState(null);
const [loginKey, setLoginKey] = useState(“admin”);
const [loginPass, setLoginPass] = useState(””);
const [error, setError] = useState(””);

const login = () => {
const u = USERS[loginKey];
if (u && loginPass === u.pass) { setUser({…u, key: loginKey}); setError(””); setLoginPass(””); }
else setError(“Contraseña incorrecta”);
};

if (!user) return React.createElement(“div”, { style:{minHeight:“100vh”,background:GD,display:“flex”,alignItems:“center”,justifyContent:“center”,padding:20} },
React.createElement(“div”, { style:{background:”#fff”,borderRadius:12,padding:32,maxWidth:360,width:“100%”,boxShadow:“0 8px 32px rgba(0,0,0,0.3)”} },
React.createElement(“div”, { style:{textAlign:“center”,marginBottom:24} },
React.createElement(“div”, { style:{fontSize:36,marginBottom:8} }, “🌿”),
React.createElement(“div”, { style:{fontSize:22,fontWeight:900,color:GD} }, “Sana a Rou”),
React.createElement(“div”, { style:{fontSize:11,color:GR,marginTop:4,letterSpacing:1} }, “PORTAL INTERNO”)
),
React.createElement(“div”, { style:{marginBottom:12} },
React.createElement(“label”, { style:{fontSize:11,color:GR,fontWeight:600,display:“block”,marginBottom:4} }, “Usuario”),
React.createElement(“select”, { value:loginKey, onChange:e=>setLoginKey(e.target.value), style:{width:“100%”,padding:“10px 12px”,border:“1px solid #e5e7eb”,borderRadius:8,fontSize:13,outline:“none”} },
Object.entries(USERS).map(([k,u])=>React.createElement(“option”, { key:k, value:k }, `${u.emoji} ${u.nombre}`))
)
),
React.createElement(“div”, { style:{marginBottom:16} },
React.createElement(“label”, { style:{fontSize:11,color:GR,fontWeight:600,display:“block”,marginBottom:4} }, “Contraseña”),
React.createElement(“input”, { type:“password”, value:loginPass, onChange:e=>setLoginPass(e.target.value), onKeyDown:e=>e.key===“Enter”&&login(), placeholder:”••••••••”, style:{width:“100%”,padding:“10px 12px”,border:`1px solid ${error?"#fca5a5":"#e5e7eb"}`,borderRadius:8,fontSize:13,outline:“none”} })
),
error && React.createElement(“div”, { style:{color:RD,fontSize:11,marginBottom:12,fontWeight:600} }, `⚠️ ${error}`),
React.createElement(“button”, { onClick:login, style:{width:“100%”,background:G,color:”#fff”,border:“none”,borderRadius:8,padding:“12px”,fontWeight:700,cursor:“pointer”,fontSize:14} }, “Entrar”),
React.createElement(“div”, { style:{fontSize:10,color:GR,marginTop:14,textAlign:“center”,lineHeight:1.5} }, “Cada usuario tiene su propia contraseña.\nContactá a administración si no la recordás.”)
)
);

const seccionesVisibles = secciones.filter(s=>user.acceso.includes(s.id));

if (!seccion) return React.createElement(“div”, { style:{minHeight:“100vh”,background:”#f3f4f6”} },
React.createElement(“div”, { style:{background:GD,padding:“14px 20px”,display:“flex”,justifyContent:“space-between”,alignItems:“center”} },
React.createElement(“div”, null,
React.createElement(“div”, { style:{fontSize:16,fontWeight:900,color:”#fff”} }, “🌿 Sana a Rou”),
React.createElement(“div”, { style:{fontSize:10,color:”#a5b4a0”,letterSpacing:1} }, “PORTAL INTERNO”)
),
React.createElement(“div”, { style:{display:“flex”,alignItems:“center”,gap:10} },
React.createElement(“span”, { style:{fontSize:18} }, user.emoji),
React.createElement(“div”, null,
React.createElement(“div”, { style:{fontWeight:700,fontSize:12,color:”#fff”} }, user.nombre),
React.createElement(“div”, { style:{fontSize:10,color:”#a5b4a0”} }, user.rol)
),
React.createElement(“button”, { onClick:()=>{setUser(null);setSeccion(null);}, style:{background:“rgba(255,255,255,0.1)”,border:“none”,color:”#fff”,borderRadius:6,padding:“5px 12px”,cursor:“pointer”,fontSize:11,marginLeft:8} }, “Salir”)
)
),
React.createElement(“div”, { style:{padding:20} },
React.createElement(“div”, { style:{fontSize:14,color:GD,fontWeight:700,marginBottom:16} }, `Bienvenida/o, ${user.nombre} 👋`),
React.createElement(“div”, { style:{display:“grid”,gridTemplateColumns:“1fr 1fr”,gap:12} },
seccionesVisibles.map(s=>
React.createElement(“button”, { key:s.id, onClick:()=>setSeccion(s.id), style:{background:”#fff”,borderRadius:10,padding:“20px 16px”,border:`2px solid ${s.color}22`,borderTop:`4px solid ${s.color}`,cursor:“pointer”,textAlign:“left”,boxShadow:“0 2px 8px rgba(0,0,0,0.06)”} },
React.createElement(“div”, { style:{fontSize:22,marginBottom:6} }, s.label.split(” “)[0]),
React.createElement(“div”, { style:{fontWeight:700,fontSize:13,color:s.color} }, s.label.slice(3)),
React.createElement(“div”, { style:{fontSize:11,color:GR,marginTop:3} }, s.desc)
)
)
),
user.acceso.length < 4 && React.createElement(“div”, { style:{marginTop:14,padding:“10px 14px”,background:”#fef9c3”,borderRadius:8,fontSize:11,color:AM,fontWeight:600} },
`🔒 Tenés acceso a ${user.acceso.length} de ${secciones.length} secciones`
)
)
);

return React.createElement(“div”, { style:{minHeight:“100vh”,background:”#f3f4f6”} },
React.createElement(“div”, { style:{background:GD,padding:“12px 16px”,display:“flex”,alignItems:“center”,gap:12} },
React.createElement(“button”, { onClick:()=>setSeccion(null), style:{background:“rgba(255,255,255,0.1)”,border:“none”,color:”#fff”,borderRadius:6,padding:“6px 12px”,cursor:“pointer”,fontSize:12,fontWeight:600} }, “← Volver”),
React.createElement(“div”, { style:{fontSize:14,fontWeight:900,color:”#fff”} }, secciones.find(s=>s.id===seccion)?.label)
),
React.createElement(“div”, { style:{padding:16} },
seccion===“ventas”     && React.createElement(SecVentas, null),
seccion===“finanzas”   && React.createElement(SecFinanzas, null),
seccion===“produccion” && React.createElement(SecProduccion, { user }),
seccion===“recetas”    && React.createElement(SecRecetas, null)
)
);
}

ReactDOM.createRoot(document.getElementById(“root”)).render(React.createElement(App));
