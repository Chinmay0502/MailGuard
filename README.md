# 🛡️ MailGuard — AI-Powered Spam Email Detection

**MailGuard** is a machine learning-powered email spam detection system designed to identify whether an email is **Spam** or **Ham (Legitimate)**.

The project combines a **GRU-based deep learning model**, a modern **React + Tailwind CSS frontend**, a **Node.js + Express.js backend**, and **MongoDB** to provide an end-to-end email classification platform.

The trained GRU model analyzes email text and predicts the classification along with a confidence score. The application also maintains prediction history and provides analytics to help users understand spam detection activity.

---

## 🌟 Overview

Spam emails are a major problem in modern digital communication. Malicious or unwanted messages can contain phishing attempts, fraudulent offers, advertisements, or other potentially harmful content.

**MailGuard** addresses this problem by using deep learning to analyze email content and determine whether a message is legitimate or spam.

The application follows a full-stack architecture:

* 🎨 **Frontend:** React.js + Tailwind CSS
* ⚙️ **Backend:** Node.js + Express.js
* 🗄️ **Database:** MongoDB
* 🤖 **Machine Learning:** Python + TensorFlow/Keras
* 🧠 **ML Algorithm:** GRU (Gated Recurrent Unit)
* 📊 **Model:** Trained GRU text classification model
* 🔗 **API Communication:** REST APIs
* 📈 **Analytics:** Prediction history and classification statistics

---

# ✨ Key Features

* 📧 Detect whether an email is Spam or Ham
* 🤖 GRU-based deep learning classification
* 🧠 Natural language processing for email text
* 🎯 Confidence/probability score for predictions
* ⚡ Fast email classification
* 🌐 Modern responsive React interface
* 🎨 Tailwind CSS-based UI
* 🔗 REST API integration
* 🟢 Node.js + Express.js backend
* 🗄️ MongoDB prediction storage
* 📜 Email classification history
* 📊 Real-time history and analytics
* 📈 Spam vs Ham distribution
* 🛡️ AI-powered email security interface
* 🔄 Frontend → Backend → ML service communication
* 🔐 Environment variable support
* 🚀 Deployment-ready architecture

---

# 🏗️ System Architecture

MailGuard follows a multi-layer architecture where the frontend, backend, database, and machine learning service work together.

```text
                         ┌──────────────────────┐
                         │        User          │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   React Frontend     │
                         │   Tailwind CSS       │
                         └──────────┬───────────┘
                                    │
                                    │ HTTP Request
                                    ▼
                         ┌──────────────────────┐
                         │   Node.js Backend    │
                         │   Express.js API     │
                         └───────┬───────┬──────┘
                                 │       │
                    Store Result │       │ Prediction Request
                                 │       │
                                 ▼       ▼
                        ┌────────────┐  ┌──────────────────┐
                        │  MongoDB   │  │  Python ML API   │
                        │  Database  │  │  GRU Model       │
                        └────────────┘  └────────┬─────────┘
                                                  │
                                                  ▼
                                      ┌─────────────────────┐
                                      │ Spam / Ham +        │
                                      │ Confidence Score    │
                                      └──────────┬──────────┘
                                                 │
                                                 ▼
                                      ┌─────────────────────┐
                                      │   Node.js Backend   │
                                      └──────────┬──────────┘
                                                 │
                                                 ▼
                                      ┌─────────────────────┐
                                      │   React Frontend    │
                                      └─────────────────────┘
```

---

# 🔄 How It Works

The MailGuard classification workflow can be summarized as follows:

### Step 1 — User Input

The user enters or pastes an email message into the MailGuard email checker.

### Step 2 — Frontend Request

The React frontend sends the email content to the Node.js/Express.js backend through a REST API.

Example endpoint:

```text
POST /api/emails/check
```

### Step 3 — Backend Processing

The Express.js backend receives and validates the email content.

The backend then communicates with the machine learning service.

### Step 4 — ML Prediction

The Python machine learning service loads the trained GRU model and tokenizer.

The email text is processed and passed to the model.

The model generates a prediction indicating whether the email is:

```text
Spam
```

or

```text
Ham
```

### Step 5 — Confidence Calculation

The machine learning service returns the predicted class along with its confidence/probability score.

For example:

```text
Prediction: Spam
Confidence: 98.7%
```

### Step 6 — Database Storage

The backend stores the classification result in MongoDB.

A prediction record contains information such as:

```text
Email
Prediction
Probability
Created At
Updated At
```

### Step 7 — Result Display

The backend sends the prediction back to the React frontend.

The frontend displays the result to the user.

### Step 8 — History & Analytics

Stored predictions can be retrieved through the history API and displayed on the analytics page.

The dashboard can show:

* Total scans
* Spam detected
* Ham detected
* Average confidence
* Spam percentage
* Ham percentage
* Recent scans

---

# 🤖 Machine Learning Model

The core of MailGuard is a **GRU (Gated Recurrent Unit)** based deep learning model.

GRU is a type of recurrent neural network architecture designed to process sequential data.

Since email messages are sequences of words and tokens, recurrent neural networks are suitable for learning patterns in text.

The model learns relationships between words and textual patterns that can help distinguish spam emails from legitimate messages.

---

# 🧠 GRU Architecture

A simplified representation of the MailGuard text classification pipeline is:

```text
Email Text
    │
    ▼
Text Preprocessing
    │
    ▼
Tokenizer
    │
    ▼
Sequence Conversion
    │
    ▼
Padding
    │
    ▼
Embedding Layer
    │
    ▼
GRU Layer
    │
    ▼
Dense / Output Layer
    │
    ▼
Prediction Probability
    │
    ▼
Spam / Ham
```

The trained model is loaded by the Python machine learning service during application startup.

---

# 🎯 Classification Output

MailGuard produces two primary classifications:

### 🟢 Ham

A legitimate email that is not classified as spam.

### 🔴 Spam

An unwanted or suspicious email that matches patterns learned by the machine learning model.

The system also provides a probability/confidence value associated with the prediction.

Example:

```text
Email:
Congratulations! You have won $1,000,000...

Prediction:
Spam

Confidence:
99.8%
```

---

# 📊 Prediction History

MailGuard stores classification results in MongoDB.

Each stored prediction can contain:

```json
{
  "email": "Congratulations! You have won a prize!",
  "prediction": "Spam",
  "probability": 0.998,
  "createdAt": "2026-08-08T00:00:00.000Z"
}
```

The history API provides previously analyzed emails to the frontend.

Example endpoint:

```text
GET /api/history
```

The history page can use this information to generate analytics.

---

# 📈 Analytics Dashboard

The MailGuard history page provides an overview of email classification activity.

The dashboard can display:

### Total Scans

Total number of emails analyzed.

### Spam Detected

Number of emails classified as Spam.

### Ham Detected

Number of legitimate emails detected.

### Average Confidence

Average model confidence across stored predictions.

### Classification Distribution

A visual representation of the Spam vs Ham ratio.

### Recent Scans

A chronological list of recently analyzed emails.

---

# 🛠️ Technology Stack

## Frontend

### React.js

React is used to build the interactive MailGuard user interface.

Responsibilities include:

* Email input
* Prediction form
* API communication
* Prediction result display
* History page
* Analytics dashboard
* Client-side navigation
* Responsive UI

### Tailwind CSS

Tailwind CSS is used to create the application's modern interface.

The frontend uses responsive layouts, cards, badges, animations, and dark-themed security-focused UI components.

### Framer Motion

Framer Motion is used for interface animations and transitions.

Examples include:

* Page animations
* Card hover effects
* Prediction result animations
* Analytics transitions
* Loading states

### Lucide React

Lucide icons are used throughout the interface for visual indicators and actions.

---

# ⚙️ Backend

### Node.js

Node.js provides the runtime environment for the backend.

### Express.js

Express.js is used to create REST APIs and connect the frontend, database, and machine learning service.

The backend is responsible for:

* API endpoints
* Request validation
* Email prediction requests
* ML service communication
* MongoDB operations
* History retrieval
* Error handling
* CORS configuration

---

# 🗄️ Database

### MongoDB

MongoDB is used to store email classification history.

The application uses a model similar to:

```javascript
const emailSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
    },

    prediction: {
      type: String,
      enum: ["Spam", "Ham"],
      required: true,
    },

    probability: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
```

The database therefore maintains:

* Email content
* Prediction
* Probability
* Created timestamp
* Updated timestamp

---

# 🤖 Machine Learning Service

### Python

Python is used for training and serving the GRU model.

### TensorFlow / Keras

TensorFlow/Keras is used to load and run the trained GRU neural network.

The ML service is responsible for:

1. Loading the trained GRU model.
2. Loading the tokenizer.
3. Loading label mappings/configuration.
4. Processing incoming email text.
5. Converting text into model-compatible sequences.
6. Running model inference.
7. Returning the prediction.
8. Returning the confidence/probability.

---

# 📁 Project Structure

A possible MailGuard project structure is:

```text
MailGuard/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── emailController.js
│   │   └── historyController.js
│   ├── models/
│   │   └── Email.js
│   ├── routes/
│   │   ├── emailRoutes.js
│   │   └── historyRoutes.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── ml_service/
│   ├── model/
│   │   └── gru_model.keras
│   ├── tokenizer/
│   ├── config/
│   ├── app.py
│   ├── requirements.txt
│   └── ...
│
├── README.md
└── .gitignore
```

> The exact structure may vary depending on the implementation.

---

# 🚀 Getting Started

Follow the instructions below to run MailGuard locally.

## Prerequisites

Make sure the following are installed:

* Node.js
* npm
* Python 3.x
* pip
* MongoDB / MongoDB Atlas
* Git

---

# 📥 Clone the Repository

```bash
git clone https://github.com/your-username/MailGuard.git
```

Navigate to the project:

```bash
cd MailGuard
```

---

# 🎨 Frontend Setup

Navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The React application will be available at the local development URL provided by Vite.

For example:

```text
http://localhost:5173
```

---

# ⚙️ Backend Setup

Navigate to the backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000

MONGO_URL=your_mongodb_connection_string

ML_SERVICE_URL=http://127.0.0.1:8001
```

Start the backend:

```bash
npm run dev
```

Or:

```bash
npm start
```

The backend will run on:

```text
http://localhost:5000
```

---

# 🤖 ML Service Setup

Navigate to the machine learning service:

```bash
cd ml_service
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate the environment.

### Windows

```bash
venv\Scripts\activate
```

### Linux / macOS

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the ML service:

```bash
python app.py
```

The ML service can be configured to run on:

```text
http://127.0.0.1:8001
```

---

# 🔗 Application Communication

The complete application follows this flow:

```text
                    User
                     │
                     ▼
             React Frontend
             localhost:5173
                     │
                     │ POST /api/emails/check
                     ▼
             Node.js Backend
             localhost:5000
                     │
                     │ Prediction Request
                     ▼
              ML Service
             localhost:8001
                     │
                     ▼
                GRU Model
                     │
                     ▼
             Spam / Ham Result
                     │
                     ▼
              Node.js Backend
                 │       │
                 │       └──────────► MongoDB
                 │
                 ▼
             React Frontend
                 │
                 ▼
          Prediction Result
```

---

# 📡 API Endpoints

## Email Prediction

```http
POST /api/emails/check
```

Example request:

```json
{
  "email": "Congratulations! You have won a free prize!"
}
```

Example response:

```json
{
  "success": true,
  "data": {
    "id": "64xxxxxxxx",
    "email": "Congratulations! You have won a free prize!",
    "prediction": "Spam",
    "probability": 0.98,
    "createdAt": "2026-08-08T00:00:00.000Z"
  }
}
```

---

## History

```http
GET /api/history
```

Example response:

```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "64xxxxxxxx",
      "email": "Congratulations! You won a prize!",
      "prediction": "Spam",
      "probability": 0.98,
      "createdAt": "2026-08-08T00:00:00.000Z"
    },
    {
      "_id": "64xxxxxxxx",
      "email": "Hi, I hope you are doing well.",
      "prediction": "Ham",
      "probability": 0.91,
      "createdAt": "2026-08-08T00:00:00.000Z"
    }
  ]
}
```

---

## Health Check

```http
GET /health
```

Example response:

```json
{
  "success": true,
  "status": "healthy"
}
```

---

# 📊 Example Classification

### Spam Email

```text
Congratulations!

You have been selected as the lucky winner of
$1,000,000.

Click the link below immediately to claim your prize.
```

Possible result:

```text
Prediction: Spam
Confidence: 99.8%
```

### Legitimate Email

```text
Hi John,

I hope you're doing well.

I wanted to follow up regarding our meeting tomorrow.
Please let me know if the scheduled time still works for you.

Best regards,
David
```

Possible result:

```text
Prediction: Ham
Confidence: 95.4%
```

> Actual predictions depend on the trained model and input preprocessing.

---

# 📈 Analytics Workflow

The analytics page uses prediction records stored in MongoDB.

```text
Email Prediction
       │
       ▼
Prediction Result
       │
       ▼
MongoDB
       │
       ▼
GET /api/history
       │
       ▼
React History Page
       │
       ├── Total Scans
       ├── Spam Count
       ├── Ham Count
       ├── Average Confidence
       ├── Spam Percentage
       ├── Ham Percentage
       └── Recent Scans
```

This allows the frontend to display information based on actual prediction history instead of static demo data.

---

# 🔐 Environment Variables

Environment variables should be used for sensitive configuration.

Example backend configuration:

```env
PORT=5000
MONGO_URL=your_mongodb_connection_string
ML_SERVICE_URL=http://127.0.0.1:8001
```

Frontend API configuration can use the deployed backend URL.

Example:

```javascript
const API = axios.create({
  baseURL: "https://your-backend-url.onrender.com",
});
```

Never commit database credentials or private configuration files to GitHub.

Add them to `.gitignore`:

```gitignore
.env
node_modules/
venv/
__pycache__/
*.pyc
```

---

# ☁️ Deployment

MailGuard can be deployed using separate services for each application layer.

A typical deployment architecture is:

```text
React Frontend
      │
      ▼
Vercel
      │
      │ HTTPS API Requests
      ▼
Node.js Backend
      │
      ▼
Render
      │
      ├──────────────► MongoDB Atlas
      │
      ▼
Python ML Service
      │
      ▼
GRU Model
```

Possible deployment services include:

### Frontend

```text
Vercel
```

### Backend

```text
Render
```

### Database

```text
MongoDB Atlas
```

### Machine Learning Service

```text
Render / another Python-compatible hosting platform
```

Production environment variables should be configured separately on each hosting platform.

---

# 🌐 Production API Flow

After deployment, the architecture becomes:

```text
User
 │
 ▼
Vercel
React Application
 │
 │ HTTPS
 ▼
Render
Node.js + Express
 │
 │ HTTPS
 ▼
ML Service
 │
 ▼
GRU Model
 │
 ▼
Prediction
 │
 ▼
Node.js Backend
 │
 ├──────► MongoDB Atlas
 │
 ▼
React Frontend
```

---

# 🧪 Testing

MailGuard can be tested at several levels.

## Frontend Testing

Test:

* Email input
* Prediction button
* API communication
* Loading states
* Error states
* Prediction result
* History page
* Analytics
* Responsive layout

## Backend Testing

Test:

* `/api/emails/check`
* `/api/history`
* `/health`
* Request validation
* MongoDB connection
* ML service communication
* Error handling

## Machine Learning Testing

Test:

* Model loading
* Tokenizer loading
* Text preprocessing
* Sequence generation
* Prediction output
* Confidence calculation
* Spam/Ham label mapping

---

# ⚠️ Current Limitations

MailGuard's prediction quality depends on the quality of the training dataset and the preprocessing pipeline used during model development.

Potential limitations include:

* Training dataset limitations
* Previously unseen spam patterns
* Obfuscated spam text
* Multilingual emails
* Very short messages
* HTML-heavy emails
* Adversarial email content
* Model confidence not always representing real-world certainty

Therefore, MailGuard should be considered an **email classification assistance system**, not a guaranteed security solution.

---

# 🔮 Future Improvements

Several improvements can be added in future versions.

## 🧠 Advanced Models

Experiment with:

* LSTM
* Bidirectional LSTM
* Bidirectional GRU
* CNN + RNN architectures
* Transformer models
* BERT-based classifiers

---

## 📧 Email Header Analysis

Future versions could analyze:

* Sender information
* Reply-To address
* Email headers
* Domain reputation
* Authentication information
* SPF/DKIM/DMARC signals

This could improve classification beyond email text alone.

---

## 🔗 URL Detection

The system could detect suspicious links inside emails.

Potential features include:

* URL extraction
* Domain analysis
* Suspicious URL patterns
* Shortened URLs
* Phishing indicators

---

## 📊 Advanced Analytics

The dashboard could include:

* Daily spam trends
* Weekly classification trends
* Monthly statistics
* Confidence distribution
* Spam detection rate
* Prediction volume
* Classification charts

---

## 🔄 Real-Time Analytics

The history dashboard can be enhanced with real-time updates so newly classified emails automatically appear without manually refreshing the page.

Possible technologies include:

* Polling
* Server-Sent Events
* WebSockets
* Socket.IO

---

## 🔐 User Authentication

Future versions could introduce:

* User registration
* Login
* Personal prediction history
* User-specific analytics
* Authentication-protected APIs

---

## ☁️ Cloud Deployment

The complete application can be deployed as independent services:

```text
                    ┌──────────────┐
                    │    Vercel    │
                    │ React Client │
                    └───────┬──────┘
                            │
                            ▼
                    ┌──────────────┐
                    │    Render    │
                    │ Node Backend │
                    └──────┬───────┘
                           │
                 ┌─────────┴─────────┐
                 ▼                   ▼
        ┌────────────────┐   ┌────────────────┐
        │ MongoDB Atlas  │   │ Python ML API  │
        │   Database     │   │   GRU Model    │
        └────────────────┘   └────────────────┘
```

---

# 🛡️ Security Considerations

MailGuard should follow standard application security practices.

Important considerations include:

* Store secrets in environment variables.
* Never expose MongoDB credentials.
* Validate email input.
* Configure CORS correctly.
* Use HTTPS in production.
* Avoid exposing internal ML service URLs unnecessarily.
* Sanitize user-provided content where appropriate.
* Add rate limiting for public APIs.
* Implement authentication for protected features.
* Keep dependencies updated.

---

# 🐛 Error Handling

MailGuard includes multiple layers where errors can occur:

```text
React
  │
  ├── Network Error
  │
  ▼
Express Backend
  │
  ├── Validation Error
  ├── MongoDB Error
  └── ML Service Error
          │
          ▼
      ML Service
          │
          ├── Model Error
          ├── Tokenizer Error
          └── Prediction Error
```

Production deployments should provide appropriate error responses without exposing sensitive internal information.

---

# 🤝 Contributing

Contributions are welcome!

To contribute:

### 1. Fork the repository

### 2. Create a feature branch

```bash
git checkout -b feature/your-feature
```

### 3. Make your changes

### 4. Commit your changes

```bash
git commit -m "Add new feature"
```

### 5. Push the branch

```bash
git push origin feature/your-feature
```

### 6. Open a Pull Request

---

# 🐛 Bug Reports

If you discover a bug, please open an issue and include:

* Description of the problem
* Steps to reproduce
* Expected behavior
* Actual behavior
* Screenshots
* Browser information
* Error logs when applicable

---

# 💬 Feedback

Feedback and suggestions are welcome.

If you have ideas for improving MailGuard, feel free to open an issue or submit a pull request.

---

# 📜 License

This project is available under the license included in this repository.

If you are using the MIT License, this section can be replaced with:

```text
MIT License
```

---

# 👨‍💻 Author

**Your Name**

* GitHub: `https://github.com/your-username`
* LinkedIn: `https://linkedin.com/in/your-profile`
* Email: `your-email@example.com`

---

# ⭐ Support

If you found MailGuard useful or interesting, consider giving the repository a ⭐ on GitHub.

Your support helps motivate further development.

---

# 📌 Summary

**MailGuard** is a full-stack AI-powered spam email detection application that combines deep learning with modern web technologies.

The project uses a **GRU-based machine learning model** for email classification, a **React + Tailwind CSS frontend**, a **Node.js + Express.js backend**, **MongoDB for prediction history**, and a **Python/TensorFlow machine learning service**.

The application demonstrates how machine learning can be integrated into a practical full-stack system to solve a real-world problem:

> **Detecting suspicious emails and protecting users from spam.**

```text
🛡️ MailGuard
│
├── 🧠 GRU Deep Learning Model
├── 📧 Spam / Ham Classification
├── 🎯 Prediction Confidence
├── ⚛️ React Frontend
├── 🎨 Tailwind CSS
├── 🟢 Node.js
├── 🚀 Express.js
├── 🍃 MongoDB
├── 🐍 Python
├── 🧠 TensorFlow / Keras
└── 📊 History & Analytics
```

**Built with ❤️ to explore the intersection of Machine Learning, Deep Learning, and Full-Stack Development.**
