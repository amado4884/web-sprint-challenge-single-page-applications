beforeEach(() => {
  cy.visit("http://localhost:3000/");
  cy.contains("Pizza").click();
});

describe("Form Tests", () => {
  describe("Name", () => {
    it("can be written into", () => {
      const field = cy.get("[data-cy=name]");

      field.type("Amado Guerrero");

      field.should("have.value", "Amado Guerrero");
    });

    it("errors show up", () => {
      const field = cy.get("[data-cy=name]");

      field.type("AA");

      cy.get("[data-cy=name-error]").invoke("text").should("not.be", "");
    });
  });

  describe("Email", () => {
    it("can be written into", () => {
      const field = cy.get("[data-cy=email]");

      field.type("amado4884@gmail.com");

      field.should("have.value", "amado4884@gmail.com");
    });

    it("errors show up", () => {
      const field = cy.get("[data-cy=email]");

      field.type("aaaaaaaa");

      cy.get("[data-cy=email-error]").invoke("text").should("not.be", "");
    });
  });

  describe("Phone Number", () => {
    it("can be written into", () => {
      const field = cy.get("[data-cy=phone]");

      field.type("aaaaaaaaaa");

      field.should("have.value", "aaaaaaaaaa");
    });

    it("errors show up", () => {
      const field = cy.get("[data-cy=phone]");

      field.type("aaaa");

      cy.get("[data-cy=phone-error]").invoke("text").should("not.be", "");
    });
  });

  describe("Size", () => {
    it("can be changed", () => {
      const field = cy.get("[data-cy=size]");

      field.select("Extra Large");

      field.should("have.value", "Extra Large");
    });

    it("errors show up", () => {
      const field = cy.get("[data-cy=size]");

      field.select("Extra Large");
      field.select("Size");

      cy.get("[data-cy=size-error]").invoke("text").should("not.be", "");
    });
  });

  describe("Toppings", () => {
    it("can be checked", () => {
      const checkboxes = ["pepperoni", "ham", "mushrooms", "pineapple"];

      checkboxes.forEach((item) => {
        const field = cy.get(`[data-cy=${item}]`);
        field.check();
        field.should("be.checked");
        field.uncheck();
        field.should("not.be.checked");
      });

      const field1 = cy.get(`[data-cy=${checkboxes[0]}]`);
      const field2 = cy.get(`[data-cy=${checkboxes[1]}]`);
      field1.check();
      field2.check();
      field1.should("be.checked");
      field2.should("be.checked");
    });

    it("errors show up", () => {
      const field = cy.get("[data-cy=size]");

      field.select("Extra Large");
      field.select("Size");

      cy.get("[data-cy=size-error]").invoke("text").should("not.be", "");
    });
  });

  describe("Special Instructions", () => {
    it("can be written into", () => {
      const field = cy.get("[data-cy=specialInstructions]");

      field.type("Im really hungry, hurry up!");

      field.should("have.value", "Im really hungry, hurry up!");
    });
  });

  describe("Submit Button", () => {
    it("is disabled by default", () => {
      const field = cy.get("[data-cy=submit]");

      field.should("be.disabled");
    });

    it("is ONLY enabled if all other fields are filled and without errors", () => {
      cy.get("[data-cy=submit]").should("be.disabled");

      cy.get("[data-cy=name]").type("Amado Guerrero");
      cy.get("[data-cy=name-error]").invoke("text").should("be", "");
      cy.get("[data-cy=email]").type("amado4884@gmail.com");
      cy.get("[data-cy=email-error]").invoke("text").should("be", "");
      cy.get("[data-cy=phone]").type("1111111111");
      cy.get("[data-cy=phone-error]").invoke("text").should("be", "");
      cy.get("[data-cy=size]").select("Extra Large");
      cy.get("[data-cy=size-error]").invoke("text").should("be", "");

      cy.get("[data-cy=submit]").should("be.enabled");
    });

    it("User can submit form after correct inputs", () => {
      cy.get("[data-cy=submit]").should("be.disabled");

      cy.get("[data-cy=name]").type("Amado Guerrero");
      cy.get("[data-cy=name-error]").invoke("text").should("be", "");
      cy.get("[data-cy=email]").type("amado4884@gmail.com");
      cy.get("[data-cy=email-error]").invoke("text").should("be", "");
      cy.get("[data-cy=phone]").type("1111111111");
      cy.get("[data-cy=phone-error]").invoke("text").should("be", "");
      cy.get("[data-cy=size]").select("Extra Large");
      cy.get("[data-cy=specialInstructions]").type("Im really hungry, hurry up!");
      cy.get("[data-cy=size-error]").invoke("text").should("be", "");

      cy.get("[data-cy=submit]").should("be.enabled");
      cy.get("[data-cy=submit]").click();

      cy.wait(2000);

      cy.get("[data-cy=order-id]").invoke("text").should("not.be", "");
      cy.get("[data-cy=order-created]").invoke("text").should("not.be", "");
      cy.get("[data-cy=order-name]").invoke("text").should("be", "Amado Guerrero");
      cy.get("[data-cy=order-email]").invoke("text").should("be", "amado4884@gmail.com");
      cy.get("[data-cy=order-phone]").invoke("text").should("be", "1111111111");
      cy.get("[data-cy=order-size]").invoke("text").should("be", "Extra Large");
      cy.get("[data-cy=order-specialInstructions]").invoke("text").should("be", "Im really hungry, hurry up!");
    });
  });
});
