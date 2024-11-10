# To-Do App

This is a full-stack to-do application built with React on the front end and Node.js on the back end. The app allows users to create, update, and delete tasks efficiently.

## Getting Started

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or above)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

### Installation

#### Clone the Repository

```bash
git clone https://github.com/your-username/todo-app.git
cd todo-app
```

#### Back-End Setup

1. Navigate to the back-end folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the back-end server:
   ```bash
   npm start
   ```
   The server should now be running at `http://localhost:5000`.

#### Front-End Setup

1. Navigate to the front-end folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   The front end will be running at `http://localhost:3000`.

### Technologies Used

- **Front End**: 
  - **React**: For building a responsive and dynamic user interface.
  - **React Router**: For managing routing within the app.
  - **Axios**: For making HTTP requests from the front end to the back-end API.
  
- **Back End**: 
  - **Node.js**: Server-side runtime environment.
  - **Express.js**: Simplifies handling routes and middleware.
  - **PostgresSQL**: Database to store to-do tasks .

### Challenges and Decisions

- **State Management**: Decided to use React's Context API to manage global state, given the simplicity of the app. For larger applications, Redux or Zustand could be better choices.
- **Error Handling**: Implemented error handling for user actions and server responses, particularly around network requests.
- **Data Persistence**: Decided to use MongoDB for easy storage of tasks with scalability in mind.
