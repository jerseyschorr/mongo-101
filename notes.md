mongo-101
=========


# Load some data

```sh
npm run load-bread
npm run load-chicken
```

# Lets add an index

`npm run add-indexes`

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
