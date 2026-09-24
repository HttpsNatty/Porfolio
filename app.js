// Each cat keeps its identity while positions are shuffled once per page load.
const cats = [
  {id:'rengar',name:'Rengar',col:0,row:0},
  {id:'haiiro',name:'Haiiro',col:1,row:0},
  {id:'penny',name:'Penny',col:2,row:0},
  {id:'bella',name:'Bella',col:0,row:1},
  {id:'polly',name:'Polly',col:1,row:1},
  {id:'chicao',name:'Chicão',col:2,row:1},
  {id:'caitlyn',name:'Caitlyn',col:0,row:2}
];
function shuffleCats(items, random = Math.random) {
  const shuffled = [...items];
  for (let i=shuffled.length-1;i>0;i--) {
    const j=Math.floor(random()*(i+1));
    [shuffled[i],shuffled[j]]=[shuffled[j],shuffled[i]];
  }
  return shuffled;
}
const orderedCats = shuffleCats(cats);
document.querySelectorAll('.cat-slot').forEach((slot,index)=>{
  const cat=orderedCats[index];
  const button=document.createElement('button');
  button.type='button';button.className='cat';button.dataset.catId=cat.id;
  button.setAttribute('aria-label',cat.name);
  button.setAttribute('aria-expanded','false');
  const art=document.createElement('span');art.className='cat-art';art.setAttribute('aria-hidden','true');
  const edges = [0,490,1060,1536];
  const left=edges[cat.col], width=edges[cat.col+1]-left;
  art.style.backgroundSize=`${1536/width*100}% 300%`;
  art.style.backgroundPosition=`${left/(1536-width)*100}% ${cat.row*50}%`;
  art.style.animationDelay=`-${index*.8}s`;
  const label=document.createElement('span');label.className='cat-label';label.textContent=cat.name;
  button.append(art,label);slot.append(button);
  button.addEventListener('click',()=>{const open=button.classList.toggle('open');button.setAttribute('aria-expanded',String(open));});
  button.addEventListener('keydown',event=>{if(event.key==='Escape'){button.classList.remove('open');button.setAttribute('aria-expanded','false');}});
});
const motionButton=document.getElementById('motion-toggle');
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
function updateMotion(paused){document.body.classList.toggle('paused',paused);motionButton.setAttribute('aria-pressed',String(paused));motionButton.textContent=paused?'Ativar gatinhos':'Pausar gatinhos';}
updateMotion(reducedMotion.matches);
if(reducedMotion.matches){motionButton.textContent='Movimento reduzido';motionButton.disabled=true;}
motionButton.addEventListener('click',()=>updateMotion(!document.body.classList.contains('paused')));
