# Kickshub

Kickshub is a full-stack e-commerce demo built with a TypeScript/Vite React frontend and an Express + Prisma TypeScript backend.

![CI](https://github.com/OMKAR4587/kickshub/actions/workflows/ci.yml/badge.svg) ![License](https://img.shields.io/badge/license-MIT-green.svg)

## Overview

Kickshub showcases a modern storefront experience with:
- product listing and filtering
- cart and wishlist flows
- checkout and payment integration
- authentication
- PostgreSQL-backed data via Prisma

## Tech stack

- Frontend: React, Vite, TypeScript, Tailwind
- Backend: Express, TypeScript, Prisma, PostgreSQL
- Payment: Stripe
- Auth: JWT + bcrypt

## Repository structure

- `Frontend/` — React application
- `Backend/` — Express API and Prisma schema
- `.github/` — CI and GitHub automation

## Prerequisites

- Node.js 18+
- npm
- PostgreSQL (for backend data layer)

## Getting started

### Frontend

```bash
cd Frontend
npm install
npm run dev
