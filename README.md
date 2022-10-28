# users-api
# Node JS API for CRUD operations of users in an application
# This is an api that is developed using Node JS, Express JS and Mysql Database
# In this API you can add, update user information
# You can also user information by user id or you can get all users information
# You can delete user by his id
# This API also provides the authentication and authrization of user with the web token
# This API can be using different Tool, here I used Postman to test the API
# The POST method for the http://localhost:3000/api/login route is used to log into the user using his email and password
# The POST method for the http://localhost:3000/api/ route is used to create a new user with firstname, lastname, email, password, gender and phone parameter passed.
# The GET method for http://localhost:3000/api/ route is used to get all registered users.
# The GET method for http://localhost:3000/api/:{id} route is used to return the information of the user whose id is equal to the passed id
# The PATCH method for http://localhost:3000/api/ route is used to update user information with firstname, lastname, email, password, gender and phone parameter passed
# The DELETE method for http://localhost:3000/api/:{id} route is used todelete the user with id is passed