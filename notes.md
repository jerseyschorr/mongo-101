mongo-101
=========

# Load some data

```sh
npm run add-bread
npm run add-chicken
```

or

```
DEBUG=app:* node ./load.js ./data/bread.json
DEBUG=app:* node ./load.js ./data/chicken.json
```

# Lets add an index

`DEBUG=app:* node ./addIndexes.js`

# Get a list of all ingredients

```MongoDB
db.getCollection('recipes').aggregate([
  { $unwind: "$ingredients" },
  { $group: { _id: "$ingredients.item" } },
  { $sort: { _id: 1 }}
])
```

# Fix a typo

```MongoDB
db.getCollection('recipes').update(
  { "ingredients.item": "Slat" },
  { $set: { "ingredients.$.item": "Salt" } },
  { multi: true })
```

# Delete
```MongoDB
db.getCollection('recipes').remove(
  { "recipe_name": "Banana Bread" },
  { justOne: true }
)
```
