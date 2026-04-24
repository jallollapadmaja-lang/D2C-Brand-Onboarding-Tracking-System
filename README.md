# D2C Brand Onboarding & Tracking System

## 📌 Overview
This project is a backend system to manage D2C brand applications.  
It allows teams to:
- Add new brands
- Track their status
- Add notes
- View dashboard summary

## 🚀 Tech Stack
- Node.js
- Express.js
- MySQL

## 📁 Project Structure
Project_Brand_System/
- │
- ├── app.js
- ├── db.js
- ├── package.json
- │
- ├── routes/
- │   └── brandRoutes.js
- │
- ├── controllers/
- │   └── brandController.js
- │
- ├── models/
- │   └── brandModel.js

## 🔗 API Endpoints

### 1. Create Brand
POST /api/brands

### 2. Get All Brands
GET /api/brands

### 3. Get Single Brand
GET /api/brands/:id

### 4. Update Status
PATCH /api/brands/:id/status

### 5. Add Notes
POST /api/brands/:id/notes

### 6. Dashboard Summary
GET /api/brands/summary

## ⚙️ Setup Instructions

```
1. Clone repository:

git clone <your-repo-link>
cd Project_Brand_System

2. Install dependencies:

npm install

3. Setup MySQL database:
- Create database: brand_system
- Create tables: brands, notes

4. Run server:

node app.js
```
## 📊 Features
- Status flow validation
- Notes system
- Filter brands
- Dashboard summary


