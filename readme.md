# MERN TodoList App (WIP)
A todoList app made with the MERN stack (React, Node, Express, Mongodb) with with register/login functionality designed to store the todo data in the server enabling it to be accessed with multiple devices, fully optimized with new react features for the fastest rendering and loading times possible

## Features

- JWT authentication for blazing fast and secure authentication
- full use of typescript in everyfile for maximum readability and safety
- Creation of accounts and tasks on the server-side with the help of mongoDB and mongoose
- one to one relations from the task to the user for maximum security and performance
- password hashing for ensuring account security
- Dockerization of the whole project insuring maximum compatibility and scalability
- Use of the new React-Router and its features for the fastest Renders and load times
- Use of vite for easier development for forking
- Use of tailwindCSS for better and more Readable CSS



## File Structure

### 1.Backend
```python
.
├── backend
│   ├── Dockerfile          #Dockerfile for building the backend
│   ├── package.json        #...
│   ├── package-lock.json   #...
│   ├── src                 #Source Code
│   │   ├── app.ts          #Main file
│   │   ├── databases       #Database connection related functions
│   │   ├── interfaces      #TypeScript Related Interfaces
│   │   ├── models          #Mongoose Models
│   │   ├── routes          #Routes for the express app
│   │   └── services        #Database Services
│   └── tsconfig.json       #TypeScript config
```
### 2. Frontend

```python
.
├── frontend
│   ├── Dockerfile          #Dockerfile for building the frontend
│   ├── eslint.config.js    #Eslint config (default)
│   ├── index.html          #React Root html
│   ├── package.json        #...
│   ├── package-lock.json   #...
│   ├── public              #public folder (unused)
│   ├── src
│   │   ├── App.tsx         #Main Root app
│   │   ├── assets          #SVG/image files
│   │   ├── components      #React components
│   │   ├── index.css       #index css file for tailwind
│   │   ├── interfaces      #Frontend interfaces for typescript
│   │   ├── main.tsx        #main React file
│   │   ├── pages           #frontend stores in a directory->route fashion
│   │   ├── providers       #react providers 
│   │   └── vite-env.d.ts   #vite env variables
│   ├── tsconfig.app.json   #typescript config
│   ├── tsconfig.json       #typescript config
│   ├── tsconfig.node.json  #typescript config
└   └── vite.config.ts      #vite config
```

## Startup

### 1. Docker

1. simply run this command to run the application automatically

```bash
sudo docker-compose up --build
```
2. you can access the app now on localhost:5173


### 2. normal startup

- it is very much recommended to use the dockerization method unless you only want to see the project for testing as this is not deployable and only for development purposes only

1. run the frontend server:
```bash
cd frontend
npm run dev
```

2. run the backend server
```bash
cd backend
npm run dev
```
3. you can access the app now on localhost:5173




## Todos

- add full deployment support
- add full docker build commands
- add more options for tasks