![jasny-banner](https://user-images.githubusercontent.com/100821/62123924-4c501c80-b2c9-11e9-9677-2ebc21d9b713.png)

MongoDB Northwind
===

A MongoDB version of the Microsoft Access 2010 Northwind sample database.

The Northwind database is an excellent tutorial schema for a 
small-business ERP, with customers, orders, inventory, purchasing, 
suppliers, shipping, employees, and single-entry accounting.

_The MongoDB Northwind database is created from
[MyWind](https://github.com/dalers/mywind); a MySQL version of Northwind._

Installation
---

    ./mongo-import.sh northwind
    
Differences between original and MongoDB Northwind
---

* Primary key field is `_id` for all collections.
* `order_details` are embedded as `details` field in the `orders` collection.
* `purchase_order_details` are embedded as `details` field in the `purchase_order` collection.
* `employee_privileges` is replaced with a list of privilege ids in the `employee` collection.
* `products.supplier_ids` is a list of ids (`int`) rather than a comma separated string.

