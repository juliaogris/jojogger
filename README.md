JoggingTracker
==============

An application that tracks jogging times of users

Deadline
--------
10 April, 2017

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

Curls examples
--------------

__POST api/users :__  create new users
`curl -H 'content-type: application/json' -d '{"email": "xyz@x.co", "password": "123456"}' http://localhost:5000/api/users?pretty`

__GET api/users :__ list all users with admin account
`curl -H 'authorization: Basic YWRtaW5AeC5jbzoxMjM0NTY=' http://localhost:5000/api/users?pretty`

__GET api/users/:uid :__ get admin user with admin account
`curl -H 'authorization: Basic YWRtaW5AeC5jbzoxMjM0NTY=' http://localhost:5000/api/users/58e0d0af542e0921b3909f73?pretty`


TODO
----
* Nicer login UI like Auth0 screenshot for login
* Nicer error message
* JEST testing
* hash email & password for local storage.

* Check on IE and ios

* Clean install - make sure all node packaging is good.

* Docs on MONGODB_URI setup 
* Heroku docs
* write deploy and dev instructions
