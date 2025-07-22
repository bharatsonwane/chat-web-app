import React from 'react';

const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
];

function UserList({ onSelectUser }) {
  const containerStyle = {
    maxWidth: '400px',
    margin: '20px auto',
    padding: '16px',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    backgroundColor: 'white',
    fontFamily: 'sans-serif'
  };

  const userStyle = {
    padding: '12px',
    borderBottom: '1px solid #eee',
    cursor: 'pointer'
  };

  return (
    <div style={containerStyle}>
      <h2>Select a User to Chat</h2>
      {users.map((user) => (
        <div key={user.id} style={userStyle} onClick={() => onSelectUser(user)}>
          {user.name}
        </div>
      ))}
    </div>
  );
}

export default UserList;
