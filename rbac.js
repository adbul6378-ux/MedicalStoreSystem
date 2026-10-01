(function () {
  const APP_STORAGE = {
    accounts: 'medicalStoreAccounts',
    session: 'medicalStoreSession',
    permissions: 'medicalStoreRolePermissions',
    audit: 'medicalStoreAuditLogs',
    settings: 'medical_store_settings',
    tempAccess: 'medicalStoreTempAccess'
  };
  const SECRET_ADMIN_EMAIL = 'secret-code-admin@medical-store.local';
  const ADMIN_SECRET_CODE = (() => {
    try {
      return atob('bW9lZXoxMDI5');
    } catch (error) {
      return 'moeez1029';
    }
  })();
  const RESTRICTED_SECTION_MAP = {
    'merged_medical_store.html': 'Dashboard',
    'medicine.html': 'Medicine',
    'add-medicine.html': 'Add Medicine',
    'all-medicines.html': 'Medicine',
    'medicine-categories.html': 'Medicine Categories',
    'expiry-alerts.html': 'Expiry Alerts',
    'sales.html': 'Sales',
    'new-sale.html': 'Sales',
    'sales-list.html': 'Sales',
    'quotation.html': 'Sales',
    'invoice-print.html': 'Sales',
    'customer.html': 'Customers',
    'add-customer.html': 'Customers',
    'customer-groups.html': 'Customers',
    'suppliers.html': 'Suppliers',
    'purchases.html': 'Purchases',
    'stock.html': 'Stock',
    'medical-reports.html': 'Reports',
    'reports.html': 'Reports',
    'expenses.html': 'Expenses',
    'users.html': 'Users',
    'medical-settings.html': 'Settings'
  };

  const MODULE_ALIASES = {
    dashboard: 'Dashboard',
    medicine: 'Medicine',
    sales: 'Sales',
    purchases: 'Purchases',
    customers: 'Customers',
    suppliers: 'Suppliers',
    stock: 'Stock',
    reports: 'Reports',
    expenses: 'Expenses',
    users: 'Users',
    settings: 'Settings',
    backup: 'Backup',
    audit: 'Audit Logs',
    security: 'Settings',
    'audit logs': 'Audit Logs',
    'customer': 'Customers',
    'supplier': 'Suppliers',
    'user': 'Users'
  };

  const ACTION_NAMES = ['view', 'add', 'edit', 'delete', 'print', 'export', 'approve', 'manage'];

  const ROLE_LABELS = {
    super_admin: 'Super Admin',
    admin: 'Admin',
    user: 'User',
    pharmacist: 'Pharmacist',
    sales_employee: 'Sales Employee',
    inventory_employee: 'Inventory Employee',
    accountant: 'Accountant',
    viewer: 'Viewer'
  };

  const ROUTE_PERMISSION_MAP = {
    'merged_medical_store.html': { module: 'Dashboard', action: 'view' },
    'medicine.html': { module: 'Medicine', action: 'view' },
    'dashboard.html': { module: 'Dashboard', action: 'view' },
    'add-medicine.html': { module: 'Medicine', action: 'add' },
    'all-medicines.html': { module: 'Medicine', action: 'view' },
    'medicine-categories.html': { module: 'Medicine Categories', action: 'view' },
    'sales.html': { module: 'Sales', action: 'view' },
    'new-sale.html': { module: 'Sales', action: 'add' },
    'sales-list.html': { module: 'Sales', action: 'view' },
    'quotation.html': { module: 'Sales', action: 'add' },
    'invoice-print.html': { module: 'Sales', action: 'print' },
    'customer.html': { module: 'Customers', action: 'view' },
    'add-customer.html': { module: 'Customers', action: 'add' },
    'customer-groups.html': { module: 'Customers', action: 'view' },
    'suppliers.html': { module: 'Suppliers', action: 'view' },
    'purchases.html': { module: 'Purchases', action: 'view' },
    'stock.html': { module: 'Stock', action: 'view' },
    'medical-reports.html': { module: 'Reports', action: 'view' },
    'reports.html': { module: 'Reports', action: 'view' },
    'expenses.html': { module: 'Expenses', action: 'view' },
    'users.html': { module: 'Users', action: 'view' },
    'medical-settings.html': { module: 'Settings', action: 'view' },
    'expiry-alerts.html': { module: 'Expiry Alerts', action: 'view' }
  };

  const USER_PERMISSION_SECTIONS = [
    { label: 'Sales', permissions: ['view', 'add', 'edit', 'delete', 'print', 'export', 'approve', 'manage'].map((action) => ['Sales', action]) },
    { label: 'Dashboard', permissions: [['Dashboard', 'view']] },
    { label: 'Medicines', permissions: [['Medicine', 'view']] },
    { label: 'Add Medicine', permissions: [['Medicine', 'add']] },
    { label: 'Medicine Categories', permissions: [['Medicine Categories', 'view']] },
    { label: 'Expiry Alerts', permissions: [['Expiry Alerts', 'view']] },
    { label: 'Customers', permissions: ['view', 'add', 'edit', 'delete', 'print', 'export', 'approve', 'manage'].map((action) => ['Customers', action]) },
    { label: 'Suppliers', permissions: ['view', 'add', 'edit', 'delete', 'print', 'export', 'approve', 'manage'].map((action) => ['Suppliers', action]) },
    { label: 'Purchases', permissions: ['view', 'add', 'edit', 'delete', 'print', 'export', 'approve', 'manage'].map((action) => ['Purchases', action]) },
    { label: 'Stock', permissions: ['view', 'add', 'edit', 'delete', 'print', 'export', 'approve', 'manage'].map((action) => ['Stock', action]) },
    { label: 'Reports', permissions: ['view', 'add', 'edit', 'delete', 'print', 'export', 'approve', 'manage'].map((action) => ['Reports', action]) },
    { label: 'Expenses', permissions: ['view', 'add', 'edit', 'delete', 'print', 'export', 'approve', 'manage'].map((action) => ['Expenses', action]) },
    { label: 'Users', permissions: [['Users', 'view']] },
    { label: 'Settings', permissions: ['view', 'add', 'edit', 'delete', 'print', 'export', 'approve', 'manage'].map((action) => ['Settings', action]) }
  ];

  const ROLE_PERMISSIONS = {
    super_admin: {
      Dashboard: { view: true, add: true, edit: true, delete: true, print: true, export: true, approve: true, manage: true },
      Medicine: { view: true, add: true, edit: true, delete: true, print: true, export: true, approve: true, manage: true },
      Sales: { view: true, add: true, edit: true, delete: true, print: true, export: true, approve: true, manage: true },
      Purchases: { view: true, add: true, edit: true, delete: true, print: true, export: true, approve: true, manage: true },
      Customers: { view: true, add: true, edit: true, delete: true, print: true, export: true, approve: true, manage: true },
      Suppliers: { view: true, add: true, edit: true, delete: true, print: true, export: true, approve: true, manage: true },
      Stock: { view: true, add: true, edit: true, delete: true, print: true, export: true, approve: true, manage: true },
      Reports: { view: true, add: true, edit: true, delete: true, print: true, export: true, approve: true, manage: true },
      Expenses: { view: true, add: true, edit: true, delete: true, print: true, export: true, approve: true, manage: true },
      Users: { view: true, add: true, edit: true, delete: true, print: true, export: true, approve: true, manage: true },
      Settings: { view: true, add: true, edit: true, delete: true, print: true, export: true, approve: true, manage: true },
      Backup: { view: true, add: true, edit: true, delete: true, print: true, export: true, approve: true, manage: true },
      'Audit Logs': { view: true, add: true, edit: true, delete: true, print: true, export: true, approve: true, manage: true }
    },
    admin: {
      Dashboard: { view: true, add: true, edit: true, delete: true, print: true, export: true, approve: true, manage: true },
      Medicine: { view: true, add: true, edit: true, delete: true, print: true, export: true, approve: true, manage: true },
      Sales: { view: true, add: true, edit: true, delete: true, print: true, export: true, approve: true, manage: true },
      Purchases: { view: true, add: true, edit: true, delete: true, print: true, export: true, approve: true, manage: true },
      Customers: { view: true, add: true, edit: true, delete: true, print: true, export: true, approve: true, manage: true },
      Suppliers: { view: true, add: true, edit: true, delete: true, print: true, export: true, approve: true, manage: true },
      Stock: { view: true, add: true, edit: true, delete: true, print: true, export: true, approve: true, manage: true },
      Reports: { view: true, add: true, edit: true, delete: true, print: true, export: true, approve: true, manage: true },
      Expenses: { view: true, add: true, edit: true, delete: true, print: true, export: true, approve: true, manage: true },
      Users: { view: true, add: true, edit: true, delete: true, print: true, export: true, approve: true, manage: true },
      Settings: { view: true, add: true, edit: true, delete: true, print: true, export: true, approve: true, manage: true },
      Backup: { view: true, add: true, edit: true, delete: true, print: true, export: true, approve: true, manage: true },
      'Audit Logs': { view: true, add: true, edit: true, delete: true, print: true, export: true, approve: true, manage: true }
    },
    user: {
      Dashboard: { view: false, add: false, edit: false, delete: false, print: false, export: false, approve: false, manage: false },
      Medicine: { view: false, add: false, edit: false, delete: false, print: false, export: false, approve: false, manage: false },
      Sales: { view: true, add: true, edit: true, delete: true, print: true, export: true, approve: true, manage: true },
      Purchases: { view: false, add: false, edit: false, delete: false, print: false, export: false, approve: false, manage: false },
      Customers: { view: false, add: false, edit: false, delete: false, print: false, export: false, approve: false, manage: false },
      Suppliers: { view: false, add: false, edit: false, delete: false, print: false, export: false, approve: false, manage: false },
      Stock: { view: false, add: false, edit: false, delete: false, print: false, export: false, approve: false, manage: false },
      Reports: { view: false, add: false, edit: false, delete: false, print: false, export: false, approve: false, manage: false },
      Expenses: { view: false, add: false, edit: false, delete: false, print: false, export: false, approve: false, manage: false },
      Users: { view: false, add: false, edit: false, delete: false, print: false, export: false, approve: false, manage: false },
      Settings: { view: false, add: false, edit: false, delete: false, print: false, export: false, approve: false, manage: false },
      Backup: { view: false, add: false, edit: false, delete: false, print: false, export: false, approve: false, manage: false },
      'Audit Logs': { view: false, add: false, edit: false, delete: false, print: false, export: false, approve: false, manage: false }
    },
    pharmacist: {
      Dashboard: { view: true, add: false, edit: false, delete: false, print: true, export: false, approve: false, manage: false },
      Medicine: { view: true, add: true, edit: true, delete: false, print: true, export: false, approve: false, manage: false },
      Sales: { view: true, add: true, edit: false, delete: false, print: true, export: false, approve: false, manage: false },
      Purchases: { view: false, add: false, edit: false, delete: false, print: false, export: false, approve: false, manage: false },
      Customers: { view: true, add: true, edit: false, delete: false, print: true, export: false, approve: false, manage: false },
      Suppliers: { view: false, add: false, edit: false, delete: false, print: false, export: false, approve: false, manage: false },
      Stock: { view: true, add: false, edit: false, delete: false, print: true, export: false, approve: false, manage: false },
      Reports: { view: true, add: false, edit: false, delete: false, print: true, export: false, approve: false, manage: false },
      Expenses: { view: false, add: false, edit: false, delete: false, print: false, export: false, approve: false, manage: false },
      Users: { view: false, add: false, edit: false, delete: false, print: false, export: false, approve: false, manage: false },
      Settings: { view: false, add: false, edit: false, delete: false, print: false, export: false, approve: false, manage: false },
      Backup: { view: false, add: false, edit: false, delete: false, print: false, export: false, approve: false, manage: false },
      'Audit Logs': { view: false, add: false, edit: false, delete: false, print: false, export: false, approve: false, manage: false }
    },
    sales_employee: {
      Dashboard: { view: true, add: false, edit: false, delete: false, print: true, export: false, approve: false, manage: false },
      Medicine: { view: true, add: false, edit: false, delete: false, print: true, export: false, approve: false, manage: false },
      Sales: { view: true, add: true, edit: true, delete: false, print: true, export: false, approve: false, manage: false },
      Purchases: { view: false, add: false, edit: false, delete: false, print: false, export: false, approve: false, manage: false },
      Customers: { view: true, add: true, edit: false, delete: false, print: true, export: false, approve: false, manage: false },
      Suppliers: { view: false, add: false, edit: false, delete: false, print: false, export: false, approve: false, manage: false },
      Stock: { view: true, add: false, edit: false, delete: false, print: true, export: false, approve: false, manage: false },
      Reports: { view: true, add: false, edit: false, delete: false, print: true, export: false, approve: false, manage: false },
      Expenses: { view: false, add: false, edit: false, delete: false, print: false, export: false, approve: false, manage: false },
      Users: { view: false, add: false, edit: false, delete: false, print: false, export: false, approve: false, manage: false },
      Settings: { view: false, add: false, edit: false, delete: false, print: false, export: false, approve: false, manage: false },
      Backup: { view: false, add: false, edit: false, delete: false, print: false, export: false, approve: false, manage: false },
      'Audit Logs': { view: false, add: false, edit: false, delete: false, print: false, export: false, approve: false, manage: false }
    },
    inventory_employee: {
      Dashboard: { view: true, add: false, edit: false, delete: false, print: true, export: false, approve: false, manage: false },
      Medicine: { view: true, add: true, edit: true, delete: false, print: true, export: false, approve: false, manage: false },
      Sales: { view: true, add: false, edit: false, delete: false, print: true, export: false, approve: false, manage: false },
      Purchases: { view: true, add: true, edit: false, delete: false, print: true, export: false, approve: false, manage: false },
      Customers: { view: true, add: false, edit: false, delete: false, print: true, export: false, approve: false, manage: false },
      Suppliers: { view: true, add: true, edit: false, delete: false, print: true, export: false, approve: false, manage: false },
      Stock: { view: true, add: true, edit: true, delete: true, print: true, export: true, approve: false, manage: true },
      Reports: { view: true, add: false, edit: false, delete: false, print: true, export: false, approve: false, manage: false },
      Expenses: { view: false, add: false, edit: false, delete: false, print: false, export: false, approve: false, manage: false },
      Users: { view: false, add: false, edit: false, delete: false, print: false, export: false, approve: false, manage: false },
      Settings: { view: false, add: false, edit: false, delete: false, print: false, export: false, approve: false, manage: false },
      Backup: { view: false, add: false, edit: false, delete: false, print: false, export: false, approve: false, manage: false },
      'Audit Logs': { view: false, add: false, edit: false, delete: false, print: false, export: false, approve: false, manage: false }
    },
    accountant: {
      Dashboard: { view: true, add: false, edit: false, delete: false, print: true, export: false, approve: false, manage: false },
      Medicine: { view: true, add: false, edit: false, delete: false, print: true, export: false, approve: false, manage: false },
      Sales: { view: true, add: false, edit: false, delete: false, print: true, export: true, approve: false, manage: false },
      Purchases: { view: true, add: true, edit: true, delete: false, print: true, export: true, approve: true, manage: false },
      Customers: { view: true, add: false, edit: false, delete: false, print: true, export: false, approve: false, manage: false },
      Suppliers: { view: true, add: false, edit: false, delete: false, print: true, export: false, approve: false, manage: false },
      Stock: { view: true, add: false, edit: false, delete: false, print: true, export: false, approve: false, manage: false },
      Reports: { view: true, add: false, edit: false, delete: false, print: true, export: true, approve: true, manage: false },
      Expenses: { view: true, add: true, edit: true, delete: false, print: true, export: true, approve: true, manage: false },
      Users: { view: false, add: false, edit: false, delete: false, print: false, export: false, approve: false, manage: false },
      Settings: { view: false, add: false, edit: false, delete: false, print: false, export: false, approve: false, manage: false },
      Backup: { view: false, add: false, edit: false, delete: false, print: false, export: false, approve: false, manage: false },
      'Audit Logs': { view: false, add: false, edit: false, delete: false, print: false, export: false, approve: false, manage: false }
    },
    viewer: {
      Dashboard: { view: true, add: false, edit: false, delete: false, print: true, export: false, approve: false, manage: false },
      Medicine: { view: true, add: false, edit: false, delete: false, print: false, export: false, approve: false, manage: false },
      Sales: { view: true, add: false, edit: false, delete: false, print: false, export: false, approve: false, manage: false },
      Purchases: { view: false, add: false, edit: false, delete: false, print: false, export: false, approve: false, manage: false },
      Customers: { view: true, add: false, edit: false, delete: false, print: false, export: false, approve: false, manage: false },
      Suppliers: { view: false, add: false, edit: false, delete: false, print: false, export: false, approve: false, manage: false },
      Stock: { view: true, add: false, edit: false, delete: false, print: false, export: false, approve: false, manage: false },
      Reports: { view: true, add: false, edit: false, delete: false, print: false, export: false, approve: false, manage: false },
      Expenses: { view: false, add: false, edit: false, delete: false, print: false, export: false, approve: false, manage: false },
      Users: { view: false, add: false, edit: false, delete: false, print: false, export: false, approve: false, manage: false },
      Settings: { view: false, add: false, edit: false, delete: false, print: false, export: false, approve: false, manage: false },
      Backup: { view: false, add: false, edit: false, delete: false, print: false, export: false, approve: false, manage: false },
      'Audit Logs': { view: false, add: false, edit: false, delete: false, print: false, export: false, approve: false, manage: false }
    }
  };

  function safeParse(value, fallback) {
    try {
      return value ? JSON.parse(value) : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function hashPasswordSync(password) {
    const input = String(password || '');
    let hash = 2166136261;
    for (let i = 0; i < input.length; i += 1) {
      hash ^= input.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return (hash >>> 0).toString(16).padStart(8, '0');
  }

  function looksLikeStoredHash(value) {
    return typeof value === 'string' && /^[0-9a-f]{8,64}$/i.test(value.trim());
  }

  function verifyPassword(account, candidatePassword) {
    if (!account || !candidatePassword) return false;
    const raw = String(candidatePassword || '').trim();
    const storedHash = typeof account.passwordHash === 'string' ? account.passwordHash : '';
    const plainText = typeof account.password === 'string' ? account.password : '';
    const candidateHash = hashPasswordSync(raw);
    return Boolean(
      storedHash && (storedHash === raw || storedHash === candidateHash || storedHash.toLowerCase() === candidateHash.toLowerCase())
      || plainText && (plainText === raw)
    );
  }

  function ensureStorageDefaults() {
    const accounts = JSON.parse(localStorage.getItem(APP_STORAGE.accounts) || 'null');
    const passwordMap = {
      'superadmin@medicalstore.com': 'Admin@123',
      'admin@medicalstore.com': 'Admin@123',
      'user@medicalstore.com': 'User@123',
      'pharmacist@medicalstore.com': 'Pharmacist@123',
      'sales@medicalstore.com': 'Sales@123',
      'inventory@medicalstore.com': 'Inventory@123',
      'accountant@medicalstore.com': 'Accountant@123',
      'viewer@medicalstore.com': 'Viewer@123'
    };

    const normalizeAccounts = (sourceAccounts) => {
      if (!Array.isArray(sourceAccounts)) return [];
      return sourceAccounts.map((account) => {
        const email = String(account && account.email ? account.email : '').toLowerCase();
        const role = account?.role || 'viewer';
        const permissions = account?.permissions && typeof account.permissions === 'object' ? { ...account.permissions } : {};
        if (role === 'user' && !Object.keys(permissions).some((module) => normalizeModule(module) === 'Sales')) {
          permissions.Sales = { ...ROLE_PERMISSIONS.user.Sales };
        }
        const rawPassword = account && Object.prototype.hasOwnProperty.call(account, 'password') ? account.password : '';
        const existingHash = typeof account?.passwordHash === 'string' ? account.passwordHash : '';
        const normalizedHash = looksLikeStoredHash(existingHash)
          ? existingHash
          : (existingHash ? hashPasswordSync(String(existingHash)) : (rawPassword ? hashPasswordSync(String(rawPassword)) : ''));
        const resolvedPasswordHash = email && passwordMap[email] ? hashPasswordSync(passwordMap[email]) : normalizedHash;
        return {
          ...account,
          email: email || account?.email || '',
          role,
          status: account?.status || 'Active',
          passwordHash: resolvedPasswordHash || '',
          permissions
        };
      });
    };

    if (!accounts || !Array.isArray(accounts) || accounts.length === 0) {
      const seedAccounts = [
        { id: 'super-admin', name: 'Super Admin', email: 'superadmin@medicalstore.com', passwordHash: '', role: 'super_admin', status: 'Active', permissions: {} },
        { id: 'admin', name: 'Admin', email: 'admin@medicalstore.com', passwordHash: '', role: 'admin', status: 'Active', permissions: {} },
        { id: 'user', name: 'User', email: 'user@medicalstore.com', passwordHash: '', role: 'user', status: 'Active', permissions: {} },
        { id: 'pharmacist', name: 'Pharmacist', email: 'pharmacist@medicalstore.com', passwordHash: '', role: 'pharmacist', status: 'Active', permissions: {} },
        { id: 'sales-employee', name: 'Sales Employee', email: 'sales@medicalstore.com', passwordHash: '', role: 'sales_employee', status: 'Active', permissions: {} },
        { id: 'inventory-employee', name: 'Inventory Employee', email: 'inventory@medicalstore.com', passwordHash: '', role: 'inventory_employee', status: 'Active', permissions: {} },
        { id: 'accountant', name: 'Accountant', email: 'accountant@medicalstore.com', passwordHash: '', role: 'accountant', status: 'Active', permissions: {} },
        { id: 'viewer', name: 'Viewer', email: 'viewer@medicalstore.com', passwordHash: '', role: 'viewer', status: 'Active', permissions: {} }
      ];

      const hydrated = normalizeAccounts(seedAccounts).map((account) => ({ ...account, passwordHash: hashPasswordSync(passwordMap[account.email] || '') }));
      localStorage.setItem(APP_STORAGE.accounts, JSON.stringify(hydrated));
      if (!localStorage.getItem(APP_STORAGE.permissions)) {
        localStorage.setItem(APP_STORAGE.permissions, JSON.stringify(ROLE_PERMISSIONS));
      }
      return;
    }

    const normalized = normalizeAccounts(accounts);
    const dirty = JSON.stringify(normalized) !== JSON.stringify(accounts);
    if (dirty) {
      localStorage.setItem(APP_STORAGE.accounts, JSON.stringify(normalized));
    }
    if (!localStorage.getItem(APP_STORAGE.permissions)) {
      localStorage.setItem(APP_STORAGE.permissions, JSON.stringify(ROLE_PERMISSIONS));
    }
  }

  async function hashPassword(password) {
    const raw = String(password || '').trim();
    if (!raw) return '';
    return hashPasswordSync(raw);
  }

  function getRolePermissions(role) {
    const permissions = safeParse(localStorage.getItem(APP_STORAGE.permissions), {});
    const base = permissions && permissions[role] ? permissions[role] : ROLE_PERMISSIONS[role] || {};
    return base;
  }

  function setRolePermissions(role, permissions) {
    const allPermissions = safeParse(localStorage.getItem(APP_STORAGE.permissions), {});
    allPermissions[role] = permissions || {};
    localStorage.setItem(APP_STORAGE.permissions, JSON.stringify(allPermissions));
    return allPermissions[role];
  }

  function applyPermissionMatrixForUser(user, matrix) {
    if (!user || !user.email) return user;
    const nextUser = { ...user, permissions: { ...(user.permissions || {}) } };
    Object.keys(matrix || {}).forEach((moduleName) => {
      const nextModule = {};
      Object.keys(matrix[moduleName] || {}).forEach((actionName) => {
        nextModule[actionName] = Boolean(matrix[moduleName][actionName]);
      });
      nextUser.permissions[moduleName] = nextModule;
    });
    return nextUser;
  }

  function normalizeModule(moduleName) {
    if (!moduleName) return 'Dashboard';
    const normalized = String(moduleName).trim();
    const lowercase = normalized.toLowerCase();
    return MODULE_ALIASES[lowercase] || normalized;
  }

  function normalizeAction(actionName) {
    const action = String(actionName || 'view').trim().toLowerCase();
    return ACTION_NAMES.includes(action) ? action : 'view';
  }

  function readAccounts() {
    ensureStorageDefaults();
    return safeParse(localStorage.getItem(APP_STORAGE.accounts), []);
  }

  function getCurrentUser() {
    const session = safeParse(localStorage.getItem(APP_STORAGE.session), null);
    if (!session || !session.email) return null;

    const accounts = readAccounts();
    const sessionEmail = String(session.email || '').toLowerCase();
    const account = accounts.find((item) => item.email && item.email.toLowerCase() === sessionEmail) || {
      ...session,
      email: sessionEmail,
      role: session.role || 'user',
      status: session.status || 'Active'
    };

    if (!account || String(account.status || 'Active').toLowerCase() !== 'active') return null;

    if (sessionEmail === SECRET_ADMIN_EMAIL || account.role === 'super_admin' || account.role === 'admin') {
      return { ...account, role: 'admin', name: account.name || 'Admin' };
    }

    return { ...account, role: account.role || 'user', name: account.name || 'User' };
  }

  function saveCurrentUser(user) {
    localStorage.setItem(APP_STORAGE.session, JSON.stringify({ ...user, passwordHash: undefined }));
  }

  function getUserPermissions(user) {
    const current = user || getCurrentUser();
    if (!current) return {};
    const rolePermissions = getRolePermissions(current.role || 'viewer');
    const directPermissions = current.permissions || {};
    const merged = {};
    Object.keys(rolePermissions || {}).forEach((module) => {
      merged[module] = { ...(rolePermissions[module] || {}) };
    });
    Object.keys(directPermissions || {}).forEach((module) => {
      const normalizedModule = normalizeModule(module);
      if (!merged[normalizedModule]) merged[normalizedModule] = {};
      Object.keys(directPermissions[module] || {}).forEach((action) => {
        merged[normalizedModule][normalizeAction(action)] = Boolean(directPermissions[module][action]);
      });
    });
    return merged;
  }

  function getTemporaryAccess() {
    const temp = safeParse(localStorage.getItem(APP_STORAGE.tempAccess), {});
    if (!temp || typeof temp !== 'object') return {};
    const now = Date.now();
    const valid = {};
    Object.keys(temp).forEach((moduleName) => {
      const entry = temp[moduleName];
      if (entry && Number(entry.expiresAt) > now) {
        valid[moduleName] = entry;
      }
    });
    if (Object.keys(valid).length !== Object.keys(temp).length) {
      localStorage.setItem(APP_STORAGE.tempAccess, JSON.stringify(valid));
    }
    return valid;
  }

  function setTemporaryAccess(moduleName, keepMinutes = 60) {
    const module = normalizeModule(moduleName);
    const current = getTemporaryAccess();
    const user = getCurrentUser();
    current[module] = { expiresAt: Date.now() + keepMinutes * 60 * 1000, userEmail: user ? user.email.toLowerCase() : '' };
    localStorage.setItem(APP_STORAGE.tempAccess, JSON.stringify(current));
    return current[module];
  }

  function hasTemporaryModuleAccess(moduleName) {
    const module = normalizeModule(moduleName);
    const access = getTemporaryAccess();
    const user = getCurrentUser();
    return Boolean(user && access[module] && access[module].userEmail === user.email.toLowerCase());
  }

  function clearTemporaryAccess(moduleName, userEmail) {
    const module = normalizeModule(moduleName);
    const access = getTemporaryAccess();
    const entry = access[module];
    if (!entry || entry.userEmail !== String(userEmail || '').toLowerCase()) return false;
    delete access[module];
    localStorage.setItem(APP_STORAGE.tempAccess, JSON.stringify(access));
    return true;
  }

  function can(moduleName, actionName, userOverride) {
    const user = userOverride || getCurrentUser();
    if (!user) return false;
    const normalizedRole = String(user.role || 'user').toLowerCase();
    if (normalizedRole === 'super_admin' || normalizedRole === 'admin') return true;
    const module = normalizeModule(moduleName);
    const action = normalizeAction(actionName);
    if (module === 'Users' && action !== 'view') return false;
    if (hasTemporaryModuleAccess(module)) return true;
    const directPermissions = user.permissions || {};
    const directModule = Object.keys(directPermissions).find((name) => normalizeModule(name) === module);
    const directActions = directModule ? directPermissions[directModule] : null;
    const directAction = directActions && Object.keys(directActions).find((name) => normalizeAction(name) === action);
    if (directActions && directAction !== undefined) return Boolean(directActions[directAction]);
    const permissions = getUserPermissions(user);
    const modulePermissions = permissions[module] || {};
    return Boolean(modulePermissions[action]);
  }

  function requirePermission(moduleName, actionName, options = {}) {
    const user = options.user || getCurrentUser();
    if (!user || !can(moduleName, actionName, user)) {
      if (!options.silent) {
        showAccessDenied({
          title: 'Access Denied',
          message: `You do not have permission to ${normalizeAction(actionName)} ${normalizeModule(moduleName)}.`,
          module: moduleName,
          action: actionName
        });
      }
      return false;
    }
    return true;
  }

  function showAccessDenied(overrides = {}) {
    const title = overrides.title || 'Access Denied';
    const message = overrides.message || 'You do not have permission to perform this action.';
    const canRequest = Boolean(getCurrentUser() && overrides.module && overrides.action);
    const safeBody = document.body;
    if (!safeBody) return false;
    window.__medicalStoreAccessDenied = true;
    document.documentElement.style.visibility = 'visible';
    safeBody.innerHTML = `
      <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#0f172a,#1e293b);color:#e2e8f0;font-family:Segoe UI,sans-serif;padding:32px;box-sizing:border-box;">
        <div style="max-width:560px;width:100%;background:#fff;color:#0f172a;border-radius:16px;box-shadow:0 25px 60px rgba(15,23,42,.25);padding:32px;border:1px solid rgba(255,255,255,0.08);">
          <div style="display:flex;align-items:center;justify-content:center;width:60px;height:60px;border-radius:12px;background:#fee2e2;color:#991b1b;font-size:30px;margin:0 auto 18px;">!</div>
          <h1 style="text-align:center;margin:0 0 12px;font-size:28px;">${title}</h1>
          <p style="margin:0 0 22px;text-align:center;font-size:15px;line-height:1.7;color:#475569;">${message}</p>
          ${canRequest ? '<div style="display:grid;gap:12px;margin:0 0 20px;"><div style="text-align:center;"><button type="button" id="requestPermissionButton" style="border:1px solid #cbd5e1;border-radius:8px;padding:11px 16px;background:#fff;color:#0f172a;font-weight:600;cursor:pointer;">Request Permission</button><p id="permissionRequestResult" style="margin:10px 0 0;color:#047857;font-size:13px;"></p></div><form id="permissionApprovalForm" style="display:flex;justify-content:center;align-items:center;gap:8px;flex-wrap:wrap;"><label for="permissionApprovalCode" style="font-size:13px;color:#475569;">Have an admin approval code?</label><input id="permissionApprovalCode" autocomplete="one-time-code" placeholder="AC-XXXXXXXX" required style="width:170px;padding:10px;border:1px solid #cbd5e1;border-radius:6px;"><button type="submit" style="border:0;border-radius:6px;padding:10px 14px;background:#2563eb;color:#fff;font-weight:600;cursor:pointer;">Enter Code</button></form><p id="permissionApprovalResult" role="status" style="margin:0;text-align:center;font-size:13px;"></p></div>' : ''}
          <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
            <button type="button" onclick="window.history.back();" style="border:none;border-radius:8px;padding:12px 18px;background:#2563eb;color:#fff;font-weight:600;cursor:pointer;">Go Back</button>
            <button type="button" onclick="window.location.href='merged_medical_store.html';" style="border:none;border-radius:8px;padding:12px 18px;background:#e2e8f0;color:#0f172a;font-weight:600;cursor:pointer;">Dashboard</button>
          </div>
        </div>
      </div>
    `;
    if (canRequest) {
      document.getElementById('requestPermissionButton').addEventListener('click', () => {
        const requestCode = createPermissionRequest(overrides.module, overrides.action);
        const result = document.getElementById('permissionRequestResult');
        result.replaceChildren();
        result.style.cssText = 'display:grid;gap:6px;margin:12px auto 0;padding:12px;border:1px solid #bbf7d0;border-radius:8px;background:#f0fdf4;color:#166534;font-size:13px;';
        if (requestCode) {
          const label = document.createElement('span');
          label.textContent = 'Request created. Share this code with your administrator:';
          const code = document.createElement('strong');
          code.textContent = requestCode;
          code.style.cssText = 'font:700 18px/1.3 Consolas,monospace;letter-spacing:1px;';
          result.append(label, code);
        } else {
          result.textContent = 'Could not create a request. Please try again.';
          result.style.color = '#b91c1c';
          result.style.background = '#fef2f2';
          result.style.borderColor = '#fecaca';
        }
      });
      document.getElementById('permissionApprovalForm').addEventListener('submit', (event) => {
        event.preventDefault();
        const result = redeemPermissionCode(document.getElementById('permissionApprovalCode').value);
        const status = document.getElementById('permissionApprovalResult');
        status.textContent = result.success ? 'Permission approved. Reloading this section...' : result.message;
        status.style.color = result.success ? '#047857' : '#b91c1c';
        if (result.success) window.setTimeout(() => window.location.reload(), 700);
      });
    }
    return true;
  }

  function createPermissionRequest(moduleName, actionName) {
    const user = getCurrentUser();
    if (!user) return '';
    const requests = safeParse(localStorage.getItem('medicalStorePermissionRequests'), []);
    const module = normalizeModule(moduleName);
    const action = normalizeAction(actionName);
    const existing = requests.find((request) => request.userEmail === user.email && request.module === module && request.action === action && request.status === 'Pending');
    if (existing) return existing.code;

    const code = generatePermissionCode('PR');
    requests.unshift({
      code,
      userEmail: user.email,
      userName: user.name || user.email,
      module,
      action,
      status: 'Pending',
      createdAt: new Date().toISOString()
    });
    localStorage.setItem('medicalStorePermissionRequests', JSON.stringify(requests.slice(0, 300)));
    logAudit('Request Permission', module, 'Pending', { reference: code });
    return code;
  }

  function generatePermissionCode(prefix) {
    const values = new Uint32Array(2);
    if (window.crypto?.getRandomValues) window.crypto.getRandomValues(values);
    else {
      values[0] = Math.floor(Math.random() * 0xffffffff);
      values[1] = Math.floor(Math.random() * 0xffffffff);
    }
    return `${prefix}-${Array.from(values, (value) => value.toString(36).toUpperCase().padStart(7, '0')).join('').slice(0, 8)}`;
  }

  function redeemPermissionCode(code) {
    const user = getCurrentUser();
    if (!user) return { success: false, message: 'Sign in with the account that requested this permission.' };
    const requests = safeParse(localStorage.getItem('medicalStorePermissionRequests'), []);
    const approvalCode = String(code || '').trim().toUpperCase();
    const request = requests.find((item) => item.approvalCode === approvalCode && item.status === 'Approved' && item.userEmail.toLowerCase() === user.email.toLowerCase());
    if (!request) return { success: false, message: 'Code is invalid, already used, or belongs to another account.' };

    const accounts = readAccounts();
    const account = accounts.find((item) => item.email.toLowerCase() === user.email.toLowerCase());
    if (!account || String(account.status || 'Active').toLowerCase() !== 'active') {
      return { success: false, message: 'This account is inactive. Contact an administrator.' };
    }
    account.permissions = account.permissions || {};
    account.permissions[request.module] = account.permissions[request.module] || {};
    account.permissions[request.module][request.action] = true;
    localStorage.setItem(APP_STORAGE.accounts, JSON.stringify(accounts));
    request.status = 'Redeemed';
    request.redeemedAt = new Date().toISOString();
    request.approvalCode = '';
    localStorage.setItem('medicalStorePermissionRequests', JSON.stringify(requests));
    logAudit('Redeem Permission Code', request.module, 'Success', { reference: request.code });
    return { success: true, request };
  }

  function reviewPermissionRequest(code, decision) {
    const reviewer = getCurrentUser();
    if (!reviewer || !can('Users', 'manage', reviewer)) return { success: false, message: 'Administrator permission required.' };
    const requests = safeParse(localStorage.getItem('medicalStorePermissionRequests'), []);
    const request = requests.find((item) => item.code === String(code || '').trim().toUpperCase() && item.status === 'Pending');
    if (!request) return { success: false, message: 'Pending request code not found.' };

    if (decision === 'approve') {
      const accounts = readAccounts();
      const account = accounts.find((item) => item.email.toLowerCase() === request.userEmail.toLowerCase());
      if (!account || String(account.status || 'Active').toLowerCase() !== 'active') {
        return { success: false, message: 'The requesting account is missing or inactive.' };
      }
      request.status = 'Approved';
      request.approvalCode = generatePermissionCode('AC');
    } else if (decision === 'reject') {
      request.status = 'Rejected';
    } else {
      return { success: false, message: 'Invalid request decision.' };
    }

    request.reviewedAt = new Date().toISOString();
    request.reviewedBy = reviewer.email;
    localStorage.setItem('medicalStorePermissionRequests', JSON.stringify(requests));
    logAudit(`${decision === 'approve' ? 'Approve' : 'Reject'} Permission Request`, request.module, 'Success', { reference: request.code });
    return { success: true, request, approvalCode: request.approvalCode || '' };
  }

  function getPermissionRequests() {
    return safeParse(localStorage.getItem('medicalStorePermissionRequests'), []);
  }

  function protectPage(moduleName, actionName) {
    const pageModule = normalizeModule(moduleName);
    const currentUser = getCurrentUser();
    if (!currentUser) {
      showAccessDenied({ title: 'Login required', message: 'Please sign in to access this page.' });
      return false;
    }
    if (!can(pageModule, actionName, currentUser)) {
      showAccessDenied({
        title: 'Access Denied',
        message: `You do not have permission to ${normalizeAction(actionName)} ${pageModule}.`,
        module: pageModule,
        action: actionName
      });
      return false;
    }
    hideUnauthorizedControls();
    return true;
  }

  function getRestrictedPageModule(pathName) {
    const safeName = String(pathName || '').split('?')[0].split('#')[0].split('/').pop();
    return RESTRICTED_SECTION_MAP[safeName] || null;
  }

  function isRestrictedRoute(pathName) {
    return Boolean(getRestrictedPageModule(pathName));
  }

  function showAuthorizationModal(pathName, moduleName) {
    const targetPath = String(pathName || '').split('?')[0].split('#')[0] || 'merged_medical_store.html';
    const module = normalizeModule(moduleName || getRestrictedPageModule(targetPath) || 'Dashboard');
    const existing = document.getElementById('medicalStoreAdminAuthModal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'medicalStoreAdminAuthModal';
    modal.style.cssText = 'position:fixed;inset:0;background:rgba(15,23,42,.55);display:flex;align-items:center;justify-content:center;z-index:99999;padding:20px;';
    modal.innerHTML = `
      <div style="width:min(440px,100%);background:#fff;border-radius:14px;box-shadow:0 22px 70px rgba(15,23,42,.28);padding:28px 24px;">
        <div style="width:52px;height:52px;border-radius:50%;display:grid;place-items:center;background:#fef2f2;color:#ef4444;font-size:24px;margin-bottom:16px;">🔒</div>
        <h2 style="margin:0 0 10px;font-size:30px;line-height:1.2;color:#0f172a;">Admin Authorization Required</h2>
        <p style="margin:0 0 18px;color:#475569;font-size:15px;line-height:1.5;">Please enter the Admin authorization code to continue.</p>
        <label for="adminAuthorizationCodeInput" style="display:block;font-size:13px;font-weight:600;color:#334155;margin-bottom:6px;">Enter Admin Code</label>
        <input id="adminAuthorizationCodeInput" type="password" autocomplete="one-time-code" placeholder="Enter Admin Code" style="width:100%;padding:12px 14px;border:1px solid #cbd5e1;border-radius:8px;font-size:15px;outline:none;box-sizing:border-box;" />
        <p id="adminAuthorizationError" role="alert" style="min-height:20px;margin:10px 0 0;color:#b91c1c;font-size:13px;"> </p>
        <div style="display:flex;justify-content:flex-end;gap:10px;margin-top:20px;">
          <button type="button" id="adminAuthorizationCancel" style="border:none;border-radius:8px;padding:11px 18px;background:#e2e8f0;color:#0f172a;font-weight:600;cursor:pointer;">Cancel</button>
          <button type="button" id="adminAuthorizationVerify" style="border:none;border-radius:8px;padding:11px 18px;background:#ef4444;color:#fff;font-weight:700;cursor:pointer;">Verify & Continue</button>
        </div>
      </div>
    `;

    const closeModal = () => modal.remove();
    modal.querySelector('#adminAuthorizationCancel').addEventListener('click', closeModal);
    modal.addEventListener('click', (event) => {
      if (event.target === modal) closeModal();
    });

    modal.querySelector('#adminAuthorizationVerify').addEventListener('click', () => {
      const input = document.getElementById('adminAuthorizationCodeInput');
      const error = document.getElementById('adminAuthorizationError');
      const submittedCode = String(input ? input.value : '').trim();
      if (submittedCode !== ADMIN_SECRET_CODE) {
        error.textContent = 'Invalid Admin authorization code.';
        return;
      }
      setTemporaryAccess(module, 60);
      closeModal();
      if (targetPath && targetPath !== window.location.pathname.split('/').pop()) {
        window.location.href = targetPath;
      } else {
        window.location.reload();
      }
    });

    document.body.appendChild(modal);
    const input = document.getElementById('adminAuthorizationCodeInput');
    if (input) input.focus();
  }

  function hasAccess(moduleName, actionName, userOverride) {
    return can(moduleName, actionName, userOverride || getCurrentUser());
  }

  function authorize(moduleName, actionName, options = {}) {
    const user = options.user || getCurrentUser();
    if (!user) {
      if (!options.silent) {
        showAccessDenied({ title: 'Login required', message: 'Please sign in to access this page.' });
      }
      return false;
    }
    if (!hasAccess(moduleName, actionName, user)) {
      if (!options.silent) {
        showAccessDenied({
          title: 'Access Denied',
          message: `You do not have permission to ${normalizeAction(actionName)} ${normalizeModule(moduleName)}.`,
          module: moduleName,
          action: actionName
        });
      }
      return false;
    }
    return true;
  }

  function isAuthenticated() {
    return Boolean(getCurrentUser());
  }

  function clearSensitiveFieldsForUser(data, moduleName, actionName) {
    if (!data || typeof data !== 'object') return data;
    const currentUser = getCurrentUser();
    if (!currentUser) return data;
    const module = normalizeModule(moduleName);
    const action = normalizeAction(actionName);
    const canViewSensitive = can(module, action, currentUser);
    if (canViewSensitive) return data;

    const filtered = Array.isArray(data) ? data.map((item) => {
      if (item && typeof item === 'object') {
        const clone = { ...item };
        Object.keys(clone).forEach((key) => {
          const lowered = key.toLowerCase();
          if (lowered.includes('phone') || lowered.includes('address') || lowered.includes('salary') || lowered.includes('password') || lowered.includes('note') || lowered.includes('internal') || lowered.includes('admin') || lowered.includes('role') && !lowered.includes('user') && !lowered.includes('customer')) {
            delete clone[key];
          }
        });
        return clone;
      }
      return item;
    }) : { ...data };

    if (filtered && typeof filtered === 'object') {
      Object.keys(filtered).forEach((key) => {
        const lowered = key.toLowerCase();
        if (lowered.includes('phone') || lowered.includes('address') || lowered.includes('salary') || lowered.includes('password') || lowered.includes('note') || lowered.includes('internal') || lowered.includes('admin')) {
          delete filtered[key];
        }
      });
    }
    return filtered;
  }

  function hideUnauthorizedControls() {
    const currentUser = getCurrentUser();
    if (!currentUser) return;

    const selectors = [
      '.btn-sidebar',
      'button',
      'a',
      '.nav-item',
      '.nav-link'
    ];

    selectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((element) => {
        if (element.matches('a, .nav-item, .nav-link')) return;
        const text = (element.textContent || '').trim();
        const href = element.getAttribute('href') || '';
        const lower = text.toLowerCase();
        if ((lower.includes('add medicine') || lower.includes('new sale') || lower.includes('add user')) && !can('Medicine', 'add') && !can('Sales', 'add') && !can('Users', 'add')) {
          element.style.display = 'none';
        }
        if (text.toLowerCase().includes('settings') && !can('Settings', 'view')) {
          element.style.display = 'none';
        }
        if (text.toLowerCase().includes('users') && !can('Users', 'view')) {
          element.style.display = 'none';
        }
        if (href.includes('users.html') && !can('Users', 'view')) {
          element.style.display = 'none';
        }
        if (href.includes('medical-settings.html') && !can('Settings', 'view')) {
          element.style.display = 'none';
        }
        if (href.includes('medicine.html') && !can('Medicine', 'view')) {
          element.style.display = 'none';
        }
        if (href.includes('sales.html') && !can('Sales', 'view')) {
          element.style.display = 'none';
        }
      });
    });

    document.querySelectorAll('[data-action], [data-permission-module]').forEach((element) => {
      const module = normalizeModule(element.dataset.permissionModule || element.getAttribute('data-module') || 'Dashboard');
      const action = normalizeAction(element.dataset.permissionAction || element.getAttribute('data-action') || 'view');
      if (!can(module, action, currentUser)) {
        element.style.display = 'none';
      }
    });
  }

  function logAudit(actionName, moduleName, result, details) {
    try {
      const user = getCurrentUser();
      const entry = {
        id: Date.now() + Math.random(),
        user: user ? user.name : 'System',
        role: user ? (ROLE_LABELS[user.role] || user.role) : 'System',
        action: actionName || 'Unknown Action',
        module: normalizeModule(moduleName),
        result: result || 'Success',
        date: new Date().toISOString().slice(0, 10),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        reference: details && details.reference ? details.reference : '',
        details: details && details.message ? details.message : ''
      };
      const audits = safeParse(localStorage.getItem(APP_STORAGE.audit), []);
      audits.unshift(entry);
      localStorage.setItem(APP_STORAGE.audit, JSON.stringify(audits.slice(0, 500)));
    } catch (error) {
      // ignore storage failures silently
    }
  }

  function getRoleMetadata() {
    return Object.keys(ROLE_LABELS).map((key) => ({ key, label: ROLE_LABELS[key] }));
  }

  function ensureRoleValidation(user) {
    if (!user || !user.role) return false;
    return Boolean(ROLE_LABELS[user.role]);
  }

  function ensureUserNotPromotedSelf(user, nextRole) {
    const current = getCurrentUser();
    if (!current) return false;
    if (current.email === user.email && nextRole && nextRole !== current.role) {
      return false;
    }
    return true;
  }

  function autoProtectRoutes() {
    const path = String(window.location.pathname || '').split('/').pop() || 'merged_medical_store.html';
    const routeMap = ROUTE_PERMISSION_MAP[path] || ROUTE_PERMISSION_MAP[window.location.pathname.split('/').pop()];
    let route = routeMap;
    if (path === 'add-customer.html' && new URLSearchParams(window.location.search).has('edit')) {
      route = { module: 'Customers', action: 'edit' };
    }
    const user = getCurrentUser();
    if (!user) {
      if (path === 'merged_medical_store.html') return false;
      const returnPath = `${path}${window.location.search}${window.location.hash}`;
      localStorage.setItem('medicalStoreReturnPath', returnPath);
      window.location.replace('merged_medical_store.html');
      return false;
    }

    if (user.role === 'admin') {
      hideUnauthorizedControls();
      return true;
    }

    const moduleName = route ? route.module : getRestrictedPageModule(path) || 'Dashboard';
    const action = route ? route.action : 'view';
    if (!route || !can(moduleName, action, user)) {
      showAccessDenied({
        title: 'Access Denied',
        message: 'You do not have permission to access this section. Please contact the Admin.',
        module: moduleName,
        action
      });
      return false;
    }

    hideUnauthorizedControls();
    return true;
  }

  function enforceUserNavigationGuard() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        document.addEventListener('click', (event) => {
          const anchor = event.target.closest('a[href]');
          if (!anchor) return;
          const href = anchor.getAttribute('href');
          if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return;
          const targetPath = href.split('?')[0].split('#')[0];
          const currentUser = getCurrentUser();
          if (!currentUser || String(currentUser.role || 'user').toLowerCase() === 'admin') return;
          if (!isRestrictedRoute(targetPath)) return;
          const route = ROUTE_PERMISSION_MAP[targetPath.split('/').pop()];
          const module = route ? route.module : getRestrictedPageModule(targetPath);
          if (!module || can(module, route ? route.action : 'view', currentUser)) return;
          event.preventDefault();
          showAuthorizationModal(targetPath, module);
        });
      }, { once: true });
      return;
    }

    document.addEventListener('click', (event) => {
      const anchor = event.target.closest('a[href]');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return;
      const targetPath = href.split('?')[0].split('#')[0];
      const currentUser = getCurrentUser();
      if (!currentUser || String(currentUser.role || 'user').toLowerCase() === 'admin') return;
      if (!isRestrictedRoute(targetPath)) return;
      const route = ROUTE_PERMISSION_MAP[targetPath.split('/').pop()];
      const module = route ? route.module : getRestrictedPageModule(targetPath);
      if (!module || can(module, route ? route.action : 'view', currentUser)) return;
      event.preventDefault();
      showAuthorizationModal(targetPath, module);
    });
  }

  const RBAC = {
    APP_STORAGE,
    ROLE_PERMISSIONS,
    USER_PERMISSION_SECTIONS,
    ROLE_LABELS,
    ROUTE_PERMISSION_MAP,
    getRoleMetadata,
    hashPassword,
    verifyPassword,
    readAccounts,
    getCurrentUser,
    saveCurrentUser,
    can,
    hasAccess,
    authorize,
    requirePermission,
    protectPage,
    isAuthenticated,
    hideUnauthorizedControls,
    normalizeModule,
    normalizeAction,
    clearSensitiveFieldsForUser,
    logAudit,
    ensureRoleValidation,
    ensureUserNotPromotedSelf,
    ensureStorageDefaults,
    getRolePermissions,
    setRolePermissions,
    applyPermissionMatrixForUser,
    getUserPermissions,
    showAccessDenied,
    showAuthorizationModal,
    getRestrictedPageModule,
    isRestrictedRoute,
    setTemporaryAccess,
    clearTemporaryAccess,
    hasTemporaryModuleAccess,
    autoProtectRoutes,
    enforceUserNavigationGuard,
    seedDefaults: ensureStorageDefaults
  };

  window.MedicalRBAC = RBAC;

  const requestedPath = String(window.location.pathname || '').split('/').pop();
  const destinationPath = requestedPath === 'medical-reports.html' ? 'reports.html' : requestedPath;
  const currentRoute = ROUTE_PERMISSION_MAP[requestedPath];
  const currentUser = getCurrentUser();
  if (currentRoute && !(requestedPath === 'merged_medical_store.html' && !currentUser) && (!currentUser || !can(currentRoute.module, currentRoute.action, currentUser))) {
    document.documentElement.style.visibility = 'hidden';
  }
  if (destinationPath && destinationPath !== 'merged_medical_store.html' && ROUTE_PERMISSION_MAP[destinationPath] && !getCurrentUser()) {
    localStorage.setItem('medicalStoreReturnPath', `${destinationPath}${window.location.search}${window.location.hash}`);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      ensureStorageDefaults();
      hideUnauthorizedControls();
      autoProtectRoutes();
      enforceUserNavigationGuard();
    });
  } else {
    ensureStorageDefaults();
    hideUnauthorizedControls();
    autoProtectRoutes();
    enforceUserNavigationGuard();
  }
}());
