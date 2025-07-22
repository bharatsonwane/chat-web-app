import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import io from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:8000";

const OneToOneChat = () => {
  const { userId: receiverId } = useParams();
  const [text, setText] = useState("");
  const [media, setMedia] = useState(null);
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  const senderId = JSON.parse(Cookies.get("userData"))?.userId;

  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL, {
      query: { userId: senderId },
    });

    socketRef.current.on("receive-message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [senderId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!text && !media) return;

    const messageData = {
      text: text || "",
      media: media || "",
      sent_user_id: senderId,
      chat_room_id: receiverId,
      delivered_to: receiverId,
    };

    socketRef.current.emit("send-message", messageData);

    await axios.post(`http://localhost:8000/chat/send`, messageData, {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    });

    setMessages((prev) => [...prev, messageData]);
    setText("");
    setMedia(null);
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setMedia(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "800px",
        margin: "0 auto",
        height: "90vh",
        border: "1px solid #ccc",
        borderRadius: 10,
        overflow: "hidden",
        backgroundColor: "#ffffff",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "15px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          fontSize: 18,
          fontWeight: "bold",
        }}
      >
        Chat with User {receiverId}
      </div>

      {/* Messages Section */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "15px",
          backgroundColor: "#f1f1f1",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent:
                msg.sent_user_id === senderId ? "flex-end" : "flex-start",
              marginBottom: 12,
            }}
          >
            <div
              style={{
                maxWidth: "70%",
                backgroundColor:
                  msg.sent_user_id === senderId ? "#d1f2eb" : "#e2e3e5",
                padding: "10px 14px",
                borderRadius: 12,
                wordBreak: "break-word",
              }}
            >
              {msg.text && <div>{msg.text}</div>}
              {msg.media && (
                <img
                  src={msg.media}
                  alt="Media"
                  style={{ marginTop: 8, maxWidth: "100%", borderRadius: 6 }}
                />
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Preview */}
      {media && (
        <div
          style={{
            padding: 10,
            textAlign: "center",
            backgroundColor: "#fff",
            borderTop: "1px solid #ddd",
          }}
        >
          <img
            src={media}
            alt="Preview"
            width={120}
            style={{ borderRadius: 6, marginBottom: 10 }}
          />
        </div>
      )}

      {/* Input Section */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: 12,
          borderTop: "1px solid #ccc",
          backgroundColor: "#fff",
          gap: 10,
        }}
      >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: 8,
            border: "1px solid #ccc",
            outline: "none",
          }}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          style={{ display: "none" }}
          id="fileInput"
        />
        <label
          htmlFor="fileInput"
          style={{
            backgroundColor: "#e9ecef",
            padding: "8px 12px",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          📎
        </label>
        <button
          onClick={handleSend}
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            padding: "10px 16px",
            borderRadius: 8,
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default OneToOneChat;
