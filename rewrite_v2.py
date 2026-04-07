import re

file_path = r"C:\Users\anire\OneDrive\Área de Trabalho\OIKOS LP\index.html"
with open(file_path, "r", encoding="utf-8") as f:
    html = f.read()

# ==========================================
# 1. NEW CSS (Blue, Sora, Glass)
# ==========================================
new_css = """<style>
/* ─────────────────────────────────────────
   OIKOS PREMIUM AESTHETIC TOKENS
───────────────────────────────────────── */
:root {
  --bg-base:      #020815;   /* Industrial Deep Navy */
  --bg-elevated:  #0a1836;   
  --bg-glass:     rgba(10, 24, 54, 0.45);
  --border-glass: rgba(255, 255, 255, 0.08);
  --text-primary: #ffffff;
  --text-muted:   #94a3b8;
  --accent:       #CE893B;   /* Official Gold */
  --accent-glow:  rgba(206, 137, 59, 0.3);
  --ok:           #8BAC33;
  --err:          #C75A0D;
  --ff-d:         'Sora', sans-serif;
  --ff-b:         'Inter', sans-serif;
  
  --navy: var(--bg-base);
  --blue: var(--bg-elevated);
  --blue2: #051024;
  --oliva: #030d1c;
  --gold: var(--accent);
}

*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body {
  background: var(--bg-base);
  color: var(--text-primary);
  font-family: var(--ff-b);
  overflow-x: hidden;
  line-height: 1.5;
  letter-spacing: -0.01em;
}
a{text-decoration:none;color:inherit}
img{display:block;max-width:100%; object-fit:cover;}

/* ─────────────────────────────────────────
   LAYOUT
───────────────────────────────────────── */
.wrap{max-width:1200px;margin:0 auto;padding:0 40px}
.lbl{
  display:inline-block;font-family:var(--ff-b);font-weight:600;
  font-size:11px;letter-spacing:2px;text-transform:uppercase;
  color:var(--accent);margin-bottom:16px;
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
  background:rgba(2, 8, 21, 0.75);
  backdrop-filter:blur(24px);
  -webkit-backdrop-filter:blur(24px);
  border-bottom-color:var(--border-glass);
  padding:14px 0;
}
.nav .wrap{display:flex;align-items:center;justify-content:space-between}
.nav-logo{display:flex;flex-direction:column;gap:2px;line-height:1}
.nav-logo b{font-family:var(--ff-d);font-weight:700;font-size:20px;color:#fff;letter-spacing:1px}
.nav-logo small{font-family:var(--ff-b);font-weight:600;font-size:9px;letter-spacing:2px;color:var(--accent);text-transform:uppercase}
.nav-links{display:flex;gap:36px;list-style:none}
.nav-links a{font-family:var(--ff-b);font-weight:500;font-size:14px;color:var(--text-muted);transition:color .2s}
.nav-links a:hover{color:#fff}
.nav-btn{
  background:var(--accent);color:#fff;
  font-family:var(--ff-d);font-weight:600;font-size:13px;
  padding:10px 20px;border-radius:4px;
  transition:all .3s;white-space:nowrap;
}
.nav-btn:hover{filter:brightness(1.1); transform:scale(1.02)}
.hbg{display:none;flex-direction:column;gap:5px;cursor:pointer;padding:4px}
.hbg span{display:block;width:22px;height:1.5px;background:rgba(255,255,255,.9);border-radius:1px}
.mob{
  display:none;position:fixed;inset:0;background:rgba(2, 8, 21, 0.95);
  backdrop-filter:blur(20px);
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
  background: radial-gradient(ellipse 60% 60% at 75% 50%, rgba(10,24,54,0.7) 0%, transparent 60%);
}
.hero .wrap{
  display:grid;grid-template-columns:1fr 1fr;
  gap:40px;align-items:center;
  position:relative;z-index:1;
  width:100%;
}
.hero-eyebrow{
  display:flex;align-items:center;gap:12px;margin-bottom:24px;
  font-family:var(--ff-b);font-weight:600;font-size:11px;
  letter-spacing:2px;text-transform:uppercase;color:var(--accent);
}
.hero-eyebrow::before{
  content:'';display:block;width:24px;height:1px;background:var(--accent);
}
.hero-h1{
  font-family:var(--ff-d);font-weight:800;
  font-size:clamp(44px, 5vw, 68px);
  line-height:1.05;letter-spacing:-1px;
  color:#fff;margin-bottom:24px;
}
.hero-p{
  font-family:var(--ff-b);font-weight:400;font-size:18px;
  line-height:1.5;color:var(--text-muted);
  max-width:480px;margin-bottom:40px;
}
.btn-gold{
  display:inline-flex;align-items:center;justify-content:center;
  background:var(--accent);color:#fff;
  font-family:var(--ff-d);font-weight:600;font-size:16px;
  padding:16px 32px;border-radius:4px;border:none;cursor:pointer;
  transition:all .3s ease; box-shadow: 0 8px 24px var(--accent-glow);
}
.btn-gold:hover{transform:scale(1.02); filter:brightness(1.1);}
.hero-stats{
  display:flex;gap:40px;margin-top:48px;
  padding-top:32px; border-top:1px solid var(--border-glass);
}
.hstat-n{
  font-family:var(--ff-d);font-weight:700;font-size:26px;
  color:#fff;line-height:1.1;margin-bottom:6px;
}
.hstat-l{
  font-family:var(--ff-b);font-size:12px;font-weight:500;
  color:var(--text-muted);line-height:1.4;
}
.hero-vis{
  position:relative;display:flex;
  align-items:center;justify-content:center;
  height:700px;
}
.vis-halo{
  position:absolute; width:480px;height:480px;border-radius:50%;
  background:var(--accent);opacity:.12; filter:blur(100px);
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
  position:absolute;border-radius:50%; background:rgba(255,255,255,.06);
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
  background:var(--bg-elevated); padding:20px 0;
  border-top:1px solid var(--border-glass);
  border-bottom:1px solid var(--border-glass);
  overflow:hidden;
}
.ticker-inner{
  display:flex;gap:0; animation:tickerMove 40s linear infinite; white-space:nowrap;
}
.ticker-item{
  display:flex;align-items:center;gap:24px;padding:0 40px;
  font-family:var(--ff-b);font-weight:500;font-size:13px;
  letter-spacing:1px; color:var(--text-muted);flex-shrink:0; text-transform:uppercase;
}
.ticker-item strong{ color:#fff; font-family:var(--ff-d); font-weight:700;}
.ticker-dot{ width:5px;height:5px;border-radius:50%;background:var(--accent);flex-shrink:0; }
@keyframes tickerMove{ 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }

/* ─────────────────────────────────────────
   SECTIONS GENERAL
───────────────────────────────────────── */
.s-prob, .s-como, .s-diff, .s-cred{
  background:var(--bg-base); padding:160px 0; position:relative;overflow:hidden;
}
.s-como, .s-cred {
  background:var(--blue2);
}
.s-prob h2, .s-como h2, .s-diff h2, .s-cred h2{
  font-family:var(--ff-d);font-weight:700;
  font-size:clamp(36px,4.5vw,52px);
  line-height:1.1;color:#fff;margin-bottom:24px; letter-spacing:-1px;
}
.prob-p{
  font-family:var(--ff-b);font-size:18px;line-height:1.5;
  color:var(--text-muted);max-width:680px;margin:0 auto 24px;
}
.prob-kicker{
  font-family:var(--ff-d);font-weight:700;font-size:24px;
  color:var(--accent);margin-top:40px;
}
.stat-row, .steps, .ba-block{
  display:grid;gap:24px;margin-top:64px;
}
.stat-row{grid-template-columns:repeat(3,1fr);}
.sc, .step, .ba-a, .ba-d, .cred-q, .fbox{
  background:var(--bg-glass);
  border:1px solid var(--border-glass);
  border-radius:12px; padding:48px 40px;
  backdrop-filter:blur(16px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
}
.sc-n{
  font-family:var(--ff-d);font-weight:800;
  font-size:clamp(40px,5vw,64px);
  color:var(--accent);line-height:1.1;margin-bottom:16px;
  letter-spacing:-2px;
}
.sc-d{
  font-family:var(--ff-b);font-size:15px;
  color:var(--text-muted);line-height:1.5;
}

.steps{grid-template-columns:repeat(3,1fr);}
.step-n{
  font-family:var(--ff-d);font-weight:800; font-size:60px;line-height:1;
  color:rgba(255,255,255,0.06); margin-bottom:12px;display:block; letter-spacing:-2px;
}
.step-t{
  font-family:var(--ff-d);font-weight:600;font-size:20px;
  color:#fff;margin-bottom:16px;
}
.step-d{
  font-family:var(--ff-b);font-size:15px; color:var(--text-muted);line-height:1.5;
}

/* ─────────────────────────────────────────
   DASHBOARD / PRODUTO WITH PHONE MOCKUPS
───────────────────────────────────────── */
.s-prod{
  background:var(--blue2);
  padding:160px 0;
}
.s-prod .sec-head{text-align:center; margin-bottom: 60px;}
.prod-sub{
  font-family:var(--ff-b);font-size:18px;
  color:var(--text-muted);max-width:600px;
  margin:16px auto 0;line-height:1.5;
}

/* PHONE SHOWCASE GRID */
.phone-showcase {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  margin-top: 60px;
  perspective: 1000px;
}

.phone-mockup {
  width: 280px;
  height: 580px;
  background: #000;
  border-radius: 40px;
  border: 4px solid #1a2235;
  box-shadow: 
    0 0 0 1px rgba(255,255,255,0.1),
    0 30px 60px rgba(0,0,0,0.6),
    inset 0 0 0 6px #000;
  position: relative;
  overflow: hidden;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.phone-mockup::before {
  content:'';
  position:absolute; top:0; left:50%; transform:translateX(-50%);
  width:120px; height:25px;
  background:#000; border-bottom-left-radius:16px; border-bottom-right-radius:16px;
  z-index:20;
}

.phone-mockup img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: left top; /* Show interesting dashboard parts */
  transition: transform 10s linear;
}

.phone-mockup:hover img {
  transform: translateY(-20%);
}

.phone-1 { transform: rotateY(15deg) rotateX(5deg) translateY(40px); z-index: 1; }
.phone-2 { transform: translateY(-20px) scale(1.05); z-index: 2; border-color:#2a3654; box-shadow: 0 40px 80px rgba(0,0,0,0.8), inset 0 0 0 6px #000; }
.phone-3 { transform: rotateY(-15deg) rotateX(5deg) translateY(40px); z-index: 1; }

.phone-1:hover { transform: rotateY(0deg) rotateX(0deg) translateY(20px) scale(1.05); z-index: 10;}
.phone-2:hover { transform: translateY(-30px) scale(1.1); z-index: 10;}
.phone-3:hover { transform: rotateY(0deg) rotateX(0deg) translateY(20px) scale(1.05); z-index: 10;}

/* ─────────────────────────────────────────
   FEATURES
───────────────────────────────────────── */
.fc-row{
  display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:80px;
}
.fc{
  background:var(--bg-glass);
  padding:40px 32px;
  border-radius:12px;
  border: 1px solid var(--border-glass);
}
.fc-ico{width:40px;height:40px;margin-bottom:24px; stroke:var(--accent)}
.fc-t{font-family:var(--ff-d);font-weight:600;font-size:20px;color:#fff;margin-bottom:12px}
.fc-d{font-family:var(--ff-b);font-size:15px;color:var(--text-muted);line-height:1.5}

/* ─────────────────────────────────────────
   ANTES x DEPOIS
───────────────────────────────────────── */
.ba-block{
  grid-template-columns:1fr 1fr; gap:0;
  border-radius:12px; overflow:hidden; margin-bottom:24px;
  background:var(--bg-glass); border:1px solid var(--border-glass);
}
.ba-a, .ba-d {
  border:none; border-radius:0; background:transparent;
  padding:48px 40px; box-shadow:none;
}
.ba-a { border-right: 1px solid var(--border-glass); background:rgba(0,0,0,0.2) }
.ba-tag{
  display:inline-block;font-family:var(--ff-b);font-weight:600;
  font-size:11px;letter-spacing:1px;text-transform:uppercase;margin-bottom:16px;
}
.tga{color:rgba(255,255,255,0.4)}
.tgd{color:var(--accent)}
.ba-ttl{font-family:var(--ff-d);font-weight:600;font-size:20px;color:#fff;margin-bottom:16px}
.ba-txt{font-family:var(--ff-b);font-size:15px;color:var(--text-muted);line-height:1.6}

/* ─────────────────────────────────────────
   CREDIBILIDADE
───────────────────────────────────────── */
.cred-q{
  border-color: rgba(206,137,59,0.3);
  padding:60px; max-width:840px; margin:60px auto 0;
  background: rgba(10,24,54,0.3);
}
.cred-q::before {
  content:''; position:absolute; top:0; left:0; width:100%; height:2px; background:var(--accent);
}
.cred-qt{
  font-family:var(--ff-d);font-weight:500;font-size:22px;
  color:#fff;line-height:1.5;text-align:center;
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
  line-height:1.1;color:#fff;letter-spacing:-1px;margin-bottom:24px;
}
.cta-sub{font-family:var(--ff-b);font-size:18px;color:var(--text-muted);line-height:1.5;margin-bottom:32px}
.fgrp{margin-bottom:24px}
.flbl{display:block;font-family:var(--ff-b);font-weight:500;font-size:12px;color:var(--text-primary);margin-bottom:8px; text-transform:uppercase; letter-spacing:1px;}
.finp{
  display:block;width:100%;background:rgba(255,255,255,0.03);
  border:1px solid var(--border-glass); border-radius:4px;
  color:#fff;font-family:var(--ff-b);font-size:16px;
  padding:16px;outline:none;
  transition:all .3s;
}
.finp:focus{border-color:var(--accent); background:rgba(255,255,255,0.06);}
.finp::placeholder{color:var(--text-muted)}
.btn-sub{
  display:block;width:100%;
  background:var(--accent);color:#fff;
  font-family:var(--ff-d);font-weight:700;font-size:16px;
  padding:18px;border-radius:4px;border:none;cursor:pointer;
  transition:transform .2s;margin-top:24px;
}
.btn-sub:hover{transform:scale(1.02); filter:brightness(1.1);}
.f-note{font-family:var(--ff-b);font-size:13px;color:var(--text-muted);text-align:center;margin-top:16px}
.f-ok{display:none;text-align:center;padding:40px 0}
.f-ok-ico{width:64px;height:64px;background:rgba(139,172,51,0.2);border:1px solid var(--ok);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 24px}
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
.fcopy{font-family:var(--ff-b);font-size:13px;color:var(--text-muted);text-align:right;}

/* ─────────────────────────────────────────
   RESPONSIVE
───────────────────────────────────────── */
@media(max-width:1024px){
  .wrap{padding:0 32px}
  .nav-links,.nav-btn{display:none}
  .hbg{display:flex}
  .hero .wrap{grid-template-columns:1fr;gap:48px;padding-top:80px}
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
  
  .phone-showcase { flex-direction:column; gap:60px; }
  .phone-1, .phone-3 { transform: none; }
  .phone-2 { transform: none; }
}
</style>"""

# Using regex to replace the entire <style> block
html = re.sub(r"<style>.*?</style>", new_css, html, flags=re.DOTALL)

# ==========================================
# 2. HTML MOBILE MOCKUPS (A Plataforma)
# ==========================================
# Look for the section and replace it up to the feature row
phone_html = """<section class="s-prod" id="s-prod">
  <div class="wrap">
    <div class="sec-head fa">
      <span class="lbl">A PLATAFORMA</span>
      <h2>O controle do seu vapor,<br>na palma da mão.</h2>
      <p class="prod-sub">A dashboard Oikos centraliza tudo que seu time de manutenção precisa saber sobre os purgadores da planta, acessível de qualquer dispositivo.</p>
    </div>

    <!-- MOCKUPS DE CELULAR EM CSS -->
    <div class="phone-showcase fa">
      <div class="phone-mockup phone-1">
        <img src="./assets/PRINT DASHBOARD/3b0a387d-8e64-472f-93db-f668df0a4bdd.jpg" alt="Relatório">
      </div>
      <div class="phone-mockup phone-2">
        <img src="./assets/PRINT DASHBOARD/fbd2f001-4fdf-45e3-8d07-ef5edf6a9728.jpg" alt="Dashboard Principal">
      </div>
      <div class="phone-mockup phone-3">
        <img src="./assets/PRINT DASHBOARD/b68e71bf-3f28-4bd9-88b2-771b5417d5fd.jpg" alt="Detalhes">
      </div>
    </div>

    <div class="fc-row">"""

# Replace the bento grid from the previous rewrite (or the original mock wrap if this runs over the old one)
if 'class="bento-grid' in html:
    html = re.sub(r'<section class="s-prod" id="s-prod">.*?</section>', phone_html + '\n      </div>\n      <div class="fc fac">\n        <svg class="fc-ico" viewBox="0 0 36 36" fill="none"><rect x="2" y="2" width="32" height="32" rx="2" stroke="var(--accent)" stroke-width="1.4"/><line x1="2" y1="11" x2="34" y2="11" stroke="var(--accent)" stroke-width="1"/><line x1="11" y1="2" x2="11" y2="34" stroke="var(--accent)" stroke-width="1"/><rect x="14" y="15" width="14" height="3" rx="1" fill="var(--accent)" opacity=".36"/><rect x="14" y="21" width="10" height="3" rx="1" fill="var(--accent)" opacity=".36"/><rect x="14" y="27" width="12" height="3" rx="1" fill="var(--accent)" opacity=".36"/></svg>\n        <div class="fc-t">Inventário completo</div>\n        <p class="fc-d">Todos os purgadores cadastrados com tag, localização, modelo, pressão e status atualizado a cada inspeção.</p>\n      </div>\n      <div class="fc fac">\n        <svg class="fc-ico" viewBox="0 0 36 36" fill="none"><circle cx="18" cy="18" r="14" stroke="var(--accent)" stroke-width="1.4"/><path d="M18 9 L18 18 L25 22" stroke="var(--accent)" stroke-width="1.4" stroke-linecap="round"/><circle cx="18" cy="18" r="2" fill="var(--accent)" opacity=".7"/></svg>\n        <div class="fc-t">Custo de perda em R$</div>\n        <p class="fc-d">Cada purgador com falha mostra o custo por hora, por mês e por ano. Números que falam direto com a diretoria.</p>\n      </div>\n      <div class="fc fac">\n        <svg class="fc-ico" viewBox="0 0 36 36" fill="none"><rect x="3" y="3" width="30" height="30" rx="2" stroke="var(--accent)" stroke-width="1.4"/><polyline points="7,27 13,17 19,21 25,11 31,15" stroke="var(--accent)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="7" cy="27" r="1.4" fill="var(--accent)"/><circle cx="13" cy="17" r="1.4" fill="var(--accent)"/><circle cx="19" cy="21" r="1.4" fill="var(--accent)"/><circle cx="25" cy="11" r="1.4" fill="var(--accent)"/></svg>\n        <div class="fc-t">Histórico de inspeções</div>\n        <p class="fc-d">Compare o antes e depois de cada manutenção. Comprove o retorno com dados reais da sua planta.</p>\n      </div>\n    </div>\n  </div>\n</section>', html, flags=re.DOTALL)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(html)
