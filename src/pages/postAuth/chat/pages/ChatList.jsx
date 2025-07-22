import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import { AlertCircle, Loader2, MessageCircle, RefreshCw, Search, User } from "lucide-react";

const ChatList = () => {
  const [userList, setUserList] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getUsersData = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = Cookies.get("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.get(`http://localhost:8000/user/list`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const users = response?.data || [];
      setUserList(users);
      setFilteredUsers(users);
    } catch (error) {
      console.error("Error fetching user data:", error);

      if (error.response?.status === 401) {
        navigate("/login");
        return;
      }

      setError("Failed to load users. Please try again.");
      setUserList([]);
      setFilteredUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (!term.trim()) {
      setFilteredUsers(userList);
    } else {
      const filtered = userList.filter(user =>
        `${user.first_name || ''} ${user.last_name || ''}`
          .toLowerCase()
          .includes(term.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  };

  const handleUserClick = (user) => {
    navigate(`/chat/oneToOne/${user.id}`, { state: user });
  };

  const getInitials = (firstName, lastName) => {
    const first = firstName?.charAt(0)?.toUpperCase() || '';
    const last = lastName?.charAt(0)?.toUpperCase() || '';
    return first + last || 'U';
  };

  useEffect(() => {
    getUsersData();
  }, []);

  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(to bottom right, #eff6ff, #e0e7ff)",
    },
    header: {
      backgroundColor: "white",
      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
      borderBottom: "1px solid #e5e7eb",
      padding: "16px 24px",
    },
    headerTitle: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#1f2937",
      marginLeft: "8px",
    },
    refreshButton: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "8px 16px",
      color: "#2563eb",
      background: "transparent",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
    },
    searchInput: {
      width: "100%",
      padding: "12px 16px 12px 36px",
      border: "1px solid #d1d5db",
      borderRadius: "12px",
      outline: "none",
      boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
    },
    card: {
      backgroundColor: "white",
      borderRadius: "16px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
      overflow: "hidden",
    },
    userRow: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
      padding: "24px",
      cursor: "pointer",
      transition: "background 0.2s ease",
    },
    avatar: {
      width: "48px",
      height: "48px",
      borderRadius: "9999px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(to bottom right, #3b82f6, #8b5cf6)",
      color: "white",
      fontWeight: "600",
      fontSize: "18px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    userName: {
      fontSize: "18px",
      fontWeight: "600",
      color: "#111827",
    },
    userEmail: {
      fontSize: "14px",
      color: "#6b7280",
    },
    username: {
      fontSize: "14px",
      color: "#9ca3af",
    },
    footer: {
      textAlign: "center",
      marginTop: "16px",
      fontSize: "14px",
      color: "#6b7280",
    },
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <MessageCircle size={32} color="#2563eb" />
            <h1 style={styles.headerTitle}>Chat with Users</h1>
          </div>
          <button style={styles.refreshButton} onClick={getUsersData} disabled={loading}>
            <RefreshCw className={loading ? "animate-spin" : ""} size={16} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      <div style={{ maxWidth: "768px", margin: "0 auto", padding: "32px 24px" }}>
        {/* Search Bar */}
        <div style={{ marginBottom: "24px", position: "relative" }}>
          <Search style={{ position: "absolute", top: "50%", left: "12px", transform: "translateY(-50%)", color: "#9ca3af" }} size={20} />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            style={styles.searchInput}
          />
        </div>

        {/* Content Area */}
        <div style={styles.card}>
          {loading ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "64px 0" }}>
              <Loader2 className="animate-spin" size={32} color="#2563eb" />
              <p style={{ color: "#6b7280", marginTop: "16px" }}>Loading users...</p>
            </div>
          ) : error ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "64px 0" }}>
              <AlertCircle size={32} color="#ef4444" />
              <p style={{ color: "#ef4444", margin: "16px 0" }}>{error}</p>
              <button
                onClick={getUsersData}
                style={{ padding: "8px 24px", backgroundColor: "#2563eb", color: "white", borderRadius: "8px", border: "none", cursor: "pointer" }}
              >
                Try Again
              </button>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "64px 0" }}>
              <User size={32} color="#9ca3af" />
              <p style={{ color: "#6b7280", marginTop: "16px" }}>
                {searchTerm ? 'No users found matching your search.' : 'No users available.'}
              </p>
            </div>
          ) : (
            <div>
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  onClick={() => handleUserClick(user)}
                  style={{ ...styles.userRow, borderBottom: "1px solid #f3f4f6" }}
                  onMouseOver={(e) => (e.currentTarget.style.background = "#f9fafb")}
                  onMouseOut={(e) => (e.currentTarget.style.background = "white")}
                >
                  <div style={styles.avatar}>{getInitials(user.first_name, user.last_name)}</div>
                  <div style={{ flex: 1 }}>
                    <h3 style={styles.userName}>{user.first_name || 'Unknown'} {user.last_name || 'User'}</h3>
                    {user.email && <p style={styles.userEmail}>{user.email}</p>}
                    {user.username && <p style={styles.username}>@{user.username}</p>}
                  </div>
                  <div style={{ ...styles.avatar, width: "32px", height: "32px", background: "#f3f4f6", color: "#9ca3af" }}>
                    <MessageCircle size={16} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Info */}
        {!loading && !error && filteredUsers.length > 0 && (
          <div style={styles.footer}>
            Showing {filteredUsers.length} of {userList.length} users
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;
