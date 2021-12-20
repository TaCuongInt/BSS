import styles from "./InputField.module.scss";

export const InputField = ({
  placeholder = "",
  type = "text",
  value = "",
  name = "",
  onChange = () => {},
  onClick = () => {},
}) => {
  return (
    <div className={styles.wrapper}>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onClick={onClick}
        name={name}
      />
    </div>
  );
};
