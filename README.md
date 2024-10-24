# Intelligent Target Locator - Frontend Web Application
This repository contains the frontend of a web application built with React, designed to interact with the **Intelligent Target Locator API**, It allows to submit documents and visualize analysis results given by the API.

## Table of Contents
- [Description](#description)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Technologies Used](#technologies-used)
- [License](#license)

## Description
The Intelligent Target Locator web application provides users with an interface to send PDF documents to be analysed by the Intelligent Target Locator API and get them evaluated in the context of the 17 Goals and 169 Targets from the 2030 Agenda. The site allows users to generate unique public URLs to visualize the results.
The project is splitted in two packages: `api` and `frontend`.
The **frontend** is the React App, responsible for displaying the visual interface and representing the results.
The **api** is a Node.js app that deals with the communications with with the ITL and is responsible for notifying users by email when the documents are ready. It stores document information from the user and the results from the ITL in a PostgreSQL database.

## Features
- Submit form: Public 2 steps form for submitting a document.
- Email notification: Notify the user when the document analysis is ready and the link is available.
- Location Analysis: Display publicly percentual data for the weight that each goal and target have in the document in unique URLs for each document.
- API Integration: Seamless communication with the Intelligent Target Locator API.

## Installation
Prerequisites
Ensure you have the following installed on your system:
- nvm (recomended)
- Node.js (version 18 or later)
- npm
- PostgreSQL (locally or in a docker container)

### Clone the Repository
```bash
git clone https://github.com/enredacoop/usdt.git
```

### Install Dependencies
```bash
npm install
```

## Usage
### Development Mode
Initialize the database tables:
```
npm run knex migrate:latest
```
You can generate seed data with:
```
npm run knex seed:run
```

To start the application in development mode, you have to add `.env` files in both packages, `frontend` and `api` and run both servers:
```
npm run dev:frontend
npm run dev:api
```
This will launch the app and the api in different ports: `http://localhost:3000` and `http://localhost:3001`

### Production Build
To create a production build:
```
npm run knex migrate:latest
npm run build
```
This will create an optimized build of the app in the `frontend/dist` folder and another build of the node app in `api/dist`.

### Serve the application
This is subject to individual preference. As a guide, use [PM2](https://pm2.keymetrics.io/) and start 2 processes:
```
pm2 start "PORT=3000 npm run serve:frontend" --name "usdt_frontend"
pm2 start "PORT=3001 npm run serve:api" --name "usdt_api"
```

## Configuration
The app requires environment variables to interact with the Intelligent Target Locator API. 
Create a `.env` file in the folder of the api package with the following variables:
```
# MODE = development or production
MODE=development
DEV_DB=postgres://postgres:postgres@localhost:5432/usdt
PRO_DB=postgres://postgres:postgres@localhost:5432/usdt
MAIL_HOST=smtp.ethereal.email
MAIL_PORT=587
MAIL_USER=ara80@ethereal.email
MAIL_PASS=hvzX9KQ5eHm28rNESW
UPO_API=https://sdg-api.upo.es/
UPO_TOKEN=<TOKEN-PROVIDED-BY-UPO>
FRONTEND_URL=http://localhost:5173
```
Also you would need to add another `.env in the frontend package directory containing the URL from the local API. 
```
VITE_API_URL='http://localhost:3001'
```

## Technologies Used
- React: Frontend framework
- Fetch API: For making API requests (Node 18)
- SCSS: CSS pre-processor
- Node.js: Javascript runtime
- Knex: Query builder for communicating with the database.
- PostgreSQL: Relational database

## License
This project is licensed under the MIT License. See the LICENSE file for details.


