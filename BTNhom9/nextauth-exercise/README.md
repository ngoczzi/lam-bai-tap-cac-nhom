# NextAuth Refresh Token Rotation Exercise

This project demonstrates how to implement **Automatic Token Refreshing** and **Role-Based Access Control (RBAC)** using NextAuth.js in a Next.js application.

## Features

- **Refresh Token Rotation**: Automatically detects when an Access Token expires and refreshes it in the background using a Refresh Token.
- **RBAC**: Supports `ROLE_STUDENT` and `ROLE_ADVISOR` with different access permissions.
- **Premium UI**: Modern design with glassmorphism, gradients, and smooth animations.
- **Mock Backend**: Simulated authentication and token issuance for demonstration.

## Demo Credentials

| Role | Username | Password |
|------|----------|----------|
| **Student** | `student` | `123456` |
| **Advisor** | `advisor` | `123456` |

## How to use

1. Run the development server: `npm run dev`
2. Open `http://localhost:3000`
3. Login as `advisor` to access the Dashboard.
4. Observe the countdown. When it hits `0s`, click "Lấy danh sách lớp".
5. Check the Browser Console (F12) to see the refresh logic in action.
6. Login as `student` to see the "Access Denied" page.

## Project Structure

```
nextauth-exercise/
└── pages/
      ├── _app.js             # SessionProvider & Global Styles
      ├── login.js            # Premium Login Page
      ├── index.js            # Protected Dashboard (Advisor only)
      └── api/auth/[...nextauth].js # NextAuth Core logic (JWT & Session)
├── styles/
      └── globals.css         # Custom Premium CSS
├── package.json
└── README.md
```
