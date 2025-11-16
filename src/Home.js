import React, { useState, useEffect } from "react";
import {
  Shield,
  Lock,
  Code,
  Cloud,
  Zap,
  Eye,
  Database,
  CheckCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "./logo.png";

export default function GhostByteHomepage() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    setVisible(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleNavigate = (path) => navigate(path);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F9FF] via-[#EEF0FF] to-[#E8EBFF] text-[#1B1E28] relative overflow-hidden">
      {/* Animated Background Elements */}
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

      {/* Navigation Bar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-2xl shadow-xl border-b border-[#5A5DFF]/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => handleNavigate("/")}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#5A5DFF] to-[#9DA2FF] rounded-2xl blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
              <img
                src={logo}
                alt="GhostByte Logo"
                className="w-14 h-14 object-contain transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 relative z-10"
              />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-[#1B1E28] to-[#5A5DFF] bg-clip-text text-transparent group-hover:from-[#5A5DFF] group-hover:to-[#9DA2FF] transition-all duration-300">
              GhostByte
            </span>
          </div>

          <div className="flex items-center gap-8">
            {["Encrypt", "Decrypt"].map((item) => (
              <button
                key={item}
                onClick={() => handleNavigate(`/${item.toLowerCase()}`)}
                className="text-[#1B1E28] font-semibold hover:text-[#5A5DFF] transition-all duration-300 relative group px-2 py-1"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-[#5A5DFF] to-[#9DA2FF] group-hover:w-full transition-all duration-300 rounded-full"></span>
                <span className="absolute inset-0 bg-[#5A5DFF]/5 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-44 pb-32 px-6 relative">
        <div
          className={`max-w-5xl mx-auto text-center transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {/* Floating Logo with Advanced Effects */}
          <div className="mb-12 flex justify-center relative">
            <div className="absolute w-64 h-64 bg-gradient-to-r from-[#5A5DFF]/30 to-[#9DA2FF]/30 blur-[80px] rounded-full animate-pulse" />
            <div
              className="absolute w-48 h-48 bg-[#5A5DFF]/20 blur-[60px] rounded-full animate-ping"
              style={{ animationDuration: "3s" }}
            />

            <div
              className="relative group cursor-pointer"
              onClick={() => handleNavigate("/encrypt")}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#5A5DFF] to-[#9DA2FF] rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
              <img
                src={logo}
                alt="GhostByte"
                className="w-44 h-44 object-contain drop-shadow-2xl transition-all duration-700 group-hover:scale-110 group-hover:drop-shadow-[0_0_30px_rgba(90,93,255,0.6)] relative z-10 animate-float"
              />
              <div
                className="absolute inset-0 rounded-full border-2 border-[#5A5DFF]/30 animate-ping"
                style={{ animationDuration: "2s" }}
              />
            </div>
          </div>

          {/* Enhanced Headings */}
          <div className="mb-4 flex items-center justify-center gap-2">
            <Sparkles className="w-6 h-6 text-[#5A5DFF] animate-pulse" />
            <span className="text-sm font-bold text-[#5A5DFF] uppercase tracking-widest">
              File Encryption/Decryption Service using AES{" "}
            </span>
            <Sparkles className="w-6 h-6 text-[#5A5DFF] animate-pulse" />
          </div>

          <h1 className="text-7xl md:text-8xl font-extrabold mb-6 bg-gradient-to-r from-[#5A5DFF] via-[#7B7EFF] to-[#9DA2FF] bg-clip-text text-transparent tracking-tight leading-tight animate-gradient bg-[length:200%_auto]">
            GhostByte
          </h1>

          <p className="text-3xl text-[#1B1E28] font-bold mb-4 leading-snug">
            Secure File Encryption, Right in Your Browser.
          </p>

          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Military-grade AES-256 encryption happens locally on your device.
            <br></br>
            Your keys never touch a server — privacy you can trust, security you
            can verify.
          </p>

          {/* Trust Badges */}
          <div className="flex items-center justify-center gap-6 mb-12 flex-wrap">
            {[
              { icon: <Shield className="w-5 h-5" />, text: "AES-256 GCM" },
              { icon: <Eye className="w-5 h-5" />, text: "Zero Knowledge" },
              { icon: <Code className="w-5 h-5" />, text: "Open Source" },
            ].map((badge, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-[#5A5DFF]/20 hover:border-[#5A5DFF]/40 transition-all duration-300 hover:scale-105"
              >
                <div className="text-[#5A5DFF]">{badge.icon}</div>
                <span className="text-sm font-semibold text-[#1B1E28]">
                  {badge.text}
                </span>
              </div>
            ))}
          </div>

          {/* Enhanced CTA Buttons */}
          <div className="flex gap-6 justify-center flex-wrap">
            <button
              onClick={() => handleNavigate("/encrypt")}
              className="group px-12 py-5 bg-gradient-to-r from-[#5A5DFF] to-[#7B7EFF] text-white rounded-2xl font-bold text-lg
              hover:from-[#4A4DDF] hover:to-[#6B6EEF] shadow-xl hover:shadow-2xl hover:shadow-[#5A5DFF]/50 hover:scale-105 transition-all duration-300 flex items-center gap-3 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <Lock className="w-6 h-6 relative z-10" />
              <span className="relative z-10">Encrypt File</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
            </button>

            <button
              onClick={() => handleNavigate("/decrypt")}
              className="group px-12 py-5 bg-white text-[#5A5DFF] rounded-2xl font-bold text-lg border-2 border-[#5A5DFF]
              hover:bg-gradient-to-r hover:from-[#5A5DFF] hover:to-[#7B7EFF] hover:text-white shadow-xl hover:shadow-2xl hover:shadow-[#5A5DFF]/30 hover:scale-105 transition-all duration-300 flex items-center gap-3 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#5A5DFF]/0 via-[#5A5DFF]/10 to-[#5A5DFF]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <Shield className="w-6 h-6 relative z-10" />
              <span className="relative z-10">Decrypt File</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-[#5A5DFF] to-[#7B7EFF] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: <Zap className="w-8 h-8" />,
                value: "256-bit",
                label: "Encryption Strength",
              },
              {
                icon: <Database className="w-8 h-8" />,
                value: "Zero",
                label: "Data Collection",
              },
              {
                icon: <CheckCircle className="w-8 h-8" />,
                value: "100%",
                label: "Client-Side",
              },
            ].map((stat, idx) => (
              <div key={idx} className="text-center group cursor-default">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-4 text-white group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300 shadow-lg">
                  {stat.icon}
                </div>
                <div className="text-5xl font-extrabold text-white mb-2 group-hover:scale-105 transition-transform">
                  {stat.value}
                </div>
                <div className="text-lg text-white/90 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-28 px-6 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-extrabold text-[#1B1E28] mb-4">
              Why Choose GhostByte?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Enterprise-grade security meets intuitive design. <br></br>Your
              files deserve the best protection.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Lock className="w-8 h-8" />,
                title: "True End-to-End Encryption",
                desc: "AES-GCM encryption runs entirely on your browser with zero backend exposure.",
                color: "from-[#5A5DFF] to-[#7B7EFF]",
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Zero File Tracking",
                desc: "No analytics. No logs. No tracking. Your files stay yours.",
                color: "from-[#7B7EFF] to-[#9DA2FF]",
              },
              {
                icon: <Code className="w-8 h-8" />,
                title: "Open-Source Transparency",
                desc: "Built with clean, readable security-focused code.",
                color: "from-[#5A5DFF] to-[#9DA2FF]",
              },
              {
                icon: <Cloud className="w-8 h-8" />,
                title: "Encrypted Sharing",
                desc: "Secure uploads via Supabase with public-only encrypted access.",
                color: "from-[#7B7EFF] to-[#5A5DFF]",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-[#F8F9FF] to-white rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 group border border-[#5A5DFF]/10 hover:border-[#5A5DFF]/30 relative overflow-hidden"
                style={{
                  animationDelay: `${idx * 120}ms`,
                  animation: visible
                    ? "fadeInUp 0.6s ease-out forwards"
                    : "none",
                }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#5A5DFF]/5 to-transparent rounded-bl-[100px] -z-0" />

                <div
                  className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg relative z-10`}
                >
                  {feature.icon}
                </div>

                <h3 className="text-xl font-bold mb-4 text-[#1B1E28] group-hover:text-[#5A5DFF] transition-colors duration-300">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>

                <div className="mt-6 flex items-center text-[#5A5DFF] font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#5A5DFF] via-[#7B7EFF] to-[#9DA2FF] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZG90cyIgeD0iMCIgeT0iMCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48Y2lyY2xlIGN4PSI1IiBjeT0iNSIgcj0iMiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2RvdHMpIi8+PC9zdmc+')] opacity-40" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-5xl font-extrabold text-white mb-6">
            Ready to Secure Your Files?
          </h2>
          <p className="text-xl text-white/90 mb-10 leading-relaxed">
            Join the privacy revolution. Start encrypting your files with
            military-grade security today.
          </p>

          <button
            onClick={() => handleNavigate("/encrypt")}
            className="group px-14 py-6 bg-white text-[#5A5DFF] rounded-2xl font-bold text-xl
            hover:bg-gray-50 shadow-2xl hover:shadow-white/30 hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-[#5A5DFF]/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <Lock className="w-6 h-6 relative z-10" />
            <span className="relative z-10">Start Encrypting Now</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform relative z-10" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1B1E28] text-white py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#5A5DFF]/10 to-transparent" />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          {/* Brand */}
          <div
            className="flex items-center justify-center gap-4 mb-6 group cursor-pointer"
            onClick={() => handleNavigate("/")}
          >
            <div className="relative">
              <div
                className="absolute inset-0 bg-gradient-to-br from-[#5A5DFF] to-[#9DA2FF]
          rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"
              />
            </div>

            <span
              className="text-2xl font-bold bg-gradient-to-r from-white to-[#9DA2FF]
        bg-clip-text text-transparent group-hover:from-[#9DA2FF] group-hover:to-white
        transition-all duration-300"
            >
              GhostByte
            </span>
          </div>

          {/* Links */}
          <div className="flex justify-center gap-8 mb-6">
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
          <div className="w-24 h-[2px] bg-[#5A5DFF]/40 mx-auto mb-6 rounded-full"></div>

          {/* Footer Line */}
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} GhostByte, Developed by Mubashir
            Shahzaib
          </p>
        </div>
      </footer>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-gradient {
          animation: gradient 8s ease infinite;
        }
      `}</style>
    </div>
  );
}
