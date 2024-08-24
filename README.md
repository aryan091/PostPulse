# PostPulse

PostPulse is a dynamic web application designed to streamline the process of creating, sharing, and discovering posts within a vibrant online community. Built with a React frontend and a robust backend, PostPulse offers users a seamless experience for both consuming and contributing content.

## Key Features

- **User Authentication:**
  - Secure login and registration with options to toggle between sign-in and sign-up forms.
  - Users can easily manage their profiles and stay logged in through persistent sessions.

- **Post Management:**
  - Create, edit, and delete posts.
  - View and interact with posts through likes, comments, and bookmarks.

- **Personalized Content:**
  - Curated content tailored to user interests.
  - Personalized feeds, ability to follow specific topics, and save favorite posts in bookmarks.

- **Responsive Design:**
  - Fully responsive interface ensuring a smooth experience across all devices.

- **Search and Filter:**
  - Advanced search functionality to find posts by titles or specific keywords.
  - Results are tailored to user preferences.

- **Protected Routes:**
  - Actions like creating posts or viewing bookmarks are protected and require users to be logged in.
  - Ensures a secure and personalized user experience.

- **Cloudinary and Multer Integration:**
  - Upload avatars and post images directly to the platform.
  - Simplifies the process of personalizing profiles and enriching posts with visual content.

## Tech Stack

- **Frontend:**
  - React.js
  - Tailwind CSS
  - React Router

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  - Multer (for handling file uploads)
  - Cloudinary (for image storage and management)

## Installation

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running
- Cloudinary account for image management

### Steps

1 **Clone the repository:**

  ```bash
   git clone https://github.com/your-username/PostPulse.git
   cd PostPulse
  ```
2.1 **Install Dependencies ( Server ):**

  ```bash
  cd server
  npm install
  ```
2.2 **Install Dependencies ( Client ):**

  ```bash
  cd client
  npm install
  ```

3.1 **Set up environment variables ( Server ):**
   Create a `.env` file in the root directory and add the following:

   ```bash
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
  ```

3.2 **Set up environment variables ( Client ):**
   Create a `.env` file in the root directory and add the following:

   ```bash
   VITE_BACKEND_URL=your_backend_url
   ```

4.1 **Run the Application ( Server ):**

  Be sure you are in  `server` directory
  ```bash
  node server.js
  ```

4.2 **Run the Application ( Client ):**

  Be sure you are in  `client` directory

  ```bash
  npm run dev
  ```

## Usage

- **Register/Login:** Start by registering a new account or logging in with an existing one.
- **Create Posts:** Once logged in, you can create new posts, edit existing ones, or delete them.
- **Search and Explore:** Use the search bar to find posts by title or keyword.
- **Personalize Profile:** Upload an avatar through the profile settings.
- **Bookmark and Comment:** Bookmark your favorite posts and engage with the community through comments.

# Contributing

Contributions are welcome! Please open an issue or submit a pull request.


  





