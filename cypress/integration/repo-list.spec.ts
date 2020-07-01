context('Repo List', () => {
  beforeEach(() => {
    cy.visit('/iframe.html?id=repo-list--interactive');
  });

  it('should display a call to action when there are no repositories', () => {
    cy.findByRole('button', { name: /add repository/i }).should('exist');
  });

  it('should add a repository', () => {
    addRepository('foo/bar');
    cy.findByText(/foo\/bar/i).should('exist');
    cy.findAllByRole('button', { name: /add rule/i }).should('have.length', 2);
  });

  it('should edit a repository', () => {
    addRepository('foo/bar');
    addRepository('yo/xyz');
    editRepository(/yo\/xyz/i, 'yo/yo');
    cy.findByText(/yo\/yo/i).should('exist');
  });

  it('should delete all repositories', () => {
    addRepository('foo/bar');
    addRepository('yo/xyz');
    deleteRepository(/yo\/xyz/i);
    cy.findByText(/yo\/xyz/i).should('not.exist');
    deleteRepository(/foo\/bar/i);
    cy.findByText(/foo\/bar/i).should('not.exist');
  });

  it('should cancel deletion', () => {
    addRepository('foo/bar');
    deleteRepository(/foo\/bar/i, false);
    cy.findByText(/foo\/bar/i).should('exist');
  });

  it('should add a rule', () => {
    addRepository('foo/bar');
    addRule('^.*.snap$');
    cy.findByText(/snap/i).should('exist');
    cy.findByText(/hidden/i).should('not.exist');
  });

  it('should add a hidden rule', () => {
    addRepository('foo/bar');
    addRule('^.*.snap$', true);
    cy.findByText(/snap/i).should('exist');
    cy.findByText(/hidden/i).should('exist');
  });

  it('should add multiple rules', () => {
    addRepository('foo/bar');
    addRule('^.*.snap$');
    addRule('^.*_proto.ts$', true);
    cy.findByText(/snap/i).should('exist');
    cy.findByText(/proto/i).should('exist');
    cy.findByText(/snap/i)
      .closest('li')
      .findByText('Hidden')
      .should('not.exist');
    cy.findByText(/proto/i).closest('li').findByText('Hidden').should('exist');
  });

  it('should edit regex', () => {
    addRepository('foo/bar');
    addRule('^.*.snap$');
    cy.findByText(/proto/i).should('not.exist');
    editRule(/snap/i, { newRegex: '^.*_proto.ts$' });
    cy.findByText(/proto/i).should('exist');
  });

  it('should edit hidden', () => {
    addRepository('foo/bar');
    addRule('^.*.snap$');
    cy.findByText(/hidden/i).should('not.exist');
    editRule(/snap/i, { newHidden: true });
    cy.findByText(/hidden/i).should('exist');
  });

  it('should edit regex and edit', () => {
    addRepository('foo/bar');
    addRule('^.*.snap$', true);
    cy.findByText(/proto/i).should('not.exist');
    cy.findByText(/hidden/i).should('exist');
    editRule(/snap/i, { newRegex: '^.*_proto.ts', newHidden: false });
    cy.findByText(/proto/i).should('exist');
    cy.findByText(/hidden/i).should('not.exist');
  });

  it('should delete rule', () => {
    addRepository('foo/bar');
    addRule('^.*.snap$', true);
    addRule('^.*_proto.ts');
    cy.findByText(/proto/i).should('exist');
    deleteRule(/proto/i);
    cy.findByText(/proto/i).should('not.exist');
  });

  it('should cancel rule deletion', () => {
    addRepository('foo/bar');
    addRule('^.*.snap$', true);
    deleteRule(/snap/i, false);
    cy.findByText(/snap/i).should('exist');
  });

  function addRepository(name: string) {
    cy.findByRole('button', { name: /add repository/i }).click();
    cy.findByRole('dialog').within(() => {
      cy.findByLabelText(/repository name/i)
        .click()
        .type(name);
      cy.findByRole('button', { name: /create/i }).click();
    });
  }

  function editRepository(name: RegExp, newName: string) {
    cy.findByText(name)
      .closest('li')
      .findByRole('button', { name: /edit repository/i })
      .click();
    cy.findByRole('dialog').within(() => {
      cy.findByLabelText(/repository name/i)
        .click()
        .type('{selectall}')
        .type(newName);
      cy.findByRole('button', { name: /update/i }).click();
    });
  }

  function deleteRepository(name: RegExp, confirmDeletion: boolean = true) {
    cy.findByText(name)
      .closest('li')
      .findByRole('button', { name: /delete repository/i })
      .click();
    cy.findByRole('dialog').within(() => {
      cy.findByRole('button', {
        name: confirmDeletion ? /delete/i : /cancel/i,
      }).click();
    });
  }

  function addRule(regex: string, hidden: boolean = false) {
    cy.findAllByRole('button', { name: /add rule/i })
      .first()
      .click();
    cy.findByRole('dialog').within(() => {
      cy.findByLabelText(/regex/i).click().type(regex);
      if (hidden) {
        cy.findByLabelText(/hide/i).click();
      }
      cy.findByRole('button', { name: /create/i }).click();
    });
  }

  function editRule(
    currentRegex: RegExp,
    { newRegex, newHidden }: { newRegex?: string; newHidden?: boolean },
  ) {
    cy.findByText(currentRegex)
      .closest('li')
      .findByRole('button', { name: /edit rule/i })
      .click();
    cy.findByRole('dialog').within(() => {
      if (newRegex != null) {
        cy.findByLabelText(/regex/i).click().type('{selectall}').type(newRegex);
      }
      if (newHidden != null) {
        const checkbox = cy.findByLabelText(/hide/i);
        if (newHidden) {
          checkbox.check();
        } else {
          checkbox.uncheck();
        }
      }
      cy.findByRole('button', { name: /update/i }).click();
    });
  }

  function deleteRule(regex: RegExp, confirmDeletion: boolean = true) {
    cy.findByText(regex)
      .closest('li')
      .findByRole('button', { name: /delete rule/i })
      .click();
    cy.findByRole('dialog').within(() => {
      cy.findByRole('button', {
        name: confirmDeletion ? /delete/i : /cancel/i,
      }).click();
    });
  }
});
