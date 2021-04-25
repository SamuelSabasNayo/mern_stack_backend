[![Build Status](https://travis-ci.org/key-joshua/Ksdacllp-Backend.svg?branch=develop)](https://travis-ci.org/key-joshua/Ksdacllp-Backend)
[![CircleCI](https://circleci.com/gh/key-joshua/Ksdacllp-Backend.svg?style=svg)](https://circleci.com/gh/key-joshua/Ksdacllp-Backend)
[![Coverage Status](https://coveralls.io/repos/github/key-joshua/Ksdacllp-Backend/badge.svg?branch=develop)](https://coveralls.io/github/key-joshua/Ksdacllp-Backend?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/46ec829a6c58d122a657/maintainability)](https://codeclimate.com/github/key-joshua/Ksdacllp-Backend/maintainability)

# FRONTEND CHALLEGE

- This Backend Challenge

#### This is the Hosted link of the backend challenge [Access endpoint Direct]

https://ksdacllp-backend.herokuapp.com

#### This is the Github repository link of the backend repo 

https://github.com/key-joshua/Ksdacllp-Backend

<br>

## Features

- Create a user account.
- Verify a user account.
- Resend a verification link.
- login a user into verified account.
- Etc ...

## Test SalonEverywhere APIs

Before we get started Remember to take  :coffee:   :pizza:  and :dancer:   When You Are coding, come on Dude it all about relax

## Backend tools

 - All Neccessary libraries.
 - Express JS.
 - NodeJs.


#### TABLE OF API ENDPOINTS SPECIFICATION AND DESCRIPTION

- Version API using URL versioning starting with https://ksdacllp-backend.herokuapp.com/api/path  


|NO  | VERBS  | ENDPOINTS                            | STATUS       | ACCESS      | DESCRIPTION                                |
|----|--------|--------------------------------------|--------------|-------------|--------------------------------------------|
| 1  | POST   | /api/auth/register-user              | 201 CREATED  | private     | create a user with email and password      |
| 2  | POST   | /api/auth/verify-user-account        | 200 OK       | public      | verify user account through emailed link   |
| 3  | POST   | /api/auth/resend-verification-link   | 200 OK       | public      | resend link through user email             |
| 4  | POST   | /api/auth/login-user                 | 200 OK       | public      | login a user with email and password       |
| 5  | Etc    | .....................                | ......       | ......      | ......................................     |


#### Other Tools

Other tools and technologies used in development of this application are;
- Hosting: [Heroku](https://heroku.com/).
- Compiler: [Babel](https://babeljs.io/).
- Style Guide: [Airbnb](https://airbnb.io/projects/javascript/).
- Framework: [ExpressJS](http://expressjs.com/).
- Documentation: [Swagger](https://swagger.io/).
- Linting Library: [ESLint](https://eslint.org/).
- API Testing environment: [Postman](https://www.getpostman.com).
- Programming language: [JavaScript(ES6)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/).
- Text Editor: [VSCode](https://code.visualstudio.com), [Sublime Text](https://www.sublimetext.com/).

## GETTING START WITH PROJECT

- Install the required dependencies found in package.json by running this command:
 ```
npm install
 ```
- And then to start running  this project on your machine , run this command:
 ```
npm run server
 ```
- then to run test, run this commands:
 ```
npm run kill
```
 ```
- npm run test
```
