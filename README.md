# 🎓 Campus Marketplace

Campus Marketplace is a student-to-student buying and selling platform designed specifically for college campuses. The platform enables students to securely buy, sell, and manage listings within their own college community.

Unlike public marketplaces, Campus Marketplace is intended exclusively for verified students, ensuring a safer and more trusted environment for campus transactions.

---

## 🚀 Features

### 🔐 Authentication

* User Registration
* User Login
* JWT Authentication
* Secure HTTP-only Cookies
* Protected Routes
* Logout Functionality

### 📦 Listings Management

* Create Listings
* View Listings
* Update Listings
* Delete Listings
* Upload Multiple Images
* Cloudinary Image Storage
* Category-Based Listings

### ❤️ Wishlist

* Add Items to Wishlist
* Remove Items from Wishlist
* View Saved Items

### 👤 User Profile

* Profile Dashboard
* Total Listings Count
* Wishlist Count
* Total Listing Views
* User Information Display

### 👀 Listing Analytics

* Track Listing Views
* View Statistics on Profile Page

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router DOM
* CSS3
* Vite

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Authentication

* JWT (JSON Web Tokens)
* HTTP-only Cookies
* bcrypt

### File Storage

* Cloudinary
* Multer

---

## 📂 Project Structure

```bash
Campus-Marketplace
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── backend
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── config
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/your-username/Campus-Marketplace.git
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file inside the backend folder:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

SECRET_KEY=your_jwt_secret

CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

---

## 🎯 Upcoming Features

* Real-Time Chat System
* Admin Dashboard
* User Verification
* Listing Reports & Moderation
* Notification System
* Advanced Search & Filters

---

## 📜 License

This project is developed for learning and educational purposes.

```
```
