import { useState, useRef } from "react";

const COLORS = {
  bg: "#060d1f",
  surface: "rgba(255,255,255,0.06)",
  surfaceStrong: "rgba(255,255,255,0.1)",
  border: "rgba(255,255,255,0.09)",
  accent: "#7c3aed",
  accentAlt: "#a855f7",
  accentLight: "#c084fc",
  text: "#f1f5f9",
  textMuted: "#94a3b8",
  textDim: "#64748b",
  success: "#10b981",
  danger: "#ef4444",
};

const NAV_LINKS = ["Home", "Events", "Profile"];
const EVENT_CATEGORIES = ["All Events", "Tech", "Arts", "Social", "Sports", "Career", "Seminar"];

const EVENTS = [
  {
    id: 1,
    title: "Cybersecurity Masterclass",
    category: "Tech",
    price: "Free",
    time: "Tomorrow • 10:00 AM",
    location: "IT Lab 4, Block D",
    attendees: 12,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=640&h=380&fit=crop",
  },
  {
    id: 2,
    title: "Digital Art Workshop",
    category: "Arts",
    price: "ETB 25",
    time: "Friday • 03:30 PM",
    location: "Design Studio, Block B",
    attendees: 45,
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=640&h=380&fit=crop",
  },
  {
    id: 3,
    title: "Acoustic Night Live",
    category: "Social",
    price: "Free",
    time: "Saturday • 07:00 PM",
    location: "Cafeteria Terrace",
    attendees: 100,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=640&h=380&fit=crop",
  },
  {
    id: 4,
    title: "AI & Robotics Seminar",
    category: "Seminar",
    price: "Free",
    time: "May 20 • 02:00 PM",
    location: "Block B • Seminar Room",
    attendees: 78,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=640&h=380&fit=crop",
  },
  {
    id: 5,
    title: "Campus Beats Live",
    category: "Social",
    price: "ETB 150",
    time: "May 25 • 07:00 PM",
    location: "Amphitheater Area",
    attendees: 224,
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=640&h=380&fit=crop",
  },
  {
    id: 6,
    title: "Spring Career Expo",
    category: "Career",
    price: "Students Only",
    time: "May 18 • 10:00 AM",
    location: "Main Library Hall",
    attendees: 98,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=640&h=380&fit=crop",
  },
];

const profileCards = [
  { label: "Membership", value: "Gold Member" },
  { label: "Registered Events", value: "12" },
  { label: "Saved Events", value: "8" },
  { label: "Event Credits", value: "120" },
];

const sidebarLinks = [
  { title: "Edit Profile", subtitle: "Update your details", icon: "✏️" },
  { title: "My Schedule", subtitle: "View your agenda", icon: "📅" },
  { title: "Saved Events", subtitle: "Saved for later", icon: "🔖" },
];

const css = {
  root: {
    fontFamily: "'Sora', sans-serif",
    minHeight: "100vh",
    background: COLORS.bg,
    color: COLORS.text,
    position: "relative",
    overflow: "hidden",
  },
  bgCanvas: { position: "fixed", inset: 0, zIndex: 0, overflow: "hidden" },
  beam: (extra) => ({ position: "absolute", borderRadius: "50%", filter: "blur(80px)", opacity: 0.18, ...extra }),
  container: {
    position: "relative",
    zIndex: 10,
    width: "100%",
    maxWidth: 1160,
    margin: "0 auto",
    padding: "28px 24px 60px",
  },
  header: { display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", justifyContent: "space-between", marginBottom: 28 },
  brand: { display: "flex", flexDirection: "column", gap: 6 },
  brandTitle: { fontSize: "1.9rem", fontWeight: 800, letterSpacing: "-0.04em" },
  brandSubtitle: { color: COLORS.textMuted, fontSize: "0.95rem" },
  nav: { display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" },
  navButton: (active) => ({ padding: "12px 18px", borderRadius: 999, border: active ? `1px solid ${COLORS.accent}` : `1px solid ${COLORS.surfaceStrong}`, background: active ? "rgba(124,58,237,0.15)" : COLORS.surface, color: active ? COLORS.text : COLORS.textMuted, cursor: "pointer", transition: "all 0.2s" }),
  topActions: { display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" },
  pill: (active) => ({ padding: "10px 16px", borderRadius: 999, border: active ? `1px solid ${COLORS.accent}` : `1px solid ${COLORS.surfaceStrong}`, background: active ? "rgba(124,58,237,0.15)" : COLORS.surface, color: active ? COLORS.text : COLORS.textMuted, cursor: "pointer", transition: "all 0.2s" }),
  card: { borderRadius: 24, border: `1px solid ${COLORS.border}`, background: COLORS.surface, overflow: "hidden", boxShadow: "0 28px 60px rgba(0,0,0,0.25)" },
  panel: { padding: 28 },
  heroGrid: { display: "grid", gap: 24, gridTemplateColumns: "1.6fr 1fr" },
  statsGrid: { display: "grid", gap: 18, gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))" },
  statBox: { borderRadius: 24, border: `1px solid ${COLORS.border}`, background: "rgba(255,255,255,0.03)", padding: 22 },
  statLabel: { fontSize: "0.85rem", color: COLORS.textMuted, marginBottom: 10 },
  statValue: { fontSize: "1.8rem", fontWeight: 700, color: COLORS.text },
  button: { borderRadius: 16, border: "none", cursor: "pointer", transition: "all 0.25s", fontWeight: 700 },
  actionPrimary: { background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentAlt})`, color: "#060d1f" },
  actionSecondary: { background: "rgba(255,255,255,0.06)", color: COLORS.text, border: `1px solid ${COLORS.surfaceStrong}` },
  tabs: { display: "flex", gap: 10, borderRadius: 24, background: "rgba(255,255,255,0.04)", padding: 8, marginBottom: 20, overflow: "hidden" },
  tab: (active) => ({ flex: 1, padding: "14px 18px", borderRadius: 18, border: "none", background: active ? "rgba(124,58,237,0.18)" : "transparent", color: active ? COLORS.text : COLORS.textMuted, fontWeight: 700, cursor: "pointer", position: "relative" }),
  tabUnderline: { position: "absolute", left: 0, right: 0, bottom: 0, height: 3, borderRadius: 999, background: COLORS.accent, margin: "0 auto", width: "calc(100% - 36px)" },
  socialRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 },
  divider: { display: "flex", alignItems: "center", gap: 12, marginBottom: 24 },
  dividerLine: { flex: 1, height: 1, background: "rgba(255,255,255,0.08)" },
  dividerText: { color: COLORS.textMuted, fontSize: "0.75rem", letterSpacing: "0.18em" },
  inputWrap: (focused) => ({ display: "flex", alignItems: "center", gap: 12, borderRadius: 18, border: focused ? `1px solid ${COLORS.accent}` : `1px solid ${COLORS.surfaceStrong}`, background: "rgba(255,255,255,0.04)", padding: "14px 16px", marginBottom: 8 }),
  input: { width: "100%", background: "transparent", border: "none", outline: "none", color: COLORS.text, fontSize: "0.95rem" },
  socialBtn: (hover) => ({ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "14px 16px", borderRadius: 18, border: hover ? `1px solid ${COLORS.accent}` : `1px solid ${COLORS.surfaceStrong}`, background: hover ? "rgba(124,58,237,0.12)" : "rgba(255,255,255,0.04)", color: COLORS.text, cursor: "pointer", fontWeight: 700, transition: "all 0.2s" }),
  fieldLabel: { color: COLORS.textMuted, fontWeight: 600, fontSize: "0.87rem" },
  forgotBtn: { background: "transparent", border: "none", color: COLORS.accent, fontWeight: 700, cursor: "pointer" },
  eyeBtn: { background: "transparent", border: "none", color: COLORS.textMuted, cursor: "pointer", padding: 0 },
  supportLink: { marginTop: 24, color: COLORS.textMuted, fontSize: "0.92rem", lineHeight: 1.6 },
  sectionTitle: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 20, flexWrap: "wrap" },
  sectionHeading: { fontSize: "1.5rem", fontWeight: 700 },
  smallText: { color: COLORS.textMuted, fontSize: "0.95rem" },
  eventsGrid: { display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))" },
  eventCard: { borderRadius: 24, overflow: "hidden", background: "rgba(255,255,255,0.04)", border: `1px solid ${COLORS.border}`, boxShadow: "0 24px 40px rgba(0,0,0,0.16)" },
  eventImage: { width: "100%", height: 190, objectFit: "cover" },
  eventBody: { padding: 22 },
  eventCategory: { display: "inline-flex", padding: "6px 10px", borderRadius: 999, fontSize: "0.75rem", fontWeight: 700, marginBottom: 14, background: "rgba(124,58,237,0.12)", color: COLORS.accent },
  eventTitle: { fontSize: "1.1rem", fontWeight: 700, marginBottom: 10 },
  eventMeta: { fontSize: "0.88rem", color: COLORS.textMuted, marginBottom: 14, lineHeight: 1.7 },
  eventFooter: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap" },
  profileGrid: { display: "grid", gap: 20, gridTemplateColumns: "2fr 1fr" },
  profileSidebar: { borderRadius: 24, border: `1px solid ${COLORS.border}`, background: "rgba(255,255,255,0.04)", padding: 22 },
  profileCard: { borderRadius: 24, border: `1px solid ${COLORS.border}`, background: "rgba(255,255,255,0.04)", padding: 22 },
  profileBadge: { display: "inline-flex", alignItems: "center", gap: 8, padding: "9px 14px", borderRadius: 999, background: "rgba(124,58,237,0.15)", color: COLORS.accent, fontWeight: 700, fontSize: "0.85rem" },
  settingsRow: { display: "grid", gap: 14 },
  settingsBox: { borderRadius: 20, border: `1px solid ${COLORS.border}`, background: "rgba(255,255,255,0.03)", padding: 18 },
};

const Icon = ({ path, size = 18, color = COLORS.text }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d={path} />
  </svg>
);

const Icons = {
  search: "M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z",
  bell: "M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0",
  user: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  home: "M3 10l9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
  calendar: "M8 2v4M16 2v4M3 10h18M5 22h14a2 2 0 0 0 2-2V10H3v10a2 2 0 0 0 2 2z",
  profile: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2c-4.418 0-8 1.79-8 4v2h16v-2c0-2.21-3.582-4-8-4z",
};

function InputField({ icon, type = "text", placeholder, value, onChange, right }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={css.inputWrap(focused)}>
      {icon}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={css.input}
      />
      {right}
    </div>
  );
}

function SocialBtn({ icon, label, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      style={css.socialBtn(hover)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
    >
      {icon}
      {label}
    </button>
  );
}

function CtaBtn({ label, loading, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      style={{ ...css.button, ...css.actionPrimary, ...(hover && { transform: "translateY(-2px)" }), opacity: loading ? 0.75 : 1 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      disabled={loading}
    >
      {loading ? "Processing..." : label}
    </button>
  );
}

function ToastContainer({ toasts }) {
  return (
    <div style={{ position: "fixed", top: 22, left: "50%", transform: "translateX(-50%)", zIndex: 120 }}>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          style={{
            minWidth: 280,
            marginBottom: 10,
            borderRadius: 18,
            background: toast.type === "success" ? "rgba(16,185,129,0.9)" : toast.type === "error" ? "rgba(239,68,68,0.95)" : "rgba(124,58,237,0.95)",
            color: "#fff",
            padding: "14px 18px",
            boxShadow: "0 24px 70px rgba(0,0,0,0.18)",
            fontWeight: 600,
          }}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}

function ForgotModal({ open, onClose, onSend }) {
  const [email, setEmail] = useState("");
  const [focused, setFocused] = useState(false);
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(3,10,25,0.8)",
        display: open ? "flex" : "none",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 110,
        padding: 20,
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div style={{ width: "100%", maxWidth: 420, borderRadius: 24, background: "#07101f", border: `1px solid ${COLORS.border}`, padding: 28, boxShadow: "0 40px 90px rgba(0,0,0,0.35)" }}>
        <h3 style={{ fontSize: 22, marginBottom: 12 }}>Reset Password</h3>
        <p style={{ color: COLORS.textMuted, marginBottom: 22, lineHeight: 1.7 }}>
          Enter your university email and we will send you a password recovery link.
        </p>
        <InputField
          icon={<Icon path={Icons.search} color={COLORS.textMuted} />}
          type="email"
          placeholder="student@aastu.edu.et"
          value={email}
          onChange={setEmail}
        />
        <div style={{ display: "flex", gap: 12, marginTop: 22 }}>
          <button
            style={{ ...css.button, ...css.actionSecondary, flex: 1 }}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            style={{ ...css.button, ...css.actionPrimary, flex: 1 }}
            onClick={() => onSend(email)}
          >
            Send Link
          </button>
        </div>
      </div>
    </div>
  );
}

function Stars() {
  const stars = useRef(
    Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      dur: 2 + Math.random() * 4,
      delay: Math.random() * 4,
      opacity: 0.2 + Math.random() * 0.5,
    }))
  ).current;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
      {stars.map((star) => (
        <div
          key={star.id}
          style={{
            position: "absolute",
            width: 2,
            height: 2,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.6)",
            left: `${star.left}%`,
            top: `${star.top}%`,
            opacity: star.opacity,
            animation: `twinkle ${star.dur}s ${star.delay}s ease-in-out infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("login");
  const [activeTab, setActiveTab] = useState("login");
  const [portalPage, setPortalPage] = useState("home");
  const [showForgot, setShowForgot] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPwd, setLoginPwd] = useState("");
  const [showLoginPwd, setShowLoginPwd] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [regFirst, setRegFirst] = useState("");
  const [regLast, setRegLast] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPwd, setRegPwd] = useState("");
  const [showRegPwd, setShowRegPwd] = useState(false);
  const [regLoading, setRegLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Events");
  const [savedEvents, setSavedEvents] = useState([]);

  const toastId = useRef(0);

  const showToast = (message, type = "info") => {
    const id = ++toastId.current;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((toast) => toast.id !== id)), 2800);
  };

  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleLogin = async () => {
    if (!loginEmail) return showToast("Please enter your email address.", "error");
    if (!isValidEmail(loginEmail)) return showToast("Please enter a valid email address.", "error");
    if (!loginPwd) return showToast("Please enter your password.", "error");
    if (loginPwd.length < 6) return showToast("Password must be at least 6 characters.", "error");
    setLoginLoading(true);
    await delay(1500);
    setLoginLoading(false);
    setPage("portal");
    setPortalPage("home");
    showToast("Welcome to AASTU Hub!", "success");
  };

  const handleRegister = async () => {
    if (!regFirst || !regLast) return showToast("Please enter your full name.", "error");
    if (!regEmail) return showToast("Please enter your university email.", "error");
    if (!isValidEmail(regEmail)) return showToast("Use a valid email address.", "error");
    if (regPwd.length < 8) return showToast("Password must be at least 8 characters.", "error");
    setRegLoading(true);
    await delay(1500);
    setRegLoading(false);
    setActiveTab("login");
    showToast(`Account created for ${regFirst}! Please login.`, "success");
  };

  const handleSocialLogin = (provider) => {
    showToast(`${provider} login selected.`, "info");
    setTimeout(() => showToast(`Social login is demo-only.`, "error"), 1400);
  };

  const handleForgotSend = (email) => {
    if (!email || !isValidEmail(email)) return showToast("Enter a valid email to reset password.", "error");
    setShowForgot(false);
    showToast(`Reset link sent to ${email}`, "success");
  };

  const handleLogout = () => {
    setPage("login");
    setActiveTab("login");
    setLoginPwd("");
    setRegPwd("");
    showToast("You have logged out.", "info");
  };

  const filteredEvents = EVENTS.filter((event) => {
    const query = searchQuery.toLowerCase();
    const matchesQuery = event.title.toLowerCase().includes(query) || event.location.toLowerCase().includes(query) || event.category.toLowerCase().includes(query);
    const matchesCategory = activeCategory === "All Events" || event.category === activeCategory;
    return matchesQuery && matchesCategory;
  });

  const toggleSaved = (id) => {
    setSavedEvents((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
    const action = savedEvents.includes(id) ? "removed" : "saved";
    showToast(`Event ${action} from your list.`, "success");
  };

  const renderHeader = () => (
    <div style={css.header}>
      <div style={css.brand}>
        <div style={css.brandTitle}>AASTU Events Hub</div>
        <div style={css.brandSubtitle}>Secure campus portal for events, schedules, and profile.</div>
      </div>
      <div style={css.nav}>
        {NAV_LINKS.map((link) => (
          <button
            key={link}
            style={css.navButton(portalPage === link.toLowerCase())}
            onClick={() => setPortalPage(link.toLowerCase())}
          >
            {link}
          </button>
        ))}
      </div>
      <div style={css.topActions}>
        <button
          style={{ ...css.button, ...css.actionSecondary, display: "flex", alignItems: "center", gap: 10 }}
          onClick={() => showToast("No new notifications.", "info")}
        >
          <Icon path={Icons.bell} size={18} color={COLORS.text} /> Notifications
        </button>
        <button
          style={{ ...css.button, ...css.actionSecondary, display: "flex", alignItems: "center", gap: 10 }}
          onClick={() => setPortalPage("profile")}
        >
          <Icon path={Icons.user} size={18} color={COLORS.text} /> Profile
        </button>
        <button style={{ ...css.button, ...css.actionPrimary }} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );

  // Redesigned Home page matching the provided UI
  const renderHome = () => (
    <div className="min-h-[calc(100vh-80px)] flex flex-col gap-10 px-2 md:px-0">
      {/* Welcome and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-2">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">
            Welcome back, <span className="text-purple-400">Abebe!</span>
          </h1>
          <p className="text-slate-400 max-w-xl">
            Ready to discover what's happening on campus today? Check out your personalized feed based on your tech and arts interests.
          </p>
        </div>
        <div className="flex items-center gap-3 mt-2 md:mt-0">
          <input
            type="text"
            className="bg-[#181c2a] border border-[#23263a] rounded-xl px-4 py-2 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 w-64"
            placeholder="Search events..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="avatar" className="w-10 h-10 rounded-full border-2 border-purple-500" />
        </div>
      </div>

      {/* Featured Event + Calendar */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Happening Now */}
        <div className="flex-1 bg-[#181c2a] rounded-2xl p-0 overflow-hidden shadow-lg relative">
          <img src="https://images.unsplash.com/photo-1464983953574-0892a716854b?w=900&q=80" alt="Featured" className="w-full h-56 object-cover opacity-80" />
          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-end p-6 bg-gradient-to-t from-[#181c2a] via-[#181c2a]/80 to-transparent">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-pink-600 text-xs font-bold px-2 py-1 rounded uppercase tracking-widest">LIVE</span>
              <span className="text-xs text-slate-300">Main Hall • 242 attending</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">2024 Tech Innovation Summit: Shaping the Future</h2>
            <p className="text-slate-300 mb-4 max-w-lg">Join the biggest tech gathering of the semester. Industry leaders across Addis Ababa are sharing insights on AI, FinTech, and Renewable Energy.</p>
            <button className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-5 py-2 rounded-xl w-fit">Join Live Session</button>
          </div>
        </div>
        {/* Upcoming Calendar */}
        <div className="w-full lg:w-80 bg-[#181c2a] rounded-2xl p-6 flex flex-col gap-4 shadow-lg">
          <h3 className="text-lg font-semibold text-white mb-2">Upcoming Calendar</h3>
          <div className="flex flex-col gap-3">
            <div className="bg-[#23263a] rounded-xl p-3 flex flex-col gap-1">
              <span className="text-xs text-slate-400">October 2024</span>
              <div className="flex items-center gap-3">
                <span className="bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded">14 MON</span>
                <span className="text-slate-200 text-sm">Robotics Workshop</span>
              </div>
              <span className="text-xs text-slate-400">01:00 PM • Block C-2</span>
            </div>
            <div className="bg-[#23263a] rounded-xl p-3 flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <span className="bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded">16 WED</span>
                <span className="text-slate-200 text-sm">Jazz Night Gala</span>
              </div>
              <span className="text-xs text-slate-400">06:30 PM • Student Center</span>
            </div>
          </div>
          <button className="text-purple-400 hover:underline text-sm mt-2 text-left">View Full Schedule</button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-3 mt-2">
        {['All Events', 'Workshops', 'Seminars', 'Socials', 'Sports', 'Art & Culture'].map(cat => (
          <button
            key={cat}
            className={`px-5 py-2 rounded-full font-semibold text-sm transition border ${activeCategory === cat ? 'bg-purple-600 text-white border-purple-500' : 'bg-[#23263a] text-slate-300 border-[#23263a] hover:bg-purple-700/30'}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Recommended Events */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-semibold text-white">Recommended for You</h3>
          <button className="bg-purple-100 text-purple-700 font-semibold px-4 py-2 rounded-full text-sm shadow hover:bg-purple-200">+ Post Event</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.slice(0,3).map(event => (
            <div key={event.id} className="bg-[#181c2a] rounded-2xl p-5 shadow-lg flex flex-col justify-between min-h-[260px]">
              <div className="flex items-center gap-2 mb-2">
                <span className={`bg-${event.category === 'Tech' ? 'blue' : event.category === 'Arts' ? 'pink' : 'yellow'}-600 text-xs font-bold px-2 py-1 rounded text-white`}>{event.category}</span>
                <span className="text-xs text-slate-400">{event.price}</span>
              </div>
              <h4 className="text-lg font-bold text-white mb-1">{event.title}</h4>
              <div className="text-slate-400 text-sm mb-2">{event.time} <span className="mx-1">•</span> {event.location}</div>
              <div className="flex items-center gap-2 mt-auto">
                <span className="flex -space-x-2">
                  <img src="https://randomuser.me/api/portraits/men/31.jpg" className="w-7 h-7 rounded-full border-2 border-[#23263a]" />
                  <img src="https://randomuser.me/api/portraits/women/44.jpg" className="w-7 h-7 rounded-full border-2 border-[#23263a]" />
                </span>
                <span className="text-xs text-slate-400">{event.attendees} attending</span>
                <button className="ml-auto bg-purple-500 hover:bg-purple-600 text-white px-4 py-1.5 rounded-lg text-xs font-semibold">Register Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-10 bg-[#181c2a] rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-slate-400 text-sm">
        <div>
          <span className="font-bold text-white">AASTU Events Hub</span> — Connecting students through innovation, culture, and community events.
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms of Service</a>
          <a href="#" className="hover:underline">Campus Map</a>
          <a href="#" className="hover:underline">Contact Support</a>
        </div>
        <div className="text-xs text-slate-500 w-full md:w-auto text-right">© 2024 Addis Ababa Science and Technology University. All Rights Reserved.</div>
      </footer>
    </div>
  );

  const renderEvents = () => (
    <div style={{ display: "grid", gap: 24 }}>
      <div style={{ ...css.card, padding: 24 }}>
        <div style={css.sectionTitle}>
          <div>
            <h3 style={css.sectionHeading}>Campus Events</h3>
            <div style={css.smallText}>Filter by category, search, and save your favorite sessions.</div>
          </div>
          <button style={{ ...css.button, ...css.actionPrimary, padding: "14px 20px" }} onClick={() => showToast("Events refreshed.", "success")}>Refresh</button>
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 18 }}>
          {EVENT_CATEGORIES.map((category) => (
            <button
              key={category}
              style={css.pill(activeCategory === category)}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 22 }}>
          <div style={{ flex: 1, minWidth: 240 }}>
            <InputField
              icon={<Icon path={Icons.search} color={COLORS.textMuted} />}
              placeholder="Search events, workshops, or venues..."
              value={searchQuery}
              onChange={setSearchQuery}
            />
          </div>
          <button
            style={{ ...css.button, ...css.actionSecondary, minWidth: 150 }}
            onClick={() => { setSearchQuery(""); setActiveCategory("All Events"); }}
          >
            Clear filters
          </button>
        </div>
        <div style={css.eventsGrid}>
          {filteredEvents.map((event) => (
            <div key={event.id} style={css.eventCard}>
              <img src={event.image} alt={event.title} style={css.eventImage} />
              <div style={css.eventBody}>
                <div style={css.eventCategory}>{event.category}</div>
                <div style={css.eventTitle}>{event.title}</div>
                <div style={css.eventMeta}>{event.time} • {event.location}</div>
                <div style={css.eventFooter}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ background: "rgba(255,255,255,0.08)", borderRadius: 999, padding: "8px 12px", fontSize: "0.9rem", color: COLORS.text }}>{event.price}</span>
                    <span style={{ color: COLORS.textMuted, fontSize: "0.85rem" }}>{event.attendees} attendees</span>
                  </div>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <button
                      style={{ ...css.button, ...css.actionSecondary, minWidth: 120 }}
                      onClick={() => { toggleSaved(event.id); }}
                    >
                      {savedEvents.includes(event.id) ? "Saved" : "Save"}
                    </button>
                    <button
                      style={{ ...css.button, ...css.actionPrimary, minWidth: 120 }}
                      onClick={() => showToast(`Joined ${event.title}!`, "success")}
                    >
                      Register
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {filteredEvents.length === 0 && (
            <div style={{ gridColumn: "1/-1", textAlign: "center", color: COLORS.textMuted, padding: 32, borderRadius: 24, border: `1px solid ${COLORS.border}`, background: "rgba(255,255,255,0.03)" }}>
              No events found. Try a different filter.
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div style={css.profileGrid}>
      <div style={css.profileCard}>
        <div style={css.panel}>
          <div style={css.profileBadge}>Student Profile</div>
          <h3 style={{ marginTop: 18, fontSize: "1.9rem", fontWeight: 800 }}>Abebe Bekele</h3>
          <p style={{ ...css.smallText, marginTop: 10 }}>Information Engineering • Addis Ababa Science and Technology University</p>
          <div style={{ display: "grid", gap: 16, marginTop: 24 }}>
            {profileCards.map((item) => (
              <div key={item.label} style={{ borderRadius: 20, border: `1px solid ${COLORS.border}`, background: "rgba(255,255,255,0.03)", padding: 18 }}>
                <div style={{ fontSize: "0.85rem", color: COLORS.textMuted }}>{item.label}</div>
                <div style={{ fontSize: "1.7rem", fontWeight: 700, marginTop: 10 }}>{item.value}</div>
              </div>
            ))}
          </div>
          <button style={{ ...css.button, ...css.actionPrimary, width: "100%", marginTop: 24, padding: "16px 0" }} onClick={() => showToast("Profile updated successfully.", "success")}>Edit Profile</button>
        </div>
      </div>
      <div style={css.profileSidebar}>
        <div style={css.settingsRow}>
          {sidebarLinks.map((item) => (
            <div key={item.title} style={{ ...css.settingsBox, display: "flex", alignItems: "flex-start", gap: 14 }}>
              <div style={{ background: "rgba(124,58,237,0.12)", borderRadius: 16, padding: 12 }}>{item.icon}</div>
              <div>
                <div style={{ fontWeight: 700, marginBottom: 6 }}>{item.title}</div>
                <div style={{ color: COLORS.textMuted, fontSize: "0.95rem" }}>{item.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ ...css.settingsBox, marginTop: 18 }}>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Need help?</div>
          <div style={{ color: COLORS.textMuted, fontSize: "0.95rem", lineHeight: 1.7 }}>Contact campus support for profile updates, event access, or account questions.</div>
          <button style={{ ...css.button, ...css.actionSecondary, width: "100%", marginTop: 18, padding: "14px 0" }} onClick={() => showToast("Support message opened.", "info")}>Contact Support</button>
        </div>
      </div>
    </div>
  );

  const renderPortal = () => (
    <div style={css.container}>
      {renderHeader()}
      {portalPage === "home" && renderHome()}
      {portalPage === "events" && renderEvents()}
      {portalPage === "profile" && renderProfile()}
    </div>
  );

  return (
    <div style={css.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap');
        @keyframes drift { 0% { transform: translate(0,0) rotate(-5deg); } 100% { transform: translate(40px,30px) rotate(5deg); } }
        @keyframes twinkle { 0% { opacity: 0.1; } 100% { opacity: 0.8; } }
      `}</style>
      <Stars />
      <ToastContainer toasts={toasts} />
      <ForgotModal open={showForgot} onClose={() => setShowForgot(false)} onSend={handleForgotSend} />

      {page === "login" ? (
        <div style={css.container}>
          <div style={{ textAlign: "center", marginBottom: 34 }}>
            <div style={css.brandTitle}>AASTU Hub</div>
            <div style={css.brandSubtitle}>The gateway to university life and events.</div>
          </div>
          <div style={css.card}>
            <div style={css.tabs}>
              {["login", "register"].map((tab) => (
                <button key={tab} style={css.tab(activeTab === tab)} onClick={() => setActiveTab(tab)}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {activeTab === tab && <div style={css.tabUnderline} />}
                </button>
              ))}
            </div>
            <div style={css.panel}>
              <div style={css.socialRow}>
                <SocialBtn icon={<Icon path={Icons.profile} color={COLORS.textMuted} />} label="Uni ID" onClick={() => handleSocialLogin("Uni ID")} />
                <SocialBtn icon={<Icon path={Icons.search} color={COLORS.textMuted} />} label="Google" onClick={() => handleSocialLogin("Google")} />
              </div>
              <div style={css.divider}>
                <div style={css.dividerLine} />
                <span style={css.dividerText}>OR EMAIL</span>
                <div style={css.dividerLine} />
              </div>
              {activeTab === "login" ? (
                <>
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 8 }}><span style={css.fieldLabel}>Email Address</span></div>
                    <InputField icon={<Icon path={Icons.search} color={COLORS.textMuted} />} type="email" placeholder="student@aastu.edu.et" value={loginEmail} onChange={setLoginEmail} />
                  </div>
                  <div style={{ marginBottom: 8 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <span style={css.fieldLabel}>Password</span>
                      <button style={css.forgotBtn} onClick={() => setShowForgot(true)}>Forgot?</button>
                    </div>
                    <InputField
                      icon={<Icon path={Icons.profile} color={COLORS.textMuted} />}
                      type={showLoginPwd ? "text" : "password"}
                      placeholder="••••••••"
                      value={loginPwd}
                      onChange={setLoginPwd}
                      right={
                        <button style={css.eyeBtn} onClick={() => setShowLoginPwd((state) => !state)}>
                          <Icon path={Icons.bell} color={COLORS.textMuted} />
                        </button>
                      }
                    />
                  </div>
                  <CtaBtn label="Access Portal" loading={loginLoading} onClick={handleLogin} />
                </>
              ) : (
                <>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
                    <div>
                      <div style={{ marginBottom: 8 }}><span style={css.fieldLabel}>First Name</span></div>
                      <InputField icon={<Icon path={Icons.user} color={COLORS.textMuted} />} placeholder="Abebe" value={regFirst} onChange={setRegFirst} />
                    </div>
                    <div>
                      <div style={{ marginBottom: 8 }}><span style={css.fieldLabel}>Last Name</span></div>
                      <InputField icon={<Icon path={Icons.user} color={COLORS.textMuted} />} placeholder="Kebede" value={regLast} onChange={setRegLast} />
                    </div>
                  </div>
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 8 }}><span style={css.fieldLabel}>University Email</span></div>
                    <InputField icon={<Icon path={Icons.search} color={COLORS.textMuted} />} type="email" placeholder="student@aastu.edu.et" value={regEmail} onChange={setRegEmail} />
                  </div>
                  <div style={{ marginBottom: 8 }}>
                    <div style={{ marginBottom: 8 }}><span style={css.fieldLabel}>Password</span></div>
                    <InputField
                      icon={<Icon path={Icons.profile} color={COLORS.textMuted} />}
                      type={showRegPwd ? "text" : "password"}
                      placeholder="Min. 8 characters"
                      value={regPwd}
                      onChange={setRegPwd}
                      right={
                        <button style={css.eyeBtn} onClick={() => setShowRegPwd((state) => !state)}>
                          <Icon path={Icons.bell} color={COLORS.textMuted} />
                        </button>
                      }
                    />
                  </div>
                  <CtaBtn label="Create Account" loading={regLoading} onClick={handleRegister} />
                </>
              )}
              <div style={css.supportLink}>
                Need assistance? <span style={{ color: COLORS.accent, cursor: "pointer" }} onClick={() => showToast("Campus support: support@aastu.edu.et", "info")}>Contact Campus Support</span>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 26, textAlign: "center", color: COLORS.textMuted }}>
            © 2024 Addis Ababa Science and Technology University.
            <br />Information & Communications Technology Directorate.
          </div>
        </div>
      ) : (
        renderPortal()
      )}
    </div>
  );
}
