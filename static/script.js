const form = document.getElementById('spinForm');
const wheel = document.getElementById('wheel');
const button = document.getElementById('spinButton');
const result = document.getElementById('result');
let spinning = false;
let rotation = 0;
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (spinning) return;
  spinning = true;
  button.disabled = true;
  button.innerHTML = '✧ گردونه در حال چرخشه... ✧';
  result.innerHTML = '<div class="result-icon">✦</div><div><span>GOOD LUCK</span><h3>ببینیم شانست چیه...</h3><p>جادو داره اتفاق می‌افته ✨</p></div>';
  try {
    const payload = Object.fromEntries(new FormData(form).entries());
    const response = await fetch('/spin', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(payload)});
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'مشکلی پیش اومد.');
    const index = Math.floor(Math.random() * 6);
    rotation += 360 * 6 + (360 - index * 60 - 30);
    wheel.style.transform = `rotate(${rotation}deg)`;
    setTimeout(() => {
      result.innerHTML = `<div class="result-icon">${data.emoji}</div><div><span>YOUR PRIZE</span><h3>${escapeHTML(data.prize)}</h3><p>${data.prize === 'پوچ' ? 'این بار نشد؛ دفعه‌ی بعد شاید جادویی‌تر باشه ♡' : 'تبریک! جایزه‌ات رو به تتوآرتیست نشون بده ✨'}</p></div>`;
      if (data.prize !== 'پوچ') burstConfetti();
      button.innerHTML = '✦ گردونه رو بچرخون <span>✦</span>';
      button.disabled = false;
      spinning = false;
    }, 5100);
  } catch (error) {
    result.innerHTML = `<div class="result-icon">!</div><div><span>OOPS</span><h3>${escapeHTML(error.message)}</h3><p>دوباره امتحان کن.</p></div>`;
    button.innerHTML = '✦ دوباره تلاش کن <span>✦</span>';
    button.disabled = false;
    spinning = false;
  }
});
function escapeHTML(value) { return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function burstConfetti() {
  const box = document.getElementById('confetti');
  const colors = ['#ff4fb8','#ff9ad8','#b9a0ff','#ffffff','#ffcc74'];
  for (let i = 0; i < 65; i++) {
    const bit = document.createElement('i');
    bit.style.left = Math.random() * 100 + '%';
    bit.style.background = colors[Math.floor(Math.random() * colors.length)];
    bit.style.animationDelay = Math.random() * .7 + 's';
    bit.style.transform = `rotate(${Math.random()*180}deg)`;
    box.appendChild(bit);
    setTimeout(() => bit.remove(), 4000);
  }
}
