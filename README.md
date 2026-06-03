# Job Portal Backend

A backend scaffold for a job portal application built with Node.js, Express, and MongoDB.

## Setup

1. Install dependencies
   ```bash
   npm install
   ```

2. Create a `.env` file in the project root and update the environment variables.

3. Start the development server
   ```bash
   npm run dev
   ```

## Project Structure

- `src/app.js` - Express application setup
- `src/server.js` - Server entry point
- `src/config/db.js` - MongoDB connection
- `src/config/cloudinary.js` - Cloudinary configuration
- `src/controllers/` - Request controllers
- `src/routes/` - Express routes
- `src/models/` - Mongoose models
- `src/middleware/` - Authentication and error handling middleware
- `src/services/` - Business logic services
- `src/utils/` - Helper utilities

## Environment Variables

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/job_portal
JWT_SECRET=your_jwt_secret_here
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

## Notes

- Ensure MongoDB is running locally or provide a hosted MongoDB URI.
- Replace `.env` placeholder values before starting the app.
- Use `npm run dev` for hot reload with `nodemon`.
