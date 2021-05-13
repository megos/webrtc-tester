describe('Top', () => {
  it('Show top page', () => {
    cy.visit('/')

    // Ignore browser version
    cy.percySnapshot('top page', { percyCSS: '.MuiTypography-colorTextSecondary:nth-child(2) { visibility: hidden; }' })

    cy.contains('診断ツール')
    cy.contains('ブラウザ')
    cy.contains('スピーカー')
    cy.contains('マイク')
    cy.contains('SFU Room')
  })
})
