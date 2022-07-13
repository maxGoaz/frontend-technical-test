import axios from "axios";
import { useState, useEffect } from "react";

import styled from "styled-components";
import { USER_ID } from "../pages";
import { TimeAgo } from "./TimeAgo";
import { NewMessage } from "./NewMessage";

const StyledBubble = styled.div``;

const StyledMessage = styled.div`
  margin-bottom: 8px;
  max-width: 90%;
  float: right;
  ${({ isFriend }) => isFriend && "float: left;"}

  ${StyledBubble} {
    padding: 8px;
    background-color: rgba(0, 0, 255, 0.2);
    color: #333;
    border-radius: 10px;
    display: inline-block;
    ${({ isFriend }) => isFriend && "background-color: rgba(0,0,0,0.1); "}
  }
`;

const StyledMessageList = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  max-height: 80%;
`;

const Message = ({ friendName, message }) => {
  const isFriend = message.authorId !== USER_ID;

  return (
    <div>
      {isFriend && (
        <>
          <span style={{ fontSize: "12px", marginLeft: "6px" }}>
            {friendName}
          </span>
          <br />
        </>
      )}
      <StyledMessage isFriend={isFriend}>
        <StyledBubble>{message.body}</StyledBubble>
        <br />
        <TimeAgo timestamp={message.timestamp} />
      </StyledMessage>
    </div>
  );
};

export const MessageList = ({ conversation, friendName }) => {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    const result = {
      data: null,
      error: null,
    };
    const url =
      conversation?.id && `http://localhost:3005/messages/${conversation.id}`;
    try {
      const response = await axios.get(url);
      result.data = response.data;
    } catch (e) {
      result.error = (e.response && e.response.data) || e.message;
    }

    setMessages(result.data);
  };

  useEffect(() => {
    fetchMessages();
  }, [conversation]);

  if (!conversation) {
    return null;
  }

  return (
    <StyledMessageList>
      {Array.isArray(messages) &&
        messages.map((m) => <Message message={m} friendName={friendName} />)}
      {!messages?.length &&
        "Vous n'avez pas encore envoyé de message, commencez la discussion ?"}
      <NewMessage conversation={conversation} setMessages={setMessages} />
    </StyledMessageList>
  );
};
