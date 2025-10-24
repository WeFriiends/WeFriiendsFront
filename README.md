# WeFriendsWeb

Link to Google documents with details regards of FE part of the project
https://docs.google.com/document/d/12zr1Wf1MPXYctld1Y8OM7DMsp8ccZ3rKfsOJpFiewhs/edit?usp=sharing

To get the First Profile Carousel functioning, you will need to run the *WeFriiendsProfile* project:
https://github.com/WeFriiends/WeFriiendsProfile

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more
information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will
remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right
into your project so you have full control over them. All of the commands except `eject` will still work, but they will
point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you
shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't
customize it when you are ready for it.

## Learn More

You can learn more in
the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved
here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved
here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved
here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved
here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved
here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved
here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

### Project Styling and Responsiveness Guide:

https://docs.google.com/document/d/1kmg58tRs60JY3sIdIc6ey8EG2T7_GVg3PHcSl8J0lZg/edit?usp=sharing

#### createTheme.tsx -

customization MUI styles - default font is Inter, primary color

#### commonStyles.tsx -

file with generic/common app styles (Titles, buttons etc.)

### `Local development`

For convinient development locally was created and set up docker compose file. It's a solution also to avoid CORS error.

#### Important!

To run the project .env file should be created based on the file .env.sample. Keys ask on the FE slack channel

The following environment variables are required:

- `REACT_APP_AUTH0_DOMAIN`: Auth0 domain
- `REACT_APP_AUTH0_CLIENT_ID`: Auth0 client ID
- `REACT_APP_AUTH0_CALLBACK_URL`: Auth0 callback URL
- `REACT_APP_API_BASE_URL`: Base URL for API requests (default: http://localhost:8080)

Repos Web FE and Auth should be located in the same directory, otherwise you need to adapt values `volumes` in
docker-compose file accordingly.

`docker-compose up` is command to run the project using docker-compose file.

# Connection to cloud DB

Connection Mongo DB string to use for production purposes
To connect to the cloud database change value of env variable STORAGE_CONNECTION_STRING.
In `docker-compose.yml`:

```
    - STORAGE_CONNECTION_STRING=mongodb+srv://wefriiends-backup:wefriiends2023@cluster0.wir50id.mongodb.net/authorization?retryWrites=true&w=majority
```

To run the project use command:

```
docker-compose up
```
