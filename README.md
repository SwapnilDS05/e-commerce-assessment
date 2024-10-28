# E-commerce Authentication and User Profile UI

This project is a simple e-commerce authentication and user profile UI. It includes user registration, login, forget-password and profile.

We've used the following libraries for different use cases:
- For styling - [styled-component](https://styled-components.com/)
- For form management - [react-hook-form](https://react-hook-form.com/) with [yup](https://www.npmjs.com/package/yup)
- For API calls - [axios](https://axios-http.com/)
- For routing - [react-router-dom](https://reactrouter.com/)
- For state management - [Context-API](https://legacy.reactjs.org/docs/context.html)

## Authors

- [@Swapnil Manglekar](https://github.com/SwapnilDS05)

## Tech Stack

**Client:** React js

**Server:** Python


## Dependencies

1. Node Version >=18.17.0
2. NPM Version >=9.6.7

## API URL Configuration

We've used demo server for API calling and can be changed from below file

```
├── src
├── services
│   ├── api.js
```
Change BASE_URL field value

## Project structure

```
├── node_modules (.gitignore)
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
│   └── logo192.png
│   └── logo512.png
│   └── robots.txt
├── src
│   ├── components
│   │   ├── elements
│   │   ├── formElements
│   │   └── Layout
│   │   └── ProtectedRoute.jsx
│   │   └── PublicRoute.jsx
│   ├── hooks
│   │   └── AuthProvider.js
│   ├── pages
│   │   └── auth
│   │   └── account
│   ├── routes
│   │   └── index.jsx
│   ├── services
│   │   └── api.js
│   │   └── endpoint.js
│   ├── utils
│   │   ├── commonMethods.js
│   │   └── validations.js
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   ├── reportWebVitals.js
│   └── setupTests.js
├── .gitignore
├── package.json
└── README.md
└── package-lock.json
```
## Installation

Project clone and installing dependencies with npm

```bash
  git clone https://github.com/SwapnilDS05/e-commerce-assessment.git
  cd e-commerce-assessment
  npm install
```

## Responsiveness and any device-specific considerations

Project will run smoothly on Desktop and Mobile devices with full responsiveness.

## Usage

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Ideas for Enhancements or Optimization

- Implementing Redux for state management
- Adding more features to the profile
- Implementing loading or skeleton UI for placeholder