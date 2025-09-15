document.addEventListener('DOMContentLoaded', () => {
  const countEl  = document.getElementById('count');
  const clickBtn = document.getElementById('clickBtn');
  const tweetBtn = document.getElementById('tweetBtn');

  if (!countEl || !clickBtn) {
    console.error('[app.js] 必要な要素が見つかりません:', {
      hasCount: !!countEl,
      hasClickBtn: !!clickBtn,
    });
    return;
  }

  let count = 0;

  // 効果音パス
  const soundPaths = {
    small: './sounds/kick_small.mp3',
    medium: './sounds/kick_medium.mp3',
    big: './sounds/kick_big.mp3',
  };

  // ▼ 抽選の重み合計1.0
  const weights = {
    small: 0.5,
    medium: 0.35,
    big: 0.15,
  };

  // 重み付き抽選
  const pickWeighted = () => {
    const r = Math.random();
    let acc = 0;
    for (const key of ['small', 'medium', 'big']) {
      acc += weights[key];
      if (r < acc) return key;
    }
    return 'big';
  };

  // 単発再生
  const play = (src, volume = 1.0) => {
    try {
      const a = new Audio(src);
      a.volume = volume;
      a.play().catch((err) => {
        console.warn('[app.js] 再生できませんでした:', err?.message || err);
      });
    } catch (e) {
      console.warn('[app.js] Audio初期化エラー:', e?.message || e);
    }
  };

  // 重み付きランダムで1つ再生
  const playRandomWeighted = () => {
    const key = pickWeighted();
    play(soundPaths[key]);
  };

  // 50回ごと
  const playAll = () => {
    play(soundPaths.small, 0.9);
    play(soundPaths.medium, 0.9);
    play(soundPaths.big, 0.9);
  };

  // クリックでカウント＋効果音
  clickBtn.addEventListener('click', () => {
    count += 1;
    countEl.textContent = String(count);

    if (count % 50 === 0) {
      playAll();                 
      return;
    }

    playRandomWeighted();     
  });

  // Enter/Spaceでもカウント
  window.addEventListener('keydown', (e) => {
    if (e.code === 'Enter' || e.code === 'Space') {
      e.preventDefault();
      clickBtn.click();
    }
  });

  // 結果ツイート
  if (tweetBtn) {
    tweetBtn.addEventListener('click', () => {
      const n = Number(countEl.textContent || 0);
      const text = `私は今日 ${n} 回やった！💪\n#筋肉は裏切らない #クリックカウンター`;
      const shareUrl = location.href.replace(/app\.html.*$/, ''); 
      const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }
});
