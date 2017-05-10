# Express API

This is an express server that exposes a RESTful api in order to handle user creation and authentication.

---

## Responses
The following responses have been constructed by the interpretation of [RFC 7231](https://tools.ietf.org/html/rfc7231)
##### HTTP Response 201
An HTTP response of [201](https://tools.ietf.org/html/rfc7231#page-52) will imply the record has been created in the database successfully. 
##### HTTP Response 400
An HTTP response of [400](https://tools.ietf.org/html/rfc7231#page-58) will imply that the provided data is invalid (i.e. does not match the type or pattern specified in the model).
##### HTTP Response 409
An HTTP response of [409](https://tools.ietf.org/html/rfc7231#page-60) will imply a duplicate key error (i.e. the record already exists).

---

## Data Validation
All validation should be handled in the corresponding database model using validate methods. The validate methods are called before each save and therefore do not cost a call to the database if validation fails. This also creates a single point of reference for validation. 

##### Emails
Emails should be validated. 

##### Passwords
Passwords should be between 8 and 64 characters long and should only contain letters, numbers, and a couple of special characters (i.e. !@()_`~#).
Password *confirmation* should be handled on the client side as a convenience to the user. The confirmation password should not be sent to the server.

##### First/Last Names
Names should be validated.

---

# TODO
AWS S3 bucket create, read, update, and delete
Linting
