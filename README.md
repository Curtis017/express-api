# Express API

This is an express server that exposes a RESTful api.

---

## Responses
The following responses have been constructed by the interpretation of [RFC 7231](https://tools.ietf.org/html/rfc7231)
##### HTTP Response 201
An HTTP response of [201](https://tools.ietf.org/html/rfc7231#page-52) will imply the record has been created in the database successfully.
##### HTTP Response 400
An HTTP response of [400](https://tools.ietf.org/html/rfc7231#page-58) will imply that the provided data is invalid (i.e. does not match the type or pattern specified in the model).
##### HTTP Response 409
An HTTP response of [409](https://tools.ietf.org/html/rfc7231#page-60) will imply a duplicate key error (i.e. the record already exists).

## Configuration
To run the service you will need to create a *config.js* file in the root directory.
```js
// config.js
module.exports = {
  port: 3000,
  database: {
    development: 'dev-connection-string',
    test: 'test-connection-string',
    prod: 'prod-connection-string'
  },
  morgan: {
    development: 'dev',
    test: 'dev',
    prod: 'combined'
  }
}
``` 