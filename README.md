# 👟 KICKSHUB — Modern Sneaker E-Commerce Platform

A modern, full-stack sneaker shopping platform built for sneaker enthusiasts. Discover sneakers, explore collections, manage your cart and wishlist, and experience checkout powered by Stripe.

![Status](https://img.shields.io/badge/Status-In%20Development-orange)
![License](https://img.shields.io/badge/License-MIT-blue)
![Frontend](https://img.shields.io/badge/Frontend-React%20%7C%20TypeScript-3178C6)
![Backend](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express-339933)
![Database](https://img.shields.io/badge/Database-PostgreSQL-4169E1)
![Payments](https://img.shields.io/badge/Payments-Stripe-635BFF)

---

## 🎯 Features

- ✅ **Sneaker Discovery** — Browse sneaker products and collections.
- ✅ **User Authentication** — Register and log in securely.
- ✅ **Shopping Cart** — Add products, choose sizes, and manage quantities.
- ✅ **Wishlist** — Save your favorite sneakers.
- ✅ **Order Management** — Create orders and store order details.
- 🚧 **Stripe Checkout** — Integrate secure checkout and payment verification.
- ✅ **Responsive Interface** — Modern shopping experience across screen sizes.
- ✅ **REST API** — Dedicated backend endpoints for application functionality.

> Feature status reflects the intended functionality; verify each feature in the current application before marking it production-ready.

---

## 🛠️ Tech Stack

### Frontend

- **React** — Component-based user interface.
- **TypeScript** — Type-safe application development.
- **Vite** — Frontend development and build tooling.
- **Tailwind CSS** — Utility-first styling.
- **React Router** — Client-side navigation.
- **GSAP** — Animations and motion effects.
- **Lucide React** — Interface icons.

### Backend

- **Node.js** — JavaScript runtime.
- **Express.js** — REST API framework.
- **TypeScript** — Backend application development.
- **Prisma ORM** — Database access and schema management.
- **PostgreSQL** — Relational database.
- **JWT** — Authentication tokens.
- **bcryptjs** — Password hashing.
- **Stripe** — Checkout and payment integration.

---

## 📦 Installation & Setup

### Prerequisites

Install the following before running KicksHub:

- [Node.js](https://nodejs.org/) — LTS version recommended.
- npm — Included with Node.js.
- [PostgreSQL](https://www.postgresql.org/) — Local or hosted database.
- [Git](https://git-scm.com/) — Version control.
- [Stripe CLI](https://docs.stripe.com/stripe-cli) — For local webhook testing.

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd KicksHub
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with the repository's actual clone URL.

### 2. Configure the Backend

```bash
cd Backend
npm install
```

Create a local `.env` file based on `Backend/.env.example`.

Configure the environment variables required by your application, including the database connection, JWT secret, Stripe secret key, Stripe webhook secret, and frontend URL.

### 3. Configure the Database

Ensure PostgreSQL is running and your database exists.

From the `Backend` directory, run the Prisma commands supported by your installed Prisma version and project configuration to generate the client and apply database migrations.

### 4. Start the Backend

Use the development script defined in `Backend/package.json`.

```bash
npm run dev
```

The backend is expected to run at:

```text
http://localhost:5000
```

### 5. Start the Frontend

Open a second terminal:

```bash
cd Frontend
npm install
npm run dev
```

Vite will display the local frontend URL, typically:

```text
http://localhost:5173
```

---

## 🔑 Environment Variables

Environment variables are configured separately for the frontend and backend.

### Backend

Check `Backend/.env.example` for the exact variable names. Depending on the current configuration, the backend may require:

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | PostgreSQL connection |
| `JWT_SECRET` | Authentication signing secret |
| `STRIPE_SECRET_KEY` | Stripe server-side API access |
| `STRIPE_WEBHOOK_SECRET` | Webhook signature verification |
| `CLIENT_URL` | Frontend origin |
| `PORT` | Backend port |

The names above are examples; use the actual names defined in your backend configuration.

### Frontend

Configure the API base URL using the variable name expected by your Vite application.

**Security reminders:**

- Never commit `.env` files.
- Never expose Stripe secret keys, JWT secrets, or database credentials.
- Only public configuration belongs in frontend environment variables.
- Use `.env.example` files without real secret values.

---

## 💳 Stripe Payment Testing

KicksHub integrates Stripe Checkout for payment processing.

For local development, start your Stripe CLI listener with:

```bash
stripe listen --events checkout.session.completed,checkout.session.expired --forward-to localhost:5000/api/stripe/webhook
```

Use the webhook signing secret printed by Stripe CLI in your local environment configuration.

Test the complete checkout flow, including:

1. Creating a checkout session.
2. Completing a test payment.
3. Verifying payment with Stripe.
4. Updating the order status.
5. Removing purchased items from the cart.
6. Displaying the order confirmation page.

Do not use production credentials for local testing.

---

## 📖 API Endpoints

The backend exposes REST API routes for application operations. The exact paths should be confirmed from the current route files.

Typical endpoint categories include:

| Category | Purpose |
|---|---|
| Authentication | Registration and login |
| Products | Browse and retrieve sneakers |
| Cart | Add, update, and remove cart items |
| Wishlist | Manage favorite products |
| Orders | Retrieve and manage orders |
| Payments | Create checkout sessions and verify payments |
| Stripe Webhook | Process Stripe checkout events |

### Payment Verification

```http
POST /api/payments/verify-session
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN
```

Example request:

```json
{
  "sessionId": "cs_test_your_checkout_session_id"
}
```

This endpoint verifies the checkout session against Stripe and the authenticated user's order.

> Confirm the exact route registration and response schema in the backend before relying on these examples in production.

---

## 📸 Screenshots

Screenshots of the actual KicksHub interface can be added here.

<!-- Add screenshots to an assets/ directory and uncomment this section. -->

<!--
<p align="center">
  <img src="assets/homepage.png" alt="KicksHub homepage" width="900">
</p>
-->

### Planned Showcase

- Sneaker storefront
- Product details and size selection
- Shopping cart and wishlist
- Checkout experience
- Order confirmation page
- Responsive mobile layout

---

## 📂 Project Structure

```text
KicksHub/
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── ...
│   ├── package.json
│   └── .env.example
│
├── Backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── ...
│   ├── prisma/
│   │   └── schema.prisma
│   ├── package.json
│   └── .env.example
│
├── .gitignore
├── CONTRIBUTING.md
├── LICENSE
└── README.md
```

The tree illustrates the intended organization. Adjust it to match the actual directories in the repository.

---

## 🤝 Contributing

Contributions and suggestions are welcome!

1. Fork the repository.
2. Create a feature branch:

   ```bash
   git checkout -b feature/your-feature
   ```

3. Make your changes and test them.
4. Commit with a descriptive message:

   ```bash
   git commit -m "feat: add your feature"
   ```

5. Push your branch and open a Pull Request.

See [CONTRIBUTING.md](CONTRIBUTING.md) for additional guidelines if available.

---

## 📝 License

KicksHub is distributed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 🗺️ Roadmap

- [x] Establish the React and TypeScript frontend.
- [x] Build the Express backend.
- [x] Integrate PostgreSQL and Prisma.
- [x] Implement cart and wishlist functionality.
- [x] Integrate Stripe Checkout.
- [ ] Complete end-to-end payment verification.
- [ ] Verify reliable cart cleanup after successful payment.
- [ ] Add actual application screenshots.
- [ ] Improve automated testing.
- [ ] Prepare for production deployment.

---

## 🐛 Bug Reports & Feature Requests

Found an issue or have an idea?

Open an issue on the project's GitHub repository and include:

- A clear description.
- Steps to reproduce.
- Expected and actual behavior.
- Relevant screenshots or error messages.

---

## 📚 Resources

- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vite.dev/guide/)
- [Express Documentation](https://expressjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Stripe Documentation](https://docs.stripe.com/)

---

<p align="center">
  <strong>KICKSHUB®</strong><br>
  <em>Find your pair. Define your style. Move different.</em>
</p>
