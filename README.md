# 🔧 Node.js Functional API Boilerplate

This repository demonstrates **real-world functional implementations** using **Node.js**, **Express**, and MongoDB. It includes **email functionality**, **file/image uploads**, **JWT authentication**, and follows a clean, modular structure for scalability.

---

## 🚀 Key Features

### 🔐 Authentication
- **JWT-based login and registration**
- Middleware for **protected routes**
- Token expiry, refresh, and storage logic

### 📤 Image & File Upload
- Uploads via **Multer**
- Storage via **Cloudinary**
- Supports **multiple file types** (images, PDFs, videos)
- Auto-delete on update (optional)

### 📧 Email Functionality
- Send emails using **NodeMailer**
- Configurable **SMTP (e.g. Gmail, Outlook)**
- Templates supported for welcome, reset-password, contact, etc.

### 🧱 Tech Stack

| Tech         | Role                         |
|--------------|------------------------------|
| Node.js      | Runtime                      |
| Express.js   | Web framework (REST APIs)    |
| MongoDB      | NoSQL database               |
| Mongoose     | MongoDB ORM                  |
| JWT          | Authentication Token         |
| Multer       | File upload middleware       |
| Cloudinary   | File storage (Cloud)         |
| NodeMailer   | Email service integration    |
| dotenv       | Env variable management      |

---

## 🗂️ Folder Structure

functional-api/
├── config/
│ ├── db.js
│ └── cloudinary.js
├── controllers/
│ ├── authController.js
│ ├── fileController.js
│ └── emailController.js
├── middleware/
│ ├── authMiddleware.js
│ └── uploadMiddleware.js
├── models/
│ ├── User.js
│ └── Upload.js
├── routes/
│ ├── authRoutes.js
│ ├── fileRoutes.js
│ └── emailRoutes.js
├── utils/
│ ├── sendEmail.js
├── .env
├── server.js
└── README.md



## ⚙️ Setup Instructions

### 1. Clone the Repo


git clone https://github.com/UmairDevloper/node-functional-api.git
cd node-functional-api
2. Install Dependencies

npm install
3. Create .env File

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
📬 API Endpoints Overview
🔐 Auth
Method	Endpoint	Description
POST	/api/auth/register	Register user
POST	/api/auth/login	Login user & get token
GET	/api/auth/me	Protected route

📤 File Upload
Method	Endpoint	Description
POST	/api/files/upload	Upload single/multiple files
GET	/api/files	Get all uploaded files

📧 Emails
Method	Endpoint	Description
POST	/api/email/send	Send an email message

🧪 Example Use Cases
✔️ Register and authenticate a user using JWT

✔️ Allow authenticated users to upload files/images

✔️ Admin or user can send structured emails (e.g., contact form, reset password)

🔐 JWT Flow
Token issued at login

Sent as Authorization: Bearer <token> in headers

Token verified on protected endpoints via middleware

🖼️ Uploads with Cloudinary
Files are received using Multer

Uploaded to Cloudinary via API

URLs are saved in MongoDB for reference

Optional deletion and update routes supported

📬 Sending Emails with NodeMailer
Uses SMTP config from .env

Send structured messages with:

Subject

HTML body or plain text

Easily reusable sendEmail() utility

🧱 Future Ideas
Add rate-limiting to auth & email endpoints

Integrate email verification & password reset

Add file validation & size limits

Add frontend UI for form & upload testing

🙌 Credits
Developed with ❤️ by Muhammad Umair Ullah
Feel free to fork, star ⭐ and contribute!

