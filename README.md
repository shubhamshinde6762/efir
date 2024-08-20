# EFIR: Advanced Complaint Management Solution 

**EFIR** is a pioneering complaint management platform built on the MERN stack, enhanced with cutting-edge generative AI (GenAI). This project revolutionizes the legal process by significantly reducing system lag and streamlining complaint handling with advanced technologies. Designed with security at its core, EFIR offers a dual-portal system for both regular users and super users like judiciary and police, ensuring precise tracking and efficient processing of legal complaints.

## 🌟 Key Features

1. **Dual Portal System**
   - **Regular Users**: Securely file complaints and submit evidence. Each user is assigned a unique identification number for accurate tracking.
   - **Super Users (Judiciary and Police)**: Access and manage complaints with automated notifications, classified dynamically from the optimized database.

2. **Enhanced Security**
   - **Token-Based Authentication**: Secure sessions using JWT, ensuring that only authenticated users can access the system.
   - **Base64 Encryption**: Protect sensitive information, including digital evidence, with advanced encryption techniques.
   - **Socket-Based OTP Validation**: Secure login and actions with OTP verification, adding an extra layer of security.
   - **bcryptJS**: Encrypts digital evidence, ensuring data integrity and protection.

3. **Generative AI Integration**
   - **Legal Advice**: Leverage generative AI to provide users with preliminary legal advice, streamlining the decision-making process.
   - **Smart Filtering**: Automate the classification and filtering of complaints, allowing super users to handle cases more efficiently.

4. **Intuitive User Interface**
   - **User-Centric Design**: Developed with React, the UI is designed to enhance user engagement and productivity.
   - **Modularized Components**: Optimized performance and reduced bundle size by modularizing components, ensuring a smooth and responsive user experience.

5. **Efficient Notification System**
   - **NodeMailer**: Automates email notifications, keeping users and super users informed of complaint statuses and updates.

6. **Performance Optimization**
   - **Automated Response Time Reduction**: Gemini AI automates processes to reduce response times, enhancing system efficiency and user experience.

## 🛠️ Technology Stack

### Frontend:
- **ReactJS**: Powers the dynamic and responsive user interface, enhancing user engagement.
- **Gemini AI**: Integrates generative AI for smart filtering, legal advice, and automated processes.

### Backend:
- **NodeJS**: Provides a scalable backend infrastructure, handling multiple requests efficiently.
- **ExpressJS**: Streamlines server-side routing and middleware management, making the backend more efficient.
- **Socket.io**: Facilitates real-time, socket-based OTP validation, enhancing security.
- **NodeMailer**: Handles automated email notifications, ensuring timely communication.

### Database:
- **MongoDB**: A robust NoSQL database that stores and manages complaint data securely.
- **Mongoose**: ODM for MongoDB, simplifying data modeling, validation, and interaction with the database.

### Security:
- **JWT (JSON Web Token)**: Manages secure authentication and session management.
- **bcryptJS**: Secures digital evidence by encrypting sensitive information.
- **Base64 Encryption**: Adds another layer of security by encrypting data for secure storage and transmission.

## 🔧 Installation & Setup

### Prerequisites
- **NodeJS** (v12 or above)
- **MongoDB** (Ensure MongoDB is installed and running locally or remotely)

### Steps to Install

1. **Clone the Repository**
   ```bash
   git clone https://github.com/shubhamshinde6762/efir.git
   cd efir
   ```

2. **Install Dependencies**
   ```bash
   npm install
   cd client
   npm install
   cd ..
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory and configure the following variables:
   ```bash
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your_email_address
   EMAIL_PASS=your_email_password
   ```

4. **Run the Application**
   ```bash
   npm run dev
   ```
   Access the platform at `http://localhost:5000`.

## 🚀 Usage Guide

1. **User Registration & Authentication**
   - Sign up with secure login credentials, protected by token-based authentication and OTP validation.
   - JWT ensures secure sessions and controlled access.

2. **Complaint Management**
   - Regular users can securely file complaints and submit evidence.
   - Super users (judiciary and police) receive automated notifications and can manage complaints efficiently.

3. **Generative AI Assistance**
   - Receive preliminary legal advice and smartly filter complaints using AI, reducing processing time.

4. **Data Security**
   - All data is encrypted and securely stored in MongoDB, with bcryptJS ensuring the security of digital evidence.


## 💼 Contact

For any inquiries or suggestions, reach out to the team:

- **Shubham Shinde**: [LinkedIn](https://www.linkedin.com/in/shubhamshinde6762/) | [GitHub](https://github.com/shubhamshinde6762)

Join us in revolutionizing the legal process with **EFIR**! 🚀
