# Subscription Management Dashboard – Workflow Guide

## Project Overview

A full-stack SaaS Subscription Management Dashboard built with:

* Frontend: React (Vite) + TailwindCSS + Zustand
* Backend: Node.js + Express.js
* Database: MongoDB (Atlas)
* Auth: JWT (Access + Refresh Tokens)

---

## Live Local Setup

### 1. Clone & Install

#### Backend

```bash
cd server
npm install
npm run dev
```

#### Frontend

```bash
cd client
npm install
npm run dev
```

---

## Environment Variables

### Backend (.env)

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## Test Credentials

### Admin User

```
Email: rashith@test.com
Password: 123456
Role: ADMIN
```

---

## API Workflow

### 1. Authentication

#### Register User

```
POST /api/auth/register
```

#### Login

```
POST /api/auth/login
```

Returns:

* accessToken
* refreshToken
* user object (role included)

---

### 2. Subscription Flow

#### Get Plans

```
GET /api/plans
```

#### Subscribe to Plan

```
POST /api/subscribe/:planId
Headers: Authorization: Bearer <token>
```

#### Get My Subscription

```
GET /api/my-subscription
Headers: Authorization: Bearer <token>
```

---

### 3. Admin Flow

#### Get All Subscriptions

```
GET /api/admin/subscriptions
Headers: Authorization: Bearer <token>
(Admin only)
```

---

## Frontend Routes

```
/login        → Login Page
/register     → Register Page
/plans        → Subscription Plans
/dashboard    → User Dashboard
/admin/subscriptions → Admin Panel
```

---

## Features Implemented

### Authentication

* JWT Access Token
* Refresh Token support
* Role-based login (USER / ADMIN)

### Subscription System

* Plan listing
* Subscription creation
* Active subscription tracking
* Expiry date calculation

### Admin Panel

* View all user subscriptions
* Populated user + plan data
* Role-protected route

### Frontend

* React Router navigation
* Protected routes
* Admin route guard
* Zustand state management
* Responsive UI (Tailwind)

---

## How to Test (Evaluator Guide)

### Step 1: Login as Admin

```
Email: rashith@test.com
Password: 123456
```

### Step 2: Copy Access Token

From login response.

---

### Step 3: Open Admin Panel

Go to:

```
/admin/subscriptions
```

Expected:

* List of all subscriptions
* User name + email
* Plan details
* Status + expiry date

---

## Important Notes

* All APIs are protected using JWT middleware
* Admin routes are role-restricted
* Subscription data is populated using MongoDB relations
* Frontend uses global auth state (Zustand)

---

## Author

Mohamed Rashith
Full Stack Developer