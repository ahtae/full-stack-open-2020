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
});
