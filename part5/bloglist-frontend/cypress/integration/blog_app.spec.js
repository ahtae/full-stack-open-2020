describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user1 = {
      name: 'eric andre',
      username: 'eric',
      password: 'eric',
    };

    const user2 = {
      name: 'philip j. fry',
      username: 'fry',
      password: 'fry',
    };

    cy.request('POST', 'http://localhost:3001/api/users/', user1);
    cy.request('POST', 'http://localhost:3001/api/users/', user2);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('Log in to application');
    cy.contains('username');
    cy.contains('password');
    cy.contains('login');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('eric')
      cy.get('#password').type('eric')
      cy.get('#login-button').click()

      cy.contains('eric andre logged in')
    });

    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('eric')
      cy.get('#password').type('ericandre')
      cy.get('#login-button').click()

      cy.get('.error').should('contain', 'wrong username or password').and('have.css', 'color', 'rgb(255, 0, 0)').and('have.css', 'border-style', 'solid')
      cy.get('html').should('not.contain', 'eric andre logged in')
    });
  });

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'eric', password: 'eric' })
      cy.visit('http://localhost:3000');
    })


    it('A blog can be created and is added to the list of all blogs', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('sherlock')
      cy.get('#url').type('www.sholmes.com')
      cy.get('#create-button').click()
      cy.get('.success').should('contain', 'a blog created by cypress').and('have.css', 'color', 'rgb(0, 128, 0)').and('have.css', 'border-style', 'solid')

      cy.contains('create new blog').click()
      cy.get('#title').type('a blog created by cypress once again')
      cy.get('#author').type('ash')
      cy.get('#url').type('www.ashk.com')
      cy.get('#create-button').click()
      cy.get('.success').should('contain', 'a blog created by cypress').and('have.css', 'color', 'rgb(0, 128, 0)').and('have.css', 'border-style', 'solid')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'a blog created by cypress',
          author: 'sherlock',
          url: 'www.sholmes.com',
          likes: 100
        })
      })

      it('it can be liked', function () {
        cy.contains('view').click()
        cy.contains(100)
        cy.contains('like').click()
        cy.contains(101)
      })

      it('it can be deleted', function () {
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.get('html').should('not.contain', 'a blog created by cypress')
      })

      it('it can only be deleted by the creator of the blog', function () {
        cy.contains('log out').click()
        cy.login({ username: 'fry', password: 'fry' })

        cy.contains('view').click()
        cy.get('html').should('not.contain', 'remove')
      })
    })
  })
});
