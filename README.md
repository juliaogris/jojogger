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


API by sample
-------------
RESTful API

### Users
|Method  |Sample URL       | Roles with access                             |
|--------|-----------------|-----------------------------------------------|
|GET     | api/users       | admin, manager                                |
|POST    | api/users       | admin, manager, user                          |
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

Curls
-----
#### POST api/users

```bash
# create valid users
curl -H 'content-type: application/json' -d '{"email": "admin@x.co", "password": "123456"}' http://localhost:5000/api/users?pretty
curl -H 'content-type: application/json' -d '{"email": "manager@x.co", "password": "123456"}' http://localhost:5000/api/users?pretty
curl -H 'content-type: application/json' -d '{"email": "regular@x.co", "password": "123456"}' http://localhost:5000/api/users?pretty
curl -H 'content-type: application/json' -d '{"email": "test@x.co", "password": "123456"}' http://localhost:5000/api/users?pretty
# invalid email
curl -H 'content-type: application/json' -d '{"email": "badatx.co", "password": "123456"}' http://localhost:5000/api/users?pretty
# password too short
curl -H 'content-type: application/json' -d '{"email": "x@x.co", "password": "12345"}' http://localhost:5000/api/users?pretty

```

#### GET api/users 
Update `role` of `admin@x.co` to `admin` in database

```bash
curl -H 'authorization: Basic YWRtaW5AeC5jbzoxMjM0NTY=' http://localhost:5000/api/users?pretty
```
_id: "58e0d0af542e0921b3909f73" email: "admin@x.co"   auth: "Basic YWRtaW5AeC5jbzoxMjM0NTY="
_id: "58e0d0b0542e0921b3909f74" email: "manager@x.co" auth: "Basic bWFuYWdlckB4LmNvOjEyMzQ1Ng=="
_id: "58e0d0b1542e0921b3909f75" email: "regular@x.co" auth: "Basic cmVndWxhckB4LmNvOjEyMzQ1Ng=="

#### GET api/users/:uid 

```bash
# valid access
curl -H 'authorization: Basic YWRtaW5AeC5jbzoxMjM0NTY=' http://localhost:5000/api/users/58e0d0af542e0921b3909f73?pretty
curl -H 'authorization: Basic YWRtaW5AeC5jbzoxMjM0NTY=' http://localhost:5000/api/users/58e0d0b0542e0921b3909f74?pretty
curl -H 'authorization: Basic YWRtaW5AeC5jbzoxMjM0NTY=' http://localhost:5000/api/users/58e0d0b1542e0921b3909f75?pretty
curl -H 'authorization: Basic cmVndWxhckB4LmNvOjEyMzQ1Ng==' http://localhost:5000/api/users/58e0d0b1542e0921b3909f75?pretty
# no access rights - regular user accessing admin account
curl -H 'authorization: Basic cmVndWxhckB4LmNvOjEyMzQ1Ng==' http://localhost:5000/api/users/58e0d0af542e0921b3909f73?pretty
# invalid userID
curl -H 'authorization: Basic cmVndWxhckB4LmNvOjEyMzQ1Ng==' http://localhost:5000/api/users/INVALID?pretty
curl -H 'authorization: Basic YWRtaW5AeC5jbzoxMjM0NTY=' http://localhost:5000/api/users/INVALID?pretty
curl -H 'authorization: Basic YWRtaW5AeC5jbzoxMjM0NTY=' http://localhost:5000/api/users/48e0d0af542e0921b3909f73?pretty
```

TODO
----
* Nicer login UI like Auth0 screenshot for login
* Check on IE and ios
* Docs on MONGODB_URI setup 
* Heroku docs
* Clean instal - make sure all node packaging is good.
* write deplaoy and dev instructions
* testing!!
