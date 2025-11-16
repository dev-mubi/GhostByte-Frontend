import React, { useState } from "react";
import { decryptFile } from "./cryptoUtils";
import {
  Shield,
  Upload,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Download,
  FileText,
  X,
  Lock,
  Link2,
  ExternalLink,
} from "lucide-react";
import logo from "./logo.png";

export default function DecryptPage() {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [decryptedBlob, setDecryptedBlob] = useState(null);
  const [originalFileName, setOriginalFileName] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadMethod, setUploadMethod] = useState("file"); // "file" or "url"

  const showError = (message) => {
    setErrorMessage(message);
    setShowErrorModal(true);
  };

  const isValidGhostByteUrl = (url) => {
    try {
      const urlObj = new URL(url);
      // Check if it's a Supabase storage URL (your storage provider)
      const validDomains = [
        "supabase.co",
        "supabase.com",
        // Add your specific storage domain here if different
      ];

      const isValidDomain = validDomains.some((domain) =>
        urlObj.hostname.includes(domain)
      );

      // Check if URL ends with .gbyte
      const isGbyteFile = url.endsWith(".gbyte");

      return isValidDomain && isGbyteFile;
    } catch (e) {
      return false;
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (!selectedFile.name.endsWith(".gbyte")) {
        showError("Please select a valid .gbyte encrypted file");
        return;
      }
      setFile(selectedFile);
      setFileUrl(""); // Clear URL if file is selected
    }
  };

  const handleUrlChange = (e) => {
    const url = e.target.value.trim();
    setFileUrl(url);
    if (url && file) {
      setFile(null); // Clear file if URL is entered
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const fetchFileFromUrl = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to download file from URL");
    }
    const blob = await response.blob();
    return blob;
  };

  const handleDecrypt = async () => {
    if (!file && !fileUrl) {
      showError("Please upload a file or enter a download link");
      return;
    }

    if (!password) {
      showError("Please enter the decryption password");
      return;
    }

    // Validate URL if using URL method
    if (fileUrl && !file) {
      if (!isValidGhostByteUrl(fileUrl)) {
        showError(
          "Invalid file URL. Please use a valid GhostByte encrypted file link (.gbyte) from Supabase storage."
        );
        return;
      }
    }

    setLoading(true);

    try {
      let encryptedBytes;

      if (fileUrl && !file) {
        // Fetch file from URL
        const blob = await fetchFileFromUrl(fileUrl);
        const arrayBuffer = await blob.arrayBuffer();
        encryptedBytes = new Uint8Array(arrayBuffer);
      } else {
        // Use uploaded file
        const encryptedBuffer = await file.arrayBuffer();
        encryptedBytes = new Uint8Array(encryptedBuffer);
      }

      const decryptedBytes = await decryptFile(encryptedBytes, password);

      const originalName =
        localStorage.getItem("originalFilename") || "decrypted-file";
      setOriginalFileName(originalName);

      const blob = new Blob([decryptedBytes]);
      setDecryptedBlob(blob);
      setShowSuccessModal(true);
    } catch (err) {
      if (err.message.includes("Failed to download")) {
        showError(
          "Could not download file from the provided URL. Please check the link and try again."
        );
      } else {
        setShowErrorModal(true);
      }
      console.error("Decryption error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (decryptedBlob) {
      const url = URL.createObjectURL(decryptedBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = originalFileName;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleDecryptAnother = () => {
    setShowSuccessModal(false);
    setFile(null);
    setFileUrl("");
    setPassword("");
    setDecryptedBlob(null);
    setOriginalFileName("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F9FF] via-[#EEF0FF] to-[#E8EBFF] relative">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-xl shadow-lg border-b border-[#5A5DFF]/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => (window.location.href = "/")}
          >
            <img
              src={logo}
              alt="GhostByte Logo"
              className="w-12 h-12 object-contain transition-transform duration-300 group-hover:scale-110"
            />
            <span className="text-xl font-bold text-[#1B1E28] group-hover:text-[#5A5DFF] transition">
              GhostByte
            </span>
          </div>

          <div className="flex items-center gap-6">
            {[
              { name: "Home", path: "/" },
              { name: "Encrypt", path: "/encrypt" },
              //   { name: "Decrypt", path: "/decrypt" },
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => (window.location.href = item.path)}
                className={`font-semibold transition-colors duration-200 relative group ${
                  item.name === "Decrypt"
                    ? "text-[#5A5DFF]"
                    : "text-[#1B1E28] hover:text-[#5A5DFF]"
                }`}
              >
                {item.name}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-[#5A5DFF] transition-all duration-200 ${
                    item.name === "Decrypt"
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#5A5DFF] to-[#9DA2FF] rounded-2xl mb-6 shadow-xl">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-[#1B1E28] mb-3">
            Decrypt Your File
          </h1>
          <p className="text-lg text-gray-600">
            Unlock your encrypted file with the password
          </p>
        </div>

        {/* Decryption Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-[#5A5DFF]/10">
          {/* Method Toggle */}
          <div className="mb-8">
            <div className="flex gap-2 p-1 bg-[#F8F9FF] rounded-xl border border-[#5A5DFF]/10">
              <button
                onClick={() => setUploadMethod("file")}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                  uploadMethod === "file"
                    ? "bg-gradient-to-r from-[#5A5DFF] to-[#7B7EFF] text-white shadow-md"
                    : "text-gray-600 hover:text-[#5A5DFF]"
                }`}
              >
                <Upload className="w-5 h-5" />
                Upload File
              </button>
              <button
                onClick={() => setUploadMethod("url")}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                  uploadMethod === "url"
                    ? "bg-gradient-to-r from-[#5A5DFF] to-[#7B7EFF] text-white shadow-md"
                    : "text-gray-600 hover:text-[#5A5DFF]"
                }`}
              >
                <Link2 className="w-5 h-5" />
                Paste Link
              </button>
            </div>
          </div>

          {/* File Upload Section */}
          {uploadMethod === "file" && (
            <div className="mb-8">
              <label className="block text-sm font-semibold text-[#1B1E28] mb-3">
                Upload Encrypted File (.gbyte)
              </label>

              <div className="relative">
                <input
                  type="file"
                  accept=".gbyte"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="flex items-center justify-center w-full p-8 border-2 border-dashed border-[#5A5DFF]/30 rounded-2xl cursor-pointer hover:border-[#5A5DFF] hover:bg-[#F8F9FF] transition-all duration-300 group"
                >
                  {!file ? (
                    <div className="text-center">
                      <Upload className="w-12 h-12 text-[#5A5DFF] mx-auto mb-3 group-hover:scale-110 transition-transform" />
                      <p className="text-[#1B1E28] font-semibold mb-1">
                        Click to upload .gbyte file
                      </p>
                      <p className="text-sm text-gray-500">
                        Only encrypted GhostByte files
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4 w-full">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#5A5DFF] to-[#9DA2FF] rounded-xl flex items-center justify-center flex-shrink-0">
                        <Lock className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-left flex-1 min-w-0">
                        <p className="font-semibold text-[#1B1E28] truncate">
                          {file.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    </div>
                  )}
                </label>
              </div>
            </div>
          )}

          {/* URL Input Section */}
          {uploadMethod === "url" && (
            <div className="mb-8">
              <label className="block text-sm font-semibold text-[#1B1E28] mb-3">
                Encrypted File Download Link
              </label>

              <div className="relative">
                <input
                  type="url"
                  placeholder="https://example.supabase.co/storage/.../file.gbyte"
                  value={fileUrl}
                  onChange={handleUrlChange}
                  className="w-full px-4 py-4 pr-12 border-2 border-[#5A5DFF]/30 rounded-xl focus:border-[#5A5DFF] focus:outline-none transition-colors duration-200 text-[#1B1E28] font-mono text-sm"
                />
                <ExternalLink className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>

              {fileUrl && isValidGhostByteUrl(fileUrl) && (
                <div className="mt-3 flex items-center gap-2 text-sm text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span>Valid GhostByte encrypted file link</span>
                </div>
              )}

              {fileUrl && !isValidGhostByteUrl(fileUrl) && (
                <div className="mt-3 flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  <span>
                    Invalid link. Must be a .gbyte file from Supabase storage
                  </span>
                </div>
              )}

              <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-blue-800 leading-relaxed">
                    Paste the download link you received from the sender. The
                    file will be downloaded and decrypted automatically.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Password Section */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-[#1B1E28] mb-3">
              Decryption Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter the password used to encrypt"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-4 pr-12 border-2 border-[#5A5DFF]/30 rounded-xl focus:border-[#5A5DFF] focus:outline-none transition-colors duration-200 text-[#1B1E28] font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#5A5DFF] transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Security Info */}
          <div className="mb-8 p-4 bg-[#5A5DFF]/5 rounded-xl border border-[#5A5DFF]/10">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-[#5A5DFF] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-[#1B1E28] mb-1">
                  Secure Decryption
                </p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Decryption happens entirely in your browser. Your password and
                  decrypted file never leave your device.
                </p>
              </div>
            </div>
          </div>

          {/* Decrypt Button */}
          <button
            onClick={handleDecrypt}
            disabled={(!file && !fileUrl) || !password || loading}
            className="w-full py-4 bg-gradient-to-r from-[#5A5DFF] to-[#7B7EFF] text-white rounded-xl font-bold text-lg
            hover:from-[#4A4DDF] hover:to-[#6B6EEF] disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed
            shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {uploadMethod === "url"
                  ? "Downloading & Decrypting..."
                  : "Decrypting..."}
              </>
            ) : (
              <>
                <Shield className="w-5 h-5" />
                Decrypt File
              </>
            )}
          </button>
        </div>

        {/* Info Box */}
        <div className="mt-8 p-6 bg-white rounded-2xl border border-[#5A5DFF]/10 shadow-md">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-[#5A5DFF]/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-5 h-5 text-[#5A5DFF]" />
            </div>
            <div>
              <h3 className="font-bold text-[#1B1E28] mb-2">
                Two Ways to Decrypt:
              </h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#5A5DFF] mt-0.5">1.</span>
                  <span>
                    <strong>Upload File:</strong> Download the .gbyte file
                    first, then upload it here
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#5A5DFF] mt-0.5">2.</span>
                  <span>
                    <strong>Paste Link:</strong> Paste the download link
                    directly without downloading the file
                  </span>
                </li>
              </ul>
              <p className="text-xs text-gray-500 mt-3">
                💡 Tip: Make sure you're using the correct password
                (case-sensitive)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 relative animate-fadeIn">
            <button
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-[#1B1E28] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-center text-[#1B1E28] mb-3">
              File Decrypted Successfully!
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Your file has been decrypted and is ready to download.
            </p>

            {/* File Info */}
            <div className="mb-8 p-4 bg-[#F8F9FF] rounded-xl border border-[#5A5DFF]/10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#5A5DFF] to-[#9DA2FF] rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-500 mb-1">
                    Decrypted File
                  </p>
                  <p className="font-bold text-[#1B1E28] truncate">
                    {originalFileName}
                  </p>
                </div>
              </div>
            </div>

            {/* Download Options */}
            <div className="space-y-3">
              <button
                onClick={handleDownload}
                className="w-full py-4 bg-gradient-to-r from-[#5A5DFF] to-[#7B7EFF] text-white rounded-xl font-bold text-lg
                hover:from-[#4A4DDF] hover:to-[#6B6EEF] shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download File
              </button>

              <button
                onClick={handleDecryptAnother}
                className="w-full py-3 bg-gray-100 text-[#1B1E28] rounded-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                Decrypt Another File
              </button>
            </div>

            {/* Security Note */}
            <div className="mt-6 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-xs text-green-800 text-center">
                <span className="font-semibold">🔒 Secure:</span> Your file was
                decrypted locally in your browser
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 relative animate-fadeIn">
            <button
              onClick={() => setShowErrorModal(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-[#1B1E28] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Error Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                <AlertCircle className="w-10 h-10 text-white" />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-center text-[#1B1E28] mb-3">
              {errorMessage || "Decryption Failed"}
            </h2>
            <p className="text-center text-gray-600 mb-8">
              {errorMessage
                ? "Please check and try again."
                : "We couldn't decrypt your file. This usually happens when:"}
            </p>

            {!errorMessage && (
              <div className="mb-8 space-y-3">
                <div className="flex items-start gap-3 p-4 bg-red-50 rounded-xl border border-red-100">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <div>
                    <p className="font-semibold text-[#1B1E28] mb-1">
                      Incorrect Password
                    </p>
                    <p className="text-sm text-gray-600">
                      The password you entered doesn't match. Passwords are
                      case-sensitive.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-red-50 rounded-xl border border-red-100">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <div>
                    <p className="font-semibold text-[#1B1E28] mb-1">
                      Corrupted File
                    </p>
                    <p className="text-sm text-gray-600">
                      The file may have been damaged during transfer or storage.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={() => setShowErrorModal(false)}
                className="w-full py-4 bg-gradient-to-r from-[#5A5DFF] to-[#7B7EFF] text-white rounded-xl font-bold text-lg
                hover:from-[#4A4DDF] hover:to-[#6B6EEF] shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Try Again
              </button>

              <button
                onClick={() => {
                  setShowErrorModal(false);
                  handleDecryptAnother();
                }}
                className="w-full py-3 bg-gray-100 text-[#1B1E28] rounded-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                Start Over
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
