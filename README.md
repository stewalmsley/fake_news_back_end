NorthCoders News Dashboard - https://steve-news.herokuapp.com/

This Project provides a backend to be used in an interactive news app, allowing users to search for user profiles, articles by topic, post articles, comment on articles, up/down vote articles and comments, and delete comments.


Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

Prerequisites

This project runs with NODE - further dependencies can be installed using NPM Install.
Packages used are Express, Body-Parser, Mongoose. 
Chai, Mocha and SuperTest are required for testing.

fork, clone, cd, npm install, config, seed, testing

Fork the repositary and clone it. From the terminal, CD into the repositary, and then run code . 
in your terminal to open the repositary in Visual Studio Code.

To install dependencies, run npm install

```http   
npm install 
```
You will also need to set up a config file in the DB folder, as per the below:

const NODE_ENV = process.env.NODE_ENV || 'development';

```js
const config = {
    test : 'mongodb://localhost:27017/news_test',
    development : 'mongodb://localhost:27017/news',
  }
      exports.DB_URL = config[NODE_ENV];
```

Once you have everything in place, you should be able to run the NPM RUN SEED-DEV command defined in the Package JSON to seed the development data into the Mongo Database. If you go to the Seed.js file in the Seed folder, 
and un-comment the console.log on line 24, then run NPM RUN SEED > test.txt you should be able to export all the seeded development data to a text file. 

You should also now be able to run NPM TEST in order to run tests. The test file seeds the test database before every test and checks that all the endpoints are functioning and have error handling in place. For example:

```js
 it('PATCH returns 200 and handles downvotes correctly', () => {
        return request.patch(`/api/comments/${comment._id}?vote=down`)
          .expect(200)
          .then(res => {
            expect(res.body.comment.votes).to.equal(comment.votes - 1);
          })
      })
```
This test checks that a patch request on the comments path, with a specific Comment MONGO ID, 
and a request query of vote=down, will adjust down the overall number of votes for that comment by 1.
The test suite runs the seedDB function required in from the seed folder, which returns 
an article, comment, user and topic from the test database. This is then used for logic checks in the test
suite. 

Deployment

This can be deployed live on Heroku, with data stored in MLab. 
To do this you can create free accounts with Heroku and MLab. 
You will need to update your config file with the URL for MLab before seeding the database into production.
Once you create a project on Heroku you will need to add the MLAB URL into the project settings in Heroku. 
The app and listen files in this repositary are set up to work from Heroku via process.env, or to run on dev/test as appropriate. 


Authors
Steve Walmsley - under instructions from NorthCoders