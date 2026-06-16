/* 【CodePenの JS 欄にこのファイルをすべて貼り付けてください】
*/

// --- 1. 背景のインタラクティブ・サイエンスアート・キャンバス ---
const canvas = document.getElementById('science-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// 浮遊サイエンスオブジェクト（粒子、フラスコ、風車、シロイヌナズナ、DNAなど）
class ScienceObject {
  constructor() {
    this.reset();
    // 初期配置は全面にばらまく
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 20 + 15; // オブジェクトサイズ
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
    this.alpha = Math.random() * 0.25 + 0.15; // 薄暗く浮遊させてテキストの邪魔をしない
    this.angle = Math.random() * Math.PI * 2;
    this.spin = (Math.random() - 0.5) * 0.004;
    
    // 種類: 0 = 原子, 1 = フラスコ, 2 = 風車, 3 = シロイヌナズナの花葉, 4 = DNA螺旋
    this.type = Math.floor(Math.random() * 5);
    this.color = this.getRandomColor();
  }

  getRandomColor() {
    const colors = [
      'rgba(0, 240, 255, ', // ネオンシアン (物理・化学)
      'rgba(57, 255, 20, ', // ネオングリーン (生物シロイヌナズナ)
      'rgba(189, 0, 255, ', // ネオンパープル (先端工学)
      'rgba(255, 255, 255, ' // ホワイト
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  update() {
    this.angle += this.spin;
    this.x += this.speedX;
    this.y += this.speedY;

    // 画面外に出たときの循環
    if (this.x < -this.size * 2 || this.x > canvas.width + this.size * 2 ||
        this.y < -this.size * 2 || this.y > canvas.height + this.size * 2) {
      this.reset();
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.strokeStyle = this.color + this.alpha + ')';
    ctx.fillStyle = this.color + (this.alpha * 0.2) + ')';
    ctx.lineWidth = 1.2;

    if (this.type === 0) {
      // 【原子モデル】
      ctx.beginPath();
      ctx.ellipse(0, 0, this.size, this.size * 0.35, 0, 0, Math.PI * 2);
      ctx.ellipse(0, 0, this.size, this.size * 0.35, Math.PI / 3, 0, Math.PI * 2);
      ctx.ellipse(0, 0, this.size, this.size * 0.35, -Math.PI / 3, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 0, 3, 0, Math.PI * 2);
      ctx.fill();
    } 
    else if (this.type === 1) {
      // 【化学フラスコ】
      ctx.beginPath();
      ctx.moveTo(-this.size * 0.2, -this.size * 0.5);
      ctx.lineTo(this.size * 0.2, -this.size * 0.5);
      ctx.lineTo(this.size * 0.2, -this.size * 0.1);
      ctx.lineTo(this.size * 0.5, this.size * 0.5);
      ctx.lineTo(-this.size * 0.5, this.size * 0.5);
      ctx.lineTo(-this.size * 0.2, -this.size * 0.1);
      ctx.closePath();
      ctx.stroke();
      // 液面
      ctx.beginPath();
      ctx.moveTo(-this.size * 0.4, this.size * 0.2);
      ctx.lineTo(this.size * 0.4, this.size * 0.2);
      ctx.lineTo(this.size * 0.45, this.size * 0.45);
      ctx.lineTo(-this.size * 0.45, this.size * 0.45);
      ctx.closePath();
      ctx.fill();
    } 
    else if (this.type === 2) {
      // 【風車】
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, this.size * 0.7);
      ctx.stroke();
      for (let i = 0; i < 3; i++) {
        ctx.save();
        ctx.rotate((Math.PI * 2 / 3) * i);
        ctx.beginPath();
        ctx.ellipse(0, -this.size * 0.3, this.size * 0.08, this.size * 0.3, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fill();
        ctx.restore();
      }
    } 
    else if (this.type === 3) {
      // 【シロイヌナズナ（小花と葉）】
      ctx.beginPath();
      ctx.moveTo(0, this.size * 0.4);
      ctx.quadraticCurveTo(-this.size * 0.1, 0, 0, -this.size * 0.2);
      ctx.stroke();
      // 2枚の葉
      ctx.beginPath();
      ctx.ellipse(-this.size * 0.2, this.size * 0.1, this.size * 0.1, this.size * 0.2, -Math.PI / 4, 0, Math.PI * 2);
      ctx.ellipse(this.size * 0.2, this.size * 0.1, this.size * 0.1, this.size * 0.2, Math.PI / 4, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fill();
      // 4つの白い花びら
      ctx.save();
      ctx.translate(0, -this.size * 0.25);
      ctx.fillStyle = 'rgba(255,255,255,' + (this.alpha + 0.1) + ')';
      for (let j = 0; j < 4; j++) {
        ctx.rotate(Math.PI / 2);
        ctx.beginPath();
        ctx.ellipse(0, -this.size * 0.1, this.size * 0.05, this.size * 0.1, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    } 
    else if (this.type === 4) {
      // 【DNAダブルヘリックス】
      ctx.beginPath();
      for (let py = -this.size * 0.6; py <= this.size * 0.6; py += 4) {
        let px1 = Math.sin(py * 0.2) * (this.size * 0.4);
        let px2 = Math.sin(py * 0.2 + Math.PI) * (this.size * 0.4);
        ctx.arc(px1, py, 1.2, 0, Math.PI * 2);
        ctx.arc(px2, py, 1.2, 0, Math.PI * 2);
        if (Math.abs(py) % 8 === 0) {
          ctx.moveTo(px1, py);
          ctx.lineTo(px2, py);
        }
      }
      ctx.stroke();
    }

    ctx.restore();
  }
}

const objects = [];
const maxObjects = 24;
for (let i = 0; i < maxObjects; i++) {
  objects.push(new ScienceObject());
}

// 各ノードの接続ライン
function drawConnections() {
  const maxDistance = 180;
  for (let i = 0; i < objects.length; i++) {
    for (let j = i + 1; j < objects.length; j++) {
      let dx = objects[i].x - objects[j].x;
      let dy = objects[i].y - objects[j].y;
      let dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < maxDistance) {
        let opacity = (1 - (dist / maxDistance)) * 0.1;
        ctx.strokeStyle = `rgba(0, 240, 255, ${opacity})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(objects[i].x, objects[i].y);
        ctx.lineTo(objects[j].x, objects[j].y);
        ctx.stroke();
      }
    }
  }
}

// アニメループ
function startBackground() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < objects.length; i++) {
    objects[i].update();
    objects[i].draw();
  }
  drawConnections();
  requestAnimationFrame(startBackground);
}


// --- 2. バーチャルラボ・シミュレーターの相互作用 ---
let currentLabType = 'bio';

function changeLab(type) {
  currentLabType = type;

  const tabs = {
    bio: document.getElementById('tab-bio'),
    chem: document.getElementById('tab-chem'),
    phys: document.getElementById('tab-phys')
  };
  const ctrls = {
    bio: document.getElementById('ctrl-bio'),
    chem: document.getElementById('ctrl-chem'),
    phys: document.getElementById('ctrl-phys')
  };
  const visuals = {
    bio: document.getElementById('vis-bio'),
    chem: document.getElementById('vis-chem'),
    phys: document.getElementById('vis-phys')
  };

  // タブ全初期化
  Object.keys(tabs).forEach(key => {
    tabs[key].className = "py-2 px-1 rounded-lg text-xs font-bold bg-white/5 text-gray-400 border border-transparent transition-all flex flex-col items-center justify-center gap-1";
    ctrls[key].classList.add('hidden');
    visuals[key].classList.add('hidden');
  });

  // アクティブタブスタイル適用
  if (type === 'bio') {
    tabs.bio.className = "py-2 px-1 rounded-lg text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 transition-all flex flex-col items-center justify-center gap-1";
  } else if (type === 'chem') {
    tabs.chem.className = "py-2 px-1 rounded-lg text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 transition-all flex flex-col items-center justify-center gap-1";
  } else if (type === 'phys') {
    tabs.phys.className = "py-2 px-1 rounded-lg text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 transition-all flex flex-col items-center justify-center gap-1";
  }

  ctrls[type].classList.remove('hidden');
  visuals[type].classList.remove('hidden');

  runSim();
}

function runSim() {
  const labelOut = document.getElementById('label-out');
  const valOut = document.getElementById('val-out');
  const descOut = document.getElementById('desc-out');

  if (currentLabType === 'bio') {
    const light = parseInt(document.getElementById('val-light').value);
    const water = parseInt(document.getElementById('val-water').value);

    document.getElementById('txt-light').innerText = light;
    document.getElementById('txt-water').innerText = water + '%';

    labelOut.innerText = "光合成生理効率 (Pn):";

    // 植物SVGのサイズと葉の角度変化のシミュレート
    const stem = document.getElementById('stem-line');
    const flower = document.getElementById('flower-group');

    const growthFactor = (light * 0.4) * (water / 100);

    if (light < 50 || water < 15) {
      valOut.innerText = "生育不全（乾燥限界）";
      valOut.className = "text-lg font-bold font-orbitron text-red-500";
      descOut.innerText = "必要な水分子または光源が不足しているため、シロイヌナズナの生長ホルモンが著しく低下しています。葉が萎縮しています。";
      stem.setAttribute('d', "M 60,110 Q 40,90 35,70"); // 曲げてしおれさせる
      flower.style.opacity = "0";
    } else if (light > 320 && water < 40) {
      valOut.innerText = "光阻害・水分ストレス";
      valOut.className = "text-lg font-bold font-orbitron text-amber-500";
      descOut.innerText = "強すぎる光照射エネルギーに対し気孔水分が足りないため、一時的に細胞保護のための乾燥応答阻害モードに入りました。";
      stem.setAttribute('d', "M 60,110 Q 55,80 50,50");
      flower.style.opacity = "0.2";
    } else {
      valOut.innerText = growthFactor.toFixed(1) + " μmol / s";
      valOut.className = "text-lg font-bold font-orbitron text-emerald-400";
      descOut.innerText = "非常に好適な成長バイオーム環境です。モデル植物シロイヌナズナ特有の4弁白色花が元気に花芽形成をしています。";
      stem.setAttribute('d', "M 60,110 Q 60,70 60,40"); // まっすぐ
      flower.style.opacity = "1";
    }

  } else if (currentLabType === 'chem') {
    const temp = parseInt(document.getElementById('val-temp').value);
    const cat = parseFloat(document.getElementById('val-cat').value);

    document.getElementById('txt-temp').innerText = temp + '°C';
    document.getElementById('txt-cat').innerText = cat.toFixed(1);

    labelOut.innerText = "化学反応係数 (k):";

    const fluid = document.getElementById('sol-fluid');
    const rate = (temp * 0.15) * (cat * 1.8);

    if (rate === 0) {
      valOut.innerText = "反応不活性 (k = 0)";
      valOut.className = "text-lg font-bold font-orbitron text-gray-400";
      descOut.innerText = "活性化障壁を越えるエネルギー量が不足。触媒分子の不活性、または常温低圧による分子衝突確率のゼロ化です。";
      fluid.setAttribute('fill', 'rgba(100,116,139,0.3)');
    } else if (rate > 0 && rate < 12) {
      valOut.innerText = "ゆるやかな反応 (k = " + rate.toFixed(1) + ")";
      valOut.className = "text-lg font-bold font-orbitron text-cyan-400";
      descOut.innerText = "緩慢な分子衝突がフラスコ内で観測されます。新しい単分子材料の生成がゆっくりと進行しています。";
      fluid.setAttribute('fill', 'rgba(6,182,212,0.45)');
    } else if (rate >= 12 && rate < 35) {
      valOut.innerText = "最適結合プロセス (k = " + rate.toFixed(1) + ")";
      valOut.className = "text-lg font-bold font-orbitron text-emerald-400";
      descOut.innerText = "高効率マテリアル合成反応を維持。理想的な温度制御と適正な触媒分布により新物質の結晶化が発生。";
      fluid.setAttribute('fill', 'rgba(16,185,129,0.6)');
    } else {
      valOut.innerText = "注意：過熱爆発反応 (k = " + rate.toFixed(1) + ")";
      valOut.className = "text-lg font-bold font-orbitron text-red-500 animate-pulse";
      descOut.innerText = "危険領域。触媒存在下で過加熱反応。熱力学的連鎖が起こり溶媒の気化および異常過圧が生じています。直ちに冷却を！";
      fluid.setAttribute('fill', 'rgba(239,68,68,0.85)');
    }

  } else if (currentLabType === 'phys') {
    const wind = parseFloat(document.getElementById('val-wind').value);
    const pitch = parseInt(document.getElementById('val-pitch').value);

    document.getElementById('txt-wind').innerText = wind.toFixed(1) + ' m/s';
    document.getElementById('txt-pitch').innerText = pitch + '°';

    labelOut.innerText = "風力最大発電効率 (Cp):";

    const rotor = document.getElementById('turbine-rotor');
    const pitchFactor = Math.cos((pitch - 15) * Math.PI / 180);
    let eff = 0;
    let spinSpeed = 0;

    if (wind >= 2.5) { 
      eff = (Math.pow(wind, 2.5) * 0.08) * pitchFactor;
      spinSpeed = wind * 3.5 * pitchFactor;
    }

    if (wind > 22.0) { 
      valOut.innerText = "サージ制御 (緊急制動中)";
      valOut.className = "text-lg font-bold font-orbitron text-red-500";
      descOut.innerText = "風速が定格限界の22m/sを超過。ブレードをフェザリングにして風車破損を防ぐ緊急保護回路作動中。";
      spinSpeed = 0;
    } else if (eff <= 0) {
      valOut.innerText = "0.00 kW/h";
      valOut.className = "text-lg font-bold font-orbitron text-gray-500";
      descOut.innerText = "起動風速未満、またはブレードのピッチ角度が受風面に合わず、起動トルクが空力抵抗を下回っています。";
      spinSpeed = 0;
    } else {
      valOut.innerText = eff.toFixed(2) + " kW/h";
      valOut.className = "text-lg font-bold font-orbitron text-purple-400";
      descOut.innerText = "理想的なエネルギー変換中。翼ブレード周辺のカルマン渦の発生が抑制され、最適な力学伝達がなされています。";
    }

    // 風車の回転アニメーション制御
    if (window.rotorAnim) clearInterval(window.rotorAnim);
    if (spinSpeed > 0) {
      let currentDeg = 0;
      window.rotorAnim = setInterval(() => {
        currentDeg += spinSpeed * 0.12;
        rotor.style.transform = `rotate(${currentDeg}deg)`;
      }, 16);
    } else {
      rotor.style.transform = `rotate(0deg)`;
    }
  }
}

// 初期化処理
window.addEventListener('load', function() {
  resizeCanvas();
  startBackground();
  changeLab('bio'); 
});