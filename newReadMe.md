NorthCoders News Dashboard

This Project provides a backend to be used in an interactive news app, allowing users to search for user profiles, articles by topic, post articles, comment on articles, up/down vote articles and comments, and delete comments.


Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

Prerequisites

This project runs with NODE - further dependencies can be installed using NPM Install.
Packages used are Express, Body-Parser, Mongoose. 
Chai, Mocha and SuperTest are required for testing.

fork, clone, cd, npm install, config, seed, testing

Give examples
Installing

Run <npm i supertest> in the command line to install supertest. 
npm i express
npm i body-parser
npm i mongoose
npm i chai
npm i mocha
npm i supertest


Once you have everything in place, you should be able to run the NPM RUN SEED command defined in the Package JSON to seed the development data into the Mongo Database. If you go to the Seed.js file in the Seed folder, 
and un-comment the console.log on line 24, then run NPM RUN SEED > test.txt you should be able to export all the seeded development data to a text file. 

You should also now be able to run NPM RUN TEST in order to run the test file. This seeds the test database before every test and checks that all the endpoints are functioning and have error handling in place.


Give an example
And coding style tests
Explain what these tests test and why

Give an example
Deployment
Add additional notes about how to deploy this on a live system

<!-- Built With
Dropwizard - The web framework used
Maven - Dependency Management
ROME - Used to generate RSS Feeds
Contributing
Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests to us.

Versioning
We use SemVer for versioning. For the versions available, see the tags on this repository.

Authors
Billie Thompson - Initial work - PurpleBooth
See also the list of contributors who participated in this project.
<!--  -->
<!-- License
This project is licensed under the MIT License - see the LICENSE.md file for details --> 

<!-- Acknowledgments
Hat tip to anyone whose code was used
Inspiration
etc -->