/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: Contacts management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the contact.
 *         email:
 *           type: string
 *           description: Email address of the contact.
 *         phone:
 *           type: number
 *           description: Phone number of the contact.
 *         favorite:
 *           type: boolean
 *           enum: [false, true]
 *           default: false
 *           description: Indicates whether the contact is a favorite.
 *         owner:
 *           type: string
 *           format: uuid
 *           description: ID of the user who owns the contact.
 *       required:
 *         - name
 *         - email
 *         - phone
 */

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Get all contacts
 *     description: Get all contacts belonging to the authenticated user
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 contacts:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Contact'
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /contacts/{email}:
 *   get:
 *     summary: Get a contact by email
 *     description: Get details of a contact by email belonging to the authenticated user
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: Email of the contact to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       404:
 *         description: Contact not found
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Create a new contact
 *     description: Create a new contact for the authenticated user
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                  email:
 *                      type: string
 *                  phone:
 *                      type: number
 *     responses:
 *       201:
 *         description: Contact created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 phone:
 *                   type: number
 *                 owner:
 *                   type: string
 *       404:
 *         description: Contact with such an email already exists
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /contacts/{email}:
 *   delete:
 *     summary: Delete a contact by email
 *     description: Delete a contact by email belonging to the authenticated user
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: Email of the contact to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact deleted successfully
 *       404:
 *         description: Contact not found
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /contacts/{email}:
 *   put:
 *     summary: Update a contact by email
 *     description: Update details of a contact by email belonging to the authenticated user
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: Email of the contact to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 phone:
 *                   type: number
 *     responses:
 *       200:
 *         description: Contact updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       404:
 *         description: Contact not found
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /contacts/{email}/favorite:
 *   patch:
 *     summary: Update the favorite status of a specific contact
 *     description: Update the favorite status of a specific contact belonging to the authenticated user
 *     tags:
 *       - Contacts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: Email of the contact to update the favorite status
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               favorite:
 *                 type: boolean
 *             required:
 *               - favorite
 *     responses:
 *       '200':
 *         description: Favorite status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       '400':
 *         description: Missing or invalid favorite field
 *       '404':
 *         description: Contact not found
 *       '401':
 *         description: Not authorized
 *       '500':
 *         description: Internal Server Error
 */
