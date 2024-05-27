# Frontend Challenge

This project is a movie listing application built with Next.js, React, and TypeScript. It allows users to search for movies, view details, and manage their favorite movies. The application uses The Movie Database (TMDb) API for fetching movie data.

## Table of Contents

- [Frontend Challenge](#frontend-challenge)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Project Structure](#project-structure)
  - [Scripts](#scripts)
    - [Environment Variables](#environment-variables)

## Features

- User authentication with NextAuth.js
- Search for movies
- View movie details
- Add and remove movies from favorites
- Responsive design
- Lazy loading for infinite scroll
- Protected routes for authenticated users

## Project Structure

## Scripts

- `dev`: Starts the development server.
  ```bash
  npm run dev
- `build`: Builds the application for production.
  ```bash
  npm run build
- `start`: Starts the production server.
  ```bash
    npm start
- `lint`: Lints the project files.
- `lint:fix`: Lints and fixes the project files.
  ```bash
  npm run lint
  npm run lint:fix
- `test`: Checks tests.
  ```bash
    npm run test
- `Format`: Checks TypeScript types in watch mode.
  ```bash
    npm run test:watch

### Environment Variables
To run this project, you will need to add the following environment variables to your .env file or to the Vercel project settings.

```bash
NEXT_PUBLIC_TMDB_API_KEY=<your-tmdb-api-key>
NEXT_PUBLIC_TMDB_AUTH_TOKEN=<your-tmdb-auth-token>
NEXTAUTH_SECRET=<your-nextauth-secret>