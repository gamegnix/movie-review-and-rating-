# Deployment Guide

This guide will help you deploy your Movie Review application to Vercel (frontend) and Railway/Render (backend).

## Frontend Deployment (Vercel)

### Step 1: Install Vercel CLI (Optional)
```bash
npm install -g vercel
```

### Step 2: Deploy via Vercel Website (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "Add New Project"
3. Import your GitHub repository: `gamegnix/movie-review-and-rating-`
4. Configure the project:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. Add Environment Variable:
   - **Name**: `VITE_API_URL`
   - **Value**: Your backend URL (e.g., `https://your-backend.railway.app`)

6. Click "Deploy"

### Step 3: Update API Service

After deploying, update `frontend/src/services/api.js` to use the environment variable (already done).

## Backend Deployment (Railway or Render)

### Option 1: Railway (Recommended)

1. Go to [railway.app](https://railway.app) and sign up
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: (leave empty, Railway auto-detects)
   - **Start Command**: `npm run dev` or `node src/index.js`

5. Add Environment Variables:
   - `JWT_SECRET` - Generate a random string
   - `MONGODB_URI` - Your MongoDB connection string (use MongoDB Atlas for cloud DB)
   - `PORT` - Railway will set this automatically
   - `NODE_ENV` - `production`
   - `FRONTEND_URL` - Your Vercel frontend URL

6. Deploy!

### Option 2: Render

1. Go to [render.com](https://render.com) and sign up
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `movie-review-backend`
   - **Root Directory**: `backend`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node src/index.js`

5. Add Environment Variables (same as Railway)
6. Deploy!

## MongoDB Setup (MongoDB Atlas - Free)

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free account
3. Create a new cluster (free tier)
4. Create a database user
5. Get connection string
6. Update your backend environment variable `MONGODB_URI`

## After Deployment

1. **Update Frontend Environment Variable**:
   - Go to Vercel dashboard
   - Your project → Settings → Environment Variables
   - Update `VITE_API_URL` with your backend URL

2. **Test the Application**:
   - Visit your Vercel frontend URL
   - Try registering a new user
   - Test login and other features

## Quick Links

- **Vercel**: https://vercel.com
- **Railway**: https://railway.app
- **Render**: https://render.com
- **MongoDB Atlas**: https://www.mongodb.com/cloud/atlas

## Troubleshooting

### Frontend can't connect to backend
- Check `VITE_API_URL` environment variable in Vercel
- Make sure backend CORS allows your frontend URL
- Check backend logs for errors

### Backend deployment fails
- Check environment variables are set correctly
- Make sure MongoDB connection string is correct
- Check build logs for errors

### CORS errors
- Update `FRONTEND_URL` in backend environment variables
- Make sure it matches your Vercel deployment URL

