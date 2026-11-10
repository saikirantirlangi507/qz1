import { createContext, useState } from 'react';
import * as A from '../services/authService.js';

export const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(A.currentUser());
  const login = (e, p, r) => { const u = A.login(e, p, r); setUser(u); return u; };
  const register = (d) => { const u = A.register(d); setUser(u); return u; };
  const logout = () => { A.logout(); setUser(null); };
  const refresh = () => setUser(A.currentUser());
  return <AuthContext.Provider value={{ user, login, register, logout, refresh }}>{children}</AuthContext.Provider>;
}
