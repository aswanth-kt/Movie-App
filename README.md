# 🎬 Movie App – Full Stack MERN Application

A full-stack **Movie Management Application** built with **React (Vite)** on the frontend and **Node.js + Express** on the backend.  
The app supports **Admin and User roles**, allowing admins to manage movies and users to browse, search, and sort movies.

---

## 🚀 Live Application

- **Demo Link:**  
  👉 [Movie-App](https://movie-app-box.vercel.app)

> ⚠️ **Note:** Backend may take a few seconds to wake up on first request (free tier behavior).

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router DOM
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (MongoDB Atlas)
- JWT Authentication
- Mongoose

### Deployment
- Frontend: **Vercel**
- Backend: **Render**
- Database: **MongoDB Atlas**

---

## ✨ Features

### 👤 User
- View movies
- Search movies by title & description
- Sort movies by:
  - Rating
  - Release Date
  - Title
- Responsive UI

### 🛠️ Admin
- Secure login
- Dashboard with total movie count
- Add movies manually or via TMDB endpoint
- Edit movie details
- Delete movies
- Role-based route protection

---

## 📁 Project Structure

```
Movie-App/
│
├── frontend/                 # React frontend (Vite)
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/                  # Node + Express backend
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   └── index.js
│
└── README.md
```

---

## ⚙️ Local Setup Instructions

### 1️⃣ Clone the repository

```bash
https://github.com/aswanth-kt/Movie-App.git
cd Movie-App
```

### 2️⃣ Frontend Setup (React)

```bash
cd frontend
npm install
npm run dev
```

**Frontend runs on:**
```
http://localhost:5173
```

**Frontend Environment Variables** (`frontend/.env`)

```env
VITE_API_URL=http://localhost:5000
```

### 3️⃣ Backend Setup (Node + Express)

```bash
cd backend
npm install
npm run dev
```

**Backend runs on:**
```
http://localhost:5000
```

**Backend Environment Variables** (`backend/.env`)

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
```

---

## 🔐 Authentication & Authorization

- JWT-based authentication
- Role-based access control
- Protected admin routes
- Token sent via Authorization header

```http
Authorization: Bearer <token>
```

---

## 📡 API Documentation

### 🔑 Auth Routes

#### Login
```http
POST /user/login
```

**Body:**
```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

---

### 🎬 Movie Routes

#### Get all movies (with search & sort)
```http
GET /user//movies/filter?search=batman&sort=rating&page=currentPage
```

**Query Params:**
- `search` → title or description
- `sort` → `rating` | `date` | `title`
- `page` → `currentPage`

#### Get single movie
```http
GET /user/movies/:id
```

#### Add movie (Admin only)
```http
POST /admin/movies
```

**Body:**
```json
{
  "tmdb_id": "34550",
  "title": "Fight Club",
  "description": "An insomniac office worker...",
  "rating": 8.8,
  "releaseDate": "1999-10-15",
  "imageUrl": "/pHpq9yNUIo6aDoCXEBzjSolywgz.jpg"
}
```

#### Update movie (Admin only)
```http
PUT /admin/movies/:id
```

**Body:** Same as add movie

#### Delete movie (Admin only)
```http
DELETE /admin/movies/:id
```

#### Fetch movies from TMDB and store in mongoDB (Admin only)
```http
POST /admin/fetchMovies
```

**Body:**
```json
{
  "endpoint": "/movie/now_playing"
}
```

---

## 👨‍💻 Author

**Your Name**  
GitHub: [Aswanth KT](https://github.com/your-username)

---

## ⭐ Show your support

Give a ⭐️ if you like this project!
