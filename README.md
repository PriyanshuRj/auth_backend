# Authentication

This repository contains  ExpressJS API's based backend code that can be used to login adn signup


## 👨🏻‍🔬 Set up and run The Server

### 📃 Clone

Clone the repository from GitHub.

```
$ git clone https://github.com/PriyanshuRj/auth_backend.git
```



#### 📂 Create your .env file

1. After cloning the project navigate to the project directory using `cd marketplace` command.
2. Generate `.env` in the directory.
3. Add parameter to the env file.

Following parameters are required :


| Variable Name                     | Description                    |
|-----------------------------------|--------------------------------|
| DB                   | Path to a local mongo DB session. |
| EMAIL_USERNAME                   | Email that sends the OTP mail to the users. |
| EMAIL_PASSWORD                   | Password to the above that sends the OTP mail to the users. |


An example `.env` file looks like :

```
DB=mongodb://localhost:27017/authlog
EMAIL_USERNAME=priyanshuauth@gmail.com
EMAIL_PASSWORD=Priyanshu@1234
```


### 💻 Install Dependencies and Run the Server

```
$ npm install
$ npm run start
```
Now, use you can use the use the API's and try them out.


## ⚙️ Specification

### /signup POST
This endpoint can be used to register a new user.

```http
POST https://localhost:8000/signup HTTP/1.1
Content-type: application/json;

{
    "username":"string",
    "password":"string",
    "mobileno":"number",
    "email":"string"
}

Response:
{
    "message": "User created !!",
}
```

### /login POST
This endpoint can be used to login a old user.

```http
POST https://localhost:8000/login HTTP/1.1
Content-type: application/json;

{
    "email":"string"
    "password":"string",
}

Response:
{
    "message": "Correct credential",
    "state":"1"
}
```


### /otpverify POST
This endpoint can be used to login a old user.

```http
POST https://localhost:8000/otpverify HTTP/1.1
Content-type: application/json;

{
    "email":"string"
    "otp":"number",
}

Response:
{
    "message": "OTP is correct !!",
}
```

### /requestotp POST
This endpoint can be used to login a old user.

```http
POST https://localhost:8000/requestotp HTTP/1.1
Content-type: application/json;

{
    "email":"string"
}

Response:
{
    "message": "OTP send successfully !!",
}
```
