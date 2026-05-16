export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ padding: "20px", fontFamily: "Arial" }}>
        <nav style={{ marginBottom: "20px" }}>
          <a href="/">Home</a> |{" "}
          <a href="/blog">Blog</a> |{" "}
          <a href="/categories">Categories</a>
        </nav>

        {children}
      </body>
    </html>
  );
}