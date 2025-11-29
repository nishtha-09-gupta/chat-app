import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";
import assets from "../src/assets/assets";
const AI_BOT_ID = "692a80b434724e66141e70c7";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const { authUser, axios } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isAITyping, setIsAITyping] = useState(false);
  const [unseenMessages, setUnseenMessages] = useState({}); 

  const getUsers = async () => {
    if (!authUser || !authUser._id) return;
    try {
      const res = await axios.get("/api/messages/users");
      const fetched = Array.isArray(res.data.users) ? res.data.users : res.data.users || [];
      const filtered = fetched.filter((u) => String(u._id) !== AI_BOT_ID);

      const aiUser = {
        _id: AI_BOT_ID,
        fullName: "Chat with AI",
        isAI: true,
        profilePic: assets.ai_bot, 
        online: true,
      };

      setUsers([aiUser, ...filtered]);
      if (res.data.unseenMessages) {
        setUnseenMessages((prev) => ({ ...res.data.unseenMessages, ...prev }));
      }
    } catch (err) {
      toast.error(err.response?.data?.error || err.message || "Failed to fetch users");
    }
  };

  useEffect(() => {
    if (authUser && authUser._id) {
      getUsers();
    }
  }, [authUser]);

  const getMessages = async (otherUserId) => {
    if (!authUser || !authUser._id) return;
    try {
      const res = await axios.get(`/api/messages/${otherUserId}`);
      const msgs = Array.isArray(res.data.messages) ? res.data.messages : res.data.messages || [];
      setMessages(msgs);
    } catch (err) {
      toast.error(err.response?.data?.error || err.message || "Failed to fetch messages");
    }
  };

  const sendMessage = async ({ text, image }) => {
    if (!selectedUser || !authUser || !authUser._id) return;

    const payload = {};
    if (text) payload.text = text;
    if (image) payload.image = image;

    try {
      const saveRes = await axios.post(`/api/messages/send/${selectedUser._id}`, payload);
      if (saveRes.data?.newMessage) {
        setMessages((prev) => [...prev, saveRes.data.newMessage]);
      } else {
        await getMessages(selectedUser._id);
      }

      if (String(selectedUser._id) === AI_BOT_ID) {
        setIsAITyping(true);
        let aiReplyText = "";
        try {
          const aiRes = await axios.post("/api/ai/send", { text: text || "User sent something" });
          aiReplyText = aiRes.data?.reply || aiRes.data?.text || "";
        } catch (aiErr) {
          toast.error("AI reply failed. Try again later.");
          console.error("AI generation error:", aiErr);
          aiReplyText = "Sorry, I couldn't generate a reply right now.";
        }


        try {
          await axios.post(`/api/messages/send/${authUser._id}?senderOverrideId=${AI_BOT_ID}`, { text: aiReplyText });
        } catch (saveErr) {
          console.error("Saving AI reply failed:", saveErr);
          toast.error("AI reply saving  failed.");
        } finally {
          setIsAITyping(false);
        
          await getMessages(AI_BOT_ID);
        }
      }
    } catch (err) {
      console.error("sendMessage error:", err);
      toast.error("Error occured in sending msg");
      setIsAITyping(false);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        users,
        getUsers,
        selectedUser,
        setSelectedUser,
        messages,
        setMessages,
        getMessages,
        sendMessage,
        isAITyping,
        unseenMessages,
        setUnseenMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
