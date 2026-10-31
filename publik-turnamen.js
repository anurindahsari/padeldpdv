/* Bagian turnamen di halaman publik: info acara, jadwal & bagan, skor live, mini game, voting, hasil.
   Tiap bagian hanya tampil bila dinyalakan panitia di halaman kelola. */
(function(){
  if(!window.firebase||!firebase.apps||!firebase.apps.length||/[?&]demo=1/.test(location.search)) return;
  var fs=firebase.firestore(), $=function(i){ return document.getElementById(i); }, esc=TUR.esc;
  var DPCS=['Surabaya','Malang','Madura','Kediri','Besuki','Madiun','Bali','NTT','NTB'];
  var CFG={}, U=null, S={}, MG=[], TAB='men', Q='';
  var HARI=['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'], BLN=['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
  function show(id,on){ var e=$(id); if(e) e.style.display=on?'':'none'; }
  fs.collection('pengaturan').doc('umum').onSnapshot(function(d){ CFG=d.exists?d.data():{}; info(); all(); });
  fs.collection('turnamen').doc('undian').onSnapshot(function(d){ U=null; if(d.exists){ try{ U=JSON.parse(d.data().json); }catch(e){} } all(); });
  var skUn=null, mgUn=null;
  function subs(){ var needS=(CFG.pubJadwal||CFG.pubHasil)&&U; if(needS&&!skUn) skUn=fs.collection('skor').onSnapshot(function(s){ S={}; s.forEach(function(d){ S[d.id]=d.data(); }); jadwal(); hasil(); },function(){});
    if(CFG.pubMG&&!mgUn) mgUn=fs.collection('minigame').onSnapshot(function(s){ MG=[]; s.forEach(function(d){ MG.push(d.data()); }); mg(); },function(){}); }
  function all(){ subs(); show('jadwal',!!(CFG.pubJadwal&&U)); show('nvJadwal',!!(CFG.pubJadwal&&U)); show('hasil',!!(CFG.pubHasil&&U)); show('nvHasil',!!(CFG.pubHasil&&U)); show('vote',!!CFG.voteOpen); show('nvVote',!!CFG.voteOpen); show('mgLb',!!CFG.pubMG);
    jadwal(); hasil(); vote(); mg(); }
  // ---------- info acara + hitung mundur
  var cdT=null;
  function info(){ if(!CFG.tgl){ $('tlBig').innerHTML='Menyusul'; $('tlSm').innerHTML='Diumumkan bersamaan'; $('tlX').innerHTML=''; return; }
    var p=CFG.tgl.split('-'), d=new Date(+p[0],+p[1]-1,+p[2]);
    $('tlBig').innerHTML=d.getDate()+' '+BLN[d.getMonth()].slice(0,3)+' '+d.getFullYear();
    $('tlSm').innerHTML=HARI[d.getDay()]+(CFG.jam?', registrasi ulang '+esc(CFG.jam.replace(':','.'))+' WIB':'')+(CFG.venue?'<br><b style="color:#08203D">'+esc(CFG.venue)+'</b>':'<br>Lokasi menyusul')+(CFG.alamat?'<br>'+esc(CFG.alamat):'');
    function cd(){ var now=new Date(), t0=new Date(now.getFullYear(),now.getMonth(),now.getDate()), n=Math.round((d-t0)/864e5), x='';
      if(n>0) x='<span class="cd">H-'+n+'</span>'; else if(n===0) x='<span class="cd">Hari ini!</span>';
      if(CFG.maps) x+=(x?' ':'')+'<a class="tlm" href="'+esc(CFG.maps)+'" target="_blank" rel="noopener">Buka di Google Maps &rarr;</a>';
      $('tlX').innerHTML=x; }
    cd(); clearInterval(cdT); cdT=setInterval(cd,6e4); }
  // ---------- jadwal & bagan
  function nm(id){ return id?esc(TUR.pairName(U,id)):''; }
  function side(r,x){ return r[x]?nm(r[x]):'<span class="muted">'+esc(TUR.label(U,r.m,x))+'</span>'; }
  function score(r){ if(!CFG.pubLive||!r.s) return ''; return '<span class="js">'+r.s.a+'–'+r.s.b+'</span>'+(r.s.done?'':'<span class="lv">LIVE</span>'); }
  function row(r){ var m=r.m; return '<div class="jm"><div class="jt">'+TUR.hm(m.t)+'<span>Court '+m.c+'</span></div><div class="jb"><div class="k">'+TUR.KN[m.k]+' · '+(m.st=='G'?'Grup '+TUR.gname(m.gr):TUR.STN[m.st])+'</div>'+side(r,'a')+' <span class="muted">vs</span> '+side(r,'b')+'</div>'+score(r)+'</div>'; }
  var tabInit=false;
  function jadwal(){ if(!(CFG.pubJadwal&&U)) return;
    if(!tabInit){ tabInit=true; $('jTab').innerHTML=TUR.KAT.filter(function(k){ return U.kat[k[0]]; }).map(function(k){ return '<button type="button" role="tab" data-k="'+k[0]+'">'+k[1].replace(' Beginner','')+'</button>'; }).join('');
      Array.prototype.forEach.call($('jTab').querySelectorAll('button'),function(b){ b.onclick=function(){ TAB=b.getAttribute('data-k'); jadwal(); }; });
      if(!U.kat[TAB]) TAB=Object.keys(U.kat)[0]; $('jQ').oninput=function(){ Q=this.value.trim().toLowerCase(); jadwal(); }; }
    Array.prototype.forEach.call($('jTab').querySelectorAll('button'),function(b){ var on=b.getAttribute('data-k')==TAB; b.className=on?'on':''; b.setAttribute('aria-selected',on?'true':'false'); });
    var R=TUR.resolve(U,S);
    if(Q.length>=2){ var hit=R.filter(function(r){ return [r.a,r.b].some(function(p){ var x=p&&U.pairs[p]; return x&&(x.n1+' '+x.n2+' '+(x.n1s||'')+' '+(x.n2s||'')+' '+x.dpc).toLowerCase().indexOf(Q)>=0; }); }).sort(function(a,b){ return a.m.t-b.m.t; });
      $('jRes').innerHTML=hit.length?hit.map(row).join(''):'<p class="muted small">Tidak ditemukan. Coba nama lain atau nama DPC.</p>'; }
    else $('jRes').innerHTML='';
    var st=TUR.standings(U,S,TAB), h='', K=U.kat[TAB];
    st.forEach(function(g){ h+='<div class="ghd">Grup '+g.name+'</div><table class="gt"><tr><th>Pasangan</th><th class="n">Main</th><th class="n">Menang</th><th class="n">Selisih</th></tr>'+g.rows.map(function(x,i){ return '<tr'+(i==0?' class="q"':'')+'><td>'+nm(x.p)+'<br><span class="muted small">'+esc(U.pairs[x.p].dpc)+'</span></td><td class="n">'+x.m+'</td><td class="n">'+x.w+'</td><td class="n">'+(x.gf-x.ga>0?'+':'')+(x.gf-x.ga)+'</td></tr>'; }).join('')+'</table>'; });
    h+='<div class="ghd">Fase grup</div>'+R.filter(function(r){ return r.m.k==TAB&&r.m.st=='G'; }).sort(function(a,b){ return a.m.t-b.m.t; }).map(row).join('');
    h+='<div class="ghd">Babak gugur</div>'+R.filter(function(r){ return r.m.k==TAB&&r.m.st!='G'; }).sort(function(a,b){ return a.m.t-b.m.t||a.m.c-b.m.c; }).map(row).join('');
    $('jOut').innerHTML=h; }
  // ---------- mini game
  function mg(){ if(!CFG.pubMG) return; var h=''; [['target','Target Challenge'],['king','King of the Court']].forEach(function(g){ var L=MG.filter(function(x){ return x.g==g[0]; }).sort(function(a,b){ return b.poin-a.poin||a.t-b.t; }).slice(0,10); if(!L.length) return;
      h+='<div class="ghd">Klasemen <i class="fx">'+g[1]+'</i></div><table class="lbt">'+L.map(function(x,i){ return '<tr><td>'+(i+1)+'. '+esc(x.nama)+' <span class="muted small">'+esc(x.dpc)+'</span></td><td>'+x.poin+'</td></tr>'; }).join('')+'</table>'; });
    $('mgLb').innerHTML=h; }
  // ---------- voting (satu suara per HP)
  function voted(){ try{ return localStorage.getItem('hpc-vote')=='1'; }catch(e){ return false; } }
  function vote(){ if(!CFG.voteOpen) return; if(voted()){ $('vtOut').innerHTML='<div class="note ok">Terima kasih, suara Anda sudah tercatat.</div>'; return; }
    if($('vDs')) return; var o='<option value="">Pilih DPC</option>'+DPCS.map(function(d){ return '<option>'+d+'</option>'; }).join('');
    $('vtOut').innerHTML='<div class="vt"><div class="fc"><label for="vDs"><i class="fx">Best Dresscode</i></label><select class="in2" id="vDs">'+o+'</select></div><div class="fc"><label for="vSp"><i class="fx">Best Supporter</i></label><select class="in2" id="vSp">'+o+'</select></div><button type="button" class="btn nv" id="vGo" style="width:100%;min-height:52px">Kirim suara</button><div id="vMsg"></div></div>';
    $('vGo').onclick=function(){ var ds=$('vDs').value, sp=$('vSp').value; if(!ds||!sp){ $('vMsg').innerHTML='<div class="note warn">Pilih DPC untuk kedua kategori.</div>'; return; }
      var u=firebase.auth().currentUser; if(!u){ $('vMsg').innerHTML='<div class="note warn">Belum tersambung. Muat ulang halaman lalu coba lagi.</div>'; return; }
      $('vGo').disabled=true; fs.collection('suara').doc(u.uid).set({ds:ds,sp:sp,t:Date.now()}).then(function(){ try{ localStorage.setItem('hpc-vote','1'); }catch(e){} vote(); })
        .catch(function(){ try{ localStorage.setItem('hpc-vote','1'); }catch(e){} $('vtOut').innerHTML='<div class="note">Suara dari HP ini sudah tercatat sebelumnya, atau voting sudah ditutup.</div>'; }); }; }
  // ---------- hasil
  function hasil(){ if(!(CFG.pubHasil&&U)) return; var R=TUR.results(U,S), h='', md=['','md1','md2','md3'];
    TUR.KAT.forEach(function(k){ var p=R.podium[k[0]]; if(!p) return; h+='<div class="pdm"><h3>'+k[1]+'</h3>'+[1,2,3].map(function(n){ return '<div class="r"><span class="md '+md[n]+'">'+n+'</span><div>'+(p[n]?'<b>'+nm(p[n])+'</b><span>'+esc(U.pairs[p[n]].dpc)+'</span>':'<span>Menunggu pertandingan</span>')+'</div></div>'; }).join('')+'</div>'; });
    h+='<div class="g">'+[['Best DPC',R.best[0]],['Best Dresscode',CFG.bestDress],['Best Supporter',CFG.bestSupp]].map(function(a){ return '<div class="c3"><div class="card navy"><div class="lbl"><i class="fx">'+a[0]+'</i></div><div class="big">'+esc(a[1]||'Menyusul')+'</div></div></div>'; }).join('')+'</div>';
    if(CFG.fotoPodium) h+='<a class="btn nv" href="'+esc(CFG.fotoPodium)+'" target="_blank" rel="noopener">Lihat foto podium</a>';
    $('hsOut').innerHTML=h; }
})();
