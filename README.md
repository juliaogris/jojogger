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

Questions
---------

* Can I use Firebase?
* How should I understand the 3 roles? (especially the user manager)

TODO
----
* Forgot password
* Nicer login UI like Auth0 screenshot
