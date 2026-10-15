# KicksHub 👟

A full-stack sneaker e-commerce application built with React, TypeScript, Node.js, Express, and PostgreSQL.

KicksHub is designed to provide a modern shopping experience with product discovery, cart management, user authentication, and secure checkout.

## ✨ Features

- 🛍️ Browse and explore sneakers
- 🔐 User authentication
- 🛒 Shopping cart management
- ❤️ Wishlist functionality
- 📦 Order creation and tracking
- 💳 Stripe Checkout integration
- 📱 Responsive user interface
- 🗄️ PostgreSQL database with Prisma ORM

## 🧰 Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- GSAP
- Lucide React

### Backend
- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT authentication
- bcryptjs
- Stripe

## 📁 Project Structure

```text
KicksHub/
├── Frontend/       # React frontend
├── Backend/        # Express API
├── README.md
└── .gitignore
```

## ⚙️ Prerequisites

Install the following before running the project:

- Node.js (LTS recommended)
- npm
- PostgreSQL
- Git
- Stripe CLI (for local webhook testing)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd KicksHub
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your actual repository URL.

### 2. Set up the frontend

```bash
cd Frontend
npm install
```

Create a local `.env` file using the environment variables required by your frontend. See `.env.example` for the expected names.

Start the development server:

```bash
npm run dev
```

Frontend: `http://localhost:5173`

### 3. Set up the backend

Open another terminal:

```bash
cd Backend
npm install
```

Create a local `.env` file containing your required database, authentication, Stripe, and frontend URL configuration.

Configure the database connection and generate the Prisma client using the commands supported by this project's Prisma setup.

Start the backend using the development script defined in `Backend/package.json`.

Backend: `http://localhost:5000`

## 🔑 Environment Variables

The backend may require configuration for:

- PostgreSQL database connection
- JWT authentication secret
- Stripe secret key
- Stripe webhook signing secret
- Frontend/client URL

The frontend may require the backend API base URL.

Use `.env.example` files to document variable names without exposing real credentials. Never commit `.env` files or production secrets.

## 💳 Stripe Testing

KicksHub uses Stripe Checkout for test payments.

For local webhook testing, start the Stripe CLI listener with the events configured by the backend:

```bash
stripe listen --events checkout.session.completed,checkout.session.expired --forward-to localhost:5000/api/stripe/webhook
```

Use Stripe test-mode credentials when testing locally. Do not use real payment credentials in development.

## 🗄️ Database

KicksHub uses PostgreSQL with Prisma ORM.

After configuring the database, run the appropriate Prisma migration and client-generation commands for the installed Prisma version. See the backend configuration and Prisma documentation for the exact workflow.

## 🔒 Security

- Keep environment variables and credentials private.
- Never commit API secret keys or database passwords.
- Validate and authenticate protected API requests.
- Verify Stripe webhook signatures before processing payment events.

## 🛠️ Development Status

KicksHub is under active development. Features, setup instructions, and project structure may evolve as development continues.

## 📄 License

No license has been specified yet.
