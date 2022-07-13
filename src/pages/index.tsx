import type { FC } from "react";
import styles from "../styles/Home.module.css";
import Head from "next/head";
import { ConversationList } from "../components/Conversation";

import styled from "styled-components";

export const USER_ID = 1;

const StyledTitle = styled.h3`
  text-align: center;
  margin: 0;
  font-size: 20px;
  padding: 20px;
`;

const Home: FC = () => {
  const year = new Date().getFullYear();

  return (
    <div className={styles.container}>
      <Head>
        <title>Messagerie - leboncoin</title>
        <meta name="description" content="Mes conversations"></meta>
      </Head>
      <main className={styles.main}>
        <StyledTitle>Mes conversations - USER #{USER_ID}</StyledTitle>
        <ConversationList />
      </main>

      <footer className={styles.footer}>&copy; leboncoin - {year}</footer>
    </div>
  );
};

export default Home;
