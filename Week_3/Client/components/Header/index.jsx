import { UserInfo } from "..";
import styles from "./Header.module.scss";

export const Header = () => {
  return (
    <div className={styles.wrapper}>
      <UserInfo />
    </div>
  );
};
