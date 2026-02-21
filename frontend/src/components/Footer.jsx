function Footer() {
  return (
    <div
      style={{
        background: "#0a1223",
        color: "white",
        marginTop: "80px",
        padding: "50px 40px"
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "30px"
        }}
      >
        <div>
          <h2>Gruhaani</h2>
          <p style={{ opacity: 0.7 }}>
            Trusted platform for buying and selling properties in
            Manipal & Udupi.
          </p>
        </div>

        <div>
          <h3>Quick Links</h3>
          <p>Properties</p>
          <p>Admin</p>
          <p>Contact</p>
        </div>

        <div>
          <h3>Contact</h3>
          <p>📍 Manipal, Karnataka</p>
          <p>📞 +91 6360071844</p>
          <p>✉ arunbansode00@gmail.com</p>
        </div>
      </div>

      <hr style={{ margin: "30px 0", opacity: 0.2 }} />

      <p style={{ textAlign: "center", opacity: 0.6 }}>
        © 2026 Gruhaani. All rights reserved.
      </p>
    </div>
  );
}

export default Footer;