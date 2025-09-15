// 夜间模式切换（全站共享）
(function() {
  const MODE_KEY = "siteThemeMode"; // 'dark' | 'light'
  const toggle = document.getElementById("modeToggle");

  function applyMode(mode) {
    const isDark = mode === "dark";
    document.body.classList.toggle("dark-mode", isDark);
    if (toggle) toggle.checked = isDark;
  }

  let stored = "";
  try { stored = localStorage.getItem(MODE_KEY) || ""; } catch (_) {}
  const initialMode = stored === "dark" ? "dark" : "light";
  applyMode(initialMode);

  if (toggle) {
    toggle.addEventListener("change", () => {
      const mode = toggle.checked ? "dark" : "light";
      applyMode(mode);
      try { localStorage.setItem(MODE_KEY, mode); } catch (_) {}
    });
  }
})();

// 图片放大效果（只对内容区生效）
document.querySelectorAll(".content-section img").forEach(img => {
  img.addEventListener("click", () => {
    let overlay = document.createElement("div");
    overlay.className = "img-overlay";

    let bigImg = document.createElement("img");
    bigImg.src = img.src;
    bigImg.className = "img-big";

    let closeBtn = document.createElement("div");
    closeBtn.innerHTML = "&times;";
    closeBtn.className = "img-close";

    overlay.appendChild(bigImg);
    overlay.appendChild(closeBtn);
    document.body.appendChild(overlay);

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay || e.target === closeBtn) overlay.remove();
    });
  });
});

// 选手详情模态窗逻辑（team.html）
(function() {
  const openBtns = document.querySelectorAll('.player-detail-btn');
  if (!openBtns.length) return;

  const modal = document.getElementById('playerModal');
  const closeBtn = document.getElementById('playerModalClose');
  const nameEl = document.getElementById('playerName');
  const roleEl = document.getElementById('playerRole');
  const ageEl = document.getElementById('playerAge');
  const descEl = document.getElementById('playerDesc');
  const ratingEl = document.getElementById('statRating');
  const adrEl = document.getElementById('statADR');
  const kastEl = document.getElementById('statKAST');
  const kprEl = document.getElementById('statKPR');
  const impactEl = document.getElementById('statImpact');
  const dprEl = document.getElementById('statDPR');
  const photoEl = document.getElementById('playerPhoto');
  const basicInfoEl = document.getElementById('basicInfo');
  const mouseConfigEl = document.getElementById('mouseConfig');
  const displayConfigEl = document.getElementById('displayConfig');
  const gearListEl = document.getElementById('gearList');

  // 详细数据对象
  const players = {
    Attacker: {
      name: 'Attacker', birthday: '1997-01-07', team: 'TYLOO', prize: '$260,606',
      mates: ['JamYoung','Jee','Mercury','Moseyuh'],
      stats: { rating: '0.95（较差）', kpr: '0.57（较差）', kast: '73.3%（优秀）', impact: '0.40（优秀）', adr: '63.5（优秀）', dpr: '0.67（中等）' },
      mouse: { model: 'VAXEE XE Wireless White', zoom: '1.00', dpi: '400', edpi: '920', sens: '2.30', win: '6', hz: '1000 HZ', accel: '关', raw: '开' },
      display: { mode: 'Computer Monitor', res: '1024x768', aspect: '4:3', scale: 'Stretched' },
      gears: ['鼠标：VAXEE XE Wireless White','耳机：HyperX Cloud Flight','显示器：ZOWIE XL2546K','键盘：SteelSeries Apex pro TKL','鼠标垫：臻火诀 / Zhenhuo Secret - BL...','CPU：Intel Core i9 - 12900K','显卡：NVIDIA GeForce RTX 308...'],
      img: 'images/白菜.png'
    },
    JamYoung: {
      name: 'JamYoung', birthday: '2001-07-23', team: 'TYLOO', prize: '$142,478',
      mates: ['Attacker','Jee','Mercury','Moseyuh'],
      stats: { rating: '1.21（优秀）', kpr: '0.77（优秀）', kast: '72.2%（中等）', impact: '0.70（优秀）', adr: '85.4（优秀）', dpr: '0.65（优秀）' },
      mouse: { model: 'ZOWIE EC2 - CW', zoom: '1', dpi: '400', edpi: '880', sens: '2.2', win: '6', hz: '1000 HZ', accel: '关', raw: '开' },
      display: { mode: 'Computer Monitor', res: '1280x960', aspect: '4:3', scale: 'Stretched' },
      gears: ['鼠标：ZOWIE EC2 - CW','耳机：HyperX Cloud II Wireless','显示器：ZOWIE XL2546K','键盘：Logitech G715','鼠标垫：SteelSeries Qck Heavy','CPU：Intel Core i9 - 12900K','显卡：NVIDIA GeForce RTX 308...'],
      img: 'images/jamyoung.png'
    },
    Jee: {
      name: 'Jee', birthday: '2004-12-21', team: 'TYLOO', prize: '$90,343',
      mates: ['Attacker','JamYoung','Mercury','Moseyuh'],
      stats: { rating: '1.11（中等）', kpr: '0.72（优秀）', kast: '73.7%（优秀）', impact: '0.39（优秀）', adr: '73.7（中等）', dpr: '0.61（优秀）' },
      mouse: { model: '-', zoom: '1', dpi: '400', edpi: '800', sens: '2', win: '6', hz: '1000 HZ', accel: '关', raw: '开' },
      display: { mode: '-', res: '-', aspect: '-', scale: '-' },
      gears: ['显示器：ZOWIE XL2566K'],
      img: 'images/jee.png'
    },
    Mercury: {
      name: 'Mercury', birthday: '2000-12-15', team: 'TYLOO', prize: '$103,382',
      mates: ['Attacker','JamYoung','Jee','Moseyuh'],
      stats: { rating: '0.98（中等）', kpr: '0.63（较差）', kast: '72.6%（中等）', impact: '0.49（优秀）', adr: '70.7（较差）', dpr: '0.68（中等）' },
      mouse: { model: 'ZOWIE S2', zoom: '1', dpi: '400', edpi: '848', sens: '2.12', win: '6', hz: '1000 HZ', accel: '关', raw: '开' },
      display: { mode: 'Computer Monitor', res: '1280x960', aspect: '4:3', scale: 'Stretched' },
      gears: ['鼠标：ZOWIE S2','耳机：HyperX Cloud II','显示器：ZOWIE XL2546K','键盘：SteelSeries Apex Pro','鼠标垫：臻火诀 / Zhenhuo Secret - BL...','CPU：Intel Core i9 - 12900K','显卡：NVIDIA GeForce RTX 3080'],
      img: 'images/mercury.png'
    },
    Moseyuh: {
      name: 'Moseyuh', birthday: '2004-12-21', team: 'TYLOO', prize: '$87,908',
      mates: ['Attacker','JamYoung','Jee','Mercury'],
      stats: { rating: '1.11（中等）', kpr: '0.71（中等）', kast: '74.6%（优秀）', impact: '0.53（优秀）', adr: '76.5（中等）', dpr: '0.69（中等）' },
      mouse: { model: '-', zoom: '-', dpi: '-', edpi: '-', sens: '-', win: '-', hz: '-', accel: '-', raw: '-' },
      display: { mode: 'Computer Monitor', res: '1024x768', aspect: '4:3', scale: 'Black Bars' },
      gears: ['鼠标：ZOWIE EC2 - C','耳机：HyperX Cloud Flight S','显示器：ZOWIE XL2566K','键盘：Corsair K70 RGB MK.2','鼠标垫：臻火诀 / Zhenhuo Secret - BL...','CPU：Intel Core i9 - 12900K','显卡：NVIDIA GeForce RTX 308...'],
      img: 'images/moseyuh.png'
    }
  };

  function lines(arr) { return arr.map(s => `• ${s}`).join('<br>'); }

  function openModalFromBtn(btn) {
    const key = btn.dataset.name;
    const p = players[key];
    if (!p) return;

    nameEl.textContent = p.name;
    roleEl.textContent = btn.dataset.role || '-';
    ageEl.textContent = (btn.dataset.age || '-') + ' 岁';
    descEl.textContent = btn.dataset.desc || '';

    ratingEl.textContent = p.stats.rating;
    adrEl.textContent = p.stats.adr;
    kastEl.textContent = p.stats.kast;
    kprEl.textContent = p.stats.kpr;
    impactEl.textContent = p.stats.impact;
    dprEl.textContent = p.stats.dpr;

    basicInfoEl.innerHTML = `姓名：${p.name}<br>生日：${p.birthday}<br>现役战队：${p.team}<br>获取奖金：${p.prize}<br>现任队友：${p.mates.join('、')}`;
    mouseConfigEl.innerHTML = `鼠标型号：${p.mouse.model}<br>开镜灵敏度：${p.mouse.zoom}<br>DPI：${p.mouse.dpi}<br>eDPI：${p.mouse.edpi}<br>游戏内灵敏度：${p.mouse.sens}<br>Windows 灵敏度：${p.mouse.win}<br>回报率：${p.mouse.hz}<br>鼠标加速：${p.mouse.accel}<br>鼠标原始输入：${p.mouse.raw}`;
    displayConfigEl.innerHTML = `色彩模式：${p.display.mode}<br>分辨率：${p.display.res}<br>纵横比：${p.display.aspect}<br>缩放模式：${p.display.scale}`;
    gearListEl.innerHTML = lines(p.gears);

    photoEl.src = p.img;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  openBtns.forEach(btn => btn.addEventListener('click', () => openModalFromBtn(btn)));
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('active')) closeModal(); });
})();
