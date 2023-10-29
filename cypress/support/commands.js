// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login", (email, pass) => {
    cy.contains("Log in").click();
    if (email) {
        cy.get("#mail").type(email);
    }
    if (pass) {
        cy.get("#pass").type(pass);
    }
    cy.contains("Submit").click();
});

Cypress.Commands.add("addNewBook", (title) => {
    cy.contains("Add new").click();
    cy.get('.modal-title').should("be.visible")
    if (title) {
        cy.get('#title').type(title);
    }
    cy.contains("Submit").click();
})

Cypress.Commands.add("addToFavoritesExistBook", () => {
    cy.visit("/favorites")

    cy.contains("Please add some book to favorit on home page!").click()
    cy.contains("Add to favorite").first().click()
})

Cypress.Commands.add("deleteFavorites", () => {
    cy.visit("/favorites")

    cy.get(".card-footer").each(() => {
        cy.contains("Delete from favorite").click();
        });
})



