describe('TodoList', () => {
  it('홈페이지에서 투두페이지 이동할 때', () => {
    cy.visit('http://localhost:4173/');

    cy.get('.go-to-todo')
      .get('.hello-text')
      .contains('일정관리 사용하기')
      .should('have.text', '일정관리 사용하기');
  });

  it('투두가 없을 때 디폴트 텍스트 출력', () => {
    cy.visit('http://localhost:4173/todo');

    cy.get('.empty-todos')
      .contains('해야 할 일을 채워주세요!')
      .should('have.text', ' 해야 할 일을 채워주세요! ');
  });

  it('form을 활용해 엔터키로 submit할 때', () => {
    cy.visit('http://localhost:4173/todo');

    cy.get('.todo-input').type('hello world');
    cy.get('.todo-insert-form').submit();
    cy.get('.todo-list-item-wrapper')
      .get('.text')
      .contains('hello world')
      .should('have.text', 'hello world');
    cy.get('.todo-input').type('bye world');
    cy.get('.todo-insert-form').submit();
    cy.get('.todo-list-item-wrapper')
      .get('.text')
      .contains('bye world')
      .should('have.text', 'bye world');
  });

  it('add버튼을 클릭했을 떄 submit', () => {
    cy.visit('http://localhost:4173/todo');

    cy.get('.todo-input').type('console');
    cy.get('.add-button').click();
    cy.get('.todo-list-item-wrapper')
      .get('.text')
      .contains('console')
      .should('have.text', 'console');
  });

  it('수정을 진행할 때', () => {
    cy.visit('http://localhost:4173/todo');

    cy.get('.todo-input').type('초안입니다.');
    cy.get('.todo-insert-form').submit();

    cy.get('.todo-list-item-wrapper').get('.edit').click();
    cy.get('.edit-form').should('be.visible');
    cy.get('.edit-form')
      .get('.edit-input')
      .should('be.focused')
      .and('have.attr', 'placeholder');

    cy.get('.edit-form').get('.edit-input').type('수정해주세요');
    cy.get('.edit-form').submit();

    cy.get('.todo-list-item-wrapper')
      .get('.text')
      .contains('수정해주세요')
      .should('have.text', '수정해주세요');
  });

  it('체크를 진행할 때', () => {
    cy.visit('http://localhost:4173/todo');

    cy.get('.todo-input').type('체크 할 겁니다.');
    cy.get('.todo-insert-form').submit();

    cy.get('.todo-list-item-wrapper')
      .get('.text')
      .contains('체크 할 겁니다.')
      .should('have.text', '체크 할 겁니다.');

    cy.get('.todo-list-item-wrapper').get('.checkbox').click();
    cy.get('.todo-list-item-wrapper').get('.done-date').should('be.visible');

    cy.get('.todo-list-item-wrapper')
      .get('.checkbox')
      .click()
      .should('not.contain', '.done-date');
  });

  it('삭제를 진행할 때', () => {
    cy.visit('http://localhost:4173/todo');

    cy.get('.todo-input').type('삭제 될 투두');
    cy.get('.todo-insert-form').submit();

    cy.get('.todo-list-item-wrapper').get('.remove').click();
    cy.get('.empty-todos')
      .contains('해야 할 일을 채워주세요!')
      .should('be.visible');
  });

  it('메인 텍스트를 누를 때 홈페이지로 이동', () => {
    cy.visit('http://localhost:4173/todo');

    cy.get('.todo-wrapper')
      .get('.app-title')
      .click()
      .then(() => {
        cy.visit('http://localhost:4173/');
      });
  });
});
