This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
<<<<<<< HEAD
=======


see it on heroku here: https://dry-beach-87683.herokuapp.com/
## Available Scripts


To run locally:
`npm run build:dev` to choose localhost for api back end

Hacky way to choose the heroku hosted backend/api. Would be nice to solve for a better way to let students work seamlessly between the two

Problems
- ![](https://i.imgur.com/HXvnsFz.png)
 even though Heroku says the env is production it still logs as development (in src/App.js)
-  added a lot of scripts to no avail
```
"scripts": {
  "start": "react-scripts start",
  "build": "env-cmd .env.heroku react-scripts build",
  "build:heroku": "env-cmd .env.heroku npm run build",
  "build:dev": "env-cmd .env.dev react-scripts start",
  "test": "react-scripts test",
  "eject": "react-scripts eject",
  "heroku-postbuild": "env-cmd .env.heroku react-scripts build"
},
```

`env-cmd` works locally with `npm run build:dev` behaves as expected but will not work for heroku build. Even though I have told heroku to run it. Is it time for a procfile or something?

Details:

https://facebook.github.io/create-react-app/docs/deployment

https://www.npmjs.com/package/env-cmd


Solved:

`heroku buildpacks:set mars/create-react-app` will now set production in deployed heroku site


don't forget to add node engines etc...

other ideas .env - then add custom in heroku app under settings?

would need to test accessibility

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
>>>>>>> 594fd9d194c2f899fcb230fee2e62dc2ffce13b9
