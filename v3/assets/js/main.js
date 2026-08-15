/* 博彦设计 V3 · 交互脚本 */
(function () {
  // 移动端导航
  var burger = document.getElementById('navBurger');
  var menu = document.querySelector('.nav-menu');
  if (burger && menu) {
    burger.addEventListener('click', function () { menu.classList.toggle('open'); });
  }

  // 客户墙：内容不足时自动复制一份实现无缝滚动
  var track = document.querySelector('.logo-track');
  if (track && track.children.length < 10) {
    track.innerHTML += track.innerHTML;
  }

  // 数字滚动动画（统计数字从 0 递增）
  function animateNum(el) {
    var text = el.textContent;
    var match = text.match(/^([\d,]+)(.*)$/);
    if (!match) return;
    var target = parseFloat(match[1].replace(/,/g, ''));
    var suffix = match[2];
    var duration = 1400, start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = Math.round(target * eased);
      el.textContent = val.toLocaleString('en-US') + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        var nums = e.target.querySelectorAll('b, .quick-num, .stat b');
        nums.forEach(animateNum);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.hero-stats, .stats-band, .quick-grid').forEach(function (el) { io.observe(el); });

  // 滚动渐显
  var io2 = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io2.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.svc-card, .case-card, .stat, .team-card, .mode-card, .quick-card, .qcard, .vcard, .hstat').forEach(function (el) {
    el.classList.add('rv');
    io2.observe(el);
  });
})();
