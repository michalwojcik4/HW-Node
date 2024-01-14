# Contacts REST API

This project is a simple REST API for managing a collection of contacts. It utilizes Express.js for the web server, with additional middleware for logging (morgan) and handling Cross-Origin Resource Sharing (CORS). The API supports basic CRUD operations for contacts stored in a JSON file.

## Getting Started

### Prerequisites

- Node.js installed
- npm (Node Package Manager) installed
- Postman for testing the API

### Installation

1. Clone the repository:

`git clone https://github.com/your-username/contacts-api.git`

2. Switch to the project directory:

`cd contacts-api`

3. Install dependencies:

`npm install`

### Usage

Start the server:

`npm start`

The server will be running at http://localhost:3000.

## API Routes

### GET /api/contacts

- Description: Retrieve all contacts.
- Request: None
- Response:
  - Body: Array of contacts in JSON format
  - Status Code: 200

### GET /api/contacts/:id

- Description: Retrieve a specific contact by ID.
- Request:
  - Params: id - Contact ID
- Response:
  - Body: Contact object in JSON format
  - Status Code: 200 if found, 404 if not found

### POST /api/contacts

- Description: Add a new contact.
- Request:
  - Body: JSON object with name, email, and phone fields (all mandatory)
- Response:
  - Body: Newly added contact object with assigned ID
  - Status Code: 201 if successful, 400 if missing required fields

### DELETE /api/contacts/:id

- Description: Delete a contact by ID.
- Request:
  - Params: id - Contact ID
- Response:
  - Body: JSON object with message
  - Status Code: 200 if successful, 404 if not found

### PUT /api/contacts/:id

- Description: Update a contact by ID.
- Request:
  - Params: id - Contact ID
  - Body: JSON object with fields to update (name, email, phone)
- Response: - Body: Updated contact object - Status Code: 200 if successful, 400 if missing fields, 404 if not found

## Data Validation

Data validation is performed using the Joi library. For routes that accept data (POST and PUT), ensure to include all required fields and validate against the specified schema.

## Additional Notes

- This project uses Express.js, Morgan, CORS, and Joi for data validation.
- Contacts are stored in a JSON file (contacts.json).
- Ensure to test API endpoints using Postman or a similar tool.
