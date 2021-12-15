import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { Result, Button, Typography } from "antd";
import Header from "../src/components/header";

const Home = () => {
  const [login, setLogin] = useState(false);
  const { Title } = Typography;

  if (typeof window === "undefined") return null;
  const token = localStorage.getItem("token");
  let user = localStorage.getItem("user");
  if (user) user = JSON.parse(user);
  useEffect(() => {
    if (token) setLogin(true);
  }, [token]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setLogin(false);
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Chatting</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        {login /* Login Homepage */ ? (
          <>
            <Title level={5}>Welcome, {user?.name}</Title>,
            <Button
              key="buy"
              type="primary"
              onClick={() => {
                logout();
              }}
            >
              Log out
            </Button>
          </>
        ) : (
          /* Landing Page - no login
          token */
          <>
            <Result status="404" />
            <Title level={3}>Please Login</Title>
            <Link href="/login">
              <Button type="primary">Log In</Button>
            </Link>
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
