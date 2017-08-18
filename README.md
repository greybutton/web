![Logo](logo.png)

**The application for flexible time management**

[Presentation](//readymag.com/greybutton/applaura) | [Demo](//applaura.netlify.com/)

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

[![Build Status](https://travis-ci.org/greybutton/web.svg?branch=master)](https://travis-ci.org/greybutton/web)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/333927e9ca684d9482cdf54360e288ed)](https://www.codacy.com/app/greybutton/web?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=greybutton/web&amp;utm_campaign=Badge_Grade)
[![Dependency Status](https://gemnasium.com/badges/github.com/greybutton/web.svg)](https://gemnasium.com/github.com/greybutton/web)

---

Based on [heroku-cra-node](https://github.com/mars/heroku-cra-node)

## Local Development

Clone repository (`git clone https://github.com/applaura/web.git`)

Start MongoDB ([install and run MongoDB](https://docs.mongodb.com/manual/administration/install-community/))

### Run the API Server

In a terminal:

```bash
# Initial setup
yarn install

# Start the server
yarn start
yarn develop (start with nodemon)
```

### Run the React UI

The React app is configured to proxy backend requests to the local Node server. (See [`"proxy"` config](react-ui/package.json))

In a separate terminal from the API server, start the UI:

```bash
# Always change directory, first
cd react-ui/

# Initial setup
yarn install

# Start the server
yarn start
```

## Test

In a separate terminal from the API server and react UI:

```bash
# Run all tests
yarn test

# Run only server tests
yarn test server

# Run only react UI tests
cd react-ui/
yarn test
```

## Deploy

You can use a button [![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)
or make it manually

```bash
git clone https://github.com/applaura/web.git
cd web/
heroku create
git push heroku master
```
This deployment will automatically:

- detect Node buildpack
- build the app with
  - npm install for the Node server
  - heroku-postbuild for create-react-app
- launch the web process with npm start
  - serves ../react-ui/build/ as static files
  - customize by adding API, proxy, or route handlers/redirectors

More about [deploying to Heroku](https://devcenter.heroku.com/categories/deployment).

[Deploying with Git](https://devcenter.heroku.com/articles/git)

[GitHub Integration (Heroku GitHub Deploys)](https://devcenter.heroku.com/articles/github-integration)

### Environment variables

Application required three environment variables

[Set vars on Heroku](https://devcenter.heroku.com/articles/config-vars)

Basic auth
```bash
USER: string
PASS: string
```

Database ([mlab.com](mlab.com) or something like this)
```bash
MONGO_URI: mongodb://<dbuser>:<dbpassword>@ds123456.mlab.com:12345/<dbname>
```
