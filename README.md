# Backend of Catalog of product

- `npm i` for installing node_modules
- `npm run dev` for development
- default URL: http://localhost:3000

Api url from host: https://gadjets-store-apu.onrender.com/

For migrating data to your local DB use **npm run db-init-all**

Example of .env in .env.example file.

Enpoints:
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

