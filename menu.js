// Neon button toggle — accessible (keyboard & click)
(function(){
  const btn = document.getElementById('neonBtn');
  const links = document.getElementById('neonLinks');
  if (!btn || !links) return;

  // Toggle function
  function toggle(e) {
    const shown = links.classList.toggle('show');
    btn.setAttribute('aria-expanded', shown ? 'true' : 'false');
    links.setAttribute('aria-hidden', shown ? 'false' : 'true');

    // for smooth collapse: adjust max-height dynamically based on scrollHeight
    if (shown) {
      links.style.maxHeight = links.scrollHeight + 20 + 'px';
      // move focus to first link for keyboard users
      const first = links.querySelector('a');
      if (first) first.focus();
    } else {
      links.style.maxHeight = '0px';
      // return focus to button
      btn.focus();
    }
  }

  // Click & keyboard (Enter/Space) support
  btn.addEventListener('click', toggle);
  btn.addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter' || ev.key === ' ') {
      ev.preventDefault();
      toggle();
    }
  });

  // close when clicking outside the panel (optional)
  document.addEventListener('click', (e) => {
    if (!links.classList.contains('show')) return;
    // if click is outside the panel (menuPanel) and outside btn/links -> close
    const menuPanel = document.getElementById('menuPanel');
    if (menuPanel && !menuPanel.contains(e.target) && !btn.contains(e.target) && !links.contains(e.target)) {
      links.classList.remove('show');
      links.style.maxHeight = '0px';
      btn.setAttribute('aria-expanded','false');
      links.setAttribute('aria-hidden','true');
    }
  }, {passive:true});
})();
