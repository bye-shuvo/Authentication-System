export const EMAIL_VERIFICATION_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Email Verification Code</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Inter:wght@300;400;500&display=swap');

    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      background: #f0ede8;
      font-family: 'Inter', system-ui, sans-serif;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 32px 16px;
    }

    .wrapper {
      width: 100%;
      max-width: 520px;
    }

    /* ── Brand ── */
    .brand {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      margin-bottom: 28px;
    }

    .brand-dot {
      width: 10px;
      height: 10px;
      background: #1a1a1a;
      border-radius: 50%;
    }

    .brand-name {
      font-family: 'Syne', sans-serif;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: #1a1a1a;
    }

    /* ── Card ── */
    .card {
      background: #ffffff;
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0,0,0,0.04), 0 12px 40px rgba(0,0,0,0.08);
    }

    /* Stripe top */
    .stripe {
      height: 4px;
      background: repeating-linear-gradient(
        90deg,
        #1a1a1a 0px,
        #1a1a1a 20px,
        transparent 20px,
        transparent 28px
      );
    }

    /* ── Header ── */
    .header {
      padding: 44px 48px 36px;
      border-bottom: 1px solid #f0ede8;
    }

    .tag {
      display: inline-block;
      background: #f0ede8;
      color: #777;
      font-size: 10px;
      font-weight: 500;
      letter-spacing: 2px;
      text-transform: uppercase;
      padding: 5px 12px;
      border-radius: 100px;
      margin-bottom: 20px;
    }

    .title {
      font-family: 'Syne', sans-serif;
      font-size: 28px;
      font-weight: 800;
      color: #1a1a1a;
      line-height: 1.2;
      margin-bottom: 12px;
    }

    .subtitle {
      font-size: 14px;
      color: #999;
      line-height: 1.7;
      max-width: 340px;
    }

    /* ── Token Block ── */
    .token-block {
      padding: 40px 48px;
    }

    .token-label {
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      color: #bbb;
      margin-bottom: 16px;
    }

    /* Individual digit cells */
    .digits {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .digit {
      width: 52px;
      height: 64px;
      background: #f7f5f2;
      border: 1.5px solid #e8e4de;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Syne', sans-serif;
      font-size: 28px;
      font-weight: 800;
      color: #1a1a1a;
      letter-spacing: 0;
      position: relative;
      transition: border-color 0.2s, background 0.2s;
    }

    /* separator dot between groups */
    .digit-sep {
      display: flex;
      align-items: center;
      color: #d0ccc6;
      font-size: 22px;
      font-weight: 300;
      margin: 0 2px;
    }



    /* ── Expiry Row ── */
    .expiry-row {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 22px;
      padding: 12px 16px;
      background: #fdf8f0;
      border: 1px solid #f0e8d8;
      border-radius: 10px;
    }

    .expiry-icon {
      font-size: 14px;
      flex-shrink: 0;
    }

    .expiry-text {
      font-size: 12px;
      color: #a08060;
      line-height: 1.5;
    }

    .expiry-text strong {
      font-weight: 600;
      color: #7a5c30;
    }

    /* ── Notice ── */
    .notice {
      padding: 20px 48px 24px;
      background: #fafaf9;
      border-top: 1px solid #f0ede8;
    }

    .notice p {
      font-size: 12px;
      color: #bbb;
      line-height: 1.8;
    }

    /* ── Footer ── */
    .footer {
      padding: 24px 48px;
      border-top: 1px solid #f0ede8;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 12px;
    }

    .footer-left {
      font-size: 11px;
      color: #ccc;
    }

    .footer-right {
      font-size: 11px;
      color: #ccc;
      text-align: right;
    }

    /* ── Outer note ── */
    .outer-note {
      text-align: center;
      margin-top: 24px;
      font-size: 11px;
      color: #b0aa9f;
      letter-spacing: 0.3px;
    }

    @media (max-width: 540px) {
      .header, .token-block { padding-left: 28px; padding-right: 28px; }
      .notice, .footer { padding-left: 28px; padding-right: 28px; }
      .title { font-size: 22px; }
      .digit { width: 42px; height: 54px; font-size: 22px; }
      .digits { gap: 6px; }
    }
  </style>
</head>
<body>

  <div class="wrapper">

    <!-- Brand -->
    <div class="brand">
      <div class="brand-dot"></div>
      <span class="brand-name">YourBrand</span>
      <div class="brand-dot"></div>
    </div>

    <!-- Card -->
    <div class="card">
      <div class="stripe"></div>

      <!-- Header -->
      <div class="header">
        <div class="tag">Security Code</div>
        <h1 class="title">Verify it's<br/>really you.</h1>
        <p class="subtitle">
          Enter the 6-digit code below to confirm your identity.
          This code is for your use only — never share it with anyone.
        </p>
      </div>

      <!-- Token -->
      <div class="token-block">
        <p class="token-label">Your verification code</p>

        <!-- Digit cells — replace values dynamically from your backend -->
        <div class="digits" id="digitDisplay">
          <div class="digit">{verificationToken}</div>
        </div>

        <!-- Expiry note -->
        <div class="expiry-row">
          <span class="expiry-icon">⏳</span>
          <p class="expiry-text">
            This code expires in <strong>10 minutes</strong>. If it expires, simply request a new one.
          </p>
        </div>
      </div>

      <!-- Notice -->
      <div class="notice">
        <p>
          If you didn't request this code, you can safely ignore this email. Someone may have entered your address by mistake. Do not share this code with anyone — our team will never ask for it.
        </p>
      </div>

      <!-- Footer -->
      <div class="footer">
        <span class="footer-left">© 2026 YourBrand Inc.</span>
        <span class="footer-right"><a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="1c6f797f696e7568655c6573696e7e6e7d7278327f7371">[email&#160;protected]</a></span>
      </div>
    </div>

    <p class="outer-note">Automated security message · Do not reply</p>

  </div>

</body>
</html>`