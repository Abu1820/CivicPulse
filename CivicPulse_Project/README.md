# CivicPulse - Smart Civic Issue Reporting Platform

## Milestone 1 - User Authentication

### Project Overview

CivicPulse is a full-stack web application that enables citizens to report public issues online. This milestone focuses on implementing a secure and user-friendly authentication system using React, Spring Boot, and MySQL.

---

## Objective

Develop a complete authentication module where users can:

- Register a new account
- Login using valid credentials
- Maintain login session
- Logout securely
- Experience a responsive and modern user interface

---

## Technology Stack

### Frontend
- React.js (Vite)
- React Router DOM
- Axios
- CSS

### Backend
- Java 17
- Spring Boot
- Spring Web
- Spring Data JPA

### Database
- MySQL

### Tools
- VS Code
- Eclipse IDE
- MySQL Workbench
- Postman
- Git & GitHub

---

## Project Structure

```
CivicPulse_Project/
│
├── frontend/
├── backend/
├── database/
├── screenshots/
└── README.md
```

---

## Features Completed

### User Registration
- Register new users
- Validate user input
- Prevent duplicate email registration
- Store user details in MySQL

### User Login
- Login using registered email and password
- Validate user credentials
- Display appropriate success and error messages

### Session Management
- Store logged-in user information in Local Storage
- Maintain user session until logout

### Dynamic Navbar
- Display Login and Register when logged out
- Display Home, Report Issue, View Issues, Dashboard, and Logout when logged in

### Form Validation
- Required field validation
- Email format validation
- Password confirmation validation

---

## Database Design

### User Table

| Field | Type |
|-------|------|
| id | Long |
| name | String |
| email | String |
| password | String |
| role | String |
| createdDate | LocalDateTime |

---

## API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Authenticate an existing user |

---

## Application Flow

```
User

↓

Register / Login

↓

React Frontend

↓

Axios

↓

Spring Boot REST API

↓

Service Layer

↓

Repository Layer

↓

MySQL Database

↓

Response

↓

React UI
```

---

## Current Progress

### Backend
- [ ] Spring Boot Project Setup
- [ ] MySQL Configuration
- [ ] User Entity
- [ ] User Repository
- [ ] User Service
- [ ] Authentication Controller
- [ ] Register API
- [ ] Login API

### Frontend
- [ ] React Project Setup
- [ ] React Router Configuration
- [ ] Navigation Bar
- [ ] Register Page
- [ ] Login Page
- [ ] Axios Integration
- [ ] Local Storage Session

### Testing
- [ ] Register API Tested
- [ ] Login API Tested
- [ ] User Registration Working
- [ ] User Login Working
- [ ] Navbar Updated Dynamically

---

## Theme

| Purpose | Color |
|----------|--------|
| Primary | #0F172A |
| Secondary | #0D9488 |
| Accent | #14B8A6 |
| Background | #F0FDFA |

---

## Screenshots

Screenshots will be added after completing Milestone 1.

---

## Future Milestones

- Milestone 2 – Issue Reporting
- Milestone 3 – Issue Tracking
- Milestone 4 – Dashboard & Statistics

---

## Project Status

🚧 Milestone 1 is currently under development.
