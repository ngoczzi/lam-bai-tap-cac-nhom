import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(0);
  const [classList, setClassList] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle Redirection
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Handle Countdown
  useEffect(() => {
    if (!session?.accessTokenExpires) return;

    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.floor((session.accessTokenExpires - Date.now()) / 1000));
      setTimeLeft(remaining);
    }, 1000);

    return () => clearInterval(interval);
  }, [session]);

  if (status === "loading") {
    return <div className="card" style={{ textAlign: "center" }}>Đang tải...</div>;
  }

  if (!session) return null;

  // Role-based Access Control
  if (session.role === "ROLE_STUDENT") {
    return (
      <div className="card access-denied-card">
        <Head>
          <title>Bị Từ Chối Truy Cập | NextAuth Demo</title>
        </Head>
        <div className="icon-large" style={{ color: "#ef4444" }}>✕</div>
        <h1 className="access-denied-title">Bị Từ Chối Truy Cập</h1>
        <p style={{ color: "#64748b", marginBottom: "30px", lineHeight: "1.6" }}>
          Bạn không có quyền truy cập trang này. 
          Chỉ Cố Vấn (ROLE_ADVISOR) mới được phép.
        </p>
        
        <div className="badge badge-student" style={{ marginBottom: "25px", display: "inline-block", padding: "10px 20px" }}>
          Role của bạn: <strong>ROLE_STUDENT</strong>
        </div>
        
        <button className="btn-danger" onClick={() => signOut()}>
          Đăng Xuất
        </button>
      </div>
    );
  }

  const fetchClassList = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));

    const mockData = {
      classes: [
        { id: 1, name: "Lớp A1", students: 30 },
        { id: 2, name: "Lớp A2", students: 28 },
        { id: 3, name: "Lớp A3", students: 32 },
      ],
      accessToken: session.accessToken.substring(0, 20) + "...",
      expiresAt: new Date(session.accessTokenExpires).toLocaleTimeString(),
      timestamp: new Date().toLocaleTimeString(),
    };

    setClassList(mockData);
    setLoading(false);
  };

  return (
    <div className="card dashboard-container" style={{ padding: "30px" }}>
      <Head>
        <title>Dashboard Cố Vấn | NextAuth Demo</title>
      </Head>

      <div style={{ marginBottom: "30px" }}>
        <h2 style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          📊 Dashboard Cố Vấn
        </h2>
        
        <div className="status-grid" style={{ gridTemplateColumns: "1fr" }}>
          <div className="status-item" style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <span style={{ fontSize: "1.2rem" }}>👤</span>
            <div>
              <span className="status-label">Người dùng:</span>
              <span className="status-value">{session.user?.name}</span>
            </div>
          </div>
          
          <div className="status-item" style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <span style={{ fontSize: "1.2rem" }}>🔑</span>
            <div>
              <span className="status-label">Role:</span>
              <span className="status-value" style={{ color: "var(--primary-hover)" }}>{session.role}</span>
            </div>
          </div>

          <div className="status-item" style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <span style={{ fontSize: "1.2rem" }}>⏳</span>
            <div>
              <span className="status-label">Access Token hết hạn sau:</span>
              <span className={`status-value countdown ${timeLeft < 10 ? 'text-danger' : ''}`}>
                {timeLeft}s
              </span>
            </div>
          </div>

          <div className="status-item" style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <span style={{ fontSize: "1.2rem" }}>🎫</span>
            <div>
              <span className="status-label">Token hiện tại:</span>
              <span className="status-value" style={{ color: "#94a3b8", fontSize: "0.85rem" }}>
                {session.accessToken.substring(0, 25)}...
              </span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "30px" }}>
        <h3 style={{ fontSize: "1rem", marginBottom: "15px", color: "#475569" }}>Kiểm Tra Token Refresh</h3>
        
        <div style={{ display: "flex", gap: "10px", marginBottom: "25px" }}>
          <button className="btn-primary" style={{ flex: 1 }} onClick={fetchClassList} disabled={loading}>
            {loading ? "Đang tải..." : "📋 Lấy danh sách lớp"}
          </button>
          <button className="btn-danger" style={{ flex: 1 }} onClick={() => signOut()}>
            Đăng Xuất
          </button>
        </div>

        {classList && (
          <div className="result-area">
            <h4 style={{ fontSize: "0.85rem", marginBottom: "10px", color: "#10b981", display: "flex", alignItems: "center", gap: "8px" }}>
              🏁 Kết Quả:
            </h4>
            <pre>{JSON.stringify(classList, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

