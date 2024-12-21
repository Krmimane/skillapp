import React, { useState, useEffect, useRef } from "react";
import "../styles/Chat.css";
import Badge from "@mui/material/Badge";
import { IoSend } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import userSkill from "../data/user_skill.json"; // Importation directe du fichier JSON

const Chat = ({ currentUsername ,idUserSelected}) => {
  const [storedCurrentUser, setStoredCurrentUser] = useState(currentUsername);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(idUserSelected);
  const [newMessage, setNewMessage] = useState("");
  const [unreadMessages, setUnreadMessages] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  // Charger `storedCurrentUser` depuis localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setStoredCurrentUser(savedUser);
    }
  }, []);

  // Sauvegarder `currentUsername` dans localStorage
  useEffect(() => {
    if (currentUsername) {
      localStorage.setItem("currentUser", currentUsername);
      setStoredCurrentUser(currentUsername); // Mettre à jour storedCurrentUser
    }
  }, [currentUsername]);

  // Charger les utilisateurs depuis le fichier JSON
  useEffect(() => {
    setUsers(userSkill.users);

    // Charger les messages depuis localStorage
    const storedMessages = JSON.parse(localStorage.getItem("messages")) || [];
    setMessages(storedMessages);
  }, []);

  const getUserIdByUsername = (username) => {
    const user = users.find((u) => u.username === username);
    return user ? user.id : null;
  };

  const markMessagesAsRead = (userId) => {
    const currentUserId = getUserIdByUsername(storedCurrentUser);
    const updatedMessages = messages.map((msg) => {
      if (
        msg.idsuser1 === userId &&
        msg.idsuser2 === currentUserId &&
        !msg.read
      ) {
        return { ...msg, read: true };
      }
      return msg;
    });

    setMessages(updatedMessages);
    localStorage.setItem("messages", JSON.stringify(updatedMessages));
  };

  const handleUserClick = (username) => {
    const userId = getUserIdByUsername(username);
    setSelectedUser(userId);

    markMessagesAsRead(userId);
    // Mettre à jour les badges
    setUnreadMessages((prev) => ({
      ...prev,
      [userId]: 0,
    }));
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedUser) {
      const currentUserId = getUserIdByUsername(storedCurrentUser);
      const updatedMessages = [
        ...messages,
        {
          idsuser1: currentUserId,
          idsuser2: selectedUser,
          message: newMessage,
          timestamp: new Date().toISOString(),
          read: false,
        },
      ];
      setMessages(updatedMessages);
      localStorage.setItem("messages", JSON.stringify(updatedMessages));
      setNewMessage("");
    }
  };

  const getMessagesForSelectedUser = () => {
    const currentUserId = getUserIdByUsername(storedCurrentUser);
    return messages.filter(
      (msg) =>
        (msg.idsuser1 === currentUserId && msg.idsuser2 === selectedUser) ||
        (msg.idsuser2 === currentUserId && msg.idsuser1 === selectedUser)
    );
  };

  useEffect(() => {
    const currentUserId = getUserIdByUsername(storedCurrentUser);
    const unread = {};

    users.forEach((user) => {
      const userId = user.id;
      const unreadCount = messages.filter(
        (msg) =>
          msg.idsuser1 === userId && msg.idsuser2 === currentUserId && !msg.read
      ).length;

      unread[userId] = unreadCount;
    });

    setUnreadMessages(unread);
  }, [messages, users, storedCurrentUser]);

  const messagesEndRef = useRef(null);

  // Scroller automatiquement vers le bas
  useEffect(() => {
    scrollToBottom();
  }, [getMessagesForSelectedUser()]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getLastMessageWithUser = (userId) => {
    const currentUserId = getUserIdByUsername(storedCurrentUser);
    const conversation = messages.filter(
      (msg) =>
        (msg.idsuser1 === userId && msg.idsuser2 === currentUserId) ||
        (msg.idsuser2 === userId && msg.idsuser1 === currentUserId)
    );
    if (conversation.length > 0) {
      return conversation[conversation.length - 1].message;
    }
    return "";
  };

  return (
    <div className="chat-container">
      <div className="chat-users">
        <h3>Discussions</h3>
        {/*  <p>Bienvenue, {storedCurrentUser}!</p>*/}
        <div className="chat-search-container">
          <FiSearch size={20} className="chat-search-icon" />
          <input
            style={{ all: "initial" }}
            type="text"
            placeholder="Rechercher un utilisateur..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="chat-search-bar"
          />
        </div>

        {users
          .filter(
            (user) =>
              user.username !== storedCurrentUser &&
              user.username.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((user) => (
            <div
              key={user.id}
              className={`chat-user ${
                selectedUser === user.id ? "chat-user-active" : ""
              }`}
              onClick={() => handleUserClick(user.username)}
            >
              <div className="chat-user-container">
                <img
                  src={user.avatar}
                  alt={`${user.username}'s avatar`}
                  className="chat-user-avatar"
                />
                <div className="chat-user-content">
                  <Badge
                    badgeContent={unreadMessages[user.id] || 0}
                    color="primary"
                    className="chat-user-badge"
                  >
                    <span className="chat-user-name">{user.username}</span>
                  </Badge>
                  <span className="chat-user-message">
                    {getLastMessageWithUser(user.id)}
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>

      <div className="chat-window">
        {selectedUser ? (
          <>
            <div className="chat-header-user">
              <img
                src={users.find((u) => u.id === selectedUser)?.avatar}
                alt="Avatar"
                className="chat-header-avatar"
              />
              <span className="chat-header-username">
                {users.find((u) => u.id === selectedUser)?.username}
              </span>
            </div>

            <div className="chat-messages-container">
              {getMessagesForSelectedUser().length > 0 ? (
                getMessagesForSelectedUser().map((msg, index) => (
                  <div
                    key={index}
                    className={`chat-message ${
                      msg.idsuser1 === getUserIdByUsername(storedCurrentUser)
                        ? "chat-message-sent"
                        : "chat-message-received"
                    }`}
                  >
                    <p className="chat-message-text">{msg.message}</p>
                    <span className="chat-message-timestamp">
                      {new Date(msg.timestamp).toLocaleString()}
                    </span>
                  </div>
                ))
              ) : (
                <p className="chat-no-messages">
                  Aucun message pour le moment.
                </p>
              )}
              {/* Référence pour scroller vers le bas */}
              <div ref={messagesEndRef} />
            </div>

            <div className="chat-input-container">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Écrire un message..."
                className="chat-input"
              />
              <IoSend
                size={25}
                onClick={handleSendMessage}
                className="chat-send-button"
              />
            </div>
          </>
        ) : (
          <p>Sélectionnez une discussion.</p>
        )}
      </div>
    </div>
  );
};

export default Chat;
