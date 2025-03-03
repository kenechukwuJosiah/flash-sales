# Flash Sale System

This is a flash sale system built with Node.js, Express, Mongoose, and TypeScript.

## Setup

1. Clone the repository
2. Install dependencies with `npm install`
3. Create a `.env` file with the following variables:
	* `MONGODB_URI`: the URI of your MongoDB database
	* `JWT_SECRET`: a secret key for JWT tokens
4. Run `npm run seed` to seed the database with some sample data
5. Run `npm run build` to build the project
6. Run `npm run start` to start the server

### Seeding

* Run `npm run seed` to seed the database with some sample data. This will create 5 users and 5 products.
* The users created are:
	+ email: `user1@example.com`, password: `user1123`
	+ email: `user2@example.com`, password: `user2123`

## Usage

1. Use `http://localhost:3000` as base Url
2. Register a new user by sending a `POST` request to `/api/auth/register` with the following JSON body:
	* `name`: the user's name
	* `email`: the user's email
	* `password`: the user's password
3. Login as the user by sending a `POST` request to `/api/auth/login` with the following JSON body:
	* `email`: the user's email
	* `password`: the user's password
4. Get the user's profile by sending a `GET` request to `/api/auth/me`
5. Get the leaderboard by sending a `GET` request to `/api/leaderboard`
6. Purchase a product by sending a `POST` request to `/api/sale/purchase` with the following JSON body:
	* `productId`: the ID of the product to purchase
7. Get the product's stock by sending a `GET` request to `/api/sale/stock/:productId`

## Protected Routes

Some routes are protected and require a Bearer token to be sent in the `Authorization` header. To get a token, login as a user and use the token provided in the response.

## API Endpoints

### Auth

* `POST /api/auth/register`: register a new user
* `POST /api/auth/login`: login as a user
* `GET /api/auth/me`: get the user's profile

### Leaderboard

* `GET /api/leaderboard`: get the leaderboard with pagination
  ### Query params
	+ `page?: number`: the page number (default is 1)
	+ `pageSize?: number`: the number of items per page (default is 1000)
	+ `sort?: string`: the sort order (default is `createdAt|desc`)

### Sales

* `POST /api/sale/purchase`: purchase a product
* `GET /api/sale/stock/:productId`: get the product's stock

## Models

### User

* `_id`: the user's ID
* `name`: the user's name
* `email`: the user's email
* `password`: the user's password
* `role`: the user's role (either `user` or `admin`)
* `createdAt`: the date the user was created
* `updatedAt`: the date the user was last updated

### Product

* `_id`: the product's ID
* `name`: the product's name
* `totalUnits`: the total number of units available for the product
* `availableUnits`: the number of units available for the product
* `saleStartTime`: the date and time the sale starts
* `saleEndTime`: the date and time the sale ends

### Purchase

* `_id`: the purchase's ID
* `userId`: the ID of the user who made the purchase
* `productId`: the ID of the product purchased
* `purchaseTime`: the date and time the purchase was made


### Pagination

The pagination is done by using the `Pagination` class from `src/utils/pagination.ts`

* `prePaginate`: takes a `PaginationOptions` object and returns a `PaginationOptions` object with the `offset`, `limit`, and `sortFields` properties set
* `postPaginate`: takes a `PaginationResult` object and returns a `PaginationResult` object with the `totalItems`, `totalPages`, `currentPage`, and `items` properties set

The `PaginationOptions` object has the following properties:

* `page`: the page number (default is 1)
* `pageSize`: the number of items per page (default is 1000)
* `sort`: the sort order (default is `createdAt|desc`)

The `PaginationResult` object has the following properties:

* `totalItems`: the total number of items
* `totalPages`: the total number of pages
* `currentPage`: the current page number
* `items`: an array of the items on the current page
