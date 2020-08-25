This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

## Set your firebase config
Set the `publishableKey` variable in the `stripe-button.component.jsx` with your own publishable key from the stripe dashboard.

![alt text](https://i.ibb.co/djQTmVF/Screen-Shot-2019-07-01-at-2-18-50-AM.png "image to publishable key")

## Set to an existing Heroku app

To set to an existing Heroku app you already have deployed, you need to know the name of the app you want to deploy to. To see a list of all the apps you currently have on Heroku:

```
heroku apps
```

Copy the name of the app you want to connect the project to, then run:

```
heroku git:remote -a <PASTE_YOUR_APP_NAME_HERE>
```

And now you'll have your repo connected to the heroku app under the git remote name `heroku`.

Then skip to the bottom of this article to see what to do next!


## To create a new Heroku app

Create a new Heroku project by typing in your terminal:

```
heroku create
```

This will create a new Heroku project for you. Then run:

```
git remote -v
```

You should see heroku `https://git.heroku.com/<RANDOMLY_GENERATED_NAME_OF_YOUR_APP>` in the list. This means you have successfully connected your project to the newly created Heroku app under the git remote of `heroku`.


## Deploying to Heroku

Add the `mars/create-react-app-buildpack` to your heroku project by typing:

```
heroku buildpacks:set mars/create-react-app-buildpack
```

You can then deploy to heroku by running:

```
git push heroku master
```

You will see this warning message if you are pushing to an existing app:

```
! [rejected]        master -> master (fetch first)
error: failed to push some refs to 'https://git.heroku.com/hasura-crwn-clothing.git'
hint: Updates were rejected because the remote contains work that you do
hint: not have locally. This is usually caused by another repository pushing
hint: to the same ref. You may want to first integrate the remote changes
hint: (e.g., 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```

This is because we are pushing to an existing app that was deploying an entirely different repository from what we have now. Simply run:

```
git push heroku master --force
```

This will overwrite the existing Heroku app with our new code.


## Open our Heroku project

After heroku finishes building our project, we can simply run:

```
heroku open
```

This will open up our browser and take us to our newly deployed Heroku project!