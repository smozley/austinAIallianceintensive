# Task Management App

A full-stack task management application built with React, Node.js, Express, and SQLite.

## Features

- ✅ Add new tasks with title and description
- ✅ Mark tasks as complete/incomplete
- ✅ Delete tasks
- ✅ View task creation and update timestamps
- ✅ Responsive design with modern UI
- ✅ Real-time task count and completion percentage
- ✅ SQLite database for persistent storage

## Tech Stack

**Frontend:**
- React 18
- Axios for API calls
- Modern CSS with responsive design

**Backend:**
- Node.js
- Express.js
- SQLite3 database
- CORS enabled

## Project Structure

```
task-app/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API services
│   │   └── ...
│   └── package.json
├── server/                 # Node.js backend
│   ├── server.js          # Main server file
│   ├── tasks.db           # SQLite database (created automatically)
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation & Setup

1. **Clone or download the project**

2. **Install server dependencies:**
   ```bash
   cd task-app/server
   npm install
   ```

3. **Install client dependencies:**
   ```bash
   cd ../client
   npm install
   ```

4. **Start the backend server:**
   ```bash
   cd ../server
   npm start
   ```
   The server will run on http://localhost:5000

5. **Start the frontend (in a new terminal):**
   ```bash
   cd ../client
   npm start
   ```
   The app will open in your browser at http://localhost:3000

## API Endpoints

- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get a specific task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task
- `GET /api/health` - Health check

## Database Schema

The SQLite database contains a single `tasks` table:

```sql
CREATE TABLE tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Development

### Server Development
```bash
cd server
npm run dev  # Uses nodemon for auto-restart
```

### Client Development
```bash
cd client
npm start    # Hot reload enabled
```

## Building for Production

### Build the client:
```bash
cd client
npm run build
```

### Start production server:
```bash
cd server
npm start
```

## Features in Detail

1. **Task Creation**: Add tasks with a required title and optional description
2. **Task Management**: Mark tasks as complete or incomplete with a single click
3. **Task Deletion**: Remove tasks with confirmation dialog
4. **Progress Tracking**: View completion statistics and percentage
5. **Responsive Design**: Works on desktop, tablet, and mobile devices
6. **Error Handling**: Graceful error handling with user-friendly messages
7. **Loading States**: Visual feedback during API operations

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test your changes
5. Submit a pull request

## License

This project is open source and available under the MIT License.