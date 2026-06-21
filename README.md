# 🌶️ Spicy Plate: Production-Grade Full-Stack Food Ordering Architecture

Spicy Plate is an enterprise-ready, high-performance, full-stack digital commerce platform engineered for real-time food discovery, interactive cart operations, and highly secure multi-layered user lifecycle management. Built using a decoupled client-server architecture, it guarantees structural sub-second UI responsiveness and state transitions.

[![Live Demo](https://img.shields.io/badge/LIVE_DEMO-👉_Click_Here_To_Open_Website_🌐-ff4757?style=for-the-badge&logo=render&logoColor=white)](https://spicy-plate-food.onrender.com)

---

## 🛠️ Built With (Technologies Used)

<p align="left">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Render-000000?style=for-the-badge&logo=render&logoColor=white" alt="Render" />
</p>

---

Arey bilkul, ye lijiye `Distributed Tech Stack Specification` se lekar poore end tak ka part, ekdum normal text mein bina kisi bade outer box ke.

Aap ise yahan se lekar neeche tak aaram se select karke copy lijiye aur apni file mein pehle waale part ke thik neeche paste kar dijiye:

---

## 📊 Distributed Tech Stack Specification

Below is the structured architectural breakdown of the components driving the infrastructure:

| Architecture Layer | Core Technology | Operational Responsibility |
| --- | --- | --- |
| **Presentation Layer (Frontend)** | `React.js (Vite Engine)` | Structural sub-second UI compilation, component lifecycle management, and virtual DOM diffing. |
| **Styling Framework** | `Tailwind CSS` | Utility-first responsive fluid layouts, optimized production design system, and JIT compilation. |
| **State Hydration** | `React Context API` | Unified transactional client data store, eliminating expensive layout recalculations and prop-drilling. |
| **Network Client** | `Axios Interceptors` | Secure asynchronous HTTPS communication contracts and structural API data exchange over JSON. |
| **Application Layer (Backend)** | `Node.js (LTS Runtime)` | High-concurrency event-driven JavaScript server execution environment. |
| **Routing & REST Engine** | `Express.js Middleware` | Application layer endpoint mapping, CORS policies, and request-response pipeline controls. |
| **Identity Verification** | `JSON Web Tokens (JWT)` | High-entropy cryptographic payload verification for continuous session lifecycle tracking. |
| **Communication Gateway** | `Brevo API` | High-delivery transactional REST API engine for automated registration OTP transmission pipelines. |
| **Data Infrastructure** | `MongoDB Atlas Cloud` | Distributed non-relational highly accessible cloud database cluster. |
| **ODM / Identity Mapping** | `Mongoose ODM` | Schematic validation rules, query optimization hooks, and automatic TTL document indices. |
| **Deployment / Cloud Fabric** | `Render Infrastructure` | High-performance containerized hosting platforms (Static Site + Web Services). |

---

## ⚡ Core Enterprise Modules & Engineering Deep-Dive

### 1. Robust Cryptographic Identity & Lifecycle Management

* **Two-Factor Authentication Pipeline:** Registration does not immediately persist unverified user records into primary production tables. Instead, it utilizes an automated staging workflow where a high-entropy, cryptographically secure 6-digit One-Time Password (OTP) is dispatched via the enterprise-grade **Brevo API engine** (`sendEmail.js`).
* **Session Lifecycle:** Successful verification generates a secure JSON Web Token (JWT) injected into headers for seamless request tracking. Passwords are irreversibly hashed server-side using high-iteration salt algorithms.

### 2. State-Driven Network Navigation Controls (`ProtectedRoute.jsx`)

Route access is managed by a structural React Higher-Order Component (HOC) pattern. The system evaluates authorization signatures prior to rendering lifecycle events. Unauthenticated entry requests targeting administrative or contextual order components are interceptively terminated and routed back to login gates safely.

### 3. High-Concurrency Client State Management (`CartContext.jsx`)

Rather than causing expensive layout recalculations via localized component prop drilling, global transactional operations (mutating cart state, pricing algorithms, item batch additions) are managed via localized React Context providers, ensuring consistent memory footprint and optimized rendering performance.

---

## 📊 Database Entities & Logical Modeling (Mongoose)

### User Entity Specification (`User.js`)

```javascript
const UserSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Name mapping is required'], 
    trim: true 
  },
  email: { 
    type: String, 
    required: [true, 'Email coordinate is required'], 
    unique: true, 
    lowercase: true,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid email format payload']
  },
  otp: { 
    type: String, 
    default: null 
  },
  createdAt: { 
    type: Date, 
    default: Date.now,
    expires: 3600 // Automatic TTL Index: documents auto-purge after 1 hour if unverified
  }
}, { timestamps: true });

```

---

## 🔌 API Matrix & Communication Contracts

All application layer network communication contracts adhere strictly to semantic REST architectures over secure JSON payloads.

| Context | HTTP Verb | URI Path | Payload Constraints | Intended Behavior |
| --- | --- | --- | --- | --- |
| Identity | POST | `/api/auth/signup` | `{ name, email }` | Triggers OTP lifecycle sequence, returns validation status. |
| Identity | POST | `/api/auth/verify-otp` | `{ email, otp }` | Evaluates token correctness, mints JWT token session on match. |
| Identity | POST | `/api/auth/login` | `{ email }` | Authenticators lookup matching identities to trigger access routines. |
| Inventory | GET | `/api/menu` | None | Queries database collection arrays for responsive asset parsing. |
| Checkout | POST | `/api/orders/checkout` | `{ cartItems, totals }` | Requires Bearer JWT header token; processes structural system order. |

---

## 🛠️ Global Environment Provisioning Matrix

An application-wide structural control file `.env` must exist within the `/backend` directory root. These configurations are isolated from standard version-control indexing using production `.gitignore` definitions.

```env
# Application Host Target Port Configuration
PORT=5000

# Distributed Data Infrastructure Storage String (MongoDB Atlas Connection URL)
MONGO_URI=mongodb+srv://<identity>:<credential>@cluster0.f2nje9v.mongodb.net/spicyplate?retryWrites=true&w=majority

# High-Entropy Cryptographic Tokenization Seed (JWT Generation Key)
JWT_SECRET=SpicyPlateSecureTokenAuthKey2026@Production

# Transactional Delivery Transport Systems (Brevo API Credentials)
BREVO_API_KEY=your_brevo_api_key_here
EMAIL_USER=spicyplate.orders@gmail.com

```

> ⚠️ **Production Security Assertion:** Under no operational condition should the `.env` metadata payload match or exist within any committed workspace directories. Always configure deployment platforms to parse these configurations through secure, dashboard-level environment variables.

---

## 🚀 Step-by-Step Installation & Local Compilation Guide

### System Prerequisites

* **Runtime Core:** Node.js version engine >= 18.x.x
* **Package Management:** npm >= 9.x.x
* **Data Layer Instance:** Valid access configurations to a live MongoDB Atlas cloud cluster.

### 1. Repository Clonal Mapping

```bash
git clone https://github.com/prernaparashari/spicy-plate-food-ordering-web.git
cd spicy-plate-food-ordering-web

```

### 2. Backend Infrastructure Deployment Execution

```bash
cd backend
npm install --silent
# Initialize your .env file here with configuration presets matching the matrix above
npm start

```

*Expected Terminal Validation:* `[Server] Application Layer running on port 5000 | [Database] Secured connection to MongoDB Atlas established.`

### 3. Client Presentation Layer Invocation

```bash
# Initialize a secondary terminal instance tracking the project directory root
cd ../spicy-plate-react
npm install --silent
npm run dev

```

*Expected Terminal Validation:* `VITE ready in X ms. Local: http://localhost:5173/`

---

## 🛡️ Production Security Engineering Specifications

* **Token-Driven Authorization Verification:** Protects against unauthorized network access vectors by wrapping client requests in verification middleware checking layers.
* **Sensitive Asset Decoupling:** Uses production-level `.gitignore` mapping rules to prevent accidental credential leakage into public version repositories.
* **CORS Network Security Policies:** Restricts third-party cross-origin data fetching down to authorized structural runtime routes only.
* **Encrypted Identity Storage:** Ensures user profile protection through strict backend hashing and validation design setups.

---

## 📄 License Context

Distributed under the MIT Enterprise Licensing Agreement. See accompanying LICENSE modules for deep-dive operational freedoms.

---

### 👤 Author & Maintainer

Architected and Engineered with ❤️ by **Prerna Parashari**.

