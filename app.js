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
    small: './sounds/power.mp3',
    medium: './sounds/protain.mp3',
    big: './sounds/kyuin.mp3',
    extra: '/sounds/Lvup.mp3',
  };

  // ▼ 抽選の重み合計1.0
  const weights = {
    small: 0.55,
    medium: 0.35,
    big: 0.1,
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

  // 再生
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

  // ランダム再生＋音量調整
  const playRandomWeighted = () => {
    const key = pickWeighted();
    if (key === 'small') play(soundPaths.small, 1.0);   
    if (key === 'medium') play(soundPaths.medium, 0.5); 
    if (key === 'big') play(soundPaths.big, 1.0);  
  };

  // 50回
  const fifty = () => {
    play(soundPaths.extra, 1.0);
  };

  // クリックでカウント＋効果音
  clickBtn.addEventListener('click', () => {
    count += 1;
    countEl.textContent = String(count);

    if (count % 50 === 0) {
      fifty();                 
      return;
    }

    playRandomWeighted();     
  });

  // Enter/Spaceでもカウント
  window.addEventListener('keydown', (e) => {
    if ((e.code === 'Enter' || e.code === 'Space') && !e.repeat) {
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
