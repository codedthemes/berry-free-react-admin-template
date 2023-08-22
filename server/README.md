## Server

This is a simple server project built with Node.js, Express, and TypeORM. It includes a basic user management system with CRUD operations.

- [Project Structure](#project-structure)
- [Running the Server](#running-the-server)
- [MySql](#mysql)
- [Creating a MySQL User](#creating-a-mysql-user)
- [Database Configuration](#dabase-configuration)
- [Environment Variables](#environment-variables)
- [References](#references)

## Project Structure

```
├── src/
│ ├── config/
│ │ └── database.ts # TypeORM connection configuration
│ ├── controller/
│ ├── entity/
│ ├── middleware/ # Express middlewares (e.g., authentication, logging)
│ ├── service/
│ ├── app.ts # Main application file (Express setup, routes)
│ └── index.ts # Application entry point (starts the server)
├── migrations/ # TypeORM migrations
├── node_modules/ # Installed NPM packages
├── package.json # NPM package file
├── ormconfig.json # TypeORM configuration file
└── tsconfig.json # TypeScript configuration file
```

Before running the server, make sure you have Node.js and npm installed on your machine. You can download Node.js and npm from here.

To install the project dependencies, navigate to the project directory in your terminal and run:
install

```
npm run install
```

## Running the Server

To start the server, run:

```
npm start
```

## MySql

The server will start on port 5001 or the port specified in your .env file.
MySQL Installation on MacBook

To install MySQL on a MacBook, you can use Homebrew, a package manager for macOS. If you don't have Homebrew installed, you can install it by running the following command in your terminal:

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Once Homebrew is installed, you can install MySQL by running:

```
brew install mysql
```

After the installation is complete, you can start the MySQL service with:

```
brew services start mysql
```

To secure your MySQL installation, run:

```
mysql_secure_installation
```

This will prompt you to configure your MySQL installation.

## Creating a MySQL User

To create a new MySQL user, first log in to the MySQL shell as root:

```
mysql -u root -p
```

Then, create a new user and grant it all privileges on the 'test' database. Replace 'testuser' and 'password' with your desired username and password:

```
CREATE DATABASE blood_donor;
CREATE USER 'testuser'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON blood_donor.* TO 'testuser'@'localhost';
FLUSH PRIVILEGES;
```

Exit the MySQL shell with `exit`.

## Database Configuration

The database connection is configured in app.ts and reads the conviguration from the `.env` file.

```
PORT=5001
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=testuser
DB_PASSWORD=password
DB_DATABASE=blood_donor
```

## Environment Variables

The server port is configured using environment variables. You can create a .env file in the root directory of the project and add the following line:

```
PORT=5001
```

Replace 5001 with your desired port number.

## References

1. Node.js Documentation
2. Express.js Documentation
3. TypeORM Documentation
