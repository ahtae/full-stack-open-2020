describe('Blog app', function () {
  beforeEach(function () {
    const user = {
      name: 'eric andre',
      username: 'eric',
      password: 'eric',
    };

    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    cy.request('POST', 'http://localhost:3001/api/users/', user);
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

  describe.only('When logged in', function() {
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
  })
});
