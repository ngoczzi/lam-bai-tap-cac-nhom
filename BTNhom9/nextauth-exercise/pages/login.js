import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid username or password");
      setLoading(false);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="card">
      <Head>
        <title>Đăng Nhập | NextAuth Demo</title>
      </Head>
      
      <div style={{ marginBottom: "30px" }}>
        <div style={{ fontSize: "4rem", marginBottom: "10px" }}>🔐</div>
        <h1>Đăng Nhập</h1>
      </div>

      {error && <div className="error-box">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "5px" }}>
          <input
            type="text"
            placeholder="student"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ textAlign: "left" }}
          />
        </div>
        
        <div style={{ marginBottom: "10px" }}>
          <input
            type="password"
            placeholder="......"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ textAlign: "left" }}
          />
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Đang xử lý..." : "Đăng Nhập"}
        </button>
      </form>
    </div>
  );
}

