import { useState } from "react";
import { useRouter } from "next/router";

import { InputField, Button } from "../../components";
import styles from "./Login.module.scss";
import axiosClient from "../../API";

const Login = () => {
  const router = useRouter();
  const [loginValue, setLoginValue] = useState({ username: "", password: "" });

  const handleChangeUsername = (event) => {
    setLoginValue({
      ...loginValue,
      username: event.target.value,
    });
  };

  const handleChangePassword = (event) => {
    setLoginValue({
      ...loginValue,
      password: event.target.value,
    });
  };

  const handleLogin = () => {
    axiosClient
      .post("/Login", loginValue)
      .then(() => {
        router.push("./Dashboard");
      })
      .catch(() => {
        alert("Incorrect username or password");
      });
  };

  return (
    <div className={styles.wrapper}>
      <form action="">
        <h2 className={styles.heading}>SOIOT SYSTEM</h2>
        <div className={styles.input}>
          <InputField
            placeholder="Username"
            value={loginValue.username}
            onChange={handleChangeUsername}
            name="username"
          />
        </div>
        <div className={styles.input}>
          <InputField
            placeholder="Password"
            value={loginValue.password}
            onChange={handleChangePassword}
            type="password"
            name="password"
          />
        </div>
        <div className={styles.listBtns}>
          <Button onClick={handleLogin}>Login</Button>
          <span className={styles.navToRegister}>or create new account</span>
        </div>
      </form>
    </div>
  );
};

export default Login;
