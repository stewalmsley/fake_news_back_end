process.env.NODE_ENV = 'test';
const app = require('../app');
const { expect } = require('chai');
const request = require('supertest')(app);
const mongoose = require('mongoose');
const data = require('../seed/testData')
const seedDB = require ('../seed/seed');

describe('/api', () => {
  beforeEach(() => {
    return seedDB(data)
    .then(docs => {
      [topic, article, user, comment] = docs;
    })
  })
  describe('/topics', () => {
    describe('/', () => {
      it('GET returns 200 and the correct fields', () => {
        return request.get(`/api/topics`)
          .expect(200)
          .then(res => {
            expect(res.body.topics[0]).to.be.an("object");
            expect(res.body.topics).to.have.length(2);
            expect(res.body.topics[1].slug).to.equal('cats')
            expect(res.body.topics[0].title).to.equal(topic.title);
          })
      });
    })
    describe('/:topic_slug/articles', () => {
      it('GET returns 200 and the correct articles', () => {
        return request.get(`/api/topics/cats/articles`)
        .expect(200)
        .then(res => {
          expect(res.body.articles[0]).to.be.an("object");
          expect(res.body.articles).to.have.length(2);
          expect(res.body.articles[0].title).to.equal("They're not exactly dogs, are they?")
        })
      })
      it('POST returns 201 and adds the article', () => {
        const newArticle = {
          "title": "UNCOVERED: catspiracy to bring down totalitarianism",
          "created_by": `${user._id}`,
          "body": "Bastet walks amongst us, and the cats are taking arms!",
      }
      return request
        .post('/api/topics/cats/articles/')
        .send(newArticle)
        .expect(201)
        .then(res => {
          expect(res.body.article).to.be.an("object");
          expect(res.body.article.title).to.equal("UNCOVERED: catspiracy to bring down totalitarianism");
          expect(res.body.article.belongs_to).to.equal('cats');
          expect(res.body.article.created_by).to.equal(`${user._id}`);
        })
      })
    })
  })
  describe('/articles', () => {
    describe('/', () => {
      it('GET returns 200 and the correct fields', () => {
        return request.get(`/api/articles`)
          .expect(200)
          .then(res => {
            expect(res.body.articles[0]).to.be.an("object");
            expect(res.body.articles).to.have.length(4);
            expect(res.body.articles[2].title).to.equal("They're not exactly dogs, are they?");
            expect(res.body.articles[0].title).to.equal(article.title);
          })
      })
    })
    describe('/:article_id', () => {
      it('GET returns 200 and the provided article', () => {
        return request.get(`/api/articles/${article._id}`)
          .expect(200)
          .then(res => {
            expect(res.body.article[0]).to.be.an("object");
            expect(res.body.article).to.have.length(1);
            expect(res.body.article[0].title).to.equal(article.title);
            expect(res.body.article[0]._id).to.equal(`${article._id}`);
          })
      })
      it('PATCH returns 201 and handles upvotes correctly', () => {
        return request.patch(`/api/articles/${article._id}?vote=up`)
          .expect(201)
          .then(res => {
            expect(res.body.article.votes).to.equal(article.votes + 1);
          })
      })
      it('PATCH returns 201 and handles downvotes correctly', () => {
        return request.patch(`/api/articles/${article._id}?vote=down`)
          .expect(201)
          .then(res => {
            expect(res.body.article.votes).to.equal(article.votes - 1);
          })
      })
    })
    describe('/:article_id/comments', () => {
      it('GET returns 200 and the provided article', () => {
        return request.get(`/api/articles/${article._id}/comments`)
          .expect(200)
          .then(res => {
            expect(res.body.comments[0]).to.be.an("object");
            expect(res.body.comments).to.have.length(2);
            expect(res.body.comments[0].body).to.equal("Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — on you it works.")
          })
      })
      it('POST returns 201 and adds the article, returning the user profile in the created_by key', () => {
        const newComment = 
      {
        "body": "bla bla bla",
        "created_by": user._id,
        "votes": 7,
      };
      return request.post(`/api/articles/${article._id}/comments/`)
        .send(newComment)
        .expect(201)
        .then(res => {
          expect(res.body.comment).to.be.an("object");
          expect(res.body.comment.body).to.equal(newComment.body);
          expect(res.body.comment.belongs_to).to.equal(`${article._id}`);
          expect(res.body.comment.created_by._id).to.equal(`${user._id}`);
        })
      })
    })
  })
  describe('/comments', () => {
    describe('/:comment_id', () => {
      it('PATCH returns 201 and handles upvotes correctly', () => {
        return request.patch(`/api/comments/${comment._id}?vote=up`)
          .expect(201)
          .then(res => {
            expect(res.body.comment.votes).to.equal(comment.votes + 1);
          })
      })
      it('PATCH returns 201 and handles downvotes correctly', () => {
        return request.patch(`/api/comments/${comment._id}?vote=down`)
          .expect(201)
          .then(res => {
            expect(res.body.comment.votes).to.equal(comment.votes - 1);
          })
      })
      it('DELETE returns 201 and removes the document', () => {
        return request.delete(`/api/comments/${comment._id}`)
          .expect(201)
      })
    })
  })
  describe('/users', () => {
    describe('/:username', () => {
      it('GET returns 200 and the user profile', () => {
        return request.get(`/api/users/dedekind561`)
          .expect(200)
          .then(res => {
            expect(res.body.user[0].username).to.equal(`dedekind561`);
            expect(res.body.user[0].avatar_url).to.equal("https://carboncostume.com/wordpress/wp-content/uploads/2017/10/dale-chipanddalerescuerangers.jpg")
          })
      })
      after(() => {
        mongoose.connection.close(() => {
        console.log('Test database connection closed');
        })
      })
    })
  })
})
  
