// === Smart Custom Cursor ===
window.addEventListener("load", () => {
  let touchDetected = false;
  window.addEventListener('touchstart', () => touchDetected = true, { once: true });

  setTimeout(() => {
    if (touchDetected && !window.matchMedia('(pointer:fine)').matches) return;
    startCustomCursor();
  }, 300);

  function startCustomCursor() {
    // Tambahkan elemen kursor
    const cursor = document.createElement("div");
    cursor.className = "cursor-fx";
    cursor.innerHTML = `
      <svg viewBox="0 0 100 100">
        <path d="M10,25 L75,50 L10,75 L25,55 L25,45 Z" />
      </svg>`;
    document.body.appendChild(cursor);

    // Variabel posisi
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let prevX = mouseX;
    let prevY = mouseY;
    let angle = 0;
    const MOVE_THRESHOLD = 0.5;
    const tipFraction = 0.85;
    let cw = cursor.offsetWidth, ch = cursor.offsetHeight;
    let tipOffsetX = cw * tipFraction, tipOffsetY = ch / 2;
    let hideTimeout;

    window.addEventListener("resize", () => {
      cw = cursor.offsetWidth;
      ch = cursor.offsetHeight;
      tipOffsetX = cw * tipFraction;
      tipOffsetY = ch / 2;
    });

    document.addEventListener("mousemove", e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.opacity = 1;
      clearTimeout(hideTimeout);
      hideTimeout = setTimeout(() => cursor.style.opacity = 0, 1200);
    });

    document.addEventListener("mouseleave", () => {
      cursor.style.opacity = 0;
    });

    function animate() {
      const dx = mouseX - prevX;
      const dy = mouseY - prevY;
      const speed = Math.hypot(dx, dy);

      if (speed > MOVE_THRESHOLD) {
        const targetAngle = Math.atan2(dy, dx) * 180 / Math.PI;
        let diff = targetAngle - angle;
        diff = ((diff + 180) % 360) - 180;
        angle += diff * 0.25;
      }

      prevX += (mouseX - prevX) * 0.25;
      prevY += (mouseY - prevY) * 0.25;

      const x = prevX - tipOffsetX;
      const y = prevY - tipOffsetY;
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${angle}deg)`;
      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }
});
