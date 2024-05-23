describe('Loading main page', () => {

  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  })

  it('displays Todo List label', () => {
    cy.contains('div', 'Todo List').should('exist');
  })

  it('displays a button for creating todos', () => {
    cy.contains('button', 'Add Todo').should('exist');
  })

  it('displays a textbox for creating todos', () => {
    cy.get('.form-control').should('exist');
  })

  it('the list of todos is empty', () => {
    cy.get('.list-group').children().should('have.length', 0);
  })

  it('entering text into textbox and pressing the button populates the list', () => {
    cy.createTodo("test 1");

    cy.get('.list-group').children().should('have.length', 1);
  })

  it("deleting todo functionality works", () => {
    // arrange
    cy.createTodo("test2");
    // act
    cy.contains("button", "Delete").click()
    // assert
    cy.get('.list-group').children().should('have.length', 0);
  })

})



