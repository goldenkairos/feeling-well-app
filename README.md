# About This Project
See [Project Demo](https://youtu.be/vvlEZZYfe6o?si=5ZmutYpsmsJZrZsu)

This is a full stack web application designed to help anyone who wants to keep track of their emotions and feelings, whether they're looking to improve their mental health or simply want to reflect on their experiences. It is an excellent tool for people who want to better understand themselves and their emotions, and it's also great for people who want to monitor their progress over time.

Tech stacks:
1. We created the Feeling Well web application using a combination of `Flask`, `SQLAlchemy`, and `PostgreSQL` for the backend and database, and `React JS Vanilla`,  `React D3`, `firebase authentication` for the front-end.
    
2. We utilized Flask and SQLAlchemy to create the backend and handle database operations, such as creating, reading, deleting records. We also used PostgreSQL to store and manage the data entered by users.
   
3. For the front-end, we used `React JS Vanilla` to create the user interface and provide an interactive experience for users. We used `React D3` to create the colorful Feeling Wheel, from which allows users to select words that represent their emotions and display the frequencies of each word in a word cloud. We also created user authentication which allows the user to sign up and log in to their private account to create their own personalized feeling wordcloud.

# One-time Project Setup
Create a folder call "feeling-well-fullstack".
$ mkdir feeling-well-fullstack

Inside this folder, we will set up back-end and front-end files. 
## _Make sure front end and back end folders are not nested inside each other_


# Back-end layer Setup:

## Clone
In terminal `git clone` the back-end project repo: https://github.com/goldenkairos/back-end-feeling-well.git

$ git clone https://github.com/goldenkairos/back-end-feeling-well.git

<details>
<summary>Only do this if back-end heroku deployment is no longer available</summary>
In project directory in the terminal, enter the below syntax to launch project in VScode
$ code .

## Managing Dependencies
Create a virtual environment:

```bash
$ python3 -m venv venv
$ source venv/bin/activate
(venv) $ # You're in activated virtual environment!
```

Install dependencies (we've already gathered them all into a `requirements.txt` file):

```bash
(venv) $ pip install -r requirements.txt
```

## Setting Up The Database

#Create a database named `feeling_well_development`.
```bash
$ psql -U postgres
$ CREATE DATABASE feeling_well_development;
$\l #to check if the database was created
$\q #to quit postgres
```
#Creating a `.env` File

Create a file named `.env`.

Add this environment variable: `FLASK_ENV=development`

Also, add the environment variable `SQLALCHEMY_DATABASE_URI` to hold the path to your development database.

Your `.env` may look like this:

```
FLASK_ENV=development
SQLALCHEMY_DATABASE_URI=postgresql+psycopg2://postgres:postgres@localhost:5432/feeling_well_development
```

## Initiate Database
```bash
$ flask db init
$ flask db migrate
$ flask db upgrade
```

## Making updates in Database:

    If update the model in the database, make sure (the member who makes the change) to run the following:
```bash
$ flask db migrate
$ flask db upgrade
$ git add .
$ git commit -m"Update model"
$ git push
```

    If another team member makes update, and another user needs to pull the update:
```bash
$ git pull
$ flask db upgrade
```

## If files are unable to take the updates, delete the migration when there is migration issue:
    Delete the migration table in terminal
```bash
$ psql -U postgres
$ DROP DATABASE feeling_well_development;
```
    Re-create the database
```bash
$ CREATE DATABASE feeling_well_development;
```
    Check on the database to confirm
```bash
$ \l
```
d. Repeat #4
e. Make git commit

</details>

## To initiate back-end server:
### Run `$ flask run` or `$ FLASK_ENV=development flask run`

# Front-end layer Setup:

## Clone

Clone the forked repo in the main feeling_well folder. Do _not_ clone this inside of the back-end project folder, because that will cause issues.


```bash
$ git clone https://github.com/goldenkairos/feeling-well-app.git
```

<details>

<summary>Click here to expand front-end layer setup steps.</summary>

## Manage Dependencies
```bash
$ yarn install
```

## Creating a `.env` File

Create a file named `.env`.

The front-end layer needs to send API requests to the back-end layer. In order to handle this, the front-end layer repo **must** include a `.env` file with this line:

```
REACT_APP_BACKEND_URL=http://localhost:5000
```

## Create a firebase project for authentication
https://firebase.google.com/

1. Add project
2. Enter project name => Create Project
3. Build/Authentication feature => Get started
4. Enable Email/Password in Sign-in method tab
5. Go to project setting, click thje </> icon to add a web app
6. Register app at "Add Firebase to your web app" window, enter app name "feeling-well". You should receive Firebase SDK keys
7. In your front end project, same level as App.js, # Create a `.env.local` File

Update the file and replace the value below with SDK keys provided by firebase

```bash
REACT_APP_FIREBASE_API_KEY = `apiKey`
REACT_APP_FIREBASE_AUTH_DOMAIN = `authDomain`
REACT_APP_FIREBASE_DATABASE_URL = `https://app-name.firebaseio.com`
REACT_APP_FIREBASE_PROJECT_ID=`projectID`
REACT_APP_FIREBASE_STORAGE_BUCKET = `storageBucket`
REACT_APP_FIREBASE_MESSAGING_SENDER_ID = `messagingSenderId`
REACT_APP_FIREBASE_APP_ID = `appId`
```
#If Receive firebase invalid api auth error message and project isnt launched, drag the `.env.local` to the same level as the `.env` file.

</details>

## To initiate front-end server:
### Run `$ yarn start`

# Credit
D3 Feeling Wheel source code: https://github.com/epleaner/emotions-wheel
