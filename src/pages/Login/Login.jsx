import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PageNav from "../../components/PageNav/PageNav";
import Button from "../../components/Button/Button";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./Login.module.css";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack_sauce@example.com");
  const [password, setPassword] = useState("rickroll");
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  function handleLogin() {
    if (!email || !password) return;
    login(email, password);
  }

  useEffect(() => {
    if (isAuthenticated) navigate("/app", { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div className={styles.btn}>
          <Button onClick={handleLogin} styleType="primary">
            Login
          </Button>
        </div>
      </form>
    </main>
  );
}
