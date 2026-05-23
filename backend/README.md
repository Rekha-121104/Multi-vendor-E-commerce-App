# Backend

## Setup

1. Copy `.env.example` to `.env`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm run dev
   ```

## API Endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products` (vendor/admin)
- `PUT /api/products/:id` (vendor/admin)
- `DELETE /api/products/:id` (vendor/admin)
- `POST /api/orders` (authenticated)
- `GET /api/orders/my-orders`
- `GET /api/vendors/dashboard` (vendor)
- `GET /api/admin/dashboard` (admin)
- `POST /api/upload` (vendor/admin)

## Deploying on Render

1. Create a new Web Service on Render.
2. Connect your backend repo or point to this workspace.
3. Use `npm install` and `npm run start` as the start command, or `npm run dev` if you want nodemon in a development environment.
4. Add all required environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
   - `STRIPE_SECRET_KEY`
   - `CLIENT_URL` (front-end URL)
   - optional `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS`, `EMAIL_FROM`
5. After deploy, use the Render backend URL in frontend `VITE_API_URL`.
