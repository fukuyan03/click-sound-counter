(() => {
  const countEl  = document.getElementById('count');
  const clickBtn = document.getElementById('clickBtn');

  let count = 0;

  // 大・中・小キック音（効果音ラボからDLしてsoundsフォルダに入れてね）
  const soundPaths = [
    './sounds/kick_small.mp3',
    './sounds/kick_medium.mp3',
    './sounds/kick_big.mp3',
  ];

  // ランダム再生
  const playRandom = () => {
    const src = soundPaths[Math.floor(Math.random() * soundPaths.length)];
    const a = new Audio(src); // 毎回新しいインスタンスで再生（連打でも詰まりにくい）
    a.play().catch(() => {});
  };

  clickBtn.addEventListener('click', () => {
    count++;
    countEl.textContent = count;
    playRandom();
  });
})();
