// FootQuery 项目主页脚本：BibTeX 复制 + 导航当前区块高亮。无任何外部依赖。

// ---- BibTeX 一键复制 ----
(function () {
  var btn = document.getElementById('copy-bibtex');
  var pre = document.getElementById('bibtex');
  if (!btn || !pre) return;

  btn.addEventListener('click', function () {
    var text = pre.innerText;

    function done(ok) {
      var old = btn.textContent;
      btn.textContent = ok ? 'Copied!' : 'Copy failed';
      btn.classList.add('copied');
      setTimeout(function () {
        btn.textContent = old;
        btn.classList.remove('copied');
      }, 1600);
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { done(true); },
                                              function () { fallback(); });
    } else {
      fallback();
    }

    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
      document.body.removeChild(ta);
      done(ok);
    }
  });
})();

// ---- 滚动时高亮导航中当前所在区块 ----
(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav-links a[href^="#"]'));
  if (!links.length || !('IntersectionObserver' in window)) return;

  var map = {};
  links.forEach(function (a) {
    var id = a.getAttribute('href').slice(1);
    var sec = id ? document.getElementById(id) : null;
    if (sec) map[id] = a;
  });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var a = map[entry.target.id];
      if (!a) return;
      if (entry.isIntersecting) {
        links.forEach(function (l) { l.classList.remove('active'); });
        a.classList.add('active');
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });

  Object.keys(map).forEach(function (id) { io.observe(document.getElementById(id)); });
})();
