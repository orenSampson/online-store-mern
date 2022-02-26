import { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import * as messageQueueActions from "../../store/messageQueue/actions";
import "react-toastify/dist/ReactToastify.css";

const MessageDisplayer = () => {
  const dispatch = useDispatch();

  const messageQueue = useSelector(
    (state) => state.messageQueueReducers.messageQueue
  );

  useEffect(() => {
    if (messageQueue.length === 0) {
      return;
    }

    const messageQueueCopy = [...messageQueue];

    const message = messageQueueCopy.pop();

    dispatch(
      messageQueueActions.messagequeueMessagequeueSetter(messageQueueCopy)
    );

    if (message.type === "success") {
      toast.success(message.content, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    if (message.type === "error") {
      toast.error(message.content, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [dispatch, messageQueue]);

  return <Fragment></Fragment>;
};

export default MessageDisplayer;
