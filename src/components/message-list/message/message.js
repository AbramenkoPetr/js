import classNames from "classnames";
import { useDispatch } from "react-redux";
import { deleteMessage } from "../../../store/messages";
//
import { editMessage } from "../../../store/messages";
//
import styles from "./message.module.css";

export function Message({ message, roomId }) {
  const dispatch = useDispatch();

  return (
    <div
      className={classNames(styles.message, {
        [styles.currentMessage]: message.author === "User",
      })}
    >
      <h3>{message.message}</h3>
      <p>{message.author}</p>
      <p>
        {message.date.toLocaleTimeString(navigator.language, {
        hour: '2-digit',
        minute:'2-digit'
        })}
      </p>
      <button onClick={() => dispatch(deleteMessage(roomId, message.id))}>
        x
      </button>
      <button onClick={() => dispatch(
         editMessage(roomId, message))}>edit
      </button>
    </div>
  );
}
