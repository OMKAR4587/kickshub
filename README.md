# 👟 KICKSHUB®

### SNEAKER CULTURE. BUILT FOR THE NEXT MOVE.

**Not just shoes. It's a movement.**

KicksHub is a modern sneaker e-commerce platform built for sneaker lovers. Discover your next pair, save your favorites, and experience a seamless shopping journey.

<p align="center">
  <strong>DISCOVER YOUR STYLE · FIND YOUR PAIR · MAKE YOUR MOVE</strong>
</p>

---

## ⚡ The Experience

| Feature | Description |
|---|---|
| 🛍️ **Discover** | Browse sneakers and explore collections. |
| 🔐 **Authentication** | Secure user registration and login. |
| 🛒 **Your Cart** | Add sneakers, choose sizes, and manage items. |
| ❤️ **Wishlist** | Save your favorite pairs. |
| 📦 **Orders** | Create and manage sneaker orders. |
| 💳 **Checkout** | Stripe-powered payment integration. |
| 📱 **Responsive UI** | A modern shopping experience across screen sizes. |

## 🧰 Built With

**Frontend**

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

**Backend & Database**

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-635BFF?style=for-the-badge&logo=stripe&logoColor=white)

## 📸 The Look

<!-- Add a screenshot of your actual homepage here. -->
<!-- Save it as assets/kickshub-homepage.png and uncomment below. -->

<!--
<p align="center">
  <img src="assets/kickshub-homepage.png" alt="KicksHub homepage" width="900">
</p>
-->

## 🚀 Get Started

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd KicksHub
```

### 2. Start the frontend

```bash
cd Frontend
npm install
npm run dev
```

### 3. Configure the backend

Open another terminal:

```bash
cd Backend
npm install
```

Create your local `.env` file using the configuration required by the backend. Set up PostgreSQL and configure the database connection before running the appropriate Prisma commands.

Start the backend using the development script in `Backend/package.json`.

> **Note:** Exact environment variable names and database commands depend on the project's current configuration.

## 🔐 Environment Setup

Keep your credentials private.

- Never commit `.env` files.
- Never expose Stripe secret keys, JWT secrets, or database passwords.
- Use `.env.example` files to document the required variable names without including secret values.

## 💳 Payments

KicksHub integrates Stripe Checkout for payment processing. Use Stripe test mode and the configured webhook listener for local development.

## 🗺️ Roadmap

- [x] React + TypeScript frontend
- [x] Express backend
- [x] PostgreSQL and Prisma integration
- [x] Cart and wishlist functionality
- [x] Stripe Checkout integration
- [ ] Complete end-to-end payment verification
- [ ] Polish the order confirmation experience
- [ ] Production deployment

## 👟 The Philosophy

> **Find your pair. Define your style. Move different.**

KicksHub is an ongoing project exploring modern e-commerce, full-stack development, and sneaker culture.

---

<p align="center">
  <strong>KICKSHUB®</strong><br>
  <sub>MADE FOR THE LOVE OF SNEAKERS.</sub>
</p>
