import styles from "./Button.module.scss";

export const Button = ({
  children = null,
  type = "button",
  onClick = () => {},
}) => {
  return (
    <button className={styles.wrapper} type={type} onClick={onClick}>
      {children}
    </button>
  );
};
