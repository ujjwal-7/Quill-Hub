# QuillHub

Welcome to QuillHub, your go-to platform for unleashing your creativity through the art of blogging. QuillHub is not just a blog app; it's a vibrant community where ideas flourish, stories come to life, and voices resonate.

[Live Project](https://quill-hub-89w1.vercel.app/)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)


## Introduction

QuillHub is designed with one goal in mind — to provide a seamless and enjoyable experience for both writers and readers. Whether you're a seasoned blogger or just starting your journey in the world of online expression, QuillHub offers the tools and features you need to bring your ideas to the forefront.

## Features

- **User Authentication:** Secure user authentication system to protect user accounts and sensitive information.

- **CRUD Operations:** Create, Read, Update, and Delete operations for managing blog posts and user profile.

- **Search Functionality:** Users can search for specific blog posts based on keywords or topics.

- **Pagination:** Manage and display a large number of blog posts with easy navigation using pagination.

- **Image Upload on Firebase Cloud Storage:** Users can enhance their blog posts by uploading images, with storage facilitated by Firebase Cloud Storage.

## Tech Stack

- **React.js:** A JavaScript library for building user interfaces, providing a fast and interactive user experience.

- **Node.js:** A JavaScript runtime for server-side development, handling the backend logic.

- **Express.js:** A web application framework for Node.js, simplifying the process of building robust APIs.

- **MongoDB:** A NoSQL database for storing blog post data.

- **Mongoose:** An ODM (Object Data Modeling) library for MongoDB and Node.js, simplifying interactions with the database.

- **Tailwind CSS:** A utility-first CSS framework that streamlines the styling process and ensures a consistent design.

- **React Router Dom:** A library for routing in React applications, enabling navigation and URL management.

- **Firebase:** A cloud-based platform for user authentication and image storage.

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/ujjwal-7/Quill-Hub.git
   
2. Navigate to the project directory:
   ```bash
   cd Quill-Hub
   
3. Install dependencies:
   ```bash
   npm install

4. Set up Firebase:

    - Create a Firebase project on the Firebase Console.
    - Configure authentication settings.
    - Obtain your Firebase configuration and replace the placeholders in src/firebase.config.js with your actual configuration.

5. Configure MongoDB:

    - Set up a MongoDB database and replace the database connection string in the server with your actual connection string.

6. Start the server:
   ```bash
   node index.js

7. Start the client:
   ```bash
   npm start

8. Open your browser and visit http://localhost:3000 to view the application.
