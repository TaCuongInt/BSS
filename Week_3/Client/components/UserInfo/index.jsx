import styles from "./UserInfo.module.scss";

export const UserInfo = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.avatar}>
        <img src="images/account.png" alt="" />
      </div>
      <div className={styles.name}>Welcome John</div>
    </div>
  );
};
