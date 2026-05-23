# MERN Multi-Vendor E-Commerce

This workspace contains a full-stack multi-vendor e-commerce application built with the MERN stack.

## Structure

- `backend/` - Express.js API server with MongoDB, JWT auth, Cloudinary uploads, vendor/admin controls
- `frontend/` - React + Vite frontend with Tailwind CSS and protected routes

## Setup

### Backend
1. Open a terminal in `backend/`
2. Copy `.env.example` to `.env`
3. Fill in your MongoDB Atlas URI, JWT secret, Cloudinary keys, Stripe secret, and optional mail settings
4. Run `npm install`
5. Start the backend with `npm run dev`

### Frontend
1. Open a terminal in `frontend/`
2. Run `npm install`
3. Start the frontend with `npm run dev`
4. Visit the app in your browser at `http://localhost:5173`

## Notes
- The frontend uses `VITE_API_URL` if provided, otherwise defaults to `http://localhost:5000/api`
- Vendor users must register using the `Vendor` role and wait for admin approval
- Products can be created by approved vendors
- Admin functionality is available under `/admin/dashboard`

