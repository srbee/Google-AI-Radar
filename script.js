const FALLBACK=[
 {id:"labs",date:"2026-10-03",cat:"labs",source:"Google Labs",title:"Google Labs — latest AI experiments",desc:"Google's official home for current AI experiments, including Flow Music, Flow, Stitch, Pomelli, Disco, Opal, Jules and more.",url:"https://labs.google/"},
 {id:"deepmind-research",date:"2026-10-03",cat:"deepmind",source:"Google DeepMind",title:"Google DeepMind — research and breakthroughs",desc:"Official catalogue covering frontier models, agents, robotics, world models and AI-for-science work.",url:"https://deepmind.google/research/"},
 {id:"ai-products",date:"2026-10-03",cat:"products",source:"Google AI",title:"Google AI — product catalogue",desc:"Google's central catalogue for discovering current AI products and experiences.",url:"https://ai.google/products/"},
 {id:"labs-history",date:"2026-10-03",cat:"lifecycle",source:"Google Labs",title:"Google Labs — life beyond the Lab",desc:"Google documents how experiments can become products, including renamed experiences such as Gemini, Google Flow, Gemini Notebook, Google Flow Music and Google AI Studio.",url:"https://labs.google/"},
];
let items=[],filter="all",query="",seen=new Set(JSON.parse(localStorage.getItem("googleAiRadarSeen")||"[]"));

async function load(){
 const status=document.getElementById("status");
 try{
   const r=await fetch("data.json?"+Date.now(),{cache:"no-store"});
   if(!r.ok)throw new Error("data.json unavailable");
   const data=await r.json();
   items=Array.isArray(data.items)?data.items:[]; 
   items=[...items,...FALLBACK].filter((x,i,a)=>a.findIndex(y=>y.id===x.id)===i).sort((a,b)=>String(b.date).localeCompare(String(a.date)));
   status.textContent="Official Google feeds · updated "+(data.updated||"recently");
 }catch(e){
   items=FALLBACK;
   status.textContent="Using built-in official-source directory · automatic feed not loaded";
 }
 render();
}
function isNew(x){return !seen.has(x.id)}
function render(){
 const feed=document.getElementById("feed");
 const visible=items.filter(x=>(filter==="all"||x.cat===filter)&&((x.title+" "+x.desc+" "+(x.source||"")).toLowerCase().includes(query.toLowerCase())));
 document.getElementById("count").textContent=visible.length+" item"+(visible.length===1?"":"s");
 if(!visible.length){feed.innerHTML='<div class="empty">No matching developments. Try another category or search.</div>';return}
 feed.innerHTML=visible.map(x=>`<article class="card ${isNew(x)?"is-new":""}">
  <div class="topline"><span><span class="tag">${labels[x.cat]||x.cat}</span><span class="source">${escapeHtml(x.source||"Google")}</span></span>
  <span><time class="date" datetime="${x.date}">${formatDate(x.date)}</time>${isNew(x)?'<span class="newbadge">NEW</span>':""}</span></div>
  <h2>${escapeHtml(x.title)}</h2><p>${escapeHtml(x.desc||"")}</p>
  <a href="${safeUrl(x.url)}" target="_blank" rel="noopener">Read the official Google source →</a>
 </article>`).join("");
}
const labels={all:"All",products:"Products",models:"Models",labs:"Labs",deepmind:"DeepMind",research:"Research",science:"Science",developer:"Developer",lifecycle:"History"};
function formatDate(d){const x=new Date(d);return isNaN(x)?"—":x.toLocaleDateString(undefined,{day:"numeric",month:"short",year:"numeric"})}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function safeUrl(u){try{const x=new URL(u);return x.protocol==="https:"?x.href:"#"}catch{return"#"}}
document.getElementById("search").addEventListener("input",e=>{query=e.target.value;render()});
document.getElementById("filters").addEventListener("click",e=>{if(!e.target.dataset.filter)return;filter=e.target.dataset.filter;document.querySelectorAll(".filters button").forEach(b=>b.classList.toggle("active",b===e.target));render()});
document.getElementById("refresh").addEventListener("click",load);
document.getElementById("markRead").addEventListener("click",()=>{items.forEach(x=>seen.add(x.id));localStorage.setItem("googleAiRadarSeen",JSON.stringify([...seen]));render();document.getElementById("status").textContent="All current items marked read on this device.";});
load();
