# accuKnoxTaskLoginSignup
Detailed Technical Specifications:
installation Command
1. npm install
2. https://ethereal.email/ => click on create Ethereal account => copy the Nodemailer configuration      exact in "./src/controllers/auth.controller.js" from line no 18 to 25
3. you can see emails by clicking the open mailbox or message section
4. Install MongoDB in local create an account
4. npm start



Api's Description

1. http://localhost:5000/register
a. It is for registration 
b. body requirements-: 
       {
            "email":"a@gmail.com",
            "password":"t7drrredd75"
        }
2. http://localhost:5000/verify:token
a. After registration email must be verified.

3. http://localhost:5000/login
a. For Login 
b. body requirements-: 
       {
            "email":"a@gmail.com",
            "password":"t7drrredd75"
        }


Summary: 

1. User register:
   - The user should be able to register by providing their email and password.
   - The email address should be validated for a valid format.
   - The password should adhere to the specified password policy (e.g., minimum length, complexity requirements).
   - The user's email and password should be securely stored in the database.
   - Upon successful sign-up, the user's account should be created and marked as unverified.

2. Email Verification:
   - An email verification link should be sent to the user's provided email address after sign-up.
   - The verification link should expire after a specified period (e.g., 24 hours).
   - When the user clicks the verification link, their account should be marked as verified in the database.
   - Invalid or expired verification links should be handled gracefully with appropriate error messages.

3. TOTP (Time-Based One-Time Password) Registration:
   - The user should be able to register a TOTP for two-factor authentication.
   - A TOTP secret key should be generated for the user and stored securely in the database.
   - The TOTP secret key should be associated with the user's account.
   - The TOTP should be validated during the login process.

4. User Login:
   - The user should be able to log in by providing their email and password.
   - The provided email and password should be validated against the stored user credentials in the database.
   - Successful login should generate an authentication token/session for the user.
   - Invalid login attempts should be handled gracefully with appropriate error messages.

Examples of Tiered Test Cases:

Unit Test Cases (using a testing library like Jest or NUnit):
1. Test that the user's email is validated correctly.
2. Test that the password adheres to the specified password policy.
3. Test that the email verification link is sent to the user's email after sign-up.
4. Test that the email verification link expires after the specified period.
5. Test that the user's account is marked as verified after clicking the verification link.
6. Test that the TOTP secret key is generated and stored securely in the database.
7. Test that the TOTP is successfully registered and associated with the user's account.
8. Test that the user's login credentials are validated correctly.
9. Test that the authentication token/session is generated after successful login.

Integration Test Cases (using a testing library like Cypress or Selenium):
1. Test the end-to-end flow of user register, email verification, TOTP registration, and login.
2. Test the integration between the sign-up functionality and the email verification functionality.
3. Test the integration between the sign-up functionality and the TOTP registration functionality.
4. Test the integration between the login functionality and the TOTP validation functionality.

End-to-End (E2E) Test Cases (using a testing library like Cypress or Selenium):
1. Test the complete user journey from register to login, including email verification and TOTP registration.
2. Test the user experience of entering the TOTP during the login process.
3. Test the error handling and error messages for invalid login attempts.

Testing Libraries/Approaches Considered:

1. Jest: Jest is a popular JavaScript testing framework that provides a simple and intuitive API for writing unit tests. It has good support for assertions, mocking, and code coverage analysis.

2. Cypress: Cypress is a modern JavaScript end-to-end testing framework that focuses on providing a great developer experience. It offers a rich set of features for writing E2E tests, including automatic waiting, real-time reloading, and built






A library that I used

   "bcryptjs": for Hashing
    "dotenv":  to store secrets key 
    "express":  for routing
    "moongose": to interact with database
    "nodemailer": for sending mail,
    "nodemon": to run server continuos



    Example of Database

    a.) Hashed Password is saving
    -------------------------------------------------
_id:645f22dfc1c6e3870506fb54
email:"asvv@gmail.com"
password:"$2a$08$mOVtu.GIWblRPcT1imdk6.jdFFxZNOqN7sV8Dr3Y1Bo6i4tcB92t2"
confirmationCode:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjpudWxsLCJpYXQiOjE2ODM5N…"
status:"Pending"
createdAt:2023-05-13T05:40:47.748+00:00
updatedAt:2023-05-13T05:40:47.748+00:00

