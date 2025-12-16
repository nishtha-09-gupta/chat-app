Yapster: A Real Time Chat Application

Yapster is a real time chat application built with the MERN stack. It allows users to sign up, log in, update their profile, and chat with other users instantly.

Problem Statement

Traditional chat apps often suffer from delayed messaging, lack of user status tracking, and cumbersome profile management. Yapster addresses these issues by providing:

Seamless real-time messaging

Secure user authentication

Online and offline user status

Profile management

System Architecture

Frontend → Backend API → Database → Real-Time Communication

Frontend: React.js, Tailwind CSS, React Router

Backend: Node.js, Express.js

Database: MongoDB Atlas

Authentication: JWT-based login and signup

Real-Time Communication: Socket.io

Hosting: Vercel (Frontend and Backend)

Key Features

Authentication: JWT-based login and signup

Profile Management: Update user profile details

Real-Time Chat: Send and receive messages instantly

User Status: Online and offline indicators

Notifications: Real-time message alerts

Responsive Design: Works seamlessly on desktop and mobile

Tech Stack

Frontend: React, Tailwind CSS, Axios

Backend: Node.js, Express

Database: MongoDB Atlas

Authentication: JWT

Real-Time Communication: Socket.io

Hosting: Vercel

API Overview
User Routes

POST /user/signup – Register a new user (Public)

POST /user/login – Login user (Public)

PUT /user/update-profile – Update user profile (Authenticated User)

GET /user/check – Check authentication (Authenticated User)

GET /welcome – Get welcome info (Public)

Message Routes

GET /messages/users – Get list of users for sidebar (Authenticated User)

GET /messages/:id – Get messages of a conversation (Authenticated User)

PUT /messages/mark/:id – Mark a message as seen (Authenticated User)

POST /messages/send/:id – Send a message (Authenticated User)

Deployment

Frontend: Vercel

Backend: Vercel

Database: MongoDB Atla