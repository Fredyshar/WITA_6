describe("App Book", () => {
  const bookTitles = ["The Great Gatsby", "To Kill a Mockingbird", "Pride and Prejudice", "1984", "The Catcher in the Rye", "Moby Dick"];
  const bookList = {}

  beforeEach(() => {
    cy.visit("/");
  });


  describe("login page", () => {

    it("login succesfully", () => {
      cy.login("test@test.com", "test");

      cy.contains("Добро пожаловать test@test.com").should("be.visible");
      cy.contains("Log out").should("be.visible");
    });

    it("login error on empty login", () => {
      cy.visit("/");

      cy.login(null, "test")
      cy.get("#mail").then((el) => {
        expect(el[0].checkValidity()).to.be.false
        expect(el[0].validationMessage).to.match(/заполните это поле/i);
      })
    });

    it("login error on empty password", () => {
      cy.visit("/");

      cy.login("test@test.com", null)
      cy.get("#pass").then((el) => {
        expect(el[0].checkValidity()).to.be.false
        expect(el[0].validationMessage).to.match(/заполните это поле/i);
      })
    });
  })


  describe("Тесты на функционал книг", () => {
    beforeEach(() => {
      cy.login("test@test.com", "test");
    });

    it("Add new book", () => {
      const title= bookTitles[Math.floor(Math.random() * bookTitles.length)];

      cy.addNewBook(title)

      cy.contains(title).should("be.visible");
    });

    it("Error for add book with empty nameBook", () => {
      cy.addNewBook()
      cy.get("#title").then((el) => {
        expect(el[0].checkValidity()).to.be.false
        expect(el[0].validationMessage).to.match(/заполните это поле/i);
      })

    });

  it("Add book in favorite", () => {
    cy.addToFavoritesExistBook();

    cy.contains("Delete from favorite").should("be.visible")
    cy.get('h4').click()
    cy.get('.card-title').should("be.visible")
    cy.contains("Delete from favorite").should("be.visible")
  });

  it("Delete all books from favorite", () => {
    cy.deleteFavorites()

    cy.contains("Please add some book to favorit on home page!").should("be.visible")
  });
})

});
