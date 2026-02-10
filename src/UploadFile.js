import React, { useState } from "react";

function UploadFile({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const uploadFile = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("https://bank-statement-categorizer-yk16.onrender.com/upload", {
        method: "POST",
        body: formData
      });

      const text = await response.text();
      setMessage(text);

      // 🔔 Notify parent to refresh table
      if (onUploadSuccess) {
        onUploadSuccess();
      }

    } catch (error) {
      setMessage("Upload failed");
    }
  };

  return (
    <div>
      <h3>Upload Bank Statement</h3>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <br /><br />

      <button onClick={uploadFile}>Upload</button>

     <p className="success">{message}</p>
    </div>
  );
}

export default UploadFile;
