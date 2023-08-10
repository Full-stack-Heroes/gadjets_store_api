# Backend of Catalog of product

- `npm i` for installing node_modules
- `npm run dev` for development
- default URL: http://localhost:3000

Api url from host: https://gadjets-store-apu.onrender.com/

For migrating data to your local DB use **npm run db-init-all**

Example of .env in .env.example file.

### Endpoints:
```
/products - returns all products
/products?productType= - return all products by category
/products?page= - return list of products by page (default ammount is 12)
/products?limit= - set limit to ammount of products on a page
/products?sortBy=price, screen, capacity, ram, year

/phones - returns list of phone cards
/phones/id - detail info about phone
/phones?page= - return list of products by page (default ammount is 12)
/phones?limit= - set limit to ammount of products on a page

/tablets - returns list of tablets cards
/tablets/id - detail info about tablets
/tablets?page= - return list of products by page (default ammount is 12)
/tablets?limit= - set limit to ammount of products on a page

/accessories - returns list of accessories cards
/accessories/id - detail info about accessories
/accessories?page= - return list of products by page (default ammount is 12)
/accessories?limit= - set limit to ammount of products on a page

returns {
  count: number,
  rows: [
    Product[]
  ]
}

----------------------------------------------------------------------------------

/products/discount - returns Product[] with discount
/phones(or any another category)/new - returns Product[] with brand new phones

returns Product[]

----------------------------------------------------------------------------------

/phones(or any another category)/:id - return data about Product
/accessories(or any another category)/:id/recommended - returns recomended Product[]
```
### Authorization

#### Register

For register you need to send json with next fields: 
POST: /user/register
JSON body: 

```json
{
  username: string,
  email: string,
  password: string,
}
```

It returns status 201 created and message `User created`
Returns 400 status with message `User already exists`

**Note:** Data validation implemented on client side

### Auth

For auth you need to
POST: /user/login

JSON body: 

```json
{
  email: string,
  password: string,
}
```

Returns 401 if user not exist with message 'User with this username isn\'t registered'

Returns 403 if wrong password with message 'Wrong password'

Returns 200 if user auth Successful with body: 

```json
{
  message: 'Auth Successful',
  token,
  userId: id,
  cartData, // Product[] with quantity
  favoritesData // Product[]
}
```
**Note:** Token needs to save in header `'Authorization': Bearer token` for next requets

### Manipulation with data

**GET**: /user/favorites - returns all users favorites
**POST**: /user/favorites - add new user favorite
Json body:
```json
{
  itemId: Product.id // Required
}
```

**DELETE**: /user/favorites - removes user favorite
Json body:
```json
{
  itemId: Product.id // Required
}
```

**GET**: /user/cart - returns all users cart items
**POST**: /user/favorites - add new user cartItem
Json body:
```json
{
  itemId: Product.id // Required
  quantity?: number // optional but better to sent that
}
```

**Note:** if cart item with this itemId and userId is created, it will be updating by quantiny

**DELETE**: /user/favorites - removes user cart item
Json body:
```json
{
  itemId: Product.id // Required
}
```
