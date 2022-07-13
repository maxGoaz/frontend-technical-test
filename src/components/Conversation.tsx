import axios from "axios";
import { useState, useEffect } from "react";
import { Conversation } from "../types/conversation";

import styled from "styled-components";

import { USER_ID } from "../pages/index";

import { Avatar } from "./Avatar";
import { TimeAgo } from "./TimeAgo";
import { Panel } from "./Panel";
import { MessageList } from "./Message";

import { useTransition } from "@react-spring/web";

const slideInTransition = {
  from: { transform: "translateX(66%)" },
  enter: { transform: "translateX(0%)" },
  leave: { transform: "translateX(100%)" },
};

const StyledConversation = styled.div`
  background-color: white;
  border-bottom: 1px solid #ddd;
  transition: 0.2s ease;
  padding: 20px 12px;
  width: 100%;

  &:hover {
    cursor: pointer;
    background-color: #efefef;
  }
`;

const StyledConversationList = styled.div`
  width: 100%;
  max-width: 600px;
  overflow: scroll;
  border-top: 1px solid #ddd;
`;

const ButtonBack = styled.button`
  background-color: white;
  border: 1px solid #ddd;
  rotate: 180deg;
  display: inline-block;
  padding: 12px 20px;
  margin-bottom: 20px;
  margin-right: 10px;
  cursor: pointer;
`;

const ConversationItem = ({ conversation, onClick }) => {
  const friendName =
    USER_ID !== conversation.senderId
      ? conversation.senderNickname
      : conversation.recipientNickname;

  return (
    <StyledConversation onClick={onClick}>
      <Avatar name={friendName} /> {friendName}
      <br />
      <TimeAgo timestamp={conversation.lastMessageTimestamp} />
    </StyledConversation>
  );
};

export const ConversationList = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversion] = useState(null);

  const friendName =
    USER_ID !== selectedConversation?.senderId
      ? selectedConversation?.senderNickname
      : selectedConversation?.recipientNickname;

  const transition = useTransition(
    !!selectedConversation?.id,
    slideInTransition
  );

  const fetchConversations = async () => {
    const result = {
      data: null,
      error: null,
    };
    const url = `http://localhost:3005/conversations/${USER_ID}`;
    try {
      const response = await axios.get(url);
      result.data = response.data;
    } catch (e) {
      result.error = (e.response && e.response.data) || e.message;
    }

    setConversations(result.data);
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  return (
    <>
      <StyledConversationList>
        {Array.isArray(conversations) &&
          conversations.map((c: Conversation) => (
            <ConversationItem
              key={c.id}
              conversation={c}
              onClick={() => setSelectedConversion(c)}
            />
          ))}
      </StyledConversationList>

      {transition(
        (style, item) =>
          item && (
            <Panel style={style}>
              <div style={{ maxWidth: "600px" }}>
                <ButtonBack onClick={() => setSelectedConversion(null)}>
                  &#10140;
                </ButtonBack>
                <span>Conversation avec {friendName}</span>
                <br />
                <MessageList
                  conversation={selectedConversation}
                  friendName={friendName}
                />
              </div>
            </Panel>
          )
      )}
    </>
  );
};
