describe('Top', () => {
  it('Show top page', () => {
    cy.visit('/')

    cy.contains('診断ツール')
    cy.contains('ブラウザ')
    cy.contains('スピーカー')
    cy.contains('マイク')
    cy.contains('SFU Room')
  })
})
