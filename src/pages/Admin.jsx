import React, { useState } from 'react';
import AdminLogin from './admin/AdminLogin';
import AdminPanel from './admin/AdminPanel';

export default function Admin() {
  const [authed, setAuthed] = useState(false);

  if (!authed) {
    return <AdminLogin onSuccess={() => setAuthed(true)} />;
  }

  return <AdminPanel onLock={() => setAuthed(false)} />;
}