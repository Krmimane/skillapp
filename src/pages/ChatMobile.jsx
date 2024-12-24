import React, { useState, useEffect, useRef } from "react";
import { IoSend } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import Badge from "@mui/material/Badge";
import { IoMdArrowRoundBack } from "react-icons/io";
import "../styles/ChatMobile.css";

// Importation du fichier JSON
import userSkillData from "../data/user_skill.json";

// Fonction utilitaire pour gérer l'utilisateur courant
const getCurrentUser = () => {
  const storedUser = localStorage.getItem("currentUsername");
  return storedUser ? storedUser : null;
};

const setCurrentUser = (username) => {
  localStorage.setItem("currentUsername", username);
};

const ChatMobile = ({ currentUsername,idUserSelected,sethumbon,humbon}) => {
  // État du composant
  const [users, setUsers] = useState([]);
  const [storedCurrentUser, setStoredCurrentUser] = useState(currentUsername);
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(idUserSelected);
  const [newMessage, setNewMessage] = useState("");
  const [unreadMessages, setUnreadMessages] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef(null);

  // Charger storedCurrentUser depuis localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setStoredCurrentUser(savedUser);
    }
  }, []);

  // Sauvegarder currentUsername dans localStorage
  useEffect(() => {
    if (currentUsername) {
      localStorage.setItem("currentUser", currentUsername);
      setStoredCurrentUser(currentUsername); // Mettre à jour storedCurrentUser
    }
  }, [currentUsername]);

  // Charger les utilisateurs depuis le fichier JSON
  useEffect(() => {
    setUsers(userSkillData.users);
    // Charger les messages depuis localStorage
    const storedMessages = JSON.parse(localStorage.getItem("messages")) || [];
    setMessages(storedMessages);
  }, []);

  // Fonction de défilement automatique vers le bas
  useEffect(() => {
    scrollToBottom();
  }, [messages, selectedUser]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    setUsers(userSkillData.users); // Importation des utilisateurs
    const storedMessages = JSON.parse(localStorage.getItem("messages")) || [];
    setMessages(storedMessages); // Récupération des messages
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
  }, [messages, users]);

  const getMessagesForSelectedUser = () => {
    const currentUserId = getUserIdByUsername(storedCurrentUser);
    return messages.filter(
      (msg) =>
        (msg.idsuser1 === currentUserId && msg.idsuser2 === selectedUser) ||
        (msg.idsuser2 === currentUserId && msg.idsuser1 === selectedUser)
    );
  };

  return (
    <>
      {!selectedUser && (
        <div
          className="chat-search-container"
          style={{
            position: "absolute",
            top: "1rem",
            left: "5rem",
            width: "60%",
          }}
        >
          <FiSearch size={19} className="chat-search-icon" />
          <input
            style={{ all: "initial" }}
            type="text"
            placeholder="Rechercher un utilisateur..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="chat-search-bar"
          />
        </div>
      )}

      <div className="chat-mobile-container">
        {!selectedUser ? (
          <div className="chat-users-horizontal">
            <div
              className="chat-users-list-mobile"
              style={{ marginTop: "2rem" }}
            >
              {users
                .filter(
                  (user) =>
                    user.username !== storedCurrentUser &&
                    user.username
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                )
                .map((user) => {
                  const lastMessage = messages
                    .filter(
                      (msg) =>
                        (msg.idsuser1 ===
                          getUserIdByUsername(storedCurrentUser) &&
                          msg.idsuser2 === user.id) ||
                        (msg.idsuser2 ===
                          getUserIdByUsername(storedCurrentUser) &&
                          msg.idsuser1 === user.id)
                    )
                    .sort(
                      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
                    )[0];

                  const truncatedMessage =
                    lastMessage?.message.length > 30
                      ? lastMessage.message.substring(0, 30) + "..."
                      : lastMessage?.message;

                  return (
                    <div
                      key={user.id}
                      className="chat-user-item-mobile"
                      onClick={() =>{ handleUserClick(user.username);sethumbon(0);}}
                    >
                      <img
                        src={user.avatar || "/default-avatar.png"}
                        alt={`${user.username} avatar`}
                        className="chat-user-avatar-mobile"
                      />
                      <div className="chat-user-details-mobile">
                        <strong>{user.username}</strong>
                        <span className="chat-last-message-mobile">
                          {truncatedMessage || ""}
                        </span>
                      </div>
                      <Badge
                        badgeContent={unreadMessages[user.id] || 0}
                        className="chat-user-badge-mobile"
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        ) : (
          <div className="chat-window-mobile">
            <div className="chat-header-mobile">
              <IoMdArrowRoundBack
                size={25}
                onClick={() => {setSelectedUser(null); sethumbon(null);}}
                className="chat-back-button-mobile"
              />
              <img
                src={users.find((u) => u.id === selectedUser)?.avatar}
                alt="Avatar"
                className="chat-header-avatar"
              />
              <span className="chat-header-username">
                {users.find((u) => u.id === selectedUser)?.username}
              </span>
            </div>
            <div className="chat-messages-container-mobile">
              {getMessagesForSelectedUser().length > 0 ? (
                getMessagesForSelectedUser().map((msg, index) => (
                  <div
                    key={index}
                    className={`chat-message-mobile ${
                      msg.idsuser1 === getUserIdByUsername(storedCurrentUser)
                        ? "chat-message-sent-mobile"
                        : "chat-message-received-mobile"
                    }`}
                  >
                    <span className="chat-message-text-mobile">
                      {msg.message}
                    </span>
                    <span className="chat-message-timestamp-mobile">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                ))
              ) : (
                <p className="chat-no-messages-mobile">
                  Aucun message pour le moment.
                </p>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="chat-input-container-mobile">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Écrire un message..."
                className="chat-input-mobile"
              />
              <IoSend
                size={24}
                className="chat-send-button-mobile"
                onClick={handleSendMessage}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ChatMobile;
