(function () {
  const settingsKey = 'medical_store_settings';
  const themes = ['ocean', 'emerald', 'sunrise', 'graphite'];
  const protectedRoutes = new Set([
    'add-customer.html',
    'all-medicines.html',
    'customer-groups.html',
    'expiry-alerts.html',
    'invoice-print.html',
    'quotation.html',
    'medicine-categories.html',
    'sales-list.html'
  ]);

  const currentPage = window.location.pathname.split('/').pop();
  if (protectedRoutes.has(currentPage)) {
    document.write('<script src="rbac.js"><' + '/script>');
  }

  function applyMedicalTheme() {
    let settings = {};
    try { settings = JSON.parse(localStorage.getItem(settingsKey) || '{}'); } catch (error) {}
    const theme = themes.includes(settings.theme) ? settings.theme : 'ocean';
    document.documentElement.dataset.theme = theme;
    document.documentElement.classList.toggle('compact-mode', Boolean(settings.compactMode));
    if (settings.accentColor && /^#[0-9a-f]{6}$/i.test(settings.accentColor)) {
      document.documentElement.style.setProperty('--primary-blue', settings.accentColor);
      document.documentElement.style.setProperty('--blue', settings.accentColor);
    }
  }

  function addDashboardReturnLink() {
    const currentPage = window.location.pathname.split('/').pop();
    if (!currentPage || currentPage === 'merged_medical_store.html') return;

    const link = document.createElement('a');
    link.className = 'medical-dashboard-return';
    link.href = 'merged_medical_store.html';
    link.textContent = 'Back to Dashboard';
    link.style.margin = '0';

    const actionBar = document.createElement('div');
    actionBar.style.cssText = 'display:flex;justify-content:flex-end;gap:8px;margin:0 0 16px;';
    actionBar.appendChild(link);

    const logoutButton = document.createElement('button');
    logoutButton.type = 'button';
    logoutButton.textContent = 'Logout';
    logoutButton.setAttribute('aria-label', 'Log out of Medical Store');
    logoutButton.style.cssText = 'padding:9px 13px;border:1px solid var(--border-color,#e5e7eb);border-radius:7px;background:var(--card-bg,#fff);color:var(--text-main,#1f2937);font:600 13px/1.2 "Segoe UI",sans-serif;cursor:pointer;';
    logoutButton.addEventListener('click', () => {
      const rbac = window.MedicalRBAC;
      const user = rbac && rbac.getCurrentUser();
      if (user) rbac.logAudit('Logout', 'Dashboard', 'Success', { reference: user.email });
      localStorage.removeItem('medicalStoreSession');
      localStorage.removeItem('medicalStoreTempAccess');
      window.location.href = 'merged_medical_store.html';
    });
    actionBar.appendChild(logoutButton);

    const container = document.querySelector('.main-content, .main-wrapper, .page, main:not(.receipt), .content');
    if (container) {
      container.insertBefore(actionBar, container.firstChild);
    } else {
      document.body.insertBefore(actionBar, document.body.firstChild);
    }
  }

  applyMedicalTheme();
  window.addEventListener('storage', applyMedicalTheme);
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addDashboardReturnLink, { once: true });
  } else {
    addDashboardReturnLink();
  }
}());
