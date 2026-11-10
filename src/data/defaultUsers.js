const d = (n) => new Date(Date.now() - n * 86400000).toISOString();
export const defaultUsers = [
  { id: 'admin', name: 'Administrator', email: 'admin@quizbuilder.com', password: 'Admin@123', role: 'admin', blocked: false, joined: d(60) },
  { id: 'u1', name: 'Ananya Rao', email: 'ananya@example.com', password: 'Student@123', role: 'user', blocked: false, joined: d(20) },
  { id: 'u2', name: 'Rahul Verma', email: 'rahul@example.com', password: 'Student@123', role: 'user', blocked: false, joined: d(14) },
  { id: 'u3', name: 'Priya Nair', email: 'priya@example.com', password: 'Student@123', role: 'user', blocked: false, joined: d(9) },
];
