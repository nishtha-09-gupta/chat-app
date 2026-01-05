# Yapster Real Time Chat Application

Yapster is a modern real time chat application built using the MERN stack. It enables users to communicate instantly with each other with secure authentication, real time presence tracking, media sharing and complete profile management. The application focuses on speed, reliability and a clean user experience across devices.

## Problem Statement

Many traditional chat applications face issues such as delayed message delivery, absence of real time user presence, limited media support and inconvenient profile management. Yapster addresses these challenges by providing instant messaging, accurate online and offline status, seamless media sharing and an easy to use edit profile system.

## System Architecture

The application follows a scalable architecture where the frontend communicates with a backend API which connects to the database and real time communication layer.

Frontend uses React.js with Tailwind CSS and React Router. Backend is built with Node.js and Express.js. Data is stored in MongoDB Atlas. Authentication is handled using JSON Web Tokens. Real time messaging and user presence are managed using Socket.io. Both frontend and backend are deployed on Vercel.

## Key Features

1. Secure authentication using JWT based signup and login
2. Dedicated edit profile page to update user details and profile image
3. Real time one to one chat with instant message delivery
4. Media sharing support within chat conversations
5. Online and offline user status indicators in real time
6. Message notifications and seen status handling
7. Fully responsive design for desktop and mobile devices

## Tech Stack

Frontend technologies include React, Tailwind CSS and Axios. Backend is developed using Node.js and Express. MongoDB Atlas is used for database management. Authentication is implemented with JWT. Socket.io powers real time communication. Deployment is handled using Vercel.

## API Overview

### User Routes

POST /user/signup registers a new user

POST /user/login authenticates an existing user

PUT /user/update-profile allows an authenticated user to update profile details

GET /user/check verifies authentication status

GET /welcome returns public welcome information

### Message Routes

GET /messages/users fetches the user list for the chat sidebar

GET /messages/:id retrieves messages for a specific conversation

PUT /messages/mark/:id marks messages as seen

POST /messages/send/:id sends a text or media message

## Deployment

Frontend is deployed on Vercel. Backend is deployed on Vercel. Database is hosted on MongoDB Atlas.

## Conclusion

Yapster demonstrates real time communication, secure authentication and scalable full stack architecture. The project highlights practical implementation of Socket.io, JWT authentication and modern UI design, making it suitable for production use and strong for portfolio and resume projects.
