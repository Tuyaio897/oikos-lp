import re

file_path = r"C:\Users\anire\OneDrive\Área de Trabalho\OIKOS LP\index.html"
with open(file_path, "r", encoding="utf-8") as f:
    html = f.read()

# 1. Update Logo in Nav
html = re.sub(
    r'<a href="#" class="nav-logo">.*?</a>',
    '<a href="#" class="nav-logo"><img src="./assets/logo-oikos.svg" alt="Oikos Systems" style="height: 32px;"></a>',
    html,
    flags=re.DOTALL
)

# 2. Update CSS completely
new_css = """<style>
/* ─────────────────────────────────────────
   OIKOS OFFICIAL BRAND TOKENS
───────────────────────────────────────── */
:root {
  --azul-ind:      #0A2472;
  --vapor-oliva:   #323725;
  --laranja-erg:   #CE893B;
  --azul-cald:     #282826;
  --cinza-aco:     #C4C4C4;
  --ok:            #8BAC33;
  --vazando:       #C75A0D;
  
  --bg-glass:      rgba(10, 36, 114, 0.45);
  --border-glass:  rgba(255, 255, 255, 0.12);
  --text-primary:  #ffffff;
  --text-muted:    var(--cinza-aco);
  
  --ff-d:          'Sora', sans-serif;
  --ff-b:          'Inter', sans-serif;
  
  --accent:        var(--laranja-erg);
}

*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body {
  background: var(--azul-ind);
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
  background:rgba(10, 36, 114, 0.85); /* Azul Industrial */
  backdrop-filter:blur(24px);
  -webkit-backdrop-filter:blur(24px);
  border-bottom-color:var(--border-glass);
  padding:14px 0;
}
.nav .wrap{display:flex;align-items:center;justify-content:space-between}
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
  display:none;position:fixed;inset:0;background:rgba(10, 36, 114, 0.95);
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
  background:var(--azul-ind);
  display:flex;align-items:center;
  padding-top:100px;
  position:relative;overflow:hidden;
}
.hero-atm{
  position:absolute;inset:0;pointer-events:none;z-index:0;
  background: radial-gradient(ellipse 60% 60% at 75% 50%, rgba(206, 137, 59, 0.1) 0%, transparent 60%);
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
  transition:all .3s ease; box-shadow: 0 8px 24px rgba(206, 137, 59, 0.3);
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
  background:var(--azul-cald); padding:20px 0;
  border-top:1px solid rgba(0,0,0,0.5);
  border-bottom:1px solid rgba(0,0,0,0.5);
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
.s-prob, .s-como, .s-diff, .s-cred, .s-cta, .s-prod{
  padding:160px 0; position:relative;overflow:hidden;
}

/* Background alternates */
.s-prob { background: var(--vapor-oliva); }
.s-como { background: var(--azul-ind); }
.s-diff { background: var(--azul-cald); }
.s-cred { background: var(--vapor-oliva); }
.s-cta  { background: var(--azul-ind); }
.s-prod { background: var(--azul-cald); } /* Plataforma */

.sec-head h2 {
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
.sc, .step, .cred-q, .fbox{
  background:rgba(255,255,255,0.03); /* Glass for panels */
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
  color:rgba(255,255,255,0.08); margin-bottom:12px;display:block; letter-spacing:-2px;
}
.step-t{
  font-family:var(--ff-d);font-weight:600;font-size:20px;
  color:#fff;margin-bottom:16px;
}
.step-d{
  font-family:var(--ff-b);font-size:15px; color:var(--text-muted);line-height:1.5;
}

/* ─────────────────────────────────────────
   O PROBLEMA - Boiler Image & Ghost %
───────────────────────────────────────── */
.prob-ghost{
  position:absolute;
  right:-50px;top:50%;transform:translateY(-50%);
  font-family:var(--ff-d);font-weight:800;
  font-size:520px;line-height:1;
  color:rgba(255,255,255,.015);
  pointer-events:none;user-select:none;
  letter-spacing:-20px; z-index:0;
}
.s-prob .wrap {
  display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center;
  position:relative; z-index:1;
}
.prob-img-wrap {
  border-radius:24px; overflow:hidden;
  border: 1px solid var(--border-glass);
  box-shadow: 0 30px 60px rgba(0,0,0,0.5);
}
.prob-img-wrap img { width: 100%; height: auto; }
.prob-text-content { position: relative; z-index:2; }

/* ─────────────────────────────────────────
   DASHBOARD / PRODUTO WITH PHONE MOCKUPS (FLOATING CARDS)
───────────────────────────────────────── */
.s-prod .sec-head{text-align:center; margin-bottom: 60px;}
.prod-sub{
  font-family:var(--ff-b);font-size:18px;
  color:var(--text-muted);max-width:600px;
  margin:16px auto 0;line-height:1.5;
}

.platform-container {
  position: relative;
  padding-bottom: 80px; /* Space for intersecting floating cards */
}

/* PHONE SHOWCASE GRID */
.phone-showcase {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  margin-top: 60px;
  perspective: 1200px;
}

.phone-mockup {
  width: 280px;
  height: 580px;
  background: #000;
  border-radius: 40px;
  border: 4px solid var(--cinza-aco);
  box-shadow: 
    0 0 0 1px rgba(255,255,255,0.1),
    0 40px 80px rgba(0,0,0,0.7),
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
  object-position: left top;
  transition: transform 10s linear;
}
.phone-mockup:hover img {
  transform: translateY(-20%);
}

.phone-1 { transform: rotateY(15deg) rotateX(5deg) translateY(40px); z-index: 1; }
.phone-2 { transform: translateY(-20px) scale(1.05); z-index: 2; border-color:#fff; box-shadow: 0 50px 100px rgba(0,0,0,0.9), inset 0 0 0 6px #000; }
.phone-3 { transform: rotateY(-15deg) rotateX(5deg) translateY(40px); z-index: 1; }

.phone-1:hover { transform: rotateY(0deg) rotateX(0deg) translateY(20px) scale(1.05); z-index: 10;}
.phone-2:hover { transform: translateY(-30px) scale(1.1); z-index: 10;}
.phone-3:hover { transform: rotateY(0deg) rotateX(0deg) translateY(20px) scale(1.05); z-index: 10;}

/* Floating Features over phones */
.fc-row{
  display:grid;grid-template-columns:repeat(3,1fr);gap:24px;
  position: relative;
  margin-top: -100px; /* Pulls cards UP over the phones */
  z-index: 20; /* Flutua em cima */
}
.fc{
  background:rgba(10, 36, 114, 0.7); /* Azul Industrial translúcido */
  padding:40px 32px;
  border-radius:12px;
  border: 1px solid var(--accent); /* Borda Laranja Energia para impacto */
  backdrop-filter:blur(24px);
  -webkit-backdrop-filter:blur(24px);
  box-shadow: 0 30px 60px rgba(0,0,0,0.6);
  transition: transform 0.3s;
}
.fc:hover { transform: translateY(-10px); }
.fc-ico{width:40px;height:40px;margin-bottom:24px; stroke:var(--accent)}
.fc-t{font-family:var(--ff-d);font-weight:600;font-size:20px;color:#fff;margin-bottom:12px}
.fc-d{font-family:var(--ff-b);font-size:15px;color:rgba(255,255,255,0.8);line-height:1.5}

/* ─────────────────────────────────────────
   ANTES x DEPOIS (HIGH IMPACT)
───────────────────────────────────────── */
.ba-block{
  grid-template-columns:1fr 1fr; gap:0;
  border-radius:16px; overflow:hidden; margin-bottom:40px;
  border: none;
  background: transparent;
  box-shadow: 0 20px 50px rgba(0,0,0,0.4);
}
.ba-a, .ba-d {
  border-radius:0; padding:60px 48px; position:relative;
}
/* Vapor Oliva for Before, Azul Industrial for After */
.ba-a { background: var(--vapor-oliva); border-right:2px solid rgba(0,0,0,0.3); }
.ba-d { background: var(--azul-ind); border-left: 4px solid var(--accent); }

/* Glow on the right side box */
.ba-d::after {
  content:''; position:absolute; inset:0; border: 2px solid var(--accent); opacity:0.5; pointer-events:none;
}

.ba-tag{
  display:inline-block;font-family:var(--ff-d);font-weight:700;
  font-size:13px;letter-spacing:2px;text-transform:uppercase;margin-bottom:20px;
  background:rgba(0,0,0,0.3); padding:6px 12px; border-radius:4px;
}
.tga{color: var(--cinza-aco)}
.tgd{color: var(--accent); background:rgba(206,137,59,0.15);}
.ba-ttl{font-family:var(--ff-d);font-weight:700;font-size:24px;color:#fff;margin-bottom:16px}
.ba-txt{font-family:var(--ff-b);font-size:16px;color:rgba(255,255,255,0.85);line-height:1.6}

/* ─────────────────────────────────────────
   CREDIBILIDADE
───────────────────────────────────────── */
.cred-q{
  border-color: var(--accent);
  padding:60px; max-width:840px; margin:60px auto 0;
  background: rgba(10,36,114,0.3);
}
.cred-q::before {
  content:''; position:absolute; top:0; left:0; width:100%; height:4px; background:var(--accent);
}
.cred-qt{
  font-family:var(--ff-d);font-weight:500;font-size:22px;
  color:#fff;line-height:1.5;text-align:center;
}

/* ─────────────────────────────────────────
   CTA
───────────────────────────────────────── */
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
  background:var(--azul-ind);
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
  
  .s-prob .wrap { grid-template-columns:1fr; }
  .stat-row, .steps, .fc-row{grid-template-columns:1fr}
  .fc-row { margin-top: 0; }
  
  .ba-block{grid-template-columns:1fr}
  .ba-a{border-right:none; border-bottom:1px solid var(--border-glass)}
  .cta-g{grid-template-columns:1fr;gap:48px}
  .foot-g{grid-template-columns:1fr;text-align:center}
  .fcopy{text-align:center}
  
  .phone-showcase { flex-direction:column; gap:60px; margin-bottom:60px; }
  .phone-1, .phone-3 { transform: none; }
  .phone-2 { transform: none; }
}
</style>"""

html = re.sub(r'<style>.*?</style>', new_css, html, flags=re.DOTALL)

# 3. Extract the S-PROD section and inject it back right after TICKER.
s_prod_match = re.search(r'(<!-- ════════════════════════════════════════\n\s*DASHBOARD.*?<section class="s-prod".*?</section>\n)', html, flags=re.DOTALL)
if s_prod_match:
    s_prod_str = s_prod_match.group(1)
    
    # Remove the old S-PROD
    html = html.replace(s_prod_str, "")
    
    # Inject it after TICKER. The Ticker ends with </div>\n</div>\n
    # Also I need to modify the fc-row to float in s-prod_str
    s_prod_str = s_prod_str.replace('<div class="phone-showcase fa">', '<div class="platform-container">\n    <div class="phone-showcase fa">')
    
    # Before the </section>, we close platform-container
    s_prod_str = s_prod_str.replace('</section>', '  </div>\n</section>')

    # Now to insert it after the ticker
    ticker_match = re.search(r'(<!-- TICKER -->\s*<div class="ticker">.*?</div>\n</div>\n)', html, flags=re.DOTALL)
    if ticker_match:
        html = html[:ticker_match.end()] + '\n' + s_prod_str + html[ticker_match.end():]

# 4. Modify 'O Problema' section structure using Regex
s_prob_inner_pattern = r"(<span class=\"lbl\">O PROBLEMA</span>\s*<h2.*?</p>\n\n\s*<div class=\"stat-row\">.*?</div>)"
s_prob_inner_match = re.search(s_prob_inner_pattern, html, flags=re.DOTALL)

if s_prob_inner_match:
    original_inner = s_prob_inner_match.group(1)
    new_inner = f"""<div class="prob-text-content">
      {original_inner}
    </div>
    <div class="prob-img-wrap fa">
      <img src="./assets/boiler_steam_problem.png" alt="Industria Boiler">
    </div>"""
    html = html.replace(original_inner, new_inner)

# 5. Add ghost watermark to S-PROB
if '<div class="prob-ghost">%' not in html:
    html = html.replace('<section class="s-prob" id="s-prob">\n  <div class="wrap">', '<section class="s-prob" id="s-prob">\n  <div class="prob-ghost">%</div>\n  <div class="wrap">')

# 6. Fix GSAP for reverse snap-in
old_gsap_match = re.search(r'(// Apple-style disassembly Parallax.*?)(?=\s+// Staggered groups|\s+/\* Scroll animations)', html, flags=re.DOTALL)
if not old_gsap_match:
    # Check if the // Purgador entrance is still there (if the previous script didn't apply correctly)
    old_gsap_match = re.search(r'(/\* Purgador entrance \*/.*?)(?=\s+/\* Scroll animations \*/|\s+// Staggered groups)', html, flags=re.DOTALL)

if old_gsap_match:
    new_gsap_code = """// Oikos Assembly Parallax (Starts separated, snaps into place)
  const desk = innerWidth > 768;
  if (desk) {
    // Initial separation
    gsap.set('#lC', { y: -180 });
    gsap.set('#lD', { y: -80 });
    
    // Assemble downwards as user scrolls past hero
    gsap.to('#lC', {
      y: 0, 
      ease: "power2.out",
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      }
    });

    gsap.to('#lD', {
      y: 0, 
      ease: "power2.out",
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      }
    });

    gsap.to('#plGlow', {
      opacity: 0.8,
      ease: "none",
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      }
    });
  }
"""
    html = html.replace(old_gsap_match.group(1), new_gsap_code)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(html)
