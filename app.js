const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const initial={name:'Something wonderful',html:`<main class="hero">
  <div class="badge">A SMALL IDEA. INFINITE POSSIBILITIES.</div>
  <div class="orbit"><span>✳</span></div>
  <h1>Make something<br><em>wonderful.</em></h1>
  <p>Every great thing starts with a little curiosity.<br>This is your space to experiment.</p>
  <button id="spark">Find your spark ↗</button>
  <div class="note">BUILT WITH CURIOSITY · MADE IN CODENEST</div>
</main>`,css:`* { box-sizing: border-box; }
body {
  margin: 0; background: #f8eddd; color: #432d24;
  font-family: Georgia, serif;
}
.hero { text-align: center; padding: 48px 22px; }
.badge { font: 9px Arial, sans-serif; letter-spacing: 2px; }
.orbit {
  width: 115px; height: 115px; margin: 38px auto 28px;
  border: 1px solid #dbc2a4; border-radius: 50%;
  display: grid; place-items: center;
}
.orbit span { font: 96px Arial; color: #a97243; }
h1 { font-size: clamp(36px, 5vw, 66px); line-height: 1.03;
  font-weight: normal; letter-spacing: -3px; margin: 0; }
h1 em { color: #a97243; }
p { font: 13px/1.8 Arial; color: #98755b; margin: 24px 0; }
button { border: 0; border-radius: 5px; background: #67432e;
  color: #f8eddd; padding: 14px 24px; cursor: pointer; }
button:hover { background: #a97243; }
.note { font: 8px Arial; letter-spacing: 2px; color: #a8896d;
  margin-top: 48px; }`,js:`const sparks = ['Build a tiny world.', 'Try a new color.',
  'Make the ordinary surprising.', 'Follow your curiosity.'];
document.querySelector('#spark').addEventListener('click', () => {
  const idea = sparks[Math.floor(Math.random() * sparks.length)];
  document.querySelector('h1').textContent = idea;
  console.log('Your spark:', idea);
});
console.log('Welcome to your next great idea.');`};
let panelOrder=['html','css','js'];
let state={...initial},visible={html:true,css:true,js:true},focus='html',timer,logs=0;
try{const saved=JSON.parse(localStorage.getItem('kiln-v1'));if(saved&&['html','css','js','name'].every(k=>typeof saved[k]==='string'))state=saved;}catch{}
$('#name').value=state.name;
function toast(text){$('#toast').textContent=text;$('#toast').style.opacity=1;clearTimeout(toast.timer);toast.timer=setTimeout(()=>$('#toast').style.opacity=0,3000)}
function save(){try{localStorage.setItem('kiln-v1',JSON.stringify(state));$('#saved').textContent='Saved locally';}catch{$('#saved').textContent='Local save unavailable';}$('#stats').textContent=Object.values(state).join('').length.toLocaleString()+' characters';}
function lines(t,g){g.textContent=Array.from({length:t.value.split('\n').length},(_,i)=>i+1).join('\n');g.scrollTop=t.scrollTop;}
function renderEditors(){const root=$('#editors');root.replaceChildren();root.className=$('#layout').value==='columns'?'columns':'';$$('.lang').forEach(b=>{b.classList.toggle('active',visible[b.dataset.lang]);b.setAttribute('aria-pressed',String(visible[b.dataset.lang]));});const keys=panelOrder.filter(k=>visible[k]);if(!keys.includes(focus))focus=keys[0];if(!keys.length){root.innerHTML='<p class="empty">A clear canvas.<br>Choose HTML, CSS or JS above to reopen an editor.</p>';return;}
for(const k of keys){if($('#layout').value==='tabs'&&k!==focus)continue;const panel=document.createElement('section');panel.className='editor';panel.innerHTML=`<div class="editorhead"><i class="${{html:'orange',css:'blue',js:'yellow'}[k]}">●</i><b>${k==='js'?'JavaScript':k.toUpperCase()}</b><span>${{html:'index.html',css:'style.css',js:'script.js'}[k]}</span><button aria-label="Minimize ${k}">−</button></div><div class="codebody"><div class="lines" aria-hidden="true"></div><textarea spellcheck="false" aria-label="${k.toUpperCase()} code" autocapitalize="off" autocomplete="off"></textarea></div>`;root.append(panel);const t=panel.querySelector('textarea'),g=panel.querySelector('.lines');t.value=state[k];lines(t,g);panel.querySelector('button').onclick=()=>{visible[k]=false;renderEditors()};t.onscroll=()=>g.scrollTop=t.scrollTop;t.oninput=()=>{state[k]=t.value;lines(t,g);save();clearTimeout(timer);if($('#auto').checked)timer=setTimeout(run,Number(document.querySelector("#previewDelay")?.value)||450);};t.onkeydown=e=>{if(e.key==='Tab'){e.preventDefault();t.setRangeText('  ',t.selectionStart,t.selectionEnd,'end');t.dispatchEvent(new Event('input'));}};}}
function documentHTML(bridge=false){const parser=new DOMParser();const doc=parser.parseFromString(state.html,'text/html');const style=doc.createElement('style');style.textContent=state.css;doc.head.append(style);if(!doc.querySelector('meta[name="viewport"]')){const m=doc.createElement('meta');m.name='viewport';m.content='width=device-width,initial-scale=1';doc.head.append(m);}if(!doc.title)doc.title=state.name;if(bridge){const script=doc.createElement('script');script.textContent=`(()=>{const send=(level,args)=>{try{parent.postMessage({kiln:true,level,text:args.map(a=>{try{return typeof a==='string'?a:JSON.stringify(a)}catch{return String(a)}}).join(' ')},'*')}catch{}};for(const level of ['log','warn','error','info']){const original=console[level];console[level]=(...args)=>{send(level,args);original.apply(console,args)}}addEventListener('error',e=>send('error',[e.message]));addEventListener('unhandledrejection',e=>send('error',[String(e.reason)]));})();`;doc.head.prepend(script);}const js=doc.createElement('script');js.textContent=state.js.replace(/<\/script/gi,'<\\/script');doc.body.append(js);return '<!doctype html>\n'+doc.documentElement.outerHTML;}
function run(){logs=0;$('#count').textContent=0;$('#console').textContent='';$('#output').srcdoc=documentHTML(true);$('#previewname').textContent=state.name||'Untitled project';}
window.addEventListener('message',e=>{if(e.source!==$('#output').contentWindow||!e.data?.kiln)return;logs++;$('#count').textContent=logs;const out=$('#console');out.textContent+=`[${String(e.data.level)}] ${String(e.data.text).slice(0,5000)}\n`;if(out.textContent.length>50000)out.textContent=out.textContent.slice(-40000);out.scrollTop=out.scrollHeight;});
$$('.lang').forEach(b=>b.onclick=()=>{const k=b.dataset.lang;if($('#layout').value==='tabs'){visible[k]=true;focus=k;}else visible[k]=!visible[k];renderEditors()});$('#layout').onchange=renderEditors;$('#theme').onchange=()=>document.body.dataset.theme=$('#theme').value;$('#name').oninput=()=>{state.name=$('#name').value;$('#previewname').textContent=state.name;save()};$('#run').onclick=run;$('#auto').onchange=()=>{if($('#auto').checked)run()};$('#consoleToggle').onclick=()=>$('#console').hidden=!$('#console').hidden;$('#clear').onclick=()=>{$('#console').textContent='';$('#count').textContent=logs=0};$$('.device').forEach(b=>b.onclick=()=>{$('#output').style.width=b.dataset.size;$$('.device').forEach(x=>x.classList.toggle('active',x===b));});

$$('[data-close]').forEach(b=>b.onclick=()=>b.closest('dialog').close());const safeName=()=>state.name.trim().replace(/[^a-z0-9_-]+/gi,'-').replace(/^-|-$/g,'').toLowerCase()||'untitled';$('#export').onclick=()=>{$('#filename').value=safeName();$('#exportDialog').showModal()};$('#download').onclick=()=>{const ext=$('#format').value;const name=$('#filename').value.trim().replace(/[<>:"/\\|?*\x00-\x1f]/g,'-').replace(/\.(html|json)$/i,'')||'untitled';const data=ext==='html'?documentHTML():JSON.stringify({codenest:1,...state},null,2);const url=URL.createObjectURL(new Blob([data],{type:ext==='html'?'text/html':'application/json'}));const a=document.createElement('a');a.href=url;a.download=name+'.'+ext;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);$('#settingsDialog').close();toast('Exported '+name+'.'+ext);};
$('#import').onclick=()=>$('#files').click();$('#files').onchange=async e=>{const files=[...e.target.files];if(!files.length)return;try{const next={...state};for(const file of files){if(file.size>2000000)throw new Error('Please choose files smaller than 2 MB.');const text=await file.text();const ext=file.name.split('.').pop().toLowerCase();if(ext==='json'){const data=JSON.parse(text);if(!['html','css','js'].every(k=>typeof data[k]==='string'))throw new Error('Choose a CodeNest project JSON with HTML, CSS and JS fields.');Object.assign(next,{html:data.html,css:data.css,js:data.js,name:typeof data.name==='string'?data.name:file.name.replace(/\.[^.]+$/,'')});}else if(ext==='css'||ext==='js')next[ext]=text;else if(ext==='html'||ext==='htm'){const doc=new DOMParser().parseFromString(text,'text/html');const styles=[...doc.querySelectorAll('style')],scripts=[...doc.querySelectorAll('script:not([src])')].filter(s=>!s.type||/^(text|application)\/javascript$/.test(s.type));next.css=styles.map(s=>s.textContent).join('\n');next.js=scripts.map(s=>s.textContent).join('\n');[...styles,...scripts].forEach(s=>s.remove());next.html=/<!doctype|<html[\s>]/i.test(text)?'<!doctype html>\n'+doc.documentElement.outerHTML:doc.body.innerHTML;next.name=file.name.replace(/\.[^.]+$/,'');}else throw new Error('Use HTML, CSS, JS or CodeNest JSON files.');}state=next;$('#name').value=state.name;save();renderEditors();run();toast('Imported '+files.length+' file'+(files.length>1?'s':''));}catch(err){toast(err.message)}e.target.value='';};
const divider=$('#divider');function resize(x){const r=$('main').getBoundingClientRect();$('#editors').style.width=Math.max(20,Math.min(75,(x-r.left)/r.width*100))+'%'}divider.onpointerdown=e=>{divider.setPointerCapture(e.pointerId);$('#output').style.pointerEvents='none';divider.onpointermove=e=>resize(e.clientX);};function endResize(){divider.onpointermove=null;$('#output').style.pointerEvents='';}divider.onpointerup=endResize;divider.onlostpointercapture=endResize;divider.onkeydown=e=>{if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();const r=$('#editors').getBoundingClientRect();resize(r.right+(e.key==='ArrowRight'?20:-20));}};


