import { SEND_MESSAGE, DELETE_MESSAGE, EDIT_MESSAGE} from "./types";

export const sendMessage = (roomId, message) => {
  return {
    type: SEND_MESSAGE,
    payload: { roomId, message },
    // meta: { delay: 500 },
  };
};

export const deleteMessage = (roomId, messageId) => {
  return { type: DELETE_MESSAGE, payload: { roomId, messageId } };
};
//
export const editMessage = (roomId, message) => {
  const msg = message.message;
  message.message = (prompt('Отредактируйте сообщение', message.message) ?? '');
  if (message.message === '') {message.message = msg}
  return { type: EDIT_MESSAGE, payload: { roomId, message } };
};