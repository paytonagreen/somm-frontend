import Head from "next/head";
import React from "react";
import styles from "../styles/Home.module.css";
import WinesList from "../components/WinesList";
import ProteinsList from "../components/ProteinsList";
import AddProtein from "../components/AddProtein";
import styled from "styled-components";

const Nav = styled.nav`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #80304c;
  background-color: #ffc47d;
`;

const Content = styled.div`
  background-color: #80304c;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orelega+One&display=swap"
          rel="stylesheet"
        />
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav>
        <h1>A Somm For You</h1>
      </Nav>
      <Content>
        {/* <WinesList /> */}
        <ProteinsList />
        <AddProtein />
      </Content>
    </div>
  );
}
