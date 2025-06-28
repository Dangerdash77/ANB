import React, { useState } from 'react';

const RoleEditor = () => {
  const [username, setUsername] = useState('');
  const [newRole, setNewRole] = useState('');

  const handleRoleUpdate = async (e) => {
    e.preventDefault();

    const res = await fetch('https://anb-nuis.vercel.app/api/update-role', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, newRole }),
    });

    const result = await res.json();
    alert(result.success ? '✅ Role updated' : `❌ ${result.message}`);
  };

  return (
    <div>
      <h2>Update User Role</h2>
      <form onSubmit={handleRoleUpdate}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <select value={newRole} onChange={e => setNewRole(e.target.value)} required>
          <option value="">Select Role</option>
          <option value="owner">Owner</option>
          <option value="manager">Manager</option>
          <option value="employee">Employee</option>
        </select>
        <button type="submit">Update Role</button>
      </form>
    </div>
  );
};

export default RoleEditor;
