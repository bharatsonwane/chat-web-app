import React, { useState } from 'react';
import UserList from './UserList';
import ChatWithUser from './ChatList';

function Dashboard() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <>
      {!selectedUser ? (
        <UserList onSelectUser={(user) => setSelectedUser(user)} />
      ) : (
        <ChatWithUser user={selectedUser} onBack={() => setSelectedUser(null)} />
      )}
    </>
  );
}

export default Dashboard;
