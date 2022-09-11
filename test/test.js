const request = require('supertest');
const express = require('express');

const app = express();


//ROUTE INDEX MENU
describe('GET /', function(){
    it('respond with render Menu', function(done){
      request(app)
        .get('/')
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })
  });

// ROUTES AND CONTROLLERS USER

describe('GET /register', function(){
    it('respond with render Register', function(done){
      request(app)
        .get('/register')
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })
  });

  describe('POST /register', function(){
    it('respond with JSON { message : success }', function(done){
      request(app)
        .get('/register')
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })
  });

  describe('GET /login', function(){
    it('respond with render Login', function(done){
      request(app)
        .get('/login')
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })
  });

  describe('POST /login', function(){
    it('respond with JSON { message : success }', function(done){
      request(app)
        .get('/login')
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })
  });

  describe('GET /logout', function(){
    it('respond with Log Out Exit Session', function(done){
      request(app)
        .get('/login')
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })
  });

  // ROUTES AND CONTROLLERS AUTHOR

  describe('GET /catalog/authors', function(){
    it('respond with render All Authors', function(done){
      request(app)
        .get('/catalog/authors')
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })
  });

  describe('GET /catalog/newauthor', function(){
    it('respond with render Form Add Author', function(done){
      request(app)
        .get('/catalog/newauthor')
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })
  });

  describe('POST /catalog/newauthor', function(){
    it('respond with data Form Add Author', function(done){
      request(app)
        .post('/catalog/newauthor')
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })
  });

  describe('GET /catalog/author/:id', function(){
    it('respond with render Detail For Author', function(done){
      request(app)
        .get('/catalog/author/:id')
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })
  });

  describe('GET /catalog/author/:id/delete', function(){
    it('respond with JSON {message : success}', function(done){
      request(app)
        .get('/catalog/author/:id/delete')
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })
  });

  describe('POST /catalog/author/:id/delete', function(){
    it('respond with JSON {message : success}', function(done){
      request(app)
        .post('/catalog/author/:id/delete')
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })
  });

  describe('GET /catalog/author/:id/update', function(){
    it('respond with render Form Update Author', function(done){
      request(app)
        .get('/catalog/author/:id/update')
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })
  });

  describe('POST /catalog/author/:id/update', function(){
    it('respond with data Form Update Author', function(done){
      request(app)
        .post('/catalog/author/:id/update')
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })
  });

  // ROUTES AND CONTROLLERS BOOK INSTANCE

  describe('GET /catalog/bookinstances', function(){
    it('respond with render All Reservations', function(done){
      request(app)
        .get('/catalog/bookinstancese')
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })
  });
  
  describe('GET /catalog/newbookinstance', function(){
    it('respond with render Form Add Reservation', function(done){
      request(app)
        .get('/catalog/newbookinstance')
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })
  });

  describe('POST /catalog/newbookinstance', function(){
    it('respond with data Form Add Reservation', function(done){
      request(app)
        .post('/catalog/newbookinstance')
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })
  });
  
  describe('GET /catalog/bookinstance/:id', function(){
    it('respond with render Detail For Reservation', function(done){
      request(app)
        .get('/catalog/bookinstance/:id')
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })
  });
  
  describe('GET /catalog/bookinstance/:id/delete', function(){
    it('respond with JSON {message : success}', function(done){
      request(app)
        .get('/catalog/bookinstance/:id/delete')
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })
  });

  describe('POST /catalog/bookinstance/:id/delete', function(){
    it('respond with JSON {message : success}', function(done){
      request(app)
        .post('/catalog/bookinstance/:id/delete')
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })
  });

  describe('GET /catalog/bookinstance/:id/update', function(){
    it('respond with render Form Update Reservation', function(done){
      request(app)
        .get('/catalog/bookinstance/:id/update')
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })
  });

  describe('POST /catalog/bookinstance/:id/update', function(){
    it('respond with data Form Update Reservation', function(done){
      request(app)
        .post('/catalog/bookinstance/:id/update')
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })
  });

  // ROUTES AND CONTROLLERS GENRES

  describe('GET /catalog/genres', function(){
    it('respond with render All Genres', function(done){
      request(app)
        .get('/catalog/genres')
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })
  });
  
  describe('GET /catalog/newgenre', function(){
    it('respond with render Form Add Genre', function(done){
      request(app)
        .get('/catalog/newgenre')
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })
  });

  describe('POST /catalog/newgenre', function(){
    it('respond with data Form Add Genre', function(done){
      request(app)
        .post('/catalog/newgenre')
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })
  });
  
  describe('GET /catalog/genre/:id', function(){
    it('respond with render Detail For Genre', function(done){
      request(app)
        .get('/catalog/genre/:id')
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })
  });
  
  describe('GET /catalog/genre/:id/delet', function(){
    it('respond with JSON {message : success}', function(done){
      request(app)
        .get('/catalog/genre/:id/delet')
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })
  });

  describe('POST /catalog/genre/:id/delet', function(){
    it('respond with JSON {message : success}', function(done){
      request(app)
        .post('/catalog/genre/:id/delet')
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })
  });

  describe('GET /catalog/genre/:id/update', function(){
    it('respond with render Form Update Genre', function(done){
      request(app)
        .get('/catalog/book/:id/update')
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })
  });

  describe('POST /catalog/genre/:id/update', function(){
    it('respond with data Form Update Genre', function(done){
      request(app)
        .post('/catalog/book/:id/update')
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })
  });

  // ROUTES AND CONTROLLERS BOOKS  

  describe('GET /catalog/books', function(){
    it('respond with render All Books', function(done){
      request(app)
        .get('/catalog/books')
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })
  });
  
  describe('GET /catalog/newbook', function(){
    it('respond with render Form Add Book', function(done){
      request(app)
        .get('/catalog/newbook')
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })
  });

  describe('POST /catalog/newbook', function(){
    it('respond with data Form Add Book', function(done){
      request(app)
        .post('/catalog/newbook')
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })
  });
  
  describe('GET /catalog/book/:id', function(){
    it('respond with render Detail For Book', function(done){
      request(app)
        .get('/catalog/book/:id')
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })
  });
  
  describe('GET /catalog/book/:id/delete', function(){
    it('respond with JSON {message : success}', function(done){
      request(app)
        .get('/catalog/book/:id/delete')
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })
  });

  describe('POST /catalog/book/:id/delete', function(){
    it('respond with JSON {message : success}', function(done){
      request(app)
        .post('/catalog/book/:id/delete')
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })
  });

  describe('GET /catalog/book/:id/update', function(){
    it('respond with render Form Update Book', function(done){
      request(app)
        .get('/catalog/book/:id/update')
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })
  });

  describe('POST /catalog/book/:id/update', function(){
    it('respond with data Form Update Book', function(done){
      request(app)
        .post('/catalog/book/:id/update')
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })
  });
