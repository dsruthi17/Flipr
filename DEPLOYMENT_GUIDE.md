# 🚀 Final Deployment Guide

To make your app work on **any device** via deployed links, follow these exact steps.

## 1. Database (PostgreSQL)
*Required for data to be saved.*

1.  Create a free database on **[Neon.tech](https://neon.tech)**.
2.  Copy the **Connection String** (e.g., `postgres://user:pass@ep-xyz.neon.tech/neondb...`).
3.  Go to your Backend Hosting (e.g., Render/Railway):
    - Add Environment Variable: `DATABASE_URL`
    - Value: (Paste your connection string)

## 2. Backend (Render/Railway)
*The server that handles data.*

1.  Deploy your `server` folder.
2.  **Copy the URL** of your deployed backend (e.g., `https://my-api.onrender.com`).

## 3. Frontend (Vercel)
*The website everyone sees.*

1.  Deploy your `client` folder.
2.  Go to **Settings > Environment Variables**.
3.  Add this variable:
    - Key: `VITE_API_URL`
    - Value: `https://my-api.onrender.com` (The URL from Step 2)
    - **IMPORTANT:** Do NOT add a trailing slash `/` at the end.
4.  **Redeploy** the frontend.

## ✅ Result
- **Any Device:** Open your Vercel link on any phone or laptop.
- **Data:** Projects/Clients you add will be saved forever in Neon.
- **Images:** Will work, but may be deleted if the server restarts (limit of free hosting).
