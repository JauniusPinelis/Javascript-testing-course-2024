describe('Opening tic tac toe', () => {

  beforeEach(() => {
    cy.visit('/')
  })

  it('displays Next Player X', () => {
    cy.contains("div", "Next player: X").should("be.visible")
  })

  it("A board is displayed and it has 9 cells", () => {
    cy.get(".board").children().should('have.length', 9)
  })

  it("Reset button is displayed", () => {
    cy.contains("button", "Reset Game").should("be.visible")
  })
})

describe("Making first move", () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it("clicking on a box marks an X", () => {
    cy.get(".board").children().first().click().should('have.text', "X")
  })

  it("clicking on a box results in another players move", () => {
    cy.get(".board").children().first().click();

    cy.contains("div", "Next player: O").should("be.visible")
  })

  it("pressing reset button clears the board", () => {
    cy.get(".board").children().first().click().should('have.text', "X")
    cy.contains("button", "Reset Game").click()
    cy.get(".board").children().first().should('have.text', "")

    const cells = cy.get(".board").children()

    cells.each((cell) => {
      cy.wrap(cell).should('have.text', "")
    })
  })
})

describe("Full Game scenario", () => {

  beforeEach(() => {
    cy.visit('/')
  })

  it("Marking 3 X in a row results in a player x won", () => {
    cy.get(".board").eq(0).click()
    debugger;
    cy.get(".board").eq(1).click()
  })
})