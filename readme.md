# 📊 Backend Ledger System

A secure, modular, and high-performance Node.js & Express backend designed for comprehensive transaction ledger tracking, financial balance sheets, and robust session-based user authentication.

This ecosystem is optimized to bypass strict network proxy firewalls (which commonly obstruct cloud ports like `27017`) by leveraging a production-grade **in-memory database architecture** for fast, completely self-contained offline testing and localized compilation.

---

## 🚀 Architectural Features

- **Isolated Ephemeral DB Layer:** Utilizing `mongodb-memory-server` to completely allocate database operations natively inside system RAM with no hardware installation dependencies.
- **State-of-the-Art Cryptography:** Implementation of standard password hashing sequences using `bcryptjs` and cryptographic token signing using `jsonwebtoken` (JWT).
- **Asynchronous App Lifecycle:** Built-in programmatic guardrails in `server.js` ensure that port tracking only begins *after* successful data layer initialization, preventing unhandled exceptions and dangling ports.
- **Full Automation Ready:** Completely decoupled architectural components to allow seamless transition from development modes to a production cluster by modifying environmental bindings.

---

## 🛠️ Installation & Execution Layout

### 1. Extract & Unpack Dependencies
Navigate to your extracted project path and compile the initial dependencies:
```bash
npm install
```

### 2. Configure Local Operational Variables
Initialize a file named exactly `.env` in the root folder context:
```env
PORT=3000
JWT_SECRET="super_secret_jwt_key_987654321"

EMAIL_HOST="smtp.mailtrap.io"
EMAIL_PORT=2525
EMAIL_USER="your_smtp_username_here"
EMAIL_PASS="your_smtp_password_here"
```

### 3. Launch the Backend Ecosystem
Boot up the execution line using the standardized entry point scripts:
```bash
npm start
```
Upon successful boot sequence, your shell logs will read:
```text
Starting local virtual database...
Server connected to virtual DB successfully!
Server is running beautifully on port 3000
Email server is ready to send messages
```

---

## 📋 Comprehensive API Route Directory

All base routes are mounted downstream from the root interface: `http://localhost:3000/api`.

### 🔐 1. Authentication System Endpoints (`/api/auth`)

#### **A. User Registration**
* **Method & Route:** `POST /api/auth/register`
* **Access Level:** Public (Unauthenticated)
* **Description:** Parses credentials, registers a new account securely in the database memory grid, sends a welcome transmission, and returns user schema details along with an access token.
* **Request Header:** `Content-Type: application/json`
* **Request Body Payload Example:**
  ```json
  {
    "name": "Shrey Kedia",
    "email": "shrey@example.com",
    "password": "securepassword123"
  }
  ```
* **Expected Response (`201 Created`):**
  ```json
  {
    "user": {
      "_id": "6a4f353e06a7bc27f8460ede",
      "name": "Shrey Kedia",
      "email": "shrey@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey..."
  }
  ```

#### **B. User Login Session**
* **Method & Route:** `POST /api/auth/login`
* **Access Level:** Public (Unauthenticated)
* **Description:** Assesses provided identifiers against saved hashes, generating a fresh temporary session cryptographic token.
* **Request Header:** `Content-Type: application/json`
* **Request Body Payload Example:**
  ```json
  {
    "email": "shrey@example.com",
    "password": "securepassword123"
  }
  ```
* **Expected Response (`200 OK`):**
  ```json
  {
    "user": {
      "_id": "6a4f353e06a7bc27f8460ede",
      "name": "Shrey Kedia",
      "email": "shrey@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey..."
  }
  ```

---

### 💳 2. Financial Ledger Management Endpoints (`/api/ledger`)

*⚠️ All requests targeted at the ledger cluster require standard JSON Web Token confirmation headers to proceed.*
* **Mandatory Security Header:** `Authorization: Bearer <YOUR_JWT_TOKEN>`

#### **A. Fetch Ledger Balance Sheets**
* **Method & Route:** `GET /api/ledger`
* **Access Level:** Private (Protected via JWT Middleware)
* **Description:** Gathers, cross-references, and logs a comprehensive list of all entries tracked explicitly under the calling user's account scope.
* **Expected Response (`200 OK`):**
  ```json
  [
    {
      "_id": "7b5e432a11b6cc38f9571aaa",
      "userId": "6a4f353e06a7bc27f8460ede",
      "title": "Stall Space Allocation",
      "amount": 1200,
      "type": "credit",
      "createdAt": "2026-07-09T13:44:54.000Z"
    }
  ]
  ```

#### **B. Log New Financial Transaction**
* **Method & Route:** `POST /api/ledger`
* **Access Level:** Private (Protected via JWT Middleware)
* **Description:** appends a balance adjustment logging element (either `credit` or `debit`) linked natively to the calling user account.
* **Request Body Payload Example:**
  ```json
  {
    "title": "Stall Space Allocation",
    "amount": 1200,
    "type": "credit"
  }
  ```
* **Expected Response (`201 Created`):**
  ```json
  {
    "_id": "7b5e432a11b6cc38f9571aaa",
    "userId": "6a4f353e06a7bc27f8460ede",
    "title": "Stall Space Allocation",
    "amount": 1200,
    "type": "credit",
    "createdAt": "2026-07-09T13:44:54.000Z"
  }
  ```

#### **C. Delete Ledger Log Entry**
* **Method & Route:** `DELETE /api/ledger/:id`
* **Access Level:** Private (Protected via JWT Middleware)
* **Description:** Purges a specific financial transaction row using its targeted object identifier (`_id`).
* **Expected Response (`200 OK`):**
  ```json
  {
    "success": true,
    "message": "Ledger entry successfully deleted."
  }
  ```

---

## 🧪 Postman Sandbox Testing Checklist

1. Make a **`POST`** command call to `/api/auth/register` using your raw JSON template payload.
2. Extract the returned `token` from the response body.
3. Open a new request interface for a private endpoint (like `GET /api/ledger`).
4. Select the **Auth** category header inside Postman, adjust the type scheme configuration to **Bearer Token**, and paste your extracted token string into the text container field.
5. Execute the tracking call securely!

---

## 🛡️ Git Control Protocol

To ensure your environment config variables and internal memory compilation packages do not bleed onto public workspaces, confirm your `.gitignore` lists:
```text
node_modules/
.env
```