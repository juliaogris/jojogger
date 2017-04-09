JoggingTracker
==============

An application that tracks jogging times of users.   
[Demo](https://jojogger.herokuapp.com/)

Requirements
------------
### User Interface
* User must be able to create an account and log in.
* When logged in, a user can see, edit and delete his times he entered.
* Implement at least 3 roles with different permission levels: 
	- a regular user would only be able to CRUD on their owned records
	- a user manager would be able to CRUD users
	- an admin would be able to CRUD all records and users.
* Each time entry when entered has a date, distance, and time.
* When displayed, each time entry has average speed.
* Filter by dates from-to.
* Report on average speed & distance per week.
* It has to be a Single Page App

### REST API
* Perform all user actions via the API, including authentication
* Create functional tests that use the REST Layer directly. 
* Be prepared to use REST clients like Postman, cURL, etc.

### Bonus
* Unit tests
* End to end tests
* Keep design as tidy as possible.


Development setup
-----------------
* Install Node >= 7.7

#### Database setup
* [Heroku app](https://dashboard.heroku.com/apps/jojogger)  
* MondDB database on [MLab](https://www.mlab.com/)
* Install Heroku CLI
* `heroku auth`
* Add heroku remote `https://git.heroku.com/jojogger.git`
* `cp .env.sample .env`
* Copy values from `heroku config` to `.env` file

Alternatively install MongDB locally and modify `.env` accordingly

#### Backend
* `npm install`
* `npm run dev`
* test with `curl -H 'authorization: Basic YWRtaW5AeC5jbzoxMjM0NTY=' http://localhost:5000/api/users?pretty`
* `npm run e2e`


#### Frontend
* `cd react-ui`
* `npm install`
* `npm start`
* test http://localhost:3000 in your browser

#### Deployment
* git push heroku
* test https://jojogger.herokuapp.com in your browser
* test with `npm run e2e-prod`

RESTful API
------------

### Login
Login is not a truly RESTful endpoint nonetheless provided as part of the API for convenience

|Method  |Sample URL       | Roles with access                             |
|--------|-----------------|-----------------------------------------------|
|GET     | api/login       | admin, manager, user, unauthorized            |


### Users
|Method  |Sample URL       | Roles with access                             |
|--------|-----------------|-----------------------------------------------|
|GET     | api/users       | admin, manager                                |
|POST    | api/users       | admin, manager, user, unauthorized            |
|GET     | api/users/:uid  | admin, manager, user.uid                      |
|PUT     | api/users/:uid  | admin, manager (if uid not admin), user.uid   |
|DELETE  | api/users/:uid  | admin, manager (if uid not admin), user.uid   |


#### Jogs
|Method  |Sample URL               | Roles with access            |
|--------|-------------------------|------------------------------|
|GET     | api/users/:uid/jogs/    | admin, user.uid              |
|POST    | api/users/:uid/jogs/    | admin, user.uid              |
|GET     | api/users/:uid/jogs/:id | admin, user.uid              |
|PUT     | api/users/:uid/jogs/:id | admin, user.uid              |
|DELETE  | api/users/:uid/jogs/:id | admin, user.uid              |


Errors
------
* 1xx: authentication related
* 2xx: access / authorisation related
* 3xx: invalid input
* 4xx: no data for ID

Curl examples
-------------

__POST api/users :__  create new users
`curl -H 'content-type: application/json' -d '{"email": "xyz@x.co", "password": "123456"}' http://localhost:5000/api/users?pretty`

__GET api/users :__ list all users with admin account
`curl -H 'authorization: Basic YWRtaW5AeC5jbzoxMjM0NTY=' http://localhost:5000/api/users?pretty`

__GET api/users/:uid :__ get admin user with admin account
`curl -H 'authorization: Basic YWRtaW5AeC5jbzoxMjM0NTY=' http://localhost:5000/api/users/58e0d0af542e0921b3909f73?pretty`
