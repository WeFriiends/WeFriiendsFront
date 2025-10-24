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

# Deploying to Namecheap Shared Hosting

This guide will help you deploy the WeFriiendsWeb application to Namecheap shared hosting.

## Prerequisites

1. A Namecheap hosting account with:
   - cPanel access
   - Node.js support (most Namecheap shared hosting plans support Node.js)
   - FTP access credentials

2. FTP client (like FileZilla, Cyberduck, or WinSCP)

## Deployment Steps

### 1. Build the Application

First, build the application locally:

```bash
# Install dependencies
npm install

# Create production build
npm run build
```

This will create a `build` directory with optimized production files. The build process has been tested and works correctly, generating all necessary files for deployment.

### 2. Configure Environment Variables

Before deploying, make sure your production environment variables are properly set:

1. Create a `.env.production` file in your project root with the necessary environment variables:
   ```
   REACT_APP_AUTH0_DOMAIN=your-auth0-domain
   REACT_APP_AUTH0_CLIENT_ID=your-auth0-client-id
   REACT_APP_AUTH0_CALLBACK_URL=https://your-domain.com/callback
   REACT_APP_FIREBASE_API_KEY=your-firebase-api-key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
   REACT_APP_FIREBASE_PROJECT_ID=your-firebase-project-id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
   REACT_APP_FIREBASE_APP_ID=your-firebase-app-id
   REACT_APP_FIREBASE_MEASUREMENT_ID=your-firebase-measurement-id
   REACT_APP_API_BASE_URL=https://your-api-domain.com
   ```

2. Run the build command again to include these production variables:
   ```bash
   npm run build
   ```

### 3. Upload Files to Namecheap Hosting

1. Log in to your Namecheap cPanel
2. Find the FTP credentials in cPanel (usually under "Files" > "FTP Accounts")
3. Connect to your server using an FTP client with these credentials
4. Navigate to the public_html directory (or the directory specified for your domain)
5. Upload all files and folders from the `build` directory to this location

The `build` directory contains the following files and folders that need to be uploaded:

- `index.html` - The main HTML file
- `asset-manifest.json` - A manifest file for assets
- `favicon.ico` - The website favicon
- `logo192.png` and `logo512.png` - Logo images
- `manifest.json` - Web app manifest for PWA functionality
- `robots.txt` - File for search engine crawlers
- `_redirects` - Configuration for URL redirects
- `static/` directory - Contains all CSS and JavaScript files
- `img/` directory - Contains image assets
- Any other files or folders in the build directory

Make sure to maintain the exact directory structure when uploading.

### 4. Configure .htaccess for React Router

Since this application uses React Router for client-side routing, you need to create an `.htaccess` file to handle routes properly:

1. Create a file named `.htaccess` in the root of your hosting directory with the following content:
   ```
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteCond %{REQUEST_FILENAME} !-l
     RewriteRule . /index.html [L]
   </IfModule>
   ```

2. Upload this file to the same directory where you uploaded the build files

### 5. Update DNS Settings (if needed)

If you're using a new domain or subdomain:

1. Go to your Namecheap account dashboard
2. Navigate to "Domain List" and select your domain
3. Click "Manage" and then "Advanced DNS"
4. Add or update the necessary A, CNAME, or other records to point to your hosting

### 6. Test Your Deployment

1. Visit your website URL to ensure everything is working correctly
2. Test all major functionality, especially authentication and Firebase connections
3. Check browser console for any errors

### Troubleshooting

- **404 Errors on Routes**: Make sure the `.htaccess` file is properly configured
- **API Connection Issues**: Verify that your `REACT_APP_API_BASE_URL` is correctly set
- **Authentication Problems**: Check Auth0 configuration and callback URLs. If after login you're redirected to http://localhost:3000/callback instead of your production URL, make sure to update the REACT_APP_AUTH0_CALLBACK_URL in your .env file to use your production domain (e.g., https://frontend.wefriiends.com/callback)
- **Firebase Connection Issues**: Verify Firebase configuration variables

### Updating Your Deployment

To update your application:

1. Make changes to your code locally
2. Run `npm run build` to create a new build
3. Upload the new build files to your hosting, replacing the old files
