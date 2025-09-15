document.addEventListener('DOMContentLoaded', () => {
  const countEl  = document.getElementById('count');
  const clickBtn = document.getElementById('clickBtn');

  if (!countEl || !clickBtn) {
    console.error('[app.js] 必要な要素が見つかりません: ',
      { hasCount: !!countEl, hasClickBtn: !!clickBtn });
    return;
  }

  let count = 0;

  // ランダム再生する効果音
  const soundPaths = [
    './sounds/kick_small.mp3',
    './sounds/kick_medium.mp3',
    './sounds/kick_big.mp3',
  ];

  // 音が見つからない/再生不可でもアプリは止めない
  const playRandom = () => {
    const src = soundPaths[Math.floor(Math.random() * soundPaths.length)];
    try {
      const a = new Audio(src);
      a.play().catch((err) => {
        console.warn('[app.js] 音を再生できませんでした: ', err?.message || err);
      });
    } catch (e) {
      console.warn('[app.js] Audio 初期化エラー: ', e?.message || e);
    }
  };

  // クリックでカウント＋音
  clickBtn.addEventListener('click', () => {
    count += 1;
    countEl.textContent = String(count);
    playRandom();
  });

  // キーボードでもカウント（Enter/Space）
  window.addEventListener('keydown', (e) => {
    if (e.code === 'Enter' || e.code === 'Space') {
      e.preventDefault();
      clickBtn.click();
    }
  });
});
