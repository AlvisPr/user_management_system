# User Management System

This project is a simple user management system built using Node.js, Express, and LowDB. It allows users to be added and displayed through a web interface. The project uses Bootstrap for styling and SuperAgent for making HTTP requests.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Endpoints](#endpoints)
- [Technologies Used](#technologies-used)
- [License](#license)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/user-management-system.git
    cd user-management-system
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Start the server:
    ```sh
    node index.js
    ```

4. Open your browser and navigate to `http://localhost:3000`.

## Usage

### Adding a User

1. Navigate to `http://localhost:3000/addUser`.
2. Click the "Add User" button to generate and add a new user with fake data.

### Viewing Users

1. Navigate to `http://localhost:3000/show_users`.
2. The page will display a list of users with their details.

## Project Structure

- `index.js`: Main server file.
- `database/db.json`: JSON file used by LowDB to store user data.
- `public/Pages/`: HTML files for different pages.
- `public/JS/addData.js`: JavaScript file for adding users.

## Endpoints

- `GET /`: Serves the `addUser.html` page.
- `GET /navbar`: Serves the `navbar.html` page.
- `GET /addUser`: Serves the `addUser.html` page.
- `GET /show_users`: Serves the `showUsers.html` page.
- `POST /new_user`: Adds a new user to the database.
- `GET /users`: Retrieves all users from the database.

## Technologies Used

- **Node.js**: JavaScript runtime.
- **Express**: Web framework for Node.js.
- **LowDB**: Small local JSON database.
- **Bootstrap**: CSS framework for responsive design.
- **SuperAgent**: HTTP request library.
- **Faker.js**: Library for generating fake data.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.