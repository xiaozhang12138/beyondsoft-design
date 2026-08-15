/* 博彦设计 V2 · 交互脚本 */
(function () {
  // 移动端导航
  var burger = document.getElementById('navBurger');
  var menu = document.querySelector('.nav-menu');
  if (burger && menu) {
    burger.addEventListener('click', function () { menu.classList.toggle('open'); });
  }

  // 客户墙：双份内容无缝滚动（如果只有一份，自动复制一份）
  var track = document.querySelector('.logo-track');
  if (track) {
    var items = track.children.length;
    if (items < 10) {
      track.innerHTML += track.innerHTML;
    }
  }

  // 滚动渐显
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.svc-card, .work-card, .stat, .team-card, .mode-card, .quick-card, .qcard, .vcard, .hstat').forEach(function (el) {
    el.classList.add('rv');
    io.observe(el);
  });
})();
