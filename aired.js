(function(){
  var bar = document.getElementById('__aired-bar');
  if (!bar) return;
  var hasHover = window.matchMedia && window.matchMedia('(hover: hover)').matches;
  if (!hasHover) {
    bar.addEventListener('click', function(e){
      if (e.target.closest('a')) return;
      bar.classList.toggle('is-open');
    });
    document.addEventListener('click', function(e){
      if (!bar.contains(e.target)) bar.classList.remove('is-open');
    });
  }
  var report = bar.querySelector('[data-aired-report]');
  if (report) {
    report.addEventListener('click', function(e){
      e.preventDefault();
      if (!confirm('Report this page as inappropriate?')) return;
      fetch('/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: report.getAttribute('data-aired-report'), reason: 'reported via viewer bar' })
      }).then(function(){ alert('Reported. Thank you.'); })
        .catch(function(){ alert('Failed to report. Try again.'); });
    });
  }
})();
window.__ok_aired=1;
