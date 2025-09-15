// DOM構築が終わってから実行（要素未取得エラー対策）
document.addEventListener('DOMContentLoaded', () => {
  const countEl  = document.getElementById('count');
  const clickBtn = document.getElementById('clickBtn');

  // 要素が取れなければ早期リターン（コンソールにヒント）
  if (!countEl || !clickBtn) {
    console.error('[app.js] 必要な要素が見つかりません: ',
      { hasCount: !!countEl, hasClickBtn: !!clickBtn });
    return;
  }

  let count = 0;

  // ランダム再生する効果音（相対パスはプロジェクト構成に合わせる）
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
      // 音量を揃えたい場合は 0.8 などに調整可
      // a.volume = 0.9;
      a.play().catch((err) => {
        // 初回操作前の制限・ファイル未配置など
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
      // Spaceのスクロール抑止
      e.preventDefault();
      clickBtn.click();
    }
  });
});
