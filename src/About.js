import React, { useEffect, useState } from "react";
import { Code, Cloud, Link2, FileText, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "./logo.png";
import founder from "./founder.jpg"; // profile image

export default function About() {
  const [scrolled, setScrolled] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleNavigate = (path) => {
    setIsMobileMenuOpen(false);
    navigate(path);
  };

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Encrypt", path: "/encrypt" },
    { label: "Decrypt", path: "/decrypt" },
    { label: "About", path: "/about" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F9FF] via-[#EEF0FF] to-[#E8EBFF] text-[#1B1E28] relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-[500px] h-[500px] bg-[#5A5DFF]/10 rounded-full blur-[120px] transition-all duration-1000"
          style={{
            top: `${mousePos.y * 0.02}px`,
            left: `${mousePos.x * 0.02}px`,
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-[#9DA2FF]/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 left-1/3 w-[350px] h-[350px] bg-[#5A5DFF]/5 rounded-full blur-[90px]" />
      </div>

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-2xl shadow-xl border-b border-[#5A5DFF]/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="py-4 flex items-center justify-between">
            {/* Brand */}
            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => handleNavigate("/")}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#5A5DFF] to-[#9DA2FF] rounded-2xl blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
                <img
                  src={logo}
                  alt="GhostByte Logo"
                  className="w-12 h-12 md:w-14 md:h-14 object-contain transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 relative z-10"
                />
              </div>
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[#1B1E28] to-[#5A5DFF] bg-clip-text text-transparent group-hover:from-[#5A5DFF] group-hover:to-[#9DA2FF] transition-all duration-300">
                GhostByte
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavigate(item.path)}
                  className={`text-sm lg:text-base font-semibold px-2 py-1 relative group transition-all duration-300 ${
                    item.label === "About"
                      ? "text-[#5A5DFF]"
                      : "text-[#1B1E28] hover:text-[#5A5DFF]"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#5A5DFF] to-[#9DA2FF] transition-all duration-300 rounded-full ${
                      item.label === "About"
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                  <span className="absolute inset-0 bg-[#5A5DFF]/5 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -z-10" />
                </button>
              ))}
            </div>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden p-2 rounded-xl border border-[#E0E2FF] bg-white/80 backdrop-blur-sm shadow-sm text-[#1B1E28]"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden pb-4">
              <div className="mt-2 rounded-2xl border border-[#E0E2FF]/80 bg-gradient-to-b from-white/95 via-[#EEF0FF] to-[#E8EBFF] shadow-xl backdrop-blur-xl px-4 py-3">
                <div className="flex flex-col gap-1">
                  {navItems.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => handleNavigate(item.path)}
                      className={`text-left w-full px-2 py-2 rounded-lg text-sm font-semibold transition-colors ${
                        item.label === "About"
                          ? "text-[#5A5DFF] bg-[#5A5DFF]/5"
                          : "text-[#1B1E28] hover:bg-[#5A5DFF]/5 hover:text-[#5A5DFF]"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main */}
      <main className="max-w-5xl mx-auto px-6 pt-32 md:pt-40 pb-24 relative">
        {/* Hero Section */}
        <section className="mb-16 md:mb-20">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1B1E28] mb-4 leading-tight">
              Simple, private file encryption where{" "}
              <span className="text-[#5A5DFF]">you</span> keep the key.
            </h1>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-4">
              GhostByte is a browser-based file encryption tool that focuses on
              a single promise: your files should only be readable by the people
              you choose, not by the service itself.
            </p>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Encryption happens locally, the password stays with you, and the
              encrypted file is something you can keep, move, and store anywhere
              you want.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {[
                "Client-side AES-256-GCM",
                "User-chosen passwords",
                "You keep the encrypted file",
              ].map((chip) => (
                <span
                  key={chip}
                  className="text-xs sm:text-sm px-3 py-1.5 rounded-full bg-white border border-[#E0E2FF] text-gray-700 font-medium"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="mb-16 md:mb-20 grid md:grid-cols-[1.2fr,1fr] gap-10 md:gap-12 items-stretch">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-[#E0E2FF] shadow-md p-6 md:p-8 h-full flex flex-col">
            <h2 className="text-xl md:text-2xl font-bold text-[#1B1E28] mb-3">
              Why most “encrypted” sharing still exposes your files
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3">
              Many file sharing tools encrypt your data in transit and at rest,
              but they still hold the keys on their servers. That means they can
              technically unlock your files, inspect them, or hand them over if
              required.
            </p>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3">
              Even services that offer end-to-end encryption often bundle the
              decryption key into the URL or the QR code. It feels convenient,
              but it also means a screenshot, browser history entry or forwarded
              link can silently carry both the file location and the key in one
              place.
            </p>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              In practice, that turns a single leaked link into full access to
              your data. GhostByte was built to avoid that pattern entirely.
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#5A5DFF] to-[#7B7EFF] rounded-3xl text-white p-6 md:p-7 shadow-xl h-full flex flex-col justify-between">
            <div>
              <h3 className="text-lg md:text-xl font-semibold mb-3">
                The principle behind GhostByte
              </h3>
              <p className="text-sm sm:text-base text-white/90 leading-relaxed mb-3">
                Encryption is only meaningful if:
              </p>
              <ul className="space-y-2 text-sm sm:text-base text-white/90 leading-relaxed">
                <li>• You control the password.</li>
                <li>• The service never has enough information to decrypt.</li>
                <li>• Links and QR codes are transport, not secrets.</li>
              </ul>
            </div>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed mt-4">
              GhostByte is designed so that having the link, the QR code or the
              encrypted file is not enough. The password always stays separate
              and is entered manually by the recipient.
            </p>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="mb-16 md:mb-20">
          <h2 className="text-xl md:text-2xl font-bold text-[#1B1E28] mb-4">
            How GhostByte is different from “one-tap” link tools
          </h2>

          <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-stretch">
            <div className="bg-white rounded-3xl border border-[#E0E2FF] shadow-sm p-6 md:p-7 h-full flex flex-col">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                The common pattern
              </h3>
              <ul className="space-y-2 text-sm sm:text-base text-gray-600 leading-relaxed flex-1">
                <li>• Service generates a secret key for you.</li>
                <li>• The key is bundled inside the share URL or QR code.</li>
                <li>• Scanning the code immediately starts decryption.</li>
                <li>
                  • Any leaked link silently exposes both location and key.
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl border border-[#5A5DFF]/20 shadow-sm p-6 md:p-7 h-full flex flex-col">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                GhostByte’s approach
              </h3>
              <ul className="space-y-2 text-sm sm:text-base text-gray-600 leading-relaxed flex-1">
                <li>• You choose and remember the password yourself.</li>
                <li>
                  • You can download and keep the encrypted <code>.gbyte</code>{" "}
                  file as a standalone locked container.
                </li>
                <li>
                  • The QR code only helps with the decrypt page and file link,
                  never with the password.
                </li>
                <li>
                  • The recipient always types the password manually before
                  anything is decrypted.
                </li>
              </ul>
            </div>
          </div>

          <p className="mt-6 text-sm sm:text-base text-gray-600 leading-relaxed">
            This separation matters. You control three independent things: the
            encrypted file, the link, and the password. Compromising any one of
            them does not automatically reveal the other two.
          </p>
        </section>

        {/* How it works */}
        <section className="mb-16 md:mb-20 grid md:grid-cols-[1.1fr,1fr] gap-10 md:gap-12 items-start">
          <div className="bg-white rounded-3xl border border-[#5A5DFF]/15 shadow-md p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-[#1B1E28] mb-4">
              How GhostByte works under the hood
            </h2>
            <ol className="space-y-3 text-sm sm:text-base text-gray-600 leading-relaxed">
              <li>
                <span className="font-semibold text-[#1B1E28]">
                  1. Pick a file.
                </span>{" "}
                The file is read into memory locally in your browser – it never
                leaves your device unencrypted.
              </li>
              <li>
                <span className="font-semibold text-[#1B1E28]">
                  2. Choose a password.
                </span>{" "}
                A strong key is derived from your password and used with
                AES-256-GCM to encrypt the file.
              </li>
              <li>
                <span className="font-semibold text-[#1B1E28]">
                  3. Create the encrypted file.
                </span>{" "}
                The result is a <code>.gbyte</code> file: a portable, encrypted
                blob that you can keep, back up, or move wherever you like.
              </li>
              <li>
                <span className="font-semibold text-[#1B1E28]">
                  4. Get a download link.
                </span>{" "}
                GhostByte uploads the encrypted bytes to storage and returns a
                link that only ever serves ciphertext.
              </li>
              <li>
                <span className="font-semibold text-[#1B1E28]">
                  5. Use the QR code for convenience.
                </span>{" "}
                The QR code points to the decrypt page with the download link
                prefilled. The recipient scans it, sees the file ready, and then
                enters the password you share through your own channel.
              </li>
            </ol>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-[#E0E2FF] shadow-sm p-5 min-h-[150px] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-[#5A5DFF]/10 flex items-center justify-center text-[#5A5DFF]">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-semibold text-[#1B1E28]">
                    You actually keep the encrypted file
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Instead of hiding the encrypted payload behind a closed
                  infrastructure, GhostByte gives you a real file you can
                  archive, sync, or store offline. As long as you remember the
                  password, you are not tied to one storage provider.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-[#E0E2FF] shadow-sm p-5 min-h-[150px] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-[#5A5DFF]/10 flex items-center justify-center text-[#5A5DFF]">
                    <Link2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-semibold text-[#1B1E28]">
                    The link is transport, not authority
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  The Supabase link is just a way to move encrypted bytes from
                  one device to another. It does not contain the key and cannot
                  be used to decrypt anything on its own.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-[#E0E2FF] shadow-sm p-5 min-h-[150px] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-[#5A5DFF]/10 flex items-center justify-center text-[#5A5DFF]">
                    <Code className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-semibold text-[#1B1E28]">
                    Browser-first by intention
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  The long-term direction for GhostByte is to keep as much logic
                  as possible on the client side, and let the backend behave
                  like a simple encrypted storage layer instead of a place where
                  secrets accumulate.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Who is behind GhostByte */}
        <section className="mb-10 md:mb-16">
          <div className="bg-white rounded-3xl border border-[#E0E2FF] shadow-md p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start">

            <div className="w-full md:w-1/3 flex justify-center">
              <div className="relative w-40 h-40 md:w-44 md:h-44 rounded-3xl overflow-hidden shadow-lg border border-[#E0E2FF] bg-[#F5F6FF]">
                <img
                  src={founder}
                  alt="Mubashir Shahzaib"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>


            <div className="w-full md:w-2/3">
              <h2 className="text-xl md:text-2xl font-bold text-[#1B1E28] mb-3">
                Who is behind GhostByte
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3">
                I am <span className="font-semibold">Mubashir Shahzaib</span> —
                a developer who enjoys building practical tools around security,
                encryption and developer experience. GhostByte started as a side
                project while I was experimenting with browser APIs and
                client-side cryptography.
              </p>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3">
                I work mostly with web technologies and backend development, and
                I wanted a file-sharing workflow that felt simple enough for
                everyday use but still respected basic security principles:
                clear threat boundaries, predictable behaviour, and no hidden
                “trust me” layers.
              </p>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                GhostByte is intentionally small in scope. It does not try to be
                a full storage platform or a giant ecosystem. It is built to do
                one thing well: encrypt a file in your browser, let you share it
                safely, and stay out of the way.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="https://mubashir-shahzaib.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#5A5DFF] text-white text-sm font-semibold hover:bg-[#4A4DDF] transition-colors"
                >
                  <Cloud className="w-4 h-4" />
                  Portfolio
                </a>
                <a
                  href="https://github.com/dev-mubi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-[#5A5DFF] border border-[#5A5DFF] text-sm font-semibold hover:bg-[#5A5DFF] hover:text-white transition-colors"
                >
                  <Code className="w-4 h-4" />
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#1B1E28] text-white py-14 md:py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#5A5DFF]/10 to-transparent" />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          {/* Brand */}
          <div
            className="flex items-center justify-center gap-3 md:gap-4 mb-5 md:mb-6 group cursor-pointer"
            onClick={() => handleNavigate("/")}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#5A5DFF] to-[#9DA2FF] rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
            </div>

            <span
              className="text-xl md:text-2xl font-bold bg-gradient-to-r from-white to-[#9DA2FF]
              bg-clip-text text-transparent group-hover:from-[#9DA2FF] group-hover:to-white
              transition-all duration-300"
            >
              GhostByte
            </span>
          </div>

          {/* Links */}
          <div className="flex justify-center flex-wrap gap-5 md:gap-8 mb-5 md:mb-6 text-sm md:text-base">
            <button
              onClick={() => handleNavigate("/about")}
              className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
            >
              About
            </button>

            <a
              href="https://mubashir-shahzaib.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
            >
              Portfolio
            </a>

            <a
              href="https://github.com/dev-mubi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
            >
              GitHub
            </a>
          </div>

          {/* Divider */}
          <div className="w-20 md:w-24 h-[2px] bg-[#5A5DFF]/40 mx-auto mb-4 md:mb-6 rounded-full"></div>

          {/* Footer Line */}
          <p className="text-gray-500 text-xs md:text-sm">
            © {new Date().getFullYear()} GhostByte — Developed by Mubashir
            Shahzaib
          </p>
        </div>
      </footer>
    </div>
  );
}
