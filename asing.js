/* Kata asing otomatis dicetak miring (judul, menu, tombol, dan isian tidak diubah) */
(function(){
  var W=['lunch break','king of the court','target challenge','technical meeting','exhibition matches','exhibition match','men beginner','mix beginner','women beginner','best dresscode','best supporter','best dpc','quarter final','golden point','single court','round robin','free play','mini games','mini game','goodie bag','race to 4','race to 6','last call','dress code','tie-break','exhibition','doorprize','supporter','dresscode','beginner','prebook','rookie','barcode','venue','jersey','totebag','catering','snack','browser','upload','online','email','link','court','vendor','deadline','rundown','booking','feedback','screenshot','password','event','women','men','mix'];
  var esc=function(s){ return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'); };
  var RE=new RegExp('(^|[^A-Za-z0-9\\-])('+W.map(esc).join('|')+')(?=$|[^A-Za-z0-9\\-])','gi');
  var SKIP={SCRIPT:1,STYLE:1,TEXTAREA:1,INPUT:1,SELECT:1,OPTION:1,H1:1,H2:1,H3:1,BUTTON:1,I:1,EM:1,CODE:1,TITLE:1,svg:1,SVG:1,NOSCRIPT:1};
  function skip(n){ for(var e=n.parentNode;e&&e.nodeType===1;e=e.parentNode){ if(SKIP[e.tagName]) return true; var id=e.id, c=e.getAttribute&&e.getAttribute('class')||''; if(id==='nav'||id==='hd'||id==='kpi'||id==='side'||/(^|\s)(lbl|eyb|chip|rad|seg|btn|fqchip|k|v)(\s|$)/.test(c)||e.isContentEditable) return true; } return false; }
  function run(root){ if(!root||!root.ownerDocument&&root!==document) return; var tw=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,null,false), list=[], n;
    while((n=tw.nextNode())){ if(n.nodeValue&&/[A-Za-z]/.test(n.nodeValue)){ RE.lastIndex=0; if(RE.test(n.nodeValue)&&!skip(n)) list.push(n); } }
    list.forEach(function(t){ var s=t.nodeValue, f=document.createDocumentFragment(), last=0, m; RE.lastIndex=0;
      while((m=RE.exec(s))){ var st=m.index+m[1].length; if(st>last) f.appendChild(document.createTextNode(s.slice(last,st))); var i=document.createElement('i'); i.className='fx'; i.textContent=m[2]; f.appendChild(i); last=st+m[2].length; }
      if(last<s.length) f.appendChild(document.createTextNode(s.slice(last))); t.parentNode.replaceChild(f,t); });
  }
  var q=null, pend=[];
  function flush(){ q=null; var a=pend; pend=[]; for(var i=0;i<a.length;i++) if(document.contains(a[i])) run(a[i]); }
  function start(){ run(document.body);
    if(window.MutationObserver) new MutationObserver(function(ms){ for(var i=0;i<ms.length;i++){ var ad=ms[i].addedNodes; for(var j=0;j<ad.length;j++){ var x=ad[j]; if(x.nodeType===3) x=x.parentNode; if(x&&x.nodeType===1&&!(x.tagName==='I'&&x.className==='fx')&&x.namespaceURI!=='http://www.w3.org/2000/svg') pend.push(x); } } if(pend.length&&!q) q=setTimeout(flush,30); }).observe(document.body,{childList:true,subtree:true,characterData:false});
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start); else start();
})();
