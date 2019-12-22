const config = require('./src/config');
const AWS = require('aws-sdk');
const { Pool } = require('pg');
const _find = require('lodash/find');

const { credentials, pg } = config;

const pool = new Pool({
  connectionString: `postgresql://${pg.user}:${pg.pass}@family-website.cyezkkwugcvv.us-west-2.rds.amazonaws.com:5432/postgres`,
})


const dynamodb = new AWS.DynamoDB({
  region: 'us-west-2',
  accessKeyId: credentials.awsKey,
  secretAccessKey: credentials.awsSecret,
});

const rowsInserted = { count: 0, name: 'recipes'};
const tagsInserted = { count: 0, name: 'tags'};

function sqlCallback(query, values, iterator, cb) {
  return (err, res) => {
    if (err) {
      console.log({query, values});
      throw new Error(err);
    }

    iterator.count += 1

    console.log(iterator);
  }
}

function addTags(name, tags) {
  tags.forEach(({ category, label }) => {
    const values = [name, category, label]
    const query = `
      INSERT INTO app.recipe_tags (recipe_fk, tag_fk)
      VALUES((SELECT id_pk from app.recipes where "name" = $1), (SELECT id_pk from app.cookbook_tags where "category" = $2 and "label" = $3))
    `;


  pool.query(query, values, sqlCallback(query, values, tagsInserted))
  })
}

function addRecipe(dynamoItem) {
  const {
    title,
    ingredients,
    directions,
    tags,
    ...additionalProperties
  } = AWS.DynamoDB.Converter.unmarshall(dynamoItem);

  const { label } = _find(tags, { category: 'Section'});

  const query = `
    INSERT INTO app.recipes(cookbook_fk, author_fk, section_fk, name, ingredients, directions, additional_attributes)
    VALUES(1, 1, (SELECT id_pk from app.sections where "name" = $1), $2, $3, $4, $5)
    ON CONFLICT DO NOTHING;
  `;
  const values = [
    label,
    title,
    JSON.stringify(ingredients),
    JSON.stringify(directions),
    JSON.stringify(additionalProperties),
  ]

  pool.query(query, values, (err, res) => {
    sqlCallback(query, values, rowsInserted)(err, res);

    addTags(title, tags)
  })
}

function dynamoCallback(err, res) {
  if (err) {
    throw new Error(err)
  }

  res.Items.forEach(addRecipe);
}

dynamodb.scan({ TableName: 'LissnerRecipes' }, dynamoCallback)

