# Intelligent Target Locator - Frontend Web Application
This repository contains the frontend of a web application built with React, designed to interact with the **Intelligent Target Locator API**, which enables intelligent target location using various data resources.

## Table of Contents
Description
Features
Installation
Usage
Configuration
Technologies Used
Contributing
License
Description
The Intelligent Target Locator web application provides users with an interface to search, locate, and analyze targets using the power of the API. This React-based client allows users to input parameters, visualize target data, and receive intelligent recommendations from the API.

## Features
User Authentication: Log in and authenticate to use the Intelligent Target Locator API securely.
Target Search: Input parameters to search for specific targets.
Location Analysis: Display detailed data of target locations on an interactive map.
API Integration: Seamless communication with the Intelligent Target Locator API.
Responsive Design: Optimized for use on both desktop and mobile devices.
Installation
Prerequisites
Ensure you have the following installed on your system:

- Node.js (version 18 or later)
- npm

## Clone the Repository
```bash
git clone https://github.com/your-username/intelligent-target-locator-frontend.git
cd intelligent-target-locator-frontend
```

## Install Dependencies
```bash
npm install
```

## Usage
### Development Mode
To start the application in development mode:
```
npm start
```
This will launch the app at `http://localhost:3000`.

### Production Build
To create a production build:

```
npm run build
```
This will create an optimized build of the app in the build folder.

## Configuration
The app requires environment variables to interact with the Intelligent Target Locator API. Create a `.env` file in the root of the project with the following variables:
```
REACT_APP_API_URL=https://api.intelligent-target-locator.com
REACT_APP_API_KEY=your_api_key_here
```
Replace `your_api_key_here` with the actual API key provided by the Intelligent Target Locator API.

## Technologies Used
- React: Frontend framework
- React Router: For client-side routing
- Axios: For making API requests
- Mapbox GL: For map rendering and displaying location data
- Bootstrap: For responsive design
Contributing
Contributions are welcome! If you would like to contribute to this project, please submit a pull request or open an issue for discussion.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
