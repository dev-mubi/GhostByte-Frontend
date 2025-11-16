import React, { useState } from "react";
import { encryptFile } from "./cryptoUtils";
import { uploadEncryptedFile } from "./fileService";
import {
  Lock,
  Upload,
  Shield,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Copy,
  Check,
  X,
  FileText,
  Download,
  Link2,
  Info,
  Sparkles,
  QrCode,
} from "lucide-react";
import QRCode from "react-qr-code";
import logo from "./logo.png";

export default function EncryptPage() {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Password validation
  const passwordRequirements = [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "Contains a number", met: /\d/.test(password) },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
    { label: "Contains lowercase letter", met: /[a-z]/.test(password) },
  ];

  const isPasswordValid = passwordRequirements.every((req) => req.met);

  // Generate strong password function
  const generateStrongPassword = () => {
    const length = 16;
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const allChars = uppercase + lowercase + numbers;

    let generatedPassword = "";

    // Ensure at least one character from each required category
    generatedPassword +=
      uppercase[Math.floor(Math.random() * uppercase.length)];
    generatedPassword +=
      lowercase[Math.floor(Math.random() * lowercase.length)];
    generatedPassword += numbers[Math.floor(Math.random() * numbers.length)];

    // Fill the rest randomly
    for (let i = 3; i < length; i++) {
      generatedPassword +=
        allChars[Math.floor(Math.random() * allChars.length)];
    }

    // Shuffle the password to avoid predictable patterns
    generatedPassword = generatedPassword
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");

    setPassword(generatedPassword);
    setShowPassword(true); // Show the generated password
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const showError = (message) => {
    setErrorMessage(message);
    setShowErrorModal(true);
  };

  const handleEncrypt = async () => {
    if (!file) {
      showError("Please select a file to encrypt");
      return;
    }

    if (!password) {
      showError("Please enter a password");
      return;
    }

    if (!isPasswordValid) {
      showError("Please meet all password requirements");
      return;
    }

    setLoading(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const encryptedBytes = await encryptFile(
        arrayBuffer,
        password,
        file.name
      );

      const { downloadUrl } = await uploadEncryptedFile(
        encryptedBytes,
        file.name
      );

      setLink(downloadUrl);
      setShowSuccessModal(true);
    } catch (error) {
      showError("Encryption failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const decryptPageUrl = "https://ghostbyte-mubi.vercel.app/decrypt";

  // QR code URL: decrypt page with download link pre-filled as a query param
  const qrUrl =
    link && link.length > 0
      ? `${decryptPageUrl}?download=${encodeURIComponent(link)}`
      : decryptPageUrl;

  const shareMessage = `ENCRYPTED FILE FROM GHOSTBYTE

DIRECT DOWNLOAD (Encrypted File):
${link}
Click to download the encrypted .gbyte file

DECRYPT ONLINE:
${decryptPageUrl}
Paste the download link above and enter password

PASSWORD: ${password}

----------------------------------------
IMPORTANT INSTRUCTIONS:

Option 1 - Direct Download:
• Click the download link to get the .gbyte file
• Go to ${decryptPageUrl}
• Upload the .gbyte file and enter password

Option 2 - Paste Link:
• Go to ${decryptPageUrl}
• Paste the download link in the URL field
• Enter password to decrypt

Keep this password safe. Without it, the file cannot be decrypted.
----------------------------------------`;

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
              { name: "Decrypt", path: "/decrypt" },
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => (window.location.href = item.path)}
                className={`font-semibold transition-colors duration-200 relative group ${
                  item.name === "Encrypt"
                    ? "text-[#5A5DFF]"
                    : "text-[#1B1E28] hover:text-[#5A5DFF]"
                }`}
              >
                {item.name}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-[#5A5DFF] transition-all duration-200 ${
                    item.name === "Encrypt"
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
            <Lock className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-[#1B1E28] mb-3">
            Encrypt Your File
          </h1>
          <p className="text-lg text-gray-600">
            Secure your file with AES-256 encryption
          </p>
        </div>

        {/* Encryption Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-[#5A5DFF]/10">
          {/* File Upload Section */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-[#1B1E28] mb-3">
              Select File
            </label>

            <div className="relative">
              <input
                type="file"
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
                      Click to upload file
                    </p>
                    <p className="text-sm text-gray-500">or drag and drop</p>
                  </div>
                ) : (
                  <div className="flex items-center gap-4 w-full">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#5A5DFF] to-[#9DA2FF] rounded-xl flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-white" />
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

          {/* Password Section */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-[#1B1E28] mb-3">
              Encryption Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter a strong password"
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

            {/* Generate password button UNDER the input */}
            <button
              type="button"
              onClick={generateStrongPassword}
              className="mt-3 inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-[#5A5DFF] bg-[#F4F5FF] hover:bg-[#E3E5FF] rounded-lg border border-[#5A5DFF]/30 shadow-sm transition-colors duration-200"
            >
              <Sparkles className="w-4 h-4" />
              Generate strong password
            </button>

            {password && (
              <div className="mt-4 p-4 bg-[#F8F9FF] rounded-xl border border-[#5A5DFF]/10">
                <p className="text-sm font-semibold text-[#1B1E28] mb-3">
                  Password Requirements:
                </p>
                <div className="space-y-2">
                  {passwordRequirements.map((req, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      {req.met ? (
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-gray-300 flex-shrink-0" />
                      )}
                      <span
                        className={`text-sm ${
                          req.met
                            ? "text-green-600 font-medium"
                            : "text-gray-500"
                        }`}
                      >
                        {req.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Security Info */}
          <div className="mb-8 p-4 bg-[#5A5DFF]/5 rounded-xl border border-[#5A5DFF]/10">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-[#5A5DFF] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-[#1B1E28] mb-1">
                  Your file stays private
                </p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Encryption happens locally in your browser. Your password
                  never leaves your device. Only the encrypted file is uploaded.
                </p>
              </div>
            </div>
          </div>

          {/* Encrypt Button */}
          <button
            onClick={handleEncrypt}
            disabled={!file || !password || !isPasswordValid || loading}
            className="w-full py-4 bg-gradient-to-r from-[#5A5DFF] to-[#7B7EFF] text-white rounded-xl font-bold text-lg
            hover:from-[#4A4DDF] hover:to-[#6B6EEF] disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed
            shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Encrypting...
              </>
            ) : (
              <>
                <Lock className="w-5 h-5" />
                Encrypt File
              </>
            )}
          </button>
        </div>
      </div>

      {/* SUCCESS MODAL */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8 relative animate-fadeIn">
            <button
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-[#1B1E28] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-center text-[#1B1E28] mb-3">
              File Encrypted Successfully!
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Your file has been encrypted and uploaded securely. Choose how to
              share it below.
            </p>

            {/* Download Link */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-[#1B1E28] mb-2 flex items-center gap-2">
                <Download className="w-4 h-4" />
                Direct Download Link (Encrypted File)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={link}
                  readOnly
                  className="flex-1 px-4 py-3 bg-[#F8F9FF] border-2 border-[#5A5DFF]/20 rounded-xl text-sm text-[#1B1E28] font-mono"
                />
                <button
                  onClick={() => copyToClipboard(link)}
                  className="px-4 py-3 bg-[#5A5DFF] text-white rounded-xl hover:bg-[#4A4DDF] transition-colors flex items-center gap-2"
                >
                  {copied ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Click this link to download the encrypted .gbyte file
              </p>
            </div>

            {/* Decrypt Page Link */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-[#1B1E28] mb-2 flex items-center gap-2">
                <Link2 className="w-4 h-4" />
                Decryption Page
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={decryptPageUrl}
                  readOnly
                  className="flex-1 px-4 py-3 bg-[#F8F9FF] border-2 border-[#5A5DFF]/20 rounded-xl text-sm text-[#1B1E28] font-mono"
                />
                <button
                  onClick={() => copyToClipboard(decryptPageUrl)}
                  className="px-4 py-3 bg-[#5A5DFF] text-white rounded-xl hover:bg-[#4A4DDF] transition-colors flex items-center gap-2"
                >
                  {copied ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Share this page where the recipient can paste the download link
              </p>
            </div>

            {/* Password Display */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-[#1B1E28] mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Decryption Password
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={password}
                  readOnly
                  className="flex-1 px-4 py-3 bg-[#F8F9FF] border-2 border-[#5A5DFF]/20 rounded-xl text-sm text-[#1B1E28] font-mono"
                />
                <button
                  onClick={() => copyToClipboard(password)}
                  className="px-4 py-3 bg-[#5A5DFF] text-white rounded-xl hover:bg-[#4A4DDF] transition-colors flex items-center gap-2"
                >
                  {copied ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* QR Code Section */}
            {link && (
              <div className="mb-8">
                <label className="block text-sm font-semibold text-[#1B1E28] mb-2 flex items-center gap-2">
                  <QrCode className="w-4 h-4" />
                  QR Code (scan to open decrypt page with link)
                </label>
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
                  <div className="p-4 bg-[#F8F9FF] border-2 border-[#5A5DFF]/20 rounded-2xl flex items-center justify-center">
                    <QRCode
                      value={qrUrl}
                      size={140}
                      style={{
                        height: "auto",
                        maxWidth: "100%",
                        width: "100%",
                      }}
                    />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-xs">
                    Scan this QR code on another device. It opens the GhostByte
                    decrypt page with the encrypted file link already filled in.
                    Then enter the password shown above to decrypt and download
                    the file on that device.
                  </p>
                </div>
              </div>
            )}

            {/* Complete Share Message */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-[#1B1E28] mb-2">
                Complete Message (Copy & Share)
              </label>
              <div className="relative">
                <textarea
                  value={shareMessage}
                  readOnly
                  rows={14}
                  className="w-full px-4 py-3 bg-[#F8F9FF] border-2 border-[#5A5DFF]/20 rounded-xl text-xs text-[#1B1E28] font-mono resize-none"
                />
                <button
                  onClick={() => copyToClipboard(shareMessage)}
                  className="absolute top-3 right-3 px-3 py-2 bg-white text-[#5A5DFF] rounded-lg hover:bg-[#5A5DFF] hover:text-white border border-[#5A5DFF] transition-colors flex items-center gap-2 text-sm font-semibold shadow-sm"
                >
                  {copied ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  Copy All
                </button>
              </div>
            </div>

            {/* Decryption Instructions */}
            <div className="mb-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-blue-900 mb-3">
                    How the recipient can decrypt:
                  </p>
                  <div className="space-y-4 text-xs text-blue-800">
                    <div className="bg-white/50 p-3 rounded-lg">
                      <p className="font-bold text-blue-900 mb-2">
                        Option 1: Download and Upload
                      </p>
                      <ol className="space-y-1 ml-4 list-decimal">
                        <li>Click the download link to get the .gbyte file</li>
                        <li>Go to the decrypt page</li>
                        <li>Upload the .gbyte file</li>
                        <li>Enter the password and decrypt</li>
                      </ol>
                    </div>
                    <div className="bg-white/50 p-3 rounded-lg">
                      <p className="font-bold text-blue-900 mb-2">
                        Option 2: Direct Link (Faster)
                      </p>
                      <ol className="space-y-1 ml-4 list-decimal">
                        <li>Go to the decrypt page</li>
                        <li>Click "Paste Link" tab</li>
                        <li>Paste the download link in the URL field</li>
                        <li>Enter the password and decrypt</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Warning */}
            <div className="p-4 bg-amber-50 border-2 border-amber-200 rounded-xl mb-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-amber-900 mb-1">
                    Important Security Note
                  </p>
                  <p className="text-xs text-amber-700 leading-relaxed">
                    The recipient needs both the download link and the password.
                    The file cannot be decrypted without the password. Store it
                    securely and share via a secure channel.
                  </p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  setFile(null);
                  setPassword("");
                  setLink("");
                }}
                className="flex-1 py-3 bg-gray-100 text-[#1B1E28] rounded-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                Encrypt Another File
              </button>
              <button
                onClick={() => (window.location.href = "/decrypt")}
                className="flex-1 py-3 bg-gradient-to-r from-[#5A5DFF] to-[#7B7EFF] text-white rounded-xl font-semibold hover:from-[#4A4DDF] hover:to-[#6B6EEF] transition-colors"
              >
                Go to Decrypt
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ERROR MODAL */}
      {showErrorModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative animate-fadeIn">
            <button
              onClick={() => setShowErrorModal(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-[#1B1E28] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                <AlertCircle className="w-10 h-10 text-white" />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-center text-[#1B1E28] mb-3">
              Oops!
            </h2>
            <p className="text-center text-gray-600 mb-8">{errorMessage}</p>

            <button
              onClick={() => setShowErrorModal(false)}
              className="w-full py-3 bg-gradient-to-r from-[#5A5DFF] to-[#7B7EFF] text-white rounded-xl font-semibold hover:from-[#4A4DDF] hover:to-[#6B6EEF] transition-colors"
            >
              Got it
            </button>
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
