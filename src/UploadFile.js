import React, { useState } from "react";

function UploadFile({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    setMessage("");
  };

  const uploadFile = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "https://bank-statement-categorizer-yk16.onrender.com/upload",
        { method: "POST", body: formData }
      );
      const text = await response.text();
      setMessage(text);
      setIsError(!response.ok);
      if (response.ok && onUploadSuccess) onUploadSuccess();
    } catch {
      setMessage("Upload failed. Please try again.");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-icon gold">📂</div>
        <div>
          <div className="card-title">Upload Bank Statement</div>
          <div className="card-desc">CSV or Excel file</div>
        </div>
      </div>

      <div className="upload-zone">
        <input
          className="file-input"
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={handleFileChange}
        />
        <span className="upload-icon">📄</span>
        <div className="upload-label">
          {file ? "Change file" : "Drop your statement here"}
        </div>
        <div className="upload-hint">Supports CSV, XLS, XLSX</div>
      </div>

      {file && (
        <div className="file-selected">
          <span>📎</span>
          <span className="file-selected-name">{file.name}</span>
          <span style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "'DM Mono', monospace" }}>
            {(file.size / 1024).toFixed(1)} KB
          </span>
        </div>
      )}

      <div className="btn-upload-row">
        <button
          className="btn btn-primary"
          onClick={uploadFile}
          disabled={!file || loading}
        >
          {loading ? (
            <>
              <span style={{ display: "inline-block", animation: "spin 1s linear infinite" }}>⟳</span>
              Processing…
            </>
          ) : (
            <>⬆ Upload Statement</>
          )}
        </button>
      </div>

      {message && (
        <div className={`message ${isError ? "error" : "success"}`} style={{ marginTop: 16 }}>
          <span>{isError ? "✗" : "✓"}</span>
          {message}
        </div>
      )}
    </div>
  );
}

export default UploadFile;