# About This Project
This is a full stack web application designed to help anyone who wants to keep track of their emotions and feelings, whether they're looking to improve their mental health or simply want to reflect on their experiences. It is an excellent tool for people who want to better understand themselves and their emotions, and it's also great for people who want to monitor their progress over time.

Tech stacks:
1. We created the Feeling Well web application using a combination of `Flask`, `SQLAlchemy`, and `PostgreSQL` for the backend and database, and `React JS Vanilla`,  `React D3`, `firebase authentication` for the front-end.
    
2. We utilized Flask and SQLAlchemy to create the backend and handle database operations, such as creating, reading, deleting records. We also used PostgreSQL to store and manage the data entered by users.
   
3. For the front-end, we used `React JS Vanilla` to create the user interface and provide an interactive experience for users. We used `React D3` to create the colorful Feeling Wheel, from which allows users to select words that represent their emotions and display the frequencies of each word in a word cloud. We also created user authentication which allows the user to sign up and log in to their private account to create their own personalized feeling wordcloud.

# One-time Project Setup
Create a folder call "Feeling-well". 

Inside the folder, we will set up back-end and front-end

##Back-end layer Setup:
1. In terminal `git clone` the back-end project repo: https://github.com/goldenkairos/back-end-feeling-well.git

$ git clone https://github.com/goldenkairos/back-end-feeling-well.git

<details>
<summary>Only do this if back-end heroku deployment is no longer available</summary>
In project directory in the terminal, enter the below syntax to launch project in VScode
$ code .

2. Managing Dependencies
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

3. Setting Up The Database

Create a database named `feeling_well_development`.

## Creating a `.env` File

Create a file named `.env`.

Add this environment variable: `FLASK_ENV=development`

Also, add the environment variable `SQLALCHEMY_DATABASE_URI` to hold the path to your development database.

Your `.env` may look like this:

```
FLASK_ENV=development
SQLALCHEMY_DATABASE_URI=postgresql+psycopg2://postgres:postgres@localhost:5432/feeling_well_development
```

4. Initiate Database
$ flask db init
$ flask db migrate
$ flask db upgrade

5. Making updates in Database:

a. If update the model in the database, make sure (the member who makes the change) to run the following:
$ flask db migrate
$ flask db upgrade
$ git add .
$ git commit -m"Update model"
$ git push

b. If another team member makes update, and another user needs to pull the update:
$ git pull
$ flask db upgrade

6. If files are unable to take the updates, delete the migration when there is migration issue:
a. Delete the migration table in terminal
$ psql -U postgres
$ DATABASE feeling_well_development;
b. Re-create the database
$ CREATE DATABASE feeling_well_development;
c. Check on the database to confirm
$ \l
d. Repeat #4
e. Make git commit

</details>