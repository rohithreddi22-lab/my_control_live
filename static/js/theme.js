// Theme Manager for My Control SaaS
(function () {
  const THEME_KEY = 'mycontrol_theme';

  // Apply saved theme immediately to avoid flicker
  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) return saved;
    // Default to light (beige & white luxury)
    return 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem(THEME_KEY, theme);

    // Update any toggle buttons on the page
    const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
    toggleBtns.forEach((btn) => {
      const icon = btn.querySelector('i');
      if (icon) {
        if (theme === 'dark') {
          icon.className = 'bi bi-sun-fill text-warning';
          btn.setAttribute('title', 'Switch to Beige & White Light Mode');
        } else {
          icon.className = 'bi bi-moon-stars-fill text-dark';
          btn.setAttribute('title', 'Switch to Dark Mode');
        }
      }
    });
  }

  // Initial application
  const currentTheme = getPreferredTheme();
  applyTheme(currentTheme);

  // Global toggle function
  window.toggleTheme = function () {
    const active = document.documentElement.getAttribute('data-theme') || 'light';
    const nextTheme = active === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
  };

  // Wire up when DOM is ready
  document.addEventListener('DOMContentLoaded', function () {
    applyTheme(getPreferredTheme());

    document.querySelectorAll('.theme-toggle-btn').forEach((btn) => {
      btn.addEventListener('click', window.toggleTheme);
    });
  });
})();
