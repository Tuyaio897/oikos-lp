import re
import sys

file_path = r"C:\Users\anire\OneDrive\Área de Trabalho\OIKOS LP\index.html"
with open(file_path, "r", encoding="utf-8") as f:
    html = f.read()

# ==========================================
# 1. NEW CSS
# ==========================================
new_css = """<style>
/* ─────────────────────────────────────────
   APPLE-STYLE AESTHETIC TOKENS
───────────────────────────────────────── */
:root {
  --bg-base:      #000000;
  --bg-elevated:  #111111;
  --bg-glass:     rgba(28, 28, 30, 0.6);
  --border-glass: rgba(255, 255, 255, 0.1);
  --text-primary: #f5f5f7;
  --text-muted:   #86868b;
  --accent:       #E87500;
  --accent-glow:  rgba(232, 117, 0, 0.4);
  --ok:           #34C759;
  --err:          #FF3B30;
  --ff-d:         -apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif;
  --ff-b:         -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif;
  
  --navy: var(--bg-base);
  --blue: var(--bg-elevated);
  --blue2: var(--bg-elevated);
  --oliva: #0a0a0a;
  --gold: var(--accent);
}

*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body {
  background: var(--bg-base);
  color: var(--text-primary);
  font-family: var(--ff-b);
  overflow-x: hidden;
  line-height: 1.47059;
  letter-spacing: -0.022em;
}
a{text-decoration:none;color:inherit}
img{display:block;max-width:100%; object-fit:cover;}

/* ─────────────────────────────────────────
   LAYOUT
───────────────────────────────────────── */
.wrap{max-width:1200px;margin:0 auto;padding:0 40px}
.lbl{
  display:inline-block;font-family:var(--ff-b);font-weight:600;
  font-size:12px;letter-spacing:1px;text-transform:uppercase;
  color:var(--text-muted);margin-bottom:12px;
}

/* ─────────────────────────────────────────
   NAV
───────────────────────────────────────── */
.nav{
  position:fixed;top:0;left:0;width:100%;z-index:1000;
  padding:20px 0;
  border-bottom:1px solid transparent;
  transition:all .4s ease;
}
.nav.on{
  background:rgba(0,0,0,0.72);
  backdrop-filter:saturate(180%) blur(20px);
  -webkit-backdrop-filter:saturate(180%) blur(20px);
  border-bottom-color:var(--border-glass);
  padding:12px 0;
}
.nav .wrap{display:flex;align-items:center;justify-content:space-between}
.nav-logo{display:flex;flex-direction:column;gap:2px;line-height:1}
.nav-logo b{font-family:var(--ff-d);font-weight:700;font-size:19px;color:#fff;letter-spacing:1px}
.nav-logo small{font-family:var(--ff-b);font-weight:600;font-size:9px;letter-spacing:2px;color:var(--accent);text-transform:uppercase}
.nav-links{display:flex;gap:36px;list-style:none}
.nav-links a{font-family:var(--ff-b);font-weight:500;font-size:14px;color:var(--text-primary);opacity:0.8;transition:opacity .2s}
.nav-links a:hover{opacity:1}
.nav-btn{
  background:var(--text-primary);color:#000;
  font-family:var(--ff-b);font-weight:500;font-size:14px;
  padding:8px 16px;border-radius:980px; /* Apple pill shape */
  transition:all .3s;white-space:nowrap;
}
.nav-btn:hover{background:#fff;transform:scale(1.02)}
.hbg{display:none;flex-direction:column;gap:5px;cursor:pointer;padding:4px}
.hbg span{display:block;width:22px;height:1.5px;background:rgba(255,255,255,.9);border-radius:1px}
.mob{
  display:none;position:fixed;inset:0;background:rgba(0,0,0,0.95);
  backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);
  z-index:998;flex-direction:column;justify-content:center;
  padding:0 60px;gap:32px;
}
.mob.open{display:flex}
.mob a{font-family:var(--ff-d);font-weight:600;font-size:32px;color:var(--text-muted);transition:color .2s}
.mob a:hover{color:#fff}

/* ─────────────────────────────────────────
   HERO
───────────────────────────────────────── */
.hero{
  min-height:100vh;
  background:var(--bg-base);
  display:flex;align-items:center;
  padding-top:100px;
  position:relative;overflow:hidden;
}
.hero-atm{
  position:absolute;inset:0;pointer-events:none;z-index:0;
  background: radial-gradient(circle at 50% 0%, rgba(255,255,255,0.05) 0%, transparent 60%);
}
.hero .wrap{
  display:grid;grid-template-columns:1fr 1fr;
  gap:40px;align-items:center;
  position:relative;z-index:1;
  width:100%;
}
.hero-eyebrow{
  display:inline-block;font-family:var(--ff-b);font-weight:600;font-size:12px;
  letter-spacing:1px;text-transform:uppercase;color:var(--accent);
  margin-bottom:20px;
}
.hero-h1{
  font-family:var(--ff-d);font-weight:700;
  font-size:clamp(40px, 5vw, 68px);
  line-height:1.05;letter-spacing:-0.03em;
  color:#fff;margin-bottom:24px;
}
.hero-p{
  font-family:var(--ff-b);font-weight:400;font-size:19px;
  line-height:1.4;color:var(--text-muted);
  max-width:480px;margin-bottom:40px;
}
.btn-gold{
  display:inline-flex;align-items:center;justify-content:center;
  background:var(--accent);color:#fff;
  font-family:var(--ff-b);font-weight:500;font-size:16px;
  padding:16px 32px;border-radius:980px;border:none;cursor:pointer;
  transition:all .3s ease; box-shadow: 0 4px 14px var(--accent-glow);
}
.btn-gold:hover{transform:scale(1.02);box-shadow: 0 6px 20px var(--accent-glow);}
.hero-stats{
  display:flex;gap:40px;margin-top:40px;
  padding-top:30px; border-top:1px solid var(--border-glass);
}
.hstat-n{
  font-family:var(--ff-d);font-weight:600;font-size:28px;
  color:#fff;line-height:1.1;margin-bottom:4px;letter-spacing:-0.02em;
}
.hstat-l{
  font-family:var(--ff-b);font-size:12px;font-weight:500;
  color:var(--text-muted);line-height:1.3;
}
.hero-vis{
  position:relative;display:flex;
  align-items:center;justify-content:center;
  height:700px;
}
.vis-halo{
  position:absolute; width:480px;height:480px;border-radius:50%;
  background:var(--accent);opacity:.15; filter:blur(100px);
  top:50%;left:50%;transform:translate(-50%,-50%);
  pointer-events:none;z-index:0;
}
.vis-floor{
  position:absolute; bottom:55px;left:50%;transform:translateX(-50%);
  width:360px;height:12px; background:var(--accent);filter:blur(40px);
  opacity:.3;pointer-events:none;z-index:0;
}
.vapor{
  position:absolute;top:0;left:50%; transform:translateX(-50%);
  width:400px;height:220px; pointer-events:none;z-index:10;overflow:visible;
}
.vp{
  position:absolute;border-radius:50%; background:rgba(255,255,255,.08);
  animation:vup linear infinite; filter:blur(4px);
}
@keyframes vup{
  0%  {transform:translateY(0) scale(1);opacity:0}
  30% {opacity:.1}
  70% {opacity:.05}
  100%{transform:translateY(-200px) scale(4);opacity:0}
}
.purg{
  position:relative; width:420px;height:620px;
  overflow:visible;z-index:1;
}
.pl{
  position:absolute;left:50%; transform:translateX(-50%);
  width:100%;will-change:transform;
}
.pl img{width:100%}
.pl-body { bottom:0;      height:365px; z-index:1 }
.pl-disc { bottom:318px;  height:145px; z-index:2 }
.pl-cap  { bottom:420px;  height:240px; z-index:3 }

/* ─────────────────────────────────────────
   TICKER
───────────────────────────────────────── */
.ticker{
  background:var(--bg-base); padding:16px 0;
  border-top:1px solid var(--border-glass);
  border-bottom:1px solid var(--border-glass);
  overflow:hidden;
}
.ticker-inner{
  display:flex;gap:0; animation:tickerMove 40s linear infinite; white-space:nowrap;
}
.ticker-item{
  display:flex;align-items:center;gap:24px;padding:0 40px;
  font-family:var(--ff-d);font-weight:500;font-size:14px;
  letter-spacing:0px; color:var(--text-muted);flex-shrink:0;
}
.ticker-item strong{ color:#fff; font-weight:600; }
.ticker-dot{ width:6px;height:6px;border-radius:50%;background:var(--accent);flex-shrink:0; }
@keyframes tickerMove{ 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }

/* ─────────────────────────────────────────
   PROBLEMA E COMO FUNCIONA
───────────────────────────────────────── */
.s-prob, .s-como, .s-diff, .s-cred{
  background:var(--bg-base); padding:160px 0; position:relative;overflow:hidden;
}
.s-prob h2, .s-como h2, .s-diff h2, .s-cred h2{
  font-family:var(--ff-d);font-weight:700;
  font-size:clamp(36px,4.5vw,56px);
  line-height:1.05;color:#fff;margin-bottom:24px; letter-spacing:-0.03em;
}
.prob-p{
  font-family:var(--ff-b);font-size:19px;line-height:1.4;
  color:var(--text-muted);max-width:680px;margin:0 auto 24px;
}
.prob-kicker{
  font-family:var(--ff-d);font-weight:600;font-size:24px;
  color:#fff;margin-top:40px;
}
.stat-row, .steps, .ba-block{
  display:grid;gap:24px;margin-top:60px;
}
.stat-row{grid-template-columns:repeat(3,1fr);}
.sc, .step, .ba-a, .ba-d, .cred-q, .fbox{
  background:var(--bg-glass);
  border:1px solid var(--border-glass);
  border-radius:24px; padding:48px 40px;
  backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);
}
.sc-n{
  font-family:var(--ff-d);font-weight:700;
  font-size:clamp(40px,5vw,56px);
  color:var(--accent);line-height:1.1;margin-bottom:12px;
  letter-spacing:-0.02em;
}
.sc-d{
  font-family:var(--ff-b);font-size:16px;
  color:var(--text-primary);line-height:1.4;
}

.steps{grid-template-columns:repeat(3,1fr);}
.step-n{
  font-family:var(--ff-d);font-weight:700; font-size:48px;line-height:1;
  color:rgba(255,255,255,0.1); margin-bottom:16px;display:block;
}
.step-t{
  font-family:var(--ff-d);font-weight:600;font-size:20px;
  color:#fff;margin-bottom:12px;
}
.step-d{
  font-family:var(--ff-b);font-size:16px; color:var(--text-muted);line-height:1.4;
}

/* ─────────────────────────────────────────
   DASHBOARD / PRODUTO (REWRITTEN)
───────────────────────────────────────── */
.s-prod{
  background:var(--bg-base);
  padding:160px 0;
}
.s-prod .sec-head{text-align:center; margin-bottom: 60px;}
.prod-sub{
  font-family:var(--ff-b);font-size:19px;
  color:var(--text-muted);max-width:600px;
  margin:16px auto 0;line-height:1.4;
}

/* BENTO GRID */
.bento-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: 240px;
  gap: 24px;
  margin-top: 40px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}
.bento-item {
  background: var(--bg-elevated);
  border: 1px solid var(--border-glass);
  border-radius: 24px;
  overflow: hidden;
  position: relative;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s;
}
.bento-item:hover {
  transform: translateY(-4px) scale(1.01);
  box-shadow: 0 20px 40px rgba(0,0,0,0.4);
  z-index: 10;
}
.bento-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  border-radius: 24px;
  opacity: 0.85;
  transition: opacity 0.3s;
}
.bento-item:hover img {
  opacity: 1;
}

/* Layout the 4 images in a nice asymmetrical grid */
.bento-1 { grid-column: span 8; grid-row: span 2; }
.bento-2 { grid-column: span 4; grid-row: span 1; }
.bento-3 { grid-column: span 4; grid-row: span 1; }
.bento-4 { grid-column: span 12; grid-row: span 2; }

/* ─────────────────────────────────────────
   FEATURES
───────────────────────────────────────── */
.fc-row{
  display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:80px;
}
.fc{
  background:transparent;
  padding:0;
}
.fc-ico{width:40px;height:40px;margin-bottom:20px; stroke:var(--accent)}
.fc-t{font-family:var(--ff-d);font-weight:600;font-size:20px;color:#fff;margin-bottom:12px}
.fc-d{font-family:var(--ff-b);font-size:16px;color:var(--text-muted);line-height:1.4}

/* ─────────────────────────────────────────
   ANTES x DEPOIS
───────────────────────────────────────── */
.ba-block{
  grid-template-columns:1fr 1fr; gap:0;
  border-radius:24px; overflow:hidden; margin-bottom:32px;
  background:var(--bg-glass); border:1px solid var(--border-glass);
}
.ba-a, .ba-d {
  border:none; border-radius:0; background:transparent;
  padding:48px 40px;
}
.ba-a { border-right: 1px solid var(--border-glass); }
.ba-tag{
  display:inline-block;font-family:var(--ff-b);font-weight:600;
  font-size:11px;letter-spacing:1px;text-transform:uppercase;margin-bottom:16px;
}
.tga{color:var(--text-muted)}
.tgd{color:var(--accent)}
.ba-ttl{font-family:var(--ff-d);font-weight:600;font-size:20px;color:#fff;margin-bottom:12px}
.ba-txt{font-family:var(--ff-b);font-size:16px;color:var(--text-muted);line-height:1.4}

/* ─────────────────────────────────────────
   CREDIBILIDADE
───────────────────────────────────────── */
.cred-q{
  background:var(--bg-glass); border:1px solid var(--border-glass);
  padding:60px; max-width:840px; margin:60px auto 0;
}
.cred-qt{
  font-family:var(--ff-d);font-weight:500;font-size:24px;
  color:#fff;line-height:1.4;text-align:center;
}

/* ─────────────────────────────────────────
   CTA
───────────────────────────────────────── */
.s-cta{
  background:var(--bg-base);
  padding:160px 0; border-top: 1px solid var(--border-glass);
}
.cta-g{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center}
.cta-hl{
  font-family:var(--ff-d);font-weight:700;
  font-size:clamp(36px,4vw,52px);
  line-height:1.05;color:#fff;letter-spacing:-0.02em;margin-bottom:24px;
}
.cta-sub{font-family:var(--ff-b);font-size:19px;color:var(--text-muted);line-height:1.4;margin-bottom:24px}
.fgrp{margin-bottom:24px}
.flbl{display:block;font-family:var(--ff-b);font-weight:500;font-size:13px;color:var(--text-primary);margin-bottom:8px;}
.finp{
  display:block;width:100%;background:rgba(255,255,255,0.05);
  border:1px solid var(--border-glass); border-radius:12px;
  color:#fff;font-family:var(--ff-b);font-size:16px;
  padding:14px 16px;outline:none;
  transition:all .3s;
}
.finp:focus{border-color:var(--accent); background:rgba(255,255,255,0.08);}
.finp::placeholder{color:var(--text-muted)}
.btn-sub{
  display:block;width:100%;
  background:var(--text-primary);color:#000;
  font-family:var(--ff-b);font-weight:600;font-size:16px;
  padding:16px;border-radius:12px;border:none;cursor:pointer;
  transition:transform .2s;margin-top:16px;
}
.btn-sub:hover{transform:scale(1.02); background:#fff;}
.f-note{font-family:var(--ff-b);font-size:13px;color:var(--text-muted);text-align:center;margin-top:16px}
.f-ok{display:none;text-align:center;padding:40px 0}
.f-ok-ico{width:64px;height:64px;background:var(--ok);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 24px}
.f-ok h3{font-family:var(--ff-d);font-weight:600;font-size:24px;color:#fff;margin-bottom:12px}

/* FOOTER */
footer{
  background:var(--bg-base);
  padding:60px 0 40px;
  border-top:1px solid var(--border-glass);
}
.foot-g{display:grid;grid-template-columns:1fr 1fr 1fr;gap:40px;align-items:start;margin-bottom:40px}
.flinks a{font-family:var(--ff-b);font-size:14px;color:var(--text-muted);transition:color .2s}
.flinks a:hover{color:#fff}
.fcopy{font-family:var(--ff-b);font-size:14px;color:var(--text-muted);text-align:right;}

/* ─────────────────────────────────────────
   RESPONSIVE
───────────────────────────────────────── */
@media(max-width:1024px){
  .wrap{padding:0 32px}
  .nav-links,.nav-btn{display:none}
  .hbg{display:flex}
  .hero .wrap{grid-template-columns:1fr;gap:48px;padding-top:60px}
  .hero-vis{height:500px}
  .purg{width:320px;height:480px}
  .pl-body{height:280px}
  .pl-disc{height:110px;bottom:240px}
  .pl-cap{height:180px;bottom:320px}
  .stat-row, .steps, .fc-row{grid-template-columns:1fr}
  .ba-block{grid-template-columns:1fr}
  .ba-a{border-right:none; border-bottom:1px solid var(--border-glass)}
  .cta-g{grid-template-columns:1fr;gap:48px}
  .foot-g{grid-template-columns:1fr;text-align:center}
  .fcopy{text-align:center}
  .bento-grid { grid-template-columns: 1fr; grid-auto-rows: 200px;}
  .bento-1, .bento-2, .bento-3, .bento-4 { grid-column: span 1; grid-row: span 1;}
}
</style>"""

html = re.sub(r"<style>.*?</style>", new_css, html, flags=re.DOTALL)

# ==========================================
# 2. HTML BENTO GRID (A Plataforma)
# ==========================================
# Replace everything inside <section class="s-prod" id="s-prod"> ... up to <div class="fc-row">
bento_html = """<section class="s-prod" id="s-prod">
  <div class="wrap">
    <div class="sec-head fa">
      <span class="lbl">A PLATAFORMA</span>
      <h2>Seu sistema de vapor com número,<br>com histórico, com controle.</h2>
      <p class="prod-sub">A dashboard Oikos centraliza tudo que seu time de manutenção precisa saber sobre os purgadores da planta, direto no seu navegador.</p>
    </div>

    <div class="bento-grid fa">
      <!-- Imagem maior -->
      <div class="bento-item bento-1">
        <img src="./assets/PRINT DASHBOARD/fbd2f001-4fdf-45e3-8d07-ef5edf6a9728.jpg" alt="Dashboard Principal">
      </div>
      <!-- Duas menores laterais -->
      <div class="bento-item bento-2">
        <img src="./assets/PRINT DASHBOARD/3b0a387d-8e64-472f-93db-f668df0a4bdd.jpg" alt="Relatório">
      </div>
      <div class="bento-item bento-3">
        <img src="./assets/PRINT DASHBOARD/7c2f1151-7cc0-408f-ae7b-2a3e14de2398.jpg" alt="Painel">
      </div>
      <!-- Larga em baixo -->
      <div class="bento-item bento-4">
        <img src="./assets/PRINT DASHBOARD/b68e71bf-3f28-4bd9-88b2-771b5417d5fd.jpg" alt="Detalhes">
      </div>
    </div>

    <div class="fc-row">"""

html = re.sub(r'<section class="s-prod" id="s-prod">.*?</section>', bento_html + '\n      </div>\n      <div class="fc fac">\n        <svg class="fc-ico" viewBox="0 0 36 36" fill="none"><rect x="2" y="2" width="32" height="32" rx="2" stroke="var(--accent)" stroke-width="1.4"/><line x1="2" y1="11" x2="34" y2="11" stroke="var(--accent)" stroke-width="1"/><line x1="11" y1="2" x2="11" y2="34" stroke="var(--accent)" stroke-width="1"/><rect x="14" y="15" width="14" height="3" rx="1" fill="var(--accent)" opacity=".36"/><rect x="14" y="21" width="10" height="3" rx="1" fill="var(--accent)" opacity=".36"/><rect x="14" y="27" width="12" height="3" rx="1" fill="var(--accent)" opacity=".36"/></svg>\n        <div class="fc-t">Inventário completo</div>\n        <p class="fc-d">Todos os purgadores cadastrados com tag, localização, modelo, pressão e status atualizado a cada inspeção.</p>\n      </div>\n      <div class="fc fac">\n        <svg class="fc-ico" viewBox="0 0 36 36" fill="none"><circle cx="18" cy="18" r="14" stroke="var(--accent)" stroke-width="1.4"/><path d="M18 9 L18 18 L25 22" stroke="var(--accent)" stroke-width="1.4" stroke-linecap="round"/><circle cx="18" cy="18" r="2" fill="var(--accent)" opacity=".7"/></svg>\n        <div class="fc-t">Custo de perda em R$</div>\n        <p class="fc-d">Cada purgador com falha mostra o custo por hora, por mês e por ano. Números que falam direto com a diretoria.</p>\n      </div>\n      <div class="fc fac">\n        <svg class="fc-ico" viewBox="0 0 36 36" fill="none"><rect x="3" y="3" width="30" height="30" rx="2" stroke="var(--accent)" stroke-width="1.4"/><polyline points="7,27 13,17 19,21 25,11 31,15" stroke="var(--accent)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="7" cy="27" r="1.4" fill="var(--accent)"/><circle cx="13" cy="17" r="1.4" fill="var(--accent)"/><circle cx="19" cy="21" r="1.4" fill="var(--accent)"/><circle cx="25" cy="11" r="1.4" fill="var(--accent)"/></svg>\n        <div class="fc-t">Histórico de inspeções</div>\n        <p class="fc-d">Compare o antes e depois de cada manutenção. Comprove o retorno com dados reais da sua planta.</p>\n      </div>\n    </div>\n  </div>\n</section>', html, flags=re.DOTALL)

# ==========================================
# 3. FIX GSAP PARALLAX
# ==========================================
old_gsap = """  /* Purgador entrance */
  const desk = innerWidth > 768;
  if (desk) {
    gsap.set('#lC', { y:-100 });
    gsap.set('#lD', { y:-50  });
    gsap.to('#lC', { y:0, duration:1.4, ease:'elastic.out(1,.5)', delay:.45 });
    gsap.to('#lD', { y:0, duration:1.4, ease:'elastic.out(1,.5)', delay:.58 });

    ScrollTrigger.create({
      trigger:'#hero', start:'top top', end:'bottom top', scrub:1.4,
      onUpdate(s) {
        const p = s.progress;
        gsap.set('#lC',     { y: -72 * p });
        gsap.set('#lD',     { y: -36 * p });
        gsap.set('#plGlow', { opacity: p * .9 });
      }
    });
  }"""

new_gsap = """  /* Purgador entrance & CORRECT Parallax */
  const desk = innerWidth > 768;
  if (desk) {
    // Entrance
    gsap.fromTo('#lC', { y: -60, opacity:0 }, { y: 0, opacity:1, duration:1.8, ease: "power3.out", delay:.6 });
    gsap.fromTo('#lD', { y: -30, opacity:0 }, { y: 0, opacity:1, duration:1.8, ease: "power3.out", delay:.7 });
    gsap.fromTo('#lB', { opacity:0 }, { opacity:1, duration:1.8, ease: "power3.out", delay:.4 });

    // Apple-style disassembly Parallax
    gsap.to('#lC', {
      y: -140, // lifts up completely
      ease: "none",
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5
      }
    });

    gsap.to('#lD', {
      y: -60, // lifts up halfway
      ease: "none",
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5
      }
    });
    
    gsap.to('#plGlow', {
      opacity: 0.8,
      ease: "none",
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5
      }
    });
  }"""

html = html.replace(old_gsap, new_gsap)

# write the modified html back
with open(file_path, "w", encoding="utf-8") as f:
    f.write(html)
