import React, { use } from "react";
import "../styles/chat.css";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  
  const [conversations, setConversations] = useState([])
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("")
  const [currentUser,setCurrentUser] = useState(null)
  const nav = useNavigate()
  useEffect(() => {
    fetchConversation()
    fetchCurrent();
  }, [])

  useEffect(() => {

    if (selectedConversation) {
      fetchMessages(selectedConversation._id);
      fetchConversation()
    }

  }, [selectedConversation]);

  const fetchMessages = async (conversationId) => {
    try {
      const resp = await fetch(`http://localhost:5000/api/chat/message/${conversationId}`, {
        credentials: 'include'
      })

      const data = await resp.json()
         console.log("Mesg",data)
      if (data.success) {
        setMessages(data.messages)
      }
    }
    catch (error) {
      console.log(error);

    }
  }

  const fetchConversation = async () => {
    try {
      let apiData = await fetch('http://localhost:5000/api/chat/conversations', {
        credentials: 'include'
      })

      let data = await apiData.json()
   
      if (!data.success) {
        console.log(data.message);
        return
      }
      console.log(data);

      setConversations(data.conversations || [])

    }
    catch (error) {
      console.log(error);

    }
  }
  const sendMessage = async () => {
    
    try {
  console.log('button clicked');
  console.log(messageText);
  console.log(selectedConversation);
  
  
      if (!messageText.trim()) {
        return;
      }

      if (!selectedConversation) {
        return;
      }
       
      
      let apiData = await fetch('http://localhost:5000/api/chat/message', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          conversationId: selectedConversation._id,
          text: messageText
        }),
        headers:{
          'Content-Type':'application/json'
        }
      })
      const data =await apiData.json()
      if(data.success){
        setMessageText("")
        fetchMessages(selectedConversation._id)

      }
    }
    catch (error) {
      console.log('eoror ra')
      console.log(error);

    }
  }
  const fetchCurrent=async()=>{
    try{
         let api = await fetch('http://localhost:5000/api/auth/profile',{
          credentials:'include'
        })
        api = await api.json();
        if(api.success){
         setCurrentUser(api.user)
        } 
        else {
          console.log("data not recived from backend");
        }
       
    }
    catch(error){
      console.log(error);
      
    }
  }
  return (
    <div className="chat-container">

      {/* LEFT SIDEBAR */}

      <div className="chat-sidebar">

        <div className="chat-header">
          <button onClick={()=>nav('/home')} > {"↩"}</button>
        </div>





        <div className="conversation-list">
          {
            conversations.length > 0 ?

              conversations.map((chat) => (

                <div
                  className={`conversation  ${selectedConversation?._id == chat._id ? "active-conversation" : ""}`}
                  key={chat._id}
                                  
                  onClick={() => {
                    console.log(chat)
                    setSelectedConversation(chat)}}
                >

                  <div className="avatar">
                    {chat.otherUser.name[0].toUpperCase()}
                  </div>


                  <div className="conversation-info">


                    <div className="top-row">

                      <h3>
                        {chat.otherUser.name}
                      </h3>

                      <span>
                        {new Date(chat.updatedAt).toLocaleDateString()}
                      </span>

                    </div>


                    <p>
                      {chat.listing.title}
                    </p>


                    <small>
                      {chat.lastMessage || "Start conversation"}
                    </small>


                  </div>


                </div>

              ))

              :

              <h1>No conversations</h1>
          }

        </div>

      </div>



      {/* RIGHT CHAT WINDOW */}

      <div className="chat-window">

        <div className="chat-user">

          <div className="avatar">
            {selectedConversation ? selectedConversation.otherUser.name[0] : "N"}
          </div>

          <div>
            <h3>{selectedConversation ? selectedConversation.otherUser.name : "Select a conversation"}</h3>
            <span>
              {selectedConversation ? selectedConversation.listing.title : ""}
            </span>
          </div>

        </div>


        <div className="messages">

          {
  messages.length > 0 ?

    messages.map((msg) => (

      <div
        key={msg._id}
        className={
          msg.sender._id === currentUser?._id
            ? "message sent"
            : "message received"
        }
      >
        {msg.text}
      </div>

    ))

    :

    <p>No messages yet</p>
}

        </div>



        <div className="message-input">

          <input
            placeholder="Type a message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          />

          <button onClick={()=>{
            sendMessage()
          }} >
            Send
          </button>

        </div>


      </div>


    </div>
  );
};


export default Chat;