# Frontend

## Setup

1. Copy `.env.example` to `.env`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Notes

- Runs on `http://localhost:5173`
- Uses the API base URL from `VITE_API_URL`
- Protected routes require login
- Vendor and admin views are available after authentication and permission checks

## Deploying on Netlify

1. Set the build command to `npm run build`.
2. Set the publish directory to `dist`.
3. Add `VITE_API_URL` in Netlify environment variables to your backend URL.
4. Use `frontend/netlify.toml` or `frontend/public/_redirects` to ensure SPA routing works.

## Cloudinary image uploads

- The frontend uploads image files to the backend at `/api/upload`.
- The backend sends images to Cloudinary and returns secure URL(s).
- Ensure `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET` are configured in your backend environment.
