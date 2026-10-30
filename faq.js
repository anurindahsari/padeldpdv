/* FAQ turnamen padel.
   Untuk menambah pertanyaan: tambahkan satu objek di FAQ.
   q = pertanyaan, a = jawaban (boleh HTML sederhana), k = kata kunci (huruf kecil). */
var FAQ = [
  {q:'Kapan dan di mana turnamennya?',
   a:'Tanggal dan lokasi masih <b>menyusul</b> dan akan diumumkan bersamaan.',
   k:['kapan','tanggal','jadwal','dimana','lokasi','venue','tempat','lapangan','court','surabaya','alamat','turnamen','acara','event']},
  {q:'Berapa biaya pendaftarannya?',
   a:'<b>Gratis.</b> Peserta tidak dipungut biaya.',
   k:['biaya','bayar','harga','gratis','htm','fee','transfer','iuran','uang','daftar']},
  {q:'Siapa saja yang boleh ikut?',
   a:'Setiap pemain wajib <b>anggota Hiswana Migas</b> dan mencantumkan nomor KTA saat didaftarkan.',
   k:['syarat','anggota','member','umum','luar','non','peserta']},
  {q:'Di mana saya bisa melihat nomor KTA?',
   a:'Nomor KTA tertera di Kartu Tanda Anggota Hiswana Migas, formatnya <b>xx/xx/xx/xx/xxx</b> (11 angka). Bila tidak tahu, tanyakan ke sekretariat DPC Anda.',
   k:['kta','nomor','kartu','lihat','lupa','cek']},
  {q:'Kategori apa saja yang dipertandingkan?',
   a:'Tiga kategori, semuanya level beginner: <b>Men Beginner</b> (ganda putra), <b>Mix Beginner</b> (1 putra + 1 putri), dan <b>Women Beginner</b> (ganda putri).',
   k:['kategori','men','mix','women','putra','putri','campuran','ganda','pria','wanita','cewek','cowok','perempuan','laki']},
  {q:'Apa syarat level pemain?',
   a:'Level maksimal <b>1,5</b>. Pemain belum pernah juara di kategori beginner ke atas; paling tinggi pernah juara kategori rookie. Di Mix, kedua pemain harus memenuhi syarat ini.',
   k:['level','rating','1,5','1.5','juara','rookie','beginner','pemula','pro','pengalaman','jago']},
  {q:'Bolehkah satu pemain ikut lebih dari satu kategori?',
   a:'Tidak. Setiap pemain hanya boleh ikut <b>satu kategori</b>.',
   k:['dua','lebih','rangkap','double','dobel','merangkap','sekaligus','kategori','men','mix','women']},
  {q:'Berapa pasangan yang bisa dikirim setiap DPC?',
   a:'Setiap DPC mendapat <b>1 slot di tiap kategori</b>: Men, Mix, dan Women.',
   k:['pasangan','pasang','slot','kuota','jumlah','dpc','tim','kirim','wakil','perwakilan']},
  {q:'Siapa yang mengisi formulir pendaftaran?',
   a:'<b>PIC DPC</b>. Satu formulir untuk satu DPC, sekaligus semua kategori. PIC tidak harus ikut bertanding dan menjadi narahubung panitia untuk DPC-nya.',
   k:['daftar','mendaftar','formulir','form','isi','pic','online','web']},
  {q:'Sampai kapan pendaftaran dan bisakah data diubah?',
   a:'Data bisa diubah sampai <b>10 November 2026 pukul 23.59 WIB</b>, dari HP atau browser mana pun. Di bagian Daftar, tekan <b>Ubah data</b>, pilih DPC, lalu masukkan <b>kode ubah data</b> yang muncul saat pertama kali mendaftar. Setelah batas waktu, data terkunci.',
   k:['batas','deadline','tutup','sampai','ubah','edit','ganti','koreksi','salah','revisi','terakhir','10','november']},
  {q:'Saya lupa atau kehilangan kode ubah data. Bagaimana?',
   a:'Kode ubah data bisa dilihat lagi di bagian Daftar bila dibuka dari HP/browser yang dipakai saat mendaftar. Bila tidak bisa, chat narahubung lewat WhatsApp; panitia akan mengirimkan kode ke PIC DPC yang terdaftar.',
   k:['kode','lupa','hilang','hp','perangkat','laptop','device','browser','ganti','tukar','pengganti','terkunci','ubah']},
  {q:'Apa itu kode ubah data?',
   a:'Kode 8 huruf/angka (misalnya ABCD-2345) yang muncul setelah PIC mendaftar. Kode ini membuktikan bahwa yang mengubah data memang PIC DPC tersebut, sehingga orang lain tidak bisa mengubah data DPC Anda. <b>Simpan dan jangan bagikan</b> kode ini.',
   k:['kode','aman','keamanan','password','sandi','pin','orang','lain','bobol']},
  {q:'Apakah link Reclub wajib?',
   a:'Tidak wajib. Bila punya, cantumkan link profil Reclub setiap pemain.',
   k:['reclub','link','profil','aplikasi','akun']},
  {q:'Apakah wajib melampirkan foto?',
   a:'Ya, <b>foto setiap pemain wajib</b> dilampirkan, dengan wajah terlihat jelas. Tidak harus pas foto.',
   k:['foto','gambar','pas','upload','unggah','selfie']},
  {q:'Bolehkah membawa supporter?',
   a:'Boleh, <b>maksimal 10 orang</b> per DPC di luar peserta. Isi jumlahnya di formulir untuk perhitungan kapasitas dan konsumsi. Setiap supporter mendapat barcode masuk atas namanya.',
   k:['pendamping','tamu','supporter','suporter','bawa','teman','keluarga','anak','istri','suami','penonton','nonton','ajak']},
  {q:'Bagaimana cara masuk di hari H? Apa itu barcode?',
   a:'Setiap orang, peserta maupun tamu, masuk dengan <b>barcode pribadi</b>. Barcode <b>belum tersedia</b>; setelah tersedia, PIC mengunduhnya di bagian Unduh barcode di web ini lalu mengirimkannya ke tiap orang. Di meja registrasi barcode discan, lalu Anda menerima <b>gelang akses</b> Peserta atau Tamu.',
   k:['barcode','qr','masuk','gelang','tiket','unduh','download','scan','akses','registrasi','ulang','hari']},
  {q:'Jam berapa harus datang?',
   a:'Registrasi ulang <b>07.00–08.00</b>. Acara dimulai pukul <b>08.00</b>.',
   k:['jam','datang','pagi','mulai','telat','terlambat','pukul']},
  {q:'Bagaimana format pertandingannya?',
   a:'Fase grup, lalu sistem gugur. Pertandingan <b>Race to 4</b> dengan golden point pada 40–40, tanpa tie-break. <b>Final Race to 6</b>, dan final ketiga kategori dimainkan bersamaan.',
   k:['format','aturan','sistem','race','game','skor','poin','golden','point','tie','break','grup','gugur','final','semifinal','pertandingan','match']},
  {q:'Kapan technical meeting?',
   a:'Tanggal technical meeting masih menyusul dan akan diumumkan ke PIC DPC.',
   k:['technical','meeting','tm','rapat','briefing']},
  {q:'Siapa yang bisa dihubungi?',
   a:'Narahubung lewat chat WhatsApp: <a href="https://wa.me/6281333526593" target="_blank" rel="noopener">Kenny (0813 3352 6593)</a> dan <a href="https://wa.me/628195002295" target="_blank" rel="noopener">Arinta (0819 5002 295)</a>.',
   k:['kontak','hubungi','narahubung','cp','wa','whatsapp','telepon','telpon','nomor','panitia','tanya']}
];

(function(){
  var STOP = ['boleh','ikut','gimana','bagaimana','berapa','siapa','mana','wajib','harus','cara','pemain','padel','hiswana','apa','apakah','yang','dan','di','ke','dari','untuk','saya','kami','kita','kak','min','admin','mau','ingin','tanya','dong','ya','nya','ini','itu','bisa','gak','nggak','tidak','ada','juga','atau','dengan','pada','kalau','kalo','bang','pak','bu','mas','mbak','tolong','mohon','info','halo','hai'];
  var WA = [['Kenny','6281333526593'],['Arinta','628195002295']];

  function norm(s){ return (' '+String(s).toLowerCase().replace(/[^a-z0-9,.]+/g,' ')+' '); }
  function words(s){
    var w = norm(s).split(' '), out = [];
    for (var i=0;i<w.length;i++){ var x=w[i].replace(/^[.,]+|[.,]+$/g,''); if (x.length>5 && /nya$/.test(x)) x = x.slice(0,-3);
      if (x && STOP.indexOf(x)<0) out.push(x); }
    return out;
  }
  function score(item, qw){
    var s = 0, hay = norm(item.q+' '+item.a.replace(/<[^>]+>/g,' '));
    for (var i=0;i<qw.length;i++){
      var w = qw[i], hit = false;
      for (var j=0;j<item.k.length;j++){
        var k = item.k[j];
        if (w===k){ s+=3; hit=true; break; }
        if (w.length>3 && k.length>3 && (w.indexOf(k)===0 || k.indexOf(w)===0)){ s+=2; hit=true; break; }
      }
      if (!hit && w.length>2 && hay.indexOf(' '+w)>=0) s+=1;
    }
    return s;
  }
  function esc(s){ return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];}); }
  function card(item, open){
    return '<details class="fq"'+(open?' open':'')+'><summary>'+esc(item.q)+'</summary><div class="fa">'+item.a+'</div></details>';
  }
  function waLinks(text){
    var t = encodeURIComponent('Halo, saya mau tanya soal Turnamen Padel Hiswana: '+text), ic = (document.querySelector('#kontak .wi')||{}).innerHTML||'';
    var h = '';
    for (var i=0;i<WA.length;i++) h += '<div class="c2"><a class="wa" href="https://wa.me/'+WA[i][1]+'?text='+t+'" target="_blank" rel="noopener"><span class="wi">'+ic+'</span><b>Tanya '+WA[i][0]+'</b><span>Pertanyaan Anda sudah terisi</span></a></div>';
    return h;
  }

  function ask(){
    var inp = document.getElementById('fqIn'), out = document.getElementById('fqOut');
    var text = inp.value.replace(/^\s+|\s+$/g,'');
    if (!text){ out.innerHTML = ''; return; }
    var qw = words(text), ranked = [];
    for (var i=0;i<FAQ.length;i++){ var s = score(FAQ[i], qw); if (s>=2) ranked.push([s,i]); }
    ranked.sort(function(a,b){ return b[0]-a[0] || a[1]-b[1]; });
    var h = '';
    if (ranked.length){
      var top = ranked[0][0];
      h += '<div class="lbl" style="margin:4px 0 8px">Jawaban yang paling cocok</div>';
      for (var r=0;r<ranked.length && r<3;r++){ if (ranked[r][0] < top*0.67) break; h += card(FAQ[ranked[r][1]], r===0); }
      h += '<div class="small muted fqno">Belum terjawab? Chat panitia: '
        + '<a href="https://wa.me/'+WA[0][1]+'?text='+encodeURIComponent('Halo, saya mau tanya soal Turnamen Padel Hiswana: '+text)+'" target="_blank" rel="noopener">'+WA[0][0]+'</a> atau '
        + '<a href="https://wa.me/'+WA[1][1]+'?text='+encodeURIComponent('Halo, saya mau tanya soal Turnamen Padel Hiswana: '+text)+'" target="_blank" rel="noopener">'+WA[1][0]+'</a>.</div>';
    } else {
      h += '<div class="note fqnone"><b>Pertanyaan ini belum ada jawabannya di sini.</b><br><span class="small">Kirim ke panitia lewat WhatsApp, pertanyaan Anda langsung terisi.</span></div>'
        + '<div class="g">'+waLinks(text)+'</div>';
    }
    out.innerHTML = h;
  }

  function init(){
    var box = document.getElementById('faq');
    if (!box) return;
    var all = '';
    for (var i=0;i<FAQ.length;i++) all += card(FAQ[i], false);
    document.getElementById('fqAll').innerHTML = all;
    var inp = document.getElementById('fqIn'), t = null;
    document.getElementById('fqForm').onsubmit = function(e){ if (e && e.preventDefault) e.preventDefault(); ask(); return false; };
    inp.oninput = function(){ clearTimeout(t); t = setTimeout(ask, 350); };
    var chips = document.querySelectorAll('#faq .fqchip');
    for (var c=0;c<chips.length;c++) chips[c].onclick = function(){ inp.value = this.getAttribute('data-q'); ask(); };
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
  window.FAQ_ASK = ask;
})();
