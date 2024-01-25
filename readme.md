# Contacts REST API

This project is a simple REST API for managing a collection of contacts. It utilizes Express.js for the web server, with additional middleware for logging (morgan) and handling Cross-Origin Resource Sharing (CORS). The API supports basic CRUD operations for contacts stored in a JSON file.

### Swagger

A description of the endpoints can be found after: /api-docs

## Getting Started

### Prerequisites

- Node.js installed
- npm (Node Package Manager) installed
- Postman for testing the API

### Installation

1. Clone the repository:

`git clone https://github.com/michalwojcik4/contacts-api.git`

2. Switch to the project directory:

`cd contacts-api`

3. Install dependencies:

`npm install`

### Usage

Start the server:

`npm start`

The server will be running at http://localhost:3000.

## API Routes

### Users

#### POST /users/login

- Description: Authenticate and log in a user.
- Request:
  - Body: JSON object with email and password
- Response:
  - Body: JSON object with user information and token
  - Status Code: 200 if successful, 401 if authentication fails

#### POST /users/logout

- Description: Log out the authenticated user.
- Request: None
- Response:
  - Body: None
  - Status Code: 204 if successful, 401 if not authorized

#### GET /users/current

- Description: Get information about the current authenticated user.
- Request: None
- Response:
  - Body: JSON object with user email and subscription
  - Status Code: 200 if successful, 401 if not authorized

#### PATCH /users/subscription

- Description: Update the subscription of the current authenticated user.
- Request:
  - Body: JSON object with subscription field
- Response:
  - Body: Updated user object
  - Status Code: 200 if successful, 400 if missing fields, 401 if not authorized, 404 if user not found

#### PATCH /users/avatar

- Description: Update the avatar of the current authenticated user.
- Request:
  - Body: Form data with avatar file
- Response:
  - Body: JSON object with updated user email and avatar URL
  - Status Code: 200 if successful, 400 if no file uploaded, 401 if not authorized, 500 if internal server error

### Contacts

#### GET /contacts

- Description: Retrieve all contacts.
- Request: None
- Response:
  - Body: Array of contacts in JSON format
  - Status Code: 200

#### GET /contacts/:email

- Description: Retrieve a specific contact by ID.
- Request:
  - Params: id - Contact ID
- Response:
  - Body: Contact object in JSON format
  - Status Code: 200 if found, 404 if not found

#### POST /contacts

- Description: Add a new contact.
- Request:
  - Body: JSON object with name, email, and phone fields (all mandatory)
- Response:
  - Body: Newly added contact object with assigned ID
  - Status Code: 201 if successful, 400 if missing required fields

#### DELETE /contacts/:email

- Description: Delete a contact by ID.
- Request:
  - Params: id - Contact ID
- Response:
  - Body: JSON object with message
  - Status Code: 200 if successful, 404 if not found

#### PUT /contacts/:email

- Description: Update a contact by ID.
- Request:
  - Params: id - Contact ID
  - Body: JSON object with fields to update (name, email, phone)
- Response:
  - Body: Updated contact object
  - Status Code: 200 if successful, 400 if missing fields, 404 if not found

#### PATCH /contacts/:email/favorite

- Description: Update a favorite in contact by ID.
- Request:
  - Params: id - Contact ID
  - Body: JSON object with fields to update (favorite)
- Response:
  - Body: Updated contact object
  - Status Code: 200 if successful, 400 if missing fields, 404 if not found

## Data Validation

Data validation is performed using the Joi library. For routes that accept data (POST and PUT), ensure to include all required fields and validate against the specified schema.

## Additional Notes

- This project uses Express.js, Morgan, CORS, and Joi for data validation.
- Contacts are stored in a JSON file (contacts.json).
- Ensure to test API endpoints using Postman or a similar tool.
