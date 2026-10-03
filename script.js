const items = [
  {date:"2026-10-02",cat:"research",title:"Google AI developments — September 2026 roundup",desc:"Google's official monthly roundup of recent AI announcements, models, products and research.",url:"https://blog.google/innovation-and-ai/technology/ai/google-ai-updates-september-2026/"},
  {date:"2026-10-02",cat:"models",title:"Google AI — current model and product catalogue",desc:"Google's official catalogue for discovering its current AI products and models.",url:"https://ai.google/products/"},
  {date:"2026-10-01",cat:"labs",title:"Google Labs — latest experiments",desc:"Google's official home for experimental products and emerging AI experiences.",url:"https://labs.google/"},
  {date:"2026-10-01",cat:"deepmind",title:"Google DeepMind — research projects",desc:"The official project catalogue spanning agents, science, robotics, world models and more.",url:"https://deepmind.google/research/projects/"},
  {date:"2026-10-01",cat:"products",title:"Google AI",desc:"Google's central AI portal for products, features and ways to explore its AI ecosystem.",url:"https://ai.google/"},
  {date:"2026-09-01",cat:"models",title:"Gemini",desc:"Google's family of multimodal AI models and assistant experiences.",url:"https://deepmind.google/models/gemini/"},
  {date:"2026-09-01",cat:"models",title:"Veo",desc:"Google DeepMind's video-generation model family.",url:"https://deepmind.google/models/veo/"},
  {date:"2026-09-01",cat:"models",title:"Lyria",desc:"Google's generative music technology family.",url:"https://deepmind.google/models/lyria/"},
  {date:"2026-09-01",cat:"models",title:"Gemma",desc:"Google's family of open AI models for developers and researchers.",url:"https://ai.google.dev/gemma/"},
  {date:"2026-08-01",cat:"research",title:"Google DeepMind",desc:"Official home for frontier AI research, models and projects.",url:"https://deepmind.google/"},
];

const labels={all:"All",products:"Products",models:"Models",labs:"Labs",deepmind:"DeepMind",research:"Research",developer:"Developer"};
let filter="all", query="";

function render(){
  const feed=document.getElementById("feed");
  const visible=items.filter(x=>(filter==="all"||x.cat===filter)&&((x.title+" "+x.desc).toLowerCase().includes(query.toLowerCase())));
  document.getElementById("count").textContent=visible.length+" item"+(visible.length===1?"":"s");
  if(!visible.length){feed.innerHTML='<div class="empty">No matching developments. Try another category or search.</div>';return}
  feed.innerHTML=visible.map(x=>`<article class="card">
    <div class="topline"><span class="tag">${labels[x.cat]||x.cat}</span><time class="date" datetime="${x.date}">${new Date(x.date+"T00:00:00").toLocaleDateString(undefined,{day:"numeric",month:"short",year:"numeric"})}</time></div>
    <h2>${escapeHtml(x.title)}</h2><p>${escapeHtml(x.desc)}</p>
    <a href="${x.url}" target="_blank" rel="noopener">Read the official Google source →</a>
  </article>`).join("");
}
function escapeHtml(s){return s.replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));}
document.getElementById("search").addEventListener("input",e=>{query=e.target.value;render()});
document.getElementById("filters").addEventListener("click",e=>{if(!e.target.dataset.filter)return;filter=e.target.dataset.filter;document.querySelectorAll(".filters button").forEach(b=>b.classList.toggle("active",b===e.target));render()});
document.getElementById("refresh").addEventListener("click",()=>{document.getElementById("status").textContent="This starter radar uses curated official Google links. Automatic feed ingestion is the next layer.";});
document.getElementById("status").textContent="Official Google sources · starter edition";
render();
