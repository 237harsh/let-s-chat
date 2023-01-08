import React, { useContext, useState } from "react";

import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };
  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send">
        <img src="data:image/png;base64,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" alt="not" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src="https://icons.iconarchive.com/icons/icons8/windows-8/256/Very-Basic-Image-File-icon.png" alt="not" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Input;