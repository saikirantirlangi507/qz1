import { get, set, uid } from './storageService.js';

export const getUsers = () => get('qb_users', []);
export const currentUser = () => { const id = get('qb_session', null); return getUsers().find((u) => u.id === id) || null; };

export function login(email, password, role) {
  const u = getUsers().find((x) => x.email.toLowerCase() === email.trim().toLowerCase());
  if (!u || u.password !== password) throw new Error('Invalid email or password.');
  if (u.role !== role) throw new Error(role === 'admin' ? 'This account is not an administrator.' : 'Admins must use the Admin login tab.');
  if (u.blocked) throw new Error('Your account has been blocked. Contact the administrator.');
  set('qb_session', u.id); return u;
}
export function register({ name, email, password }) {
  if (getUsers().some((u) => u.email.toLowerCase() === email.trim().toLowerCase())) throw new Error('This email is already registered.');
  const u = { id: uid(), name: name.trim(), email: email.trim().toLowerCase(), password, role: 'user', blocked: false, joined: new Date().toISOString() };
  set('qb_users', [...getUsers(), u]); set('qb_session', u.id); return u;
}
export const logout = () => localStorage.removeItem('qb_session');
export const updateUser = (id, patch) => set('qb_users', getUsers().map((u) => (u.id === id ? { ...u, ...patch } : u)));
export function deleteUser(id) {
  set('qb_users', getUsers().filter((u) => u.id !== id));
  set('qb_results', get('qb_results', []).filter((r) => r.userId !== id));
}
