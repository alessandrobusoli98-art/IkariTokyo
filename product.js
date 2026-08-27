/* ── PRELOADER ───────────────────────────────────────────── */
(function () {
  var CDN_PRE = 'https://res.cloudinary.com/do2eltwlu/image/upload/f_auto,q_90/assets/images/products/';
  var IMGS = [
    CDN_PRE + 'ts-rengoku-life.png',
    CDN_PRE + 'ts-zoroblack-life.png',
    CDN_PRE + 'hd-zoroblack-life.png',
  ];

  var pre = document.getElementById('preloader');
  if (!pre) return;

  /* Skip preloader on every navigation after the first */
  if (sessionStorage.getItem('ikari_preloaded')) {
    pre.style.display = 'none';
    return;
  }
  sessionStorage.setItem('ikari_preloaded', '1');

  document.body.style.overflow = 'hidden';

  var imgEl = document.getElementById('preloaderImg');
  var idx = Math.floor(Math.random() * IMGS.length);
  if (imgEl) imgEl.src = IMGS[idx];

  var startTime = Date.now();
  var MIN_MS = 1200;

  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      if (imgEl) imgEl.classList.add('is-active');
    });
  });

  function dismiss() {
    var elapsed = Date.now() - startTime;
    var wait = Math.max(0, MIN_MS - elapsed);
    setTimeout(function () {
      pre.classList.add('is-done');
      document.body.style.overflow = '';
      pre.addEventListener('transitionend', function (e) {
        if (e.propertyName === 'clip-path') pre.style.display = 'none';
      }, { once: true });
    }, wait);
  }

  if (document.readyState === 'complete') {
    dismiss();
  } else {
    window.addEventListener('load', dismiss);
    setTimeout(dismiss, 3500);
  }
})();

/* ── PAGE TRANSITION ─────────────────────────────────────── */
function navigateTo(url) {
  var el = document.getElementById('page-exit');
  if (!el) {
    el = document.createElement('div');
    el.id = 'page-exit';
    document.body.appendChild(el);
  }
  el.getBoundingClientRect();
  el.classList.add('is-active');
  setTimeout(function () { window.location.href = url; }, 600);
}

/* Remove exit overlay when browser restores page from bfcache (back button) */
window.addEventListener('pageshow', function (e) {
  if (e.persisted) {
    var el = document.getElementById('page-exit');
    if (el) el.remove();
  }
});

/* ── IMAGE BASE ──────────────────────────────────────────── */
const CDN = 'https://res.cloudinary.com/do2eltwlu/image/upload/f_auto,q_90/';
const P = CDN + 'assets/images/products/';

function imgSrc(path) { return path || ''; }

/* ── PRODUCTS (mirrored from script.js) ──────────────────── */
const products = [
  // NUOVA COLLEZIONE
  { id:'ts-35', color:'white', name:'Asta — Demon Form',        series:'Black Clover',          cat:'tshirt', price:35, imgB: P+'ts-astademon2-B.png',            imgW: P+'ts-astademon2-W.png',            sizes:['XS','S','M','L','XL','XXL'], desc:'Quando la spada del giuramento non basta più, resta solo la rabbia del demone. La ASTA DEMON FORM tee cattura il momento in cui il Cavaliere Magico senza magia scatena tutto il potere del suo grimorio a cinque foglie — un design in bianco e nero crudo, diretto come un pugno.<br><br>Non ho bisogno di magia per diventare Imperatore Magico.' },
  { id:'ts-36', color:'black', name:'Broly — Nera',             series:'Dragon Ball Super',     cat:'tshirt', price:35, imgB: P+'ts-brolyblack-B.png',            imgW: P+'ts-brolyblack-W.png',            sizes:['XS','S','M','L','XL','XXL'], desc:'Rabbia allo stato puro. La BROLY tee porta sul tessuto la furia del Super Saiyan Leggendario, il guerriero il cui potere cresce senza limiti a ogni respiro — un grafico monocromatico che pesa quanto il suo pugno.<br><br>Nessuno sopravvive alla leggenda.' },
  { id:'ts-37', color:'white', name:'Broly — Bianca',           series:'Dragon Ball Super',     cat:'tshirt', price:35, imgB: P+'ts-brolywhite-B.png',            imgW: P+'ts-brolywhite-W.png',            sizes:['XS','S','M','L','XL','XXL'], desc:'Rabbia allo stato puro. La BROLY tee porta sul tessuto la furia del Super Saiyan Leggendario, il guerriero il cui potere cresce senza limiti a ogni respiro — un grafico monocromatico che pesa quanto il suo pugno.<br><br>Nessuno sopravvive alla leggenda.' },
  { id:'ts-38', color:'black', name:'Chopper — Straw Hat Crew',  series:'One Piece',            cat:'tshirt', price:35, imgB: P+'ts-chopper2-B.png',              imgW: P+'ts-chopper2-W.png',              sizes:['XS','S','M','L','XL','XXL'], desc:'Dolcezza pericolosa. La CHOPPER STRAW HAT CREW tee porta il medico di bordo più amato del Grand Line in un design pastello che mescola kawaii e streetwear — un capo per chi non ha mai smesso di sorridere leggendo One Piece.<br><br>Non sono felice, idiota!' },
  { id:'ts-40', color:'white', name:'Deku — Full Cowl',          series:'My Hero Academia',     cat:'tshirt', price:35, imgB: P+'ts-dekufullcowl2-B.png',         imgW: P+'ts-dekufullcowl2-W.png',         sizes:['XS','S','M','L','XL','XXL'], desc:'Il momento in cui One For All prende forma. La DEKU FULL COWL tee cattura l\'attivazione della tecnica che ha reso Izuku un vero eroe — un design manga raw, essenziale come il suo primo salto senza rete.<br><br>Plus Ultra — oltre ogni limite.' },
  { id:'ts-41', color:'white', name:'One For All 100%',          series:'My Hero Academia',     cat:'tshirt', price:35, imgB: P+'ts-oneforall1002-B.png',         imgW: P+'ts-oneforall1002-W.png',         sizes:['XS','S','M','L','XL','XXL'], desc:'Il passaggio di consegne più importante della serie. La ONE FOR ALL 100% tee porta su tessuto l\'eredità che passa da All Might a chi sceglie di portarla — un pannello manga che pesa quanto sette generazioni di eroi.<br><br>Eri-chan... mi presti la tua forza?' },
  { id:'ts-42', color:'black', name:'Escanor',                   series:'The Seven Deadly Sins', cat:'tshirt', price:35, imgB: P+'ts-escanor2-B.png',              imgW: P+'ts-escanor2-W.png',              sizes:['XS','S','M','L','XL','XXL'], desc:'Il peccato dell\'Orgoglio, in forma umana. La ESCANOR tee porta il potere assoluto del Sin più temuto dei Sette Peccati Capitali — typography giapponese, rosso sangue su nero vintage, per chi non conosce sconfitta al mezzogiorno.<br><br>Io sono il sole stesso.' },
  { id:'ts-43', color:'black', name:'Ichigo — Hollow Mode',      series:'Bleach',               cat:'tshirt', price:35, imgB: P+'ts-ichigohollow2-B.png',         imgW: P+'ts-ichigohollow2-W.png',         sizes:['XS','S','M','L','XL','XXL'], desc:'Quando l\'anima cede alla maschera. La ICHIGO HOLLOW MODE tee porta il Bankai più oscuro di Bleach in un design graffiti-style su base vintage-wash — per chi ha sempre tifato per il lato più pericoloso del protagonista.<br><br>Bankai — e non resta più nulla di umano.' },
  { id:'ts-45', color:'white', name:'Luffy — Reaction',          series:'One Piece',            cat:'tshirt', price:35, imgB: P+'ts-luffyreaction2-B.png',        imgW: P+'ts-luffyreaction2-W.png',        sizes:['XS','S','M','L','XL','XXL'], desc:'L\'espressione più iconica di Luffy, ingrandita e stampata senza pietà. La LUFFY REACTION tee porta l\'energia comica e assurda di One Piece in un grafico pop-art che strappa un sorriso a chiunque lo riconosca.<br><br>Sono io il Re dei Pirati... eh?!' },
  { id:'ts-46', color:'white', name:'Mahoraga',                  series:'Jujutsu Kaisen',       cat:'tshirt', price:35, imgB: P+'ts-mahoraga2-B.png',             imgW: P+'ts-mahoraga2-W.png',             sizes:['XS','S','M','L','XL','XXL'], desc:'Lo Shikigami che si adatta a tutto, tranne che alla sconfitta. La MAHORAGA tee porta su tessuto la divinità a otto teste di Jujutsu Kaisen — linee pulite, dettagli dorati, per chi sa che ogni colpo lo rende solo più forte.<br><br>Nessuna tecnica lo colpisce due volte.' },
  { id:'ts-47', color:'black', name:'Rengoku — Flame Hashira',   series:'Demon Slayer',         cat:'tshirt', price:35, imgB: P+'ts-rengokuflame2-B.png',         imgW: P+'ts-rengokuflame2-W.png',         sizes:['XS','S','M','L','XL','XXL'], desc:'Metà volto, tutta la fiamma. La RENGOKU FLAME HASHIRA tee porta lo sguardo determinato del Pilastro delle Fiamme in un design a contrasto essenziale — per chi porta il cuore ardente di Kyojuro anche fuori dal Treno Mugen.<br><br>Rendi orgogliosa la tua anima.' },
  { id:'ts-48', color:'white', name:'Scout Regiment',            series:'Attack on Titan',      cat:'tshirt', price:35, imgB: P+'ts-scoutregiment2-B.png',        imgW: P+'ts-scoutregiment2-W.png',        sizes:['XS','S','M','L','XL','XXL'], desc:'Le ali della libertà, tra ferro e ciliegi in fiore. La SCOUT REGIMENT tee porta lo stemma del Corpo di Ricerca di Attack on Titan in un design che mescola militarismo e delicatezza — un contrasto che è tutta la serie in un\'immagine.<br><br>Dedica il tuo cuore.' },
  { id:'ts-50', color:'white', name:'Vegeta — Super Saiyan',     series:'Dragon Ball Super',    cat:'tshirt', price:35, imgB: P+'ts-vegetassj2-B.png',            imgW: P+'ts-vegetassj2-W.png',            sizes:['XS','S','M','L','XL','XXL'], desc:'Line-art pura per il Principe dei Saiyan. La VEGETA SUPER SAIYAN tee porta la trasformazione più iconica di Dragon Ball in un disegno essenziale, solo tratto nero su bianco — per chi preferisce l\'orgoglio alla popolarità.<br><br>Il mio orgoglio da Saiyan non conosce limiti.' },
  { id:'ts-51', color:'black', name:'Thunder Breathing — Nera',  series:'Demon Slayer',         cat:'tshirt', price:35, imgB: P+'ts-thunderbreathingblack-B.png', imgW: P+'ts-thunderbreathingblack-W.png', sizes:['XS','S','M','L','XL','XXL'], desc:'Un lampo che non aspetta il secondo colpo. La THUNDER BREATHING tee porta su tessuto l\'estetica della tecnica più rapida di Demon Slayer — silhouette dorata, tipografia giapponese, per chi colpisce una volta sola e basta.<br><br>Il tuono non si ripete due volte.' },
  { id:'ts-52', color:'white', name:'Magic Knight Captain',      series:'Black Clover',         cat:'tshirt', price:35, imgB: P+'ts-magicknightcaptain2-B.png',   imgW: P+'ts-magicknightcaptain2-W.png',   sizes:['XS','S','M','L','XL','XXL'], desc:'La rabbia di chi non si è mai arreso. La MAGIC KNIGHT CAPTAIN tee porta un dialogo diretto dal manga di Black Clover, in formato fumetto puro bianco e nero — per chi crede che il potere si dimostri, non si racconti.<br><br>Questa volta portalo dritto in faccia.' },
  { id:'ts-53', color:'black', name:'Zoro — Greatest Swordsman', series:'One Piece',            cat:'tshirt', price:35, imgB: P+'ts-zoroswordsman2-B.png',        imgW: P+'ts-zoroswordsman2-W.png',        sizes:['XS','S','M','L','XL','XXL'], desc:'Una promessa scritta a mano, un sorriso da spaccone. La ZORO GREATEST SWORDSMAN tee porta il volto più temerario del Grand Line in un design graffiti su base vintage-wash — per chi ha fatto lo stesso giuramento di Zoro e non lo tradirà mai.<br><br>Diventerò il più grande spadaccino del mondo.' },
  { id:'ts-54', color:'white', name:'Thunder Breathing — Bianca', series:'Demon Slayer',        cat:'tshirt', price:35, imgB: P+'ts-thunderbreathingwhite-B.png', imgW: P+'ts-thunderbreathingwhite-W.png', sizes:['XS','S','M','L','XL','XXL'], desc:'Un lampo che non aspetta il secondo colpo. La THUNDER BREATHING tee porta su tessuto l\'estetica della tecnica più rapida di Demon Slayer — silhouette dorata, tipografia giapponese, per chi colpisce una volta sola e basta.<br><br>Il tuono non si ripete due volte.' },
  { id:'ts-55', color:'white', name:'Gojo Satoru — The Honored One', series:'Jujutsu Kaisen',   cat:'tshirt', price:35, imgB: P+'ts-gojohonoredone-B.png',        imgW: P+'ts-gojohonoredone-W.png',        sizes:['XS','S','M','L','XL','XXL'], desc:'Capovolto, in caduta libera, e comunque il più forte della stanza. La THE HONORED ONE tee porta lo sguardo di Gojo Satoru in un design tipografico essenziale, blu elettrico su base neutra — per chi non ha mai avuto bisogno di toccare terra per vincere.<br><br>Sono il più forte. Nessun dominio può cambiarlo.' },

  // T-SHIRT
  { id:'ts-1', color:'black',  name:'Gojo Satoru',        series:'Jujutsu Kaisen',         cat:'tshirt', price:35, imgB: P+'ts-gojo-B.png',          imgW: P+'ts-gojo-W.png',          sizes:['XS','S','M','L','XL','XXL'], desc:'Ispirata al dominio infinito del più forte stregone dell\'era moderna, la GOJO LIMITLESS tee porta l\'energia del Sei Occhi in forma grafica. Un design monocromatico e sovraccarico di simbolismo — per chi conosce il vuoto e lo rispetta.<br><br>Un dominio. Nessuna uscita.' },
  { id:'ts-3', color:'white',  name:'Bakugo',             series:'My Hero Academia',        cat:'tshirt', price:35, imgB: P+'ts-bakugo-B.png',         imgW: P+'ts-bakugo-W.png',        sizes:['XS','S','M','L','XL','XXL'], desc:'Esplosiva quanto il suo Quirk. La BAKUGO tee porta l\'aggressività visiva e l\'ambizione bruciante del ragazzo destinato al numero uno in un design streetwear che non chiede permesso e non accetta secondi posti.<br><br>Die first — before I let you win.' },
  { id:'ts-4', color:'white',  name:'Deku',               series:'My Hero Academia',        cat:'tshirt', price:35, imgB: P+'ts-deku-B.png',           imgW: P+'ts-deku-W.png',          sizes:['XS','S','M','L','XL','XXL'], desc:'Dall\'anonimato alla leggenda. La DEKU tee racconta la traiettoria di chi ha scelto di credere quando nessuno ci credeva per lui — un grafico essenziale e potente ispirato all\'estetica raw del manga di Horikoshi.<br><br>Plus Ultra — sempre.' },
  { id:'ts-5', color:'black',  name:'Chainsaw Man',       series:'Chainsaw Man',            cat:'tshirt', price:35, imgB: P+'ts-chainsaw-B.png',       imgW: P+'ts-chainsaw-W.png',      sizes:['XS','S','M','L','XL','XXL'], desc:'Il caos di Tokyo si porta addosso. La CHAINSAW MAN GROUP tee riunisce i protagonisti dell\'shōnen più disruptivo degli ultimi anni in una grafica densa, underground, ispirata alla doujinshi culture di Akihabara.<br><br>Power. Aki. Denji. Il diavolo ha molte facce.' },
  { id:'ts-6', color:'black',  name:'Chainsaw Man Purple', series:'Chainsaw Man',            cat:'tshirt', price:35, imgB: P+'ts-chainsawkatana-B.png', imgW: P+'ts-chainsawkatana-W.png', sizes:['XS','S','M','L','XL','XXL'], desc:'L\'ossessione e il contratto. La CHAINSAW MAN PURPLE tee porta l\'estetica più psichedelica della serie di Fujimoto — grafica ad alto contrasto su nero, per chi conosce il lato più oscuro del manga.<br><br>Il potere ha sempre un prezzo.' },
  { id:'ts-7', color:'black',  name:'Denji',              series:'Chainsaw Man',            cat:'tshirt', price:35, imgB: P+'ts-denji-B.png',          imgW: P+'ts-denji-W.png',         sizes:['XS','S','M','L','XL','XXL'], desc:'Un ragazzo, un contratto, una motosega nel petto. La DENJI tee porta l\'energia grezza e disperata del protagonista di Chainsaw Man quando tutto era ancora fame, debiti e sogni piccoli su carta.<br><br>Tutto quello che voleva era un pasto caldo.' },
  { id:'ts-8', color:'black',  name:'Power',              series:'Chainsaw Man',            cat:'tshirt', price:35, imgB: P+'ts-power-B.png',          imgW: P+'ts-power-W.png',         sizes:['XS','S','M','L','XL','XXL'], desc:'Caotica. Imprevedibile. Memorabile. La POWER tee cattura l\'energia esplosiva del Diavolo del Sangue in forma grafica — un capo per chi vuole indossare la figura femminile più iconica dell\'anime degli ultimi anni.<br><br>Io sono Power. Questo basta.' },
  { id:'ts-9', color:'black',  name:'Itachi Uchiha',      series:'Naruto',                  cat:'tshirt', price:35, imgB: P+'ts-itachi-B.png',         imgW: P+'ts-itachi-W.png',        sizes:['XS','S','M','L','XL','XXL'], desc:'Silenzio, sacrificio, leggenda. La ITACHI tee porta sul tessuto l\'eredità del ninja che ha sopportato tutto — un design sobrio e intenso ispirato all\'estetica ANBU e alla filosofia silenziosa del clan Uchiha.<br><br>Non diventerai mai un eroe così.' },
  { id:'ts-10', color:'black', name:'Sharingan',          series:'Naruto',                  cat:'tshirt', price:35, imgB: P+'ts-sharingan-B.png',      imgW: P+'ts-sharingan-W.png',     sizes:['XS','S','M','L','XL','XXL'], desc:'Un occhio che vede tutto, ricorda tutto, copia tutto. La SHARINGAN tee porta il simbolo più riconoscibile del clan Uchiha in un grafico geometrico e ipnotico che unisce misticismo ninja e streetwear contemporaneo.<br><br>Il potere degli occhi che non si chiudono mai.' },
  { id:'ts-11', color:'white', name:'Rock Lee',           series:'Naruto',                  cat:'tshirt', price:35, imgB: P+'ts-rocklee-B.png',        imgW: P+'ts-rocklee-W.png',       sizes:['XS','S','M','L','XL','XXL'], desc:'Nessun ninjutsu. Nessun genjutsu. Solo allenamento, sangue e determinazione assoluta. La ROCK LEE tee è un omaggio al ninja più umano di Konoha — per chi crede nel sacrificio e sa che i talenti si battono.<br><br>La dedizione non si batte. Mai.' },
  { id:'ts-12', color:'black', name:'Jiraiya',            series:'Naruto',                  cat:'tshirt', price:35, imgB: P+'ts-jiraiya-B.png',        imgW: P+'ts-jiraiya-W.png',       sizes:['XS','S','M','L','XL','XXL'], desc:'Sannin. Maestro. Leggenda. La JIRAIYA tee porta l\'eredità del ninja più amato di Konoha in un design che mescola l\'estetica dei pergameni ninja con la cultura della strada di Akihabara.<br><br>La rana saggia non dimentica mai.' },
  { id:'ts-13', color:'white', name:'Monkey D. Luffy',    series:'One Piece',               cat:'tshirt', price:35, imgB: P+'ts-luffy-B.png',          imgW: P+'ts-luffy-W.png',         sizes:['XS','S','M','L','XL','XXL'], desc:'La libertà non si chiede — si prende. La LUFFY tee porta l\'energia infinita del futuro Re dei Pirati in un capo pensato per chi insegue i propri sogni senza mai voltarsi indietro.<br><br>Io diventerò il Re dei Pirati.' },
  { id:'ts-14', color:'black', name:'Luffy — Nika',       series:'One Piece',               cat:'tshirt', price:35, imgB: P+'ts-luffynika-B.png',      imgW: P+'ts-luffynika-W.png',     sizes:['XS','S','M','L','XL','XXL'], desc:'Il sole, la gioia, la libertà assoluta. La LUFFY NIKA tee cattura il Gear 5 — l\'awakening del Dio del Sole, il momento più epico di One Piece trasformato in un capo che porta luce in ogni outfit.<br><br>Il Dio del Sole è tornato.' },
  { id:'ts-15', color:'black', name:'Roronoa Zoro',       series:'One Piece',               cat:'tshirt', price:35, imgB: P+'ts-zoro-B.png',           imgW: P+'ts-zoro-W.png',          sizes:['XS','S','M','L','XL','XXL'], desc:'Tre spade. Una promessa. Nessuna sconfitta. La ZORO WANTED tee porta l\'estetica piratesca del Cacciatore di Taglie più temuto del Grand Line — cruda e diretta come il suo stile di combattimento.<br><br>Nessuno mi farà mai abbassare la testa.' },
  { id:'ts-16', color:'black', name:'Akaza',              series:'Demon Slayer',            cat:'tshirt', price:35, imgB: P+'ts-akaza-B.png',          imgW: P+'ts-akaza-W.png',         sizes:['XS','S','M','L','XL','XXL'], desc:'Ispirata all\'estetica manga vintage e allo streetwear giapponese underground, la AKAZA tee unisce energia anime e design contemporaneo in un capo dal forte impatto visivo. Grafica monocromatica ad alto contrasto con typography giapponese in stile Tokyo night culture.<br><br>Un pezzo per collezionisti anime e appassionati di streetwear.' },
  { id:'ts-17', color:'black', name:'Akaza v2',           series:'Demon Slayer',            cat:'tshirt', price:35, imgB: P+'ts-akaza2-B.png',         imgW: P+'ts-akaza2-W.png',        sizes:['XS','S','M','L','XL','XXL'], desc:'La seconda forma di un\'ossessione. La AKAZA V2 tee esplora l\'Upper Moon 3 con una lettura più raw e intensa — un design che cattura la contraddizione tra la bellezza del combattimento e la tragedia della sua esistenza.<br><br>Il demone che non accetta mai la debolezza.' },
  { id:'ts-18', color:'black', name:'Rengoku',            series:'Demon Slayer',            cat:'tshirt', price:35, imgB: P+'ts-rengoku-B.png',        imgW: P+'ts-rengoku-W.png',       sizes:['XS','S','M','L','XL','XXL'], desc:'Ardente come la sua fiamma. La RENGOKU tee porta il calore e l\'intensità del Pilastro delle Fiamme in un capo ispirato alla Mugen Train arc — una delle sequenze più potenti dell\'anime moderno.<br><br>Il cuore arde. Non si spegne mai.' },
  { id:'ts-19', color:'black', name:'Inosuke',            series:'Demon Slayer',            cat:'tshirt', price:35, imgB: P+'ts-inosuke-B.png',        imgW: P+'ts-inosuke-W.png',       sizes:['XS','S','M','L','XL','XXL'], desc:'Selvaggio, istintivo, inaspettatamente iconico. La INOSUKE tee porta l\'energia brutale del guerriero cresciuto tra i cinghiali in un design streetwear che non chiede permesso e non si spiega.<br><br>Nessuno mi ha mai detto come si fa.' },
  { id:'ts-20', color:'white', name:'Evangelion',         series:'Neon Genesis Evangelion', cat:'tshirt', price:35, imgB: P+'ts-eva-B.png',            imgW: P+'ts-eva-W.png',           sizes:['XS','S','M','L','XL','XXL'], desc:'NERV. Evangelion. Fine dell\'infanzia. La EVA-01 tee porta il peso simbolico di una serie che ha ridefinito l\'anime in un design che mescola iconografia mecha e psicologia junghiana per chi non dimentica.<br><br>God\'s in his heaven — all\'s right with the world.' },
  { id:'ts-21', color:'white', name:'Frieren',            series:'Frieren',                 cat:'tshirt', price:35, imgB: P+'ts-frieren-B.png',        imgW: P+'ts-frieren-W.png',       sizes:['XS','S','M','L','XL','XXL'], desc:'Mille anni condensati in una grafica. La FRIEREN tee cattura il tempo sospeso dell\'elfa maga che non sa cosa significhi dire addio — un design malinconico e bellissimo per chi ama l\'anime slow-burn.<br><br>Il tempo passa. Lei no.' },
  { id:'ts-23', color:'white', name:'Zaraki',             series:'Bleach',                  cat:'tshirt', price:35, imgB: P+'ts-zaraki-B.png',          imgW: P+'ts-zaraki-W.png',        sizes:['XS','S','M','L','XL','XXL'], desc:'Nessuna tecnica. Solo forza pura e istinto di battaglia. La ZARAKI tee porta il Capitano della Squadra 11 in un design grezzo e brutale — per chi non ha bisogno di trucchi per vincere.<br><br>Non conosco la parola resa.' },
  { id:'ts-24', color:'white', name:'Kaneki',             series:'Tokyo Ghoul',             cat:'tshirt', price:35, imgB: P+'ts-kaneki-B.png',         imgW: P+'ts-kaneki-W.png',        sizes:['XS','S','M','L','XL','XXL'], desc:'Bianco diventato nero. Umano diventato altro. La KANEKI tee porta la trasformazione più angosciante dell\'anime psicologico in un design che parla di identità perduta e potere ritrovato.<br><br>Non sei più quello di prima. Forse è meglio così.' },
  { id:'ts-25', color:'black', name:'Mikey',              series:'Tokyo Revengers',         cat:'tshirt', price:35, imgB: P+'ts-mikey-B.png',          imgW: P+'ts-mikey-W.png',         sizes:['XS','S','M','L','XL','XXL'], desc:'Il ragazzo che comandava le strade di Tokyo. La MIKEY tee porta l\'estetica bosozoku e il carisma inarrestabile del fondatore dei Toman in un capo che respira anni \'80 giapponesi e streetwear contemporaneo.<br><br>Nessuno tocca i miei amici.' },
  { id:'ts-26', color:'white', name:'Eren Yeager',        series:'Attack on Titan',         cat:'tshirt', price:35, imgB: P+'ts-eren-B.png',           imgW: P+'ts-eren-W.png',          sizes:['XS','S','M','L','XL','XXL'], desc:'Libertà. A qualsiasi costo. La EREN YEAGER tee porta l\'arco narrativo più controverso e potente dell\'anime moderno su tessuto — un design che non sceglie da che parte stare, ma non dimentica mai.<br><br>Eravamo liberi fin dall\'inizio.' },
  { id:'ts-27', color:'white', name:'Zenitsu',            series:'Demon Slayer',            cat:'tshirt', price:35, imgB: P+'ts-zenitsu-B.png',        imgW: P+'ts-zenitsu-W.png',       sizes:['XS','S','M','L','XL','XXL'], desc:'Un lampo. Un respiro. Una forma impossibile. La ZENITSU tee cattura il paradosso del guerriero che dorme per combattere — il design più inaspettato della collezione Demon Slayer per chi conosce il potere nascosto.<br><br>Godspeed — quando chiude gli occhi.' },
  { id:'ts-28', color:'white', name:'Misa Amane',         series:'Death Note',              cat:'tshirt', price:35, imgB: P+'ts-misa-B.png',           imgW: P+'ts-misa-W.png',          sizes:['XS','S','M','L','XL','XXL'], desc:'Dualità. Oscurità. Devozione assoluta. La MISA AMANE tee porta l\'iconografia gothic lolita e la fedeltà estrema della Second Kira in un design che mescola fashion e morte con l\'eleganza di Death Note.<br><br>Per te scrivo il tuo nome.' },
  { id:'ts-29', color:'black', name:'Arise',              series:'Solo Leveling',           cat:'tshirt', price:35, imgB: P+'ts-arise-B.png',          imgW: P+'ts-arise-W.png',         sizes:['XS','S','M','L','XL','XXL'], desc:'Il momento dell\'Awakening. La ARISE tee porta la scena più iconica di Solo Leveling in forma grafica — il grido di battaglia del Shadow Monarch che ridisegna le regole del potere.<br><br>Sorgi. Adesso comandano le ombre.' },
  { id:'ts-30', color:'white', name:'Midoriya',           series:'My Hero Academia',        cat:'tshirt', price:35, imgB: P+'ts-midoriya-B.png',       imgW: P+'ts-midoriya-W.png',      sizes:['XS','S','M','L','XL','XXL'], desc:'Il nome vero dell\'eroe. La MIDORIYA tee porta l\'identità autentica del ragazzo nato senza Quirk che ha scelto di non smettere mai di correre — un design più intimo e personale rispetto all\'alias da battaglia.<br><br>Izuku Midoriya. Questo è il mio nome.' },
  { id:'ts-31', color:'white', name:'Arale',              series:'Dr. Slump',               cat:'tshirt', price:35, imgB: P+'ts-arale-B.png',          imgW: P+'ts-arale-W.png',         sizes:['XS','S','M','L','XL','XXL'], desc:'Un robot bambina, un villaggio folle, un\'ironia che non invecchia mai. La ARALE tee porta l\'energia surreale di Dr. Slump nello streetwear contemporaneo — un design nostalgico per chi conosce le radici di Akira Toriyama.<br><br>Ncha! — sempre.' },
  { id:'ts-32', color:'white', name:'Legends',            series:'Multi-Anime',             cat:'tshirt', price:35, imgB: P+'ts-legends-B.png',        imgW: P+'ts-legends-W.png',       sizes:['XS','S','M','L','XL','XXL'], desc:'Un capo. Tutti i mondi. La LEGENDS tee riunisce i personaggi più iconici dell\'animazione giapponese in una grafica densa — una celebrazione del medium per chi non ha mai scelto una serie sola.<br><br>Un universo. Infinite storie.' },
  { id:'ts-33', color:'black', name:'Dan Da Dan',         series:'Dan Da Dan',              cat:'tshirt', price:35, imgB: P+'ts-dandadan-B.png',       imgW: P+'ts-dandadan-W.png',      sizes:['XS','S','M','L','XL','XXL'], desc:'Alieni, yokai, amore adolescenziale e assurdità totale. La DAN DA DAN tee porta il caos creativo dell\'anime più esplosivo dell\'ultima stagione in un design visivamente sovraccarico — nel senso migliore.<br><br>Non capisci? È meglio così.' },

  // FELPE / HOODIES
  { id:'hd-1', color:'black',  name:'Gojo Satoru',       series:'Jujutsu Kaisen',          cat:'hoodie', price:65, imgB: P+'hd-gojo-B.png',        imgW: P+'hd-gojo-W.png',        sizes:['S','M','L','XL','XXL'], desc:'L\'invincibilità si indossa. La GOJO SATORU hoodie porta il carisma e il potere del più forte stregone dell\'era moderna in un capo costruito per chi non teme nessun dominio — pesante, strutturato, senza compromessi.<br><br>Nessun limite. Nessun dominio che regge.' },
  { id:'hd-2', color:'white',  name:'Bakugo',            series:'My Hero Academia',         cat:'hoodie', price:65, imgB: P+'hd-bakugo-B.png',      imgW: P+'hd-bakugo-W.png',      sizes:['S','M','L','XL','XXL'], desc:'Esplosiva anche come felpa. La BAKUGO hoodie porta la personalità incandescente del futuro numero uno in un capo da indossare con la stessa sicurezza e aggressività del suo protagonista.<br><br>Voglio il primo posto. Sempre.' },
  { id:'hd-3', color:'black',  name:'Chainsaw Man',      series:'Chainsaw Man',             cat:'hoodie', price:65, imgB: P+'hd-chainsaw-B.png',    imgW: P+'hd-chainsaw-W.png',    sizes:['S','M','L','XL','XXL'], desc:'Il caos che si porta addosso. La CHAINSAW MAN hoodie porta l\'estetica horror-punk della serie di Fujimoto in un capo da streetwear underground — pesante, scuro, impossibile da ignorare.<br><br>Il contratto è già firmato.' },
  { id:'hd-4', color:'black',  name:'Inosuke',           series:'Demon Slayer',             cat:'hoodie', price:65, imgB: P+'hd-inosuke-B.png',     imgW: P+'hd-inosuke-W.png',     sizes:['S','M','L','XL','XXL'], desc:'Feroce. Selvaggio. Tuo. La INOSUKE hoodie porta l\'energia indomita del guerriero cresciuto nella natura in un capo costruito per chi non segue regole e non chiede spiegazioni.<br><br>Fai prima a non dirmi cosa fare.' },
  { id:'hd-5', color:'white',  name:'Frieren',           series:'Frieren',                  cat:'hoodie', price:65, imgB: P+'hd-frieren-B.png',     imgW: P+'hd-frieren-W.png',     sizes:['S','M','L','XL','XXL'], desc:'Il tempo scorre. Lei osserva. La FRIEREN hoodie è il capo per i silenzi profondi — un design malinconico e raffinato per chi ha vissuto questo anime come un\'esperienza contemplativa più che d\'intrattenimento.<br><br>Non è tristezza. È memoria.' },
  { id:'hd-6', color:'white',  name:'Rock Lee',          series:'Naruto',                   cat:'hoodie', price:65, imgB: P+'hd-rocklee-B.png',     imgW: P+'hd-rocklee-W.png',     sizes:['S','M','L','XL','XXL'], desc:'Nessun talento. Solo lavoro. La ROCK LEE hoodie è un omaggio al ninja che ha scelto la strada più difficile — un design per chi si allena ogni giorno senza scuse e sa che le porte interne si aprono.<br><br>L\'ottava porta si apre per chi non molla mai.' },
  { id:'hd-7', color:'black',  name:'Solo Leveling',     series:'Solo Leveling',            cat:'hoodie', price:65, imgB: P+'hd-sololeveling-B.png',imgW: P+'hd-sololeveling-W.png',sizes:['S','M','L','XL','XXL'], desc:'Keep Leveling. La SOLO LEVELING hoodie porta l\'atmosfera scura e adrenalinica dell\'hunter più iconico del manhwa coreano — un capo pensato per chi sale di livello ogni giorno, in qualsiasi campo.<br><br>Il dungeon non aspetta.' },
  { id:'hd-8', color:'black',  name:'Goku Black',        series:'Dragon Ball Super',        cat:'hoodie', price:65, imgB: P+'hd-goku-B.png',        imgW: P+'hd-goku-W.png',        sizes:['S','M','L','XL','XXL'], desc:'Il lato oscuro del guerriero più forte. La GOKU BLACK hoodie porta l\'estetica fredda e devastante di Zamasu nel corpo di Goku — un design per chi preferisce il villain, l\'ombra, la versione alternativa.<br><br>Il potere divino non conosce pietà.' },
  { id:'hd-11', color:'white', name:'Roronoa Zoro',      series:'One Piece',                cat:'hoodie', price:65, imgB: P+'hd-zoro-B.png',        imgW: P+'hd-zoro-W.png',        sizes:['S','M','L','XL','XXL'], desc:'Il Cacciatore di Taglie si porta addosso. La ZORO hoodie porta l\'estetica piratesca e la disciplina del guerriero a tre spade in un capo da indossare come una dichiarazione di intenti silenziosa.<br><br>Nessuno mi conosce davvero finché non ha visto le mie lame.' },
  { id:'hd-12', color:'black', name:'Zoro — Wanted',     series:'One Piece',                cat:'hoodie', price:65, imgB: P+'hd-zoroblack-B.png',   imgW: P+'hd-zoroblack-W.png',   sizes:['S','M','L','XL','XXL'], desc:'Poster da ricercato. Filosofia da leggenda. La ZORO WANTED hoodie porta il bounty più iconico del Grand Line in un design streetwear che mescola estetica piratesca e cultura underground.<br><br>Vorrei vedere chi prova ad incassare quella taglia.' },
  { id:'hd-13', color:'white', name:'Roronoa Zoro v2',   series:'One Piece',                cat:'hoodie', price:65, imgB: P+'hd-zoro2-B.png',       imgW: P+'hd-zoro2-W.png',       sizes:['S','M','L','XL','XXL'], desc:'La seconda lettura di un\'icona. La ZORO V2 hoodie porta un\'interpretazione alternativa del guerriero dei mari — più scura, più silenziosa, con un design che cattura il respiro tra una battaglia e la prossima.<br><br>Il mondo non sa ancora quanto sono forte.' },
  { id:'hd-14', color:'white', name:'Death Note',        series:'Death Note',               cat:'hoodie', price:65, imgB: P+'hd-deathnote-B.png',   imgW: P+'hd-deathnote-W.png',   sizes:['S','M','L','XL','XXL'], desc:'Il quaderno. Il potere. La scelta. La DEATH NOTE hoodie porta il peso morale e l\'iconografia dark di una delle serie più influenti dell\'anime in un capo per chi conosce la differenza tra giustizia e giustizia.<br><br>Scrivo. Quindi accade.' },
  { id:'hd-15', color:'white', name:'Evangelion',        series:'Neon Genesis Evangelion',  cat:'hoodie', price:65, imgB: P+'hd-eva-B.png',         imgW: P+'hd-eva-W.png',         sizes:['S','M','L','XL','XXL'], desc:'NERV non dimentica. La EVANGELION hoodie porta il simbolismo denso e opprimente di Anno in un capo da streetwear colto — per chi ha letto il manuale e sa cosa significa davvero l\'Impact.<br><br>Anima. Complementazione. Fine.' },
  { id:'hd-16', color:'white', name:'Arale',             series:'Dr. Slump',                cat:'hoodie', price:65, imgB: P+'hd-arale-B.png',       imgW: P+'hd-arale-W.png',       sizes:['S','M','L','XL','XXL'], desc:'Il chaos più dolce della storia del manga. La ARALE hoodie porta il sorriso e l\'energia distruttiva del robot-bambina di Penguin Village in un capo nostalgico che non smette mai di sorridere.<br><br>Ncha! — anche in inverno.' },
  { id:'hd-17', color:'black', name:'Arise',             series:'Solo Leveling',            cat:'hoodie', price:65, imgB: P+'hd-arise-B.png',       imgW: P+'hd-arise-W.png',       sizes:['S','M','L','XL','XXL'], desc:'Il momento che tutto cambia. La ARISE hoodie cattura l\'awakening del Shadow Monarch — il grido che risveglia le ombre — in un design ad alta intensità per chi sa quanto vale il primo livello.<br><br>Le ombre obbediscono. Sempre.' },
  { id:'hd-18', color:'black', name:'Monkey D. Luffy',   series:'One Piece',                cat:'hoodie', price:65, imgB: P+'hd-luffy-B.png',       imgW: P+'hd-luffy-W.png',       sizes:['S','M','L','XL','XXL'], desc:'Il capitano indossa il futuro. La LUFFY hoodie porta la leggerezza e la determinazione del più imprevedibile candidato alla corona piratesca in un capo pensato per le crew fedeli e i lunghi viaggi.<br><br>Il mio equipaggio. Il mio mare.' },
  { id:'hd-19', color:'black', name:'Luffy — Wanted',    series:'One Piece',                cat:'hoodie', price:65, imgB: P+'hd-luffywanted-B.png', imgW: P+'hd-luffywanted-W.png', sizes:['S','M','L','XL','XXL'], desc:'La taglia sale. La leggenda anche. La LUFFY WANTED hoodie porta il poster da ricercato più famoso dei Sette Mari in un design che unisce estetica piratesca e streetwear underground.<br><br>Chi ha il coraggio di provare?' },
  { id:'hd-20', color:'black', name:'Luffy — Nika',      series:'One Piece',                cat:'hoodie', price:65, imgB: P+'hd-luffygear5-B.png',  imgW: P+'hd-luffygear5-W.png',  sizes:['S','M','L','XL','XXL'], desc:'La forma finale. Il Dio del Sole. La LUFFY NIKA hoodie porta il Gear 5 nel guardaroba — un capo che risuona di libertà assoluta e della risata più contagiosa dell\'anime degli ultimi anni.<br><br>Ridi. È questo il vero potere.' },
  { id:'hd-21', color:'black', name:'Mikey',             series:'Tokyo Revengers',          cat:'hoodie', price:65, imgB: P+'hd-mikey-B.png',       imgW: P+'hd-mikey-W.png',       sizes:['S','M','L','XL','XXL'], desc:'Il Mikey oscuro. Quello che nessuno ha potuto salvare. La MIKEY hoodie porta l\'estetica bosozoku degli anni \'80 giapponesi e la malinconia di un personaggio che porta il peso del suo clan su ogni spalla.<br><br>Nessuno mi capisce. Va bene così.' },
  { id:'hd-22', color:'black', name:'Akaza',             series:'Demon Slayer',             cat:'hoodie', price:65, imgB: P+'hd-akaza-B.png',       imgW: P+'hd-akaza-W.png',       sizes:['S','M','L','XL','XXL'], desc:'La forza oltre la morte. La AKAZA hoodie porta il combattente demoniaco più elegante e spietato di Demon Slayer in un capo da indossare come un\'armatura — scuro, preciso, senza compromessi.<br><br>Il potere non ha limiti. Solo chi si ferma.' },
  { id:'hd-23', color:'white', name:'Legends',           series:'Multi-Anime',              cat:'hoodie', price:65, imgB: P+'hd-legends-B.png',     imgW: P+'hd-legends-W.png',     sizes:['S','M','L','XL','XXL'], desc:'Tutti i mondi. Un solo capo. La LEGENDS hoodie riunisce i personaggi più iconici dell\'animazione giapponese in una grafica collettiva — un tributo al medium per chi non ha mai smesso di guardare.<br><br>Un universo. Infinite leggende.' },
  { id:'hd-24', color:'black', name:'Jiraiya',           series:'Naruto',                   cat:'hoodie', price:65, imgB: P+'hd-jiraiya-B.png',     imgW: P+'hd-jiraiya-W.png',     sizes:['S','M','L','XL','XXL'], desc:'Il maestro. Il sannin. L\'uomo che ha scritto tutto. La JIRAIYA hoodie porta il personaggio più amato e rimpianto di Naruto in un capo che pesa come un addio — per chi sa quanto vale una storia ben raccontata.<br><br>La rana saggia non torna mai indietro.' },
];

/* ── SCROLL RESTORATION ──────────────────────────────────── */
if (history.scrollRestoration) history.scrollRestoration = 'manual';

/* ── STATE ───────────────────────────────────────────────── */
const params      = new URLSearchParams(location.search);
const productId   = params.get('id');
const product     = products.find(p => p.id === productId) || products[0];

let selectedSize  = null;
let selectedColor = 'black';
let cart          = JSON.parse(localStorage.getItem('ikari-cart') || '[]');

/* ── DOM REFS ────────────────────────────────────────────── */
const $ = id => document.getElementById(id);

const themeToggle  = $('themeToggle');
const cartToggle   = $('cartToggle');
const cartClose    = $('cartClose');
const cartOverlay  = $('cartOverlay');
const cartSidebar  = $('cartSidebar');
const cartCountEl  = $('cartCount');
const cartItemsEl  = $('cartItems');
const cartFooter   = $('cartFooter');
const cartTotalEl  = $('cartTotal');
const toast        = $('toast');

/* ── THEME ───────────────────────────────────────────────── */
(function initTheme() {
  if (localStorage.getItem('ikari-theme') === 'dark') {
    document.documentElement.classList.add('dark');
  }
  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('ikari-theme', isDark ? 'dark' : 'light');
  });
})();

/* ── NAV ─────────────────────────────────────────────────── */
(function initNav() {
  document.body.classList.remove('hero-active');

  // Mobile: start transparent, reveal frosted glass on scroll
  if (window.innerWidth <= 768) {
    document.body.classList.add('prod-nav-clear');
    window.addEventListener('scroll', () => {
      document.body.classList.toggle('prod-nav-clear', window.scrollY < 20);
    }, { passive: true });
  }
})();

/* ── CART ────────────────────────────────────────────────── */
function saveCart() {
  localStorage.setItem('ikari-cart', JSON.stringify(cart));
}

function updateCartCount() {
  const total = cart.reduce((s, i) => s + i.qty, 0);
  cartCountEl.textContent = total;
}

function renderCart() {
  if (!cart.length) {
    cartItemsEl.innerHTML = '<p class="cart-empty">Il tuo carrello è vuoto.</p>';
    cartFooter.style.display = 'none';
    return;
  }
  cartFooter.style.display = '';
  cartItemsEl.innerHTML = cart.map((item, idx) => `
    <div class="cart-item">
      <div class="cart-item-img"><img src="${item.img}" alt="${item.name}"></div>
      <div class="cart-item-info">
        <div class="cart-item-top">
          <span class="cart-item-name">${item.name.toUpperCase()}</span>
          <span class="cart-item-qty">${item.qty}</span>
        </div>
        <span class="cart-item-price">€${(item.price * item.qty).toLocaleString()}</span>
        <span class="cart-item-meta">Taglia: ${item.size}</span>
        <button class="cart-item-remove" data-idx="${idx}" aria-label="Rimuovi">Rimuovi</button>
      </div>
    </div>
  `).join('');
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  cartTotalEl.textContent = `€${total.toLocaleString()}`;

  cartItemsEl.querySelectorAll('.cart-item-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      cart.splice(Number(btn.dataset.idx), 1);
      saveCart();
      renderCart();
      updateCartCount();
    });
  });
}

function openCart() {
  cartSidebar.classList.add('is-open');
  cartOverlay.classList.add('is-open');
}
function closeCart() {
  cartSidebar.classList.remove('is-open');
  cartOverlay.classList.remove('is-open');
}

cartToggle.addEventListener('click', openCart);
cartClose.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

/* ── TOAST ───────────────────────────────────────────────── */
let toastTimer;
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2400);
}

/* ── ACCORDION ───────────────────────────────────────────── */
function initAccordions() {
  document.querySelectorAll('.accordion').forEach(acc => {
    acc.querySelector('.accordion-trigger').addEventListener('click', () => {
      acc.classList.toggle('is-open');
    });
  });
}

/* ── BUILD PRODUCT PAGE ──────────────────────────────────── */
function buildProduct() {
  document.title = `IkariTokyo — ${product.name}`;

  // Badge + name + series + price
  $('productBadge').textContent   = product.cat === 'hoodie' ? 'FELPA' : 'T-SHIRT';
  $('productName').textContent    = product.name.toUpperCase();
  $('productSeries').textContent  = product.series;
  $('productPrice').textContent   = `€${product.price.toLocaleString()}`;
  $('productDesc').innerHTML      = product.desc || '';

  // Left images: flat mockup first, lifestyle second
  const imagesEl = $('productImages');
  imagesEl.innerHTML = '';

  const block1 = document.createElement('div');
  block1.className = 'prod-img-block';
  block1.innerHTML = `<img src="${imgSrc(product.imgB)}" alt="${product.name}" id="mainImgDisplay">`;
  imagesEl.appendChild(block1);

  if (product.imgW) {
    const block2 = document.createElement('div');
    block2.className = 'prod-img-block';
    block2.innerHTML = `<img src="${imgSrc(product.imgW)}" alt="${product.name} — Indossato">`;
    imagesEl.appendChild(block2);
  }

  // Editorial image
  const editorialImg = $('editorialImg');
  editorialImg.src = product.imgW ? imgSrc(product.imgW) : imgSrc(product.imgB);
  editorialImg.alt = product.name;

  // Color chip — informational only (one fixed color per product)
  const colorSection = $('colorSection');
  const colorToggle  = $('colorToggle');
  colorToggle.innerHTML = '';

  const detectedColor = product.color || 'black';

  colorSection.style.display = '';
  const chip = document.createElement('span');
  chip.className = `p-swatch p-swatch--${detectedColor} is-active`;
  chip.setAttribute('aria-label', detectedColor === 'white' ? 'Bianco / Cream' : 'Nero');
  chip.style.cursor = 'default';
  colorToggle.appendChild(chip);

  // Size drawer toggle
  const sizeDrawer  = $('sizeDrawer');
  const sizeTrigger = $('sizeTrigger');
  const sizeIcon    = $('sizeIcon');
  const sizeDisplay = $('selectedSizeDisplay');

  function closeDrawer() {
    sizeDrawer.classList.remove('is-open');
    sizeTrigger.setAttribute('aria-expanded', 'false');
    sizeIcon.style.transform = '';
  }

  sizeTrigger.addEventListener('click', e => {
    e.stopPropagation();
    const isOpen = sizeDrawer.classList.toggle('is-open');
    sizeTrigger.setAttribute('aria-expanded', isOpen);
    sizeIcon.style.transform = isOpen ? 'rotate(45deg)' : '';
  });

  document.addEventListener('click', () => {
    if (sizeDrawer.classList.contains('is-open')) closeDrawer();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeDrawer();
  });

  // Size grid
  const sizeGrid = $('sizeGrid');
  sizeGrid.innerHTML = '';
  let defaultBtn = null;
  product.sizes.forEach(size => {
    const btn = document.createElement('button');
    btn.className = 'size-btn';
    btn.textContent = size;
    btn.addEventListener('click', () => {
      sizeGrid.querySelectorAll('.size-btn').forEach(b => b.classList.remove('is-selected'));
      btn.classList.add('is-selected');
      selectedSize = size;
      sizeDisplay.textContent = size;
      closeDrawer();
      $('addToCartBtn').disabled = false;
    });
    sizeGrid.appendChild(btn);
    if (size === 'L') defaultBtn = btn;
  });

  // Auto-select L by default
  if (defaultBtn) {
    defaultBtn.classList.add('is-selected');
    selectedSize = 'L';
    sizeDisplay.textContent = 'L';
    $('addToCartBtn').disabled = false;
  }

  // Add to cart
  $('addToCartBtn').addEventListener('click', () => {
    if (!selectedSize) return;
    const img = selectedColor === 'white' && product.imgW ? product.imgW : product.imgB;
    const existing = cart.find(i => i.id === product.id && i.size === selectedSize);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ id: product.id, name: product.name, price: product.price,
                  size: selectedSize, img: imgSrc(img), qty: 1 });
    }
    saveCart();
    renderCart();
    updateCartCount();
    showToast(`${product.name.toUpperCase()} — ${selectedSize} aggiunto al carrello`);
  });
}

/* ── MOBILE IMAGE CAROUSEL DOTS ─────────────────────────── */
function buildImageDots() {
  const dotsEl  = $('prodDots');
  const imgsEl  = $('productImages');
  if (!dotsEl || !imgsEl) return;

  const slides = imgsEl.querySelectorAll('.prod-img-block');
  if (slides.length <= 1) return; // single image — no dots needed

  dotsEl.innerHTML = '';
  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = 'prod-img-dot' + (i === 0 ? ' is-active' : '');
    dotsEl.appendChild(dot);
  });

  imgsEl.addEventListener('scroll', () => {
    const idx = Math.round(imgsEl.scrollLeft / imgsEl.offsetWidth);
    dotsEl.querySelectorAll('.prod-img-dot').forEach((d, i) => {
      d.classList.toggle('is-active', i === idx);
    });
  }, { passive: true });
}

/* ── COMPLETE THE LOOK ───────────────────────────────────── */
function buildCompleteLook() {
  const grid = $('completeLookGrid');
  if (!grid) return;

  // Pick 3 products from same category, excluding current
  const sameCat = products.filter(p => p.cat === product.cat && p.id !== product.id);
  const others  = products.filter(p => p.cat !== product.cat);
  const pool    = [...sameCat, ...others];
  const picks   = pool.slice(0, 3);

  grid.innerHTML = '';
  picks.forEach(p => {
    const hasAlt = Boolean(p.imgW);
    const card = document.createElement('div');
    card.className = 'p-card';
    card.style.cursor = 'pointer';
    card.innerHTML = `
      <div class="p-card-img-wrap">
        <img class="p-card-img" src="${imgSrc(p.imgB)}" alt="${p.name}" loading="lazy">
        ${hasAlt ? `<img class="p-card-img-alt" src="${imgSrc(p.imgW)}" alt="${p.name}" loading="lazy">` : ''}
        <span class="p-card-badge">${p.cat === 'hoodie' ? 'FELPA' : 'T-SHIRT'}</span>
      </div>
      <div class="p-card-info">
        <span class="p-card-name">${p.name}</span>
        <span class="p-card-series">${p.series}</span>
        <div class="p-card-footer">
          <span class="p-card-price">€${p.price.toLocaleString()}</span>
          <button class="p-card-btn" aria-label="Vedi ${p.name}">→</button>
        </div>
      </div>
    `;
    card.addEventListener('click', () => { location.href = 'product.html?id=' + p.id; });
    grid.appendChild(card);
  });
}

/* ── INIT ────────────────────────────────────────────────── */
buildProduct();
buildImageDots();
buildCompleteLook();
initAccordions();
renderCart();
updateCartCount();

/* Reset scroll after DOM + snap points are fully established */
requestAnimationFrame(() => requestAnimationFrame(() => window.scrollTo(0, 0)));

