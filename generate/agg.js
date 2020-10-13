db.purchase_order_details.aggregate([
  {$set:{date_received: {$toDate: "$date_received"}, posted_to_inventory: {$toBool: "$posted_to_inventory"}}},
  {$out: "purchase_order_details"}
]);

db.purchase_orders.aggregate([
  {$set: {submitted_date: {$toDate: "$submitted_date"}, creation_date: {$toDate: "$creation_date"}, approved_date: {$toDate: "$approved_date"}}},
  {$lookup: {from:"purchase_order_details", localField:"_id", foreignField:"purchase_order_id", as:"details"}},
  {$unset: ["details._id", "details.purchase_order_id"]},
  {$out: "purchase_orders"}
]);

db.orders.aggregate([
  {$set: {order_date: {$toDate: "$order_date"}, shipped_date: {$toDate: "$shipped_date"}, paid_date: {$toDate: "$paid_date"}}},
  {$lookup: {from:"order_details", localField:"_id", foreignField:"order_id", as:"details"}},
  {$unset: ["details._id", "details.order_id"]},
  {$out: "orders"}
]);

db.products.aggregate([
  {$set: {supplier_ids: {$split: [{$toString: "$supplier_ids"}, ";"]}, discontinued: {$toBool: "$discontinued"}}},
  {$set: {supplier_ids: {$map: {input: "$supplier_ids", as: "supplier_id", "in": {$toInt: "$$supplier_id"}}}}},
  {$out: "products"}
]);

db.inventory_transactions.aggregate([
  {$set:{transaction_created_date: {$toDate: "$transaction_created_date"}, transaction_modified_date: {$toDate: "$transaction_modified_date"}}},
  {$out: "inventory_transactions"}
]);

db.invoice.aggregate([
  {$set:{invoice_date: {$toDate: "$invoice_date"}}},
  {$out: "invoice"}
]);

db.employees.aggregate([
  {$lookup: {from:"employee_privileges", localField:"_id", foreignField:"employee_id", as:"privileges"}},
  {$set: {privileges: "$privileges.privilege_id"}},
  {$out: "employees"}
]);

db.purchase_order_details.drop();
db.order_details.drop();

