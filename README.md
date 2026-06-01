# URL Shortener Backend

A simple Node.js backend for a URL shortener application.

## Prerequisites

- Node.js installed
- MongoDB database available
- `npm` installed

## Setup

1. Clone the repository (if not already cloned).
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file at the project root with the following variable:

```env
MONGO_URI=<your-mongodb-connection-string>
PORT=5000
```

4. Start the application:

- For development with auto-reload:

```bash
npm run dev
```

- For production / normal start:

```bash
npm start
```

The server will listen on `http://localhost:5000` by default.

## Database

This project uses MongoDB via Mongoose.

- The MongoDB connection string is read from the `MONGO_URI` environment variable.
- If `MONGO_URI` is missing, the application will exit with an error.

## Screenshots

<img width="1791" height="864" alt="image" src="https://github.com/user-attachments/assets/4ccff905-db8e-4d05-ad1a-38f5795712ed" />
<img width="1853" height="854" alt="image" src="https://github.com/user-attachments/assets/a5e2e68b-b7d6-4afc-a8d4-d785e51faefe" />


## Notes

- The backend is implemented in `src/server.js` and `src/app.js`.
- Routes, controllers, and services are organized under `src/routes`, `src/controllers`, and `src/services`.
