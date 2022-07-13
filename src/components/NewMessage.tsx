import axios from "axios";
import { useState, useEffect } from "react";

import styled from "styled-components";
import { USER_ID } from "../pages";

const StyledForm = styled.form`
  position: fixed;
  padding: 20px;
  border-top: 1px solid #ddd;
  bottom: 0;
  left: 0;
  width: 100%;
  max-width: 600px;
  left: 50%;
  transform: translateX(-50%);

  input {
    width: 90%;
    height: 60px;
  }

  button {
    background-color: white;
    padding: 10px;
    border: none;
    display: inline-block;
    position: absolute;
    height: 60px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #ddd;
    cursor: pointer;

    :hover {
      background-color: #eee;
    }
  }
`;

export const NewMessage = ({ conversation, setMessages }) => {
  const [value, setValue] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const handleChangeValue = (e) => {
    setValue(e.target.value);
  };

  const sendMessage = async (message) => {
    console.log("send message !");
    const result = {
      data: null,
      error: null,
    };
    const url = `http://localhost:3005/messages/${conversation.id}`;
    try {
      const response = await axios.post(url, {
        body: message,
        authorId: USER_ID,
        conversationId: conversation.id,
        timestamp: Date.now(),
      });
      result.data = response.data;
    } catch (e) {
      result.error = (e.response && e.response.data) || e.message;
    }

    setMessages((messages) => [...messages, result.data]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(value);
    setValue("");
  };

  useEffect(() => {
    if (value?.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [value]);

  return (
    <StyledForm onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Ecrire un nouveau message ..."
        value={value}
        onChange={handleChangeValue}
      />
      <button type="submit" onClick={handleSubmit} disabled={isDisabled}>
        ➤
      </button>
    </StyledForm>
  );
};
