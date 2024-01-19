Quizania Readme
Overview
This repository contains the source code for a web application consisting of a server and a frontend. Follow the instructions below to set up and run the project locally.

Prerequisites
Make sure you have the following installed on your machine:

Node.js
npm (Node Package Manager)
Getting Started
Clone the repository to your local machine:

bash
Copy code
git clone https://github.com/your-username/project-name.git
Navigate to the project directory:

bash
Copy code
cd project-name
Install the project dependencies:

bash
Copy code
npm install
Configuration
Create a .env file in the root of the project.

Open the .env file in a text editor and make the following changes:

env
Copy code
# MongoDB connection URI
MONGO_URI=mongodb://your-mongo-db-uri

# Port for the server
PORT=3000
Replace your-mongo-db-uri with the actual URI for your MongoDB database.

Running the Server
To run the server, use the following command:

bash
Copy code
npm run server
This will start the server at the specified port.

Running the Frontend
To run the frontend, use the following command:

bash
Copy code
npm run client
This will start the frontend application.

Running the Development Environment
If you want to run both the server and frontend concurrently during development, you can use the following command:

bash
Copy code
npm run dev
This will start both the server and frontend in development mode.
