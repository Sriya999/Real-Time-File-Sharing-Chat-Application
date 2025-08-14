import React, { useRef } from "react";
import './Input.css';

const Input = ({ setMessage, sendMessage, message, sendFile }) => {

  const fileInputRef = useRef();
  const [uploading, setUploading] = React.useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // 10MB limit
      if (file.size > 10 * 1024 * 1024) {
        alert("File is too large. Maximum allowed size is 10MB.");
        e.target.value = null;
        return;
      }
      setUploading(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        sendFile({
          name: file.name,
          type: file.type,
          data: event.target.result, // base64 string
        });
        setUploading(false);
        e.target.value = null; // Reset file input so same file can be selected again
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form className="form">
      <input
        className="input"
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={({ target: { value } }) => setMessage(value)}
        onKeyDown={event => event.key === 'Enter' ? sendMessage(event) : null}
      />
      <button type="button" className="sendButton" onClick={sendMessage}>Send</button>
      <input
        type="file"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <button type="button" className="sendButton" onClick={() => fileInputRef.current.click()} disabled={uploading}>
        {uploading ? "Uploading..." : "Attach"}
      </button>
    </form>
  );
};

export default Input;