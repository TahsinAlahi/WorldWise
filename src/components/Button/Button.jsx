import styles from "./Button.module.css";

function Button({ children, onClick = () => {}, styleType }) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={`${styles.btn} ${styles[styleType]}`}
    >
      {children}
    </button>
  );
}

export default Button;
