/* Mesin turnamen: undian grup, jadwal, klasemen, bagan, hasil. Dipakai halaman publik, layar, wasit, dan kelola. */
var TUR=(function(){
  var KAT=[['men','Men Beginner'],['mix','Mix Beginner'],['women','Women Beginner']];
  var KN={men:'Men',mix:'Mix',women:'Women'};
  var SLOT=20, START=8*60+30, COURTS=6, LUNCH=60, EXH=40, FIN=35;
  var STN={R16:'16 besar',QF:'Quarter final',SF:'Semifinal',J3:'Perebutan juara 3',F:'Final'};
  function hm(m){ var h=Math.floor(m/60), x=m%60; return (h<10?'0':'')+h+'.'+(x<10?'0':'')+x; }
  function pow2(n){ var p=1; while(p<n) p*=2; return p; }
  function shuffle(a){ a=a.slice(); for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)), t=a[i]; a[i]=a[j]; a[j]=t; } return a; }
  // format grup (setiap pasangan main 2 kali di grup): grup isi 3 atau 4
  function fmt(n){
    if(n<2) return {g:0,sz:[],Q:0,ko:[]};
    if(n<=5){ return {g:1,sz:[n],Q:n>=4?4:2,ru:0,ko:n>=4?['SF','J3','F']:['F']}; }
    var g=0,p,lo=Math.ceil(n/4),hi=Math.floor(n/3),sz=[],i; for(p=2;p<=32;p*=2) if(p>=lo&&p<=hi) g=p; if(!g) g=hi;
    var four=n-3*g; for(i=0;i<g;i++) sz.push(i<four?4:3);
    var Q=Math.max(4,pow2(g)), ko=[]; if(Q>=16) ko.push('R16'); if(Q>=8) ko.push('QF'); ko.push('SF'); ko.push('J3'); ko.push('F');
    return {g:g,sz:sz,Q:Q,ru:Math.max(0,Q-g),ko:ko};
  }
  function gname(i){ return String.fromCharCode(65+i); }
  // pertandingan grup: isi 3 = round robin; isi 4 = 2 kali main (A-B, C-D, A-C, B-D)
  function gMatches(arr){ if(arr.length==3) return [[0,1],[0,2],[1,2]]; if(arr.length==4) return [[0,1],[2,3],[0,2],[1,3]]; if(arr.length==2) return [[0,1]]; if(arr.length==5) return [[0,1],[2,3],[4,0],[1,2],[3,4]]; var o=[]; for(var i=0;i<arr.length;i++) for(var j=i+1;j<arr.length;j++) o.push([i,j]); return o; }
  function order(Q){ var o=[1,2]; while(o.length<Q){ var n=o.length*2+1, x=[]; for(var i=0;i<o.length;i++){ x.push(o[i]); x.push(n-o[i]); } o=x; } return o; }
  // membuat undian lengkap dari daftar pasangan per kategori
  function draw(pairs){
    var U={t:Date.now(),kat:{},m:[],pairs:{}}, all=[];
    KAT.forEach(function(k){ var ps=(pairs[k[0]]||[]).slice(); if(ps.length<2) return; ps.forEach(function(p){ U.pairs[p.id]=p; });
      var f=fmt(ps.length), sh=shuffle(ps.map(function(p){ return p.id; })), groups=[], idx=0;
      // pasangan dari DPC/tim yang sama dipisah ke grup berbeda bila memungkinkan
      for(var gi=0;gi<f.sz.length;gi++){ groups.push(sh.slice(idx,idx+f.sz[gi])); idx+=f.sz[gi]; }
      U.kat[k[0]]={g:groups,Q:f.Q,ko:f.ko};
      groups.forEach(function(gr,gi){ gMatches(gr).forEach(function(mm,mi){ all.push({id:k[0]+'-G'+gname(gi)+(mi+1),k:k[0],st:'G',gr:gi,a:gr[mm[0]],b:gr[mm[1]]}); }); });
    });
    // jadwal fase grup: isi 6 lapangan per slot, hindari pasangan main dua slot berturut-turut
    var rest=all.slice(), slot=0, prev={};
    while(rest.length){ var used={}, pick=[];
      for(var pass=0;pass<2&&pick.length<COURTS;pass++) for(var i=0;i<rest.length&&pick.length<COURTS;i++){ var m=rest[i]; if(pick.indexOf(m)>=0||used[m.a]||used[m.b]) continue; if(pass==0&&(prev[m.a]||prev[m.b])) continue; pick.push(m); used[m.a]=used[m.b]=1; }
      prev={}; pick.forEach(function(m,ci){ m.c=ci+1; m.t=START+slot*SLOT; prev[m.a]=prev[m.b]=1; rest.splice(rest.indexOf(m),1); U.m.push(m); });
      slot++; }
    var t=START+slot*SLOT;
    // babak gugur
    var QN={R16:16,QF:8,SF:4}, plan={};
    KAT.forEach(function(k){ var K=U.kat[k[0]]; if(!K) return; var ko=K.ko, prev=null, list=[];
      ko.forEach(function(st,si){ var ms=[];
        if(st=='F'){ if(prev) ms.push({id:k[0]+'-F',k:k[0],st:'F',wa:k[0]+'-SF1',wb:k[0]+'-SF2'}); else ms.push({id:k[0]+'-F',k:k[0],st:'F',sa:1,sb:2}); }
        else if(st=='J3') ms.push({id:k[0]+'-J3',k:k[0],st:'J3',la:k[0]+'-SF1',lb:k[0]+'-SF2'});
        else if(!prev){ var o=order(QN[st]); for(var i=0;i<o.length;i+=2) ms.push({id:k[0]+'-'+st+(i/2+1),k:k[0],st:st,sa:o[i],sb:o[i+1]}); }
        else { var n=QN[st]/2; for(var j=1;j<=n;j++) ms.push({id:k[0]+'-'+st+j,k:k[0],st:st,wa:k[0]+'-'+prev+(2*j-1),wb:k[0]+'-'+prev+(2*j)}); }
        if(st!='J3'&&st!='F') prev=st; ms.forEach(function(m){ (plan[st]=plan[st]||[]).push(m); }); }); });
    ['R16','QF','SF','J3'].forEach(function(st){ var ms=plan[st]; if(!ms||!ms.length) return; var r=Math.ceil(ms.length/COURTS); ms.forEach(function(m,i){ m.c=(i%COURTS)+1; m.t=t+Math.floor(i/COURTS)*SLOT; U.m.push(m); }); t+=r*SLOT; });
    U.lunch=t; t+=LUNCH; U.exh=t; t+=EXH;
    var c=1; (plan.F||[]).forEach(function(m){ m.c=c++; m.t=t; U.m.push(m); });
    U.fin=t; U.end=t+FIN;
    return U;
  }
  // klasemen grup dari skor
  function standings(U,S,k){ var K=U.kat[k]; if(!K) return []; return K.g.map(function(gr,gi){ var row={}; gr.forEach(function(p){ row[p]={p:p,m:0,w:0,gf:0,ga:0}; });
      U.m.forEach(function(m){ if(m.k!=k||m.st!='G'||m.gr!=gi) return; var s=S[m.id]; if(!s||!s.done) return; var A=row[m.a],B=row[m.b]; A.m++;B.m++; A.gf+=s.a;A.ga+=s.b;B.gf+=s.b;B.ga+=s.a; if(s.a>s.b) A.w++; else if(s.b>s.a) B.w++; });
      var arr=Object.keys(row).map(function(x){ return row[x]; }); arr.sort(cmp); var fin=U.m.filter(function(m){ return m.k==k&&m.st=='G'&&m.gr==gi; }).every(function(m){ return S[m.id]&&S[m.id].done; });
      return {name:gname(gi),rows:arr,done:fin}; }); }
  function cmp(a,b){ return (b.w-a.w)||((b.gf-b.ga)-(a.gf-a.ga))||(b.gf-a.gf); }
  // siapa yang main di sebuah pertandingan (null bila belum diketahui)
  function seeds(U,S,k){ var st=standings(U,S,k), K=U.kat[k]; if(!st.length||!st.every(function(g){ return g.done; })) return null;
    if(st.length==1) return st[0].rows.map(function(r){ return r.p; });
    var w=st.map(function(g){ return g.rows[0]; }).sort(cmp), ru=st.map(function(g){ return g.rows[1]; }).filter(Boolean).sort(cmp).slice(0,K.Q-K.g.length);
    return w.concat(ru).map(function(r){ return r.p; }); }
  function winner(m,S){ var s=S[m.id]; if(!s||!s.done) return null; return s.a>s.b?'a':'b'; }
  function resolve(U,S){ var by={}, sd={}; U.m.forEach(function(m){ by[m.id]=m; }); KAT.forEach(function(k){ sd[k[0]]=seeds(U,S,k[0]); });
    function side(m,x){ if(m[x]) return m[x]; var s=m['s'+x]; if(s){ var q=sd[m.k]; return q?q[s-1]||null:null; } var w=m['w'+x]; if(w){ var mm=by[w], r=mm?winner(mm,S):null; return r?side(mm,r):null; } var l=m['l'+x]; if(l){ var ml=by[l], r2=ml?winner(ml,S):null; return r2?side(ml,r2=='a'?'b':'a'):null; } return null; }
    return U.m.map(function(m){ return {m:m,a:side(m,'a'),b:side(m,'b'),s:S[m.id]||null}; }); }
  function stn(code){ var m=/^([A-Z]+\d?[A-Z]*?)(\d*)$/.exec(code), st=code.replace(/\d+$/,''), n=code.slice(st.length); return (STN[st]||st)+(n?' '+n:''); }
  function label(U,m,x){ if(m['s'+x]){ var K=U.kat[m.k], s=m['s'+x], g=K.g.length; if(g==1) return 'Peringkat '+s+' grup'; return 'Unggulan '+s; } if(m['w'+x]) return 'Pemenang '+stn(m['w'+x].split('-')[1]); if(m['l'+x]) return 'Kalah '+stn(m['l'+x].split('-')[1]); return '-'; }
  function pairName(U,id,short){ var p=U.pairs[id]; if(!p) return '-'; var n=short?(p.n1s||p.n1)+' / '+(p.n2s||p.n2):p.n1+' / '+p.n2; return n; }
  // juara per kategori dan Best DPC (poin 5/3/2)
  function results(U,S){ var R=resolve(U,S), out={}, pts={};
    KAT.forEach(function(k){ var f=R.filter(function(x){ return x.m.k==k[0]&&x.m.st=='F'; })[0], j=R.filter(function(x){ return x.m.k==k[0]&&x.m.st=='J3'; })[0]; if(!f) return;
      var o={}; if(f.s&&f.s.done){ var w=f.s.a>f.s.b; o[1]=w?f.a:f.b; o[2]=w?f.b:f.a; } if(j&&j.s&&j.s.done){ o[3]=j.s.a>j.s.b?j.a:j.b; } out[k[0]]=o;
      [[1,5],[2,3],[3,2]].forEach(function(q){ var p=o[q[0]]&&U.pairs[o[q[0]]]; if(p&&p.dpc&&!p.ext) pts[p.dpc]=(pts[p.dpc]||0)+q[1]; }); });
    var best=Object.keys(pts).sort(function(a,b){ return pts[b]-pts[a]; });
    return {podium:out,pts:pts,best:best}; }
  function esc(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  // pasangan dari data pendaftaran (daftar/{dpc}) + pasangan tambahan
  function pairsFrom(daftar,extra){ var P={men:[],mix:[],women:[]};
    daftar.forEach(function(x){ KAT.forEach(function(k){ var c=x.kat&&x.kat[k[0]]; if(c&&c.ada&&c.p&&c.p.length==2) P[k[0]].push({id:x.id+'-'+k[0],dpc:x.dpc,n1:c.p[0].nama,n2:c.p[1].nama,n1s:c.p[0].panggilan,n2s:c.p[1].panggilan}); }); });
    (extra||[]).forEach(function(e,i){ if(P[e.k]) P[e.k].push({id:'x'+i+'-'+e.k,dpc:e.tim||'Pertamina',n1:e.n1,n2:e.n2,ext:true}); });
    return P; }
  return {KAT:KAT,KN:KN,STN:STN,hm:hm,fmt:fmt,draw:draw,standings:standings,resolve:resolve,label:label,pairName:pairName,results:results,pairsFrom:pairsFrom,esc:esc,gname:gname,COURTS:COURTS};
})();
if(typeof module!=='undefined') module.exports=TUR;
