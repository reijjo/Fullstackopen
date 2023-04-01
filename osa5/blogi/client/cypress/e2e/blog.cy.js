describe('Blog app', function() {
	const user = {
		name: 'Luisa Lore',
		username: 'oivittumunreidet',
		password: 'salainen'
	}

	beforeEach(function() {
		cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
		cy.visit(`/`)
		cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
	})

	it('Login form is shown', function() {
		cy.contains('log in to application')
		cy.get('#username')
		cy.get('#passwd')
		cy.get('button').contains('login')
	})

	describe('Login', function() {
		it('succeeds with correct credentials', function() {
			// cy.login({ username: 'oivittumunreidet', password: 'salainen' })
			cy.get('#username').type('oivittumunreidet')
			cy.get('#passwd').type('salainen')
			cy.contains('login').click()

			cy.contains(`${user.name} logged in`)
		})

		it('fails with wrong credentials', function() {
			// cy.login({ username: 'oivittumunreidet', password: 'ei-niin-salainen' })
			cy.get('#username').type('oivittumunreidet')
			cy.get('#passwd').type('ei-salainen')
			cy.contains('login').click()
			cy.get('.error')
				.should('contain', 'invalid username or password')
				.and('have.css', 'color', 'rgb(255, 0, 0)')
				.and('have.css', 'border-style', 'solid')
		})
	})

	describe('When logged in', function() {
		beforeEach(function () {
			// cy.login({ username: 'oivittumunreidet', password: 'salainen' })
			cy.get('#username').type('oivittumunreidet')
			cy.get('#passwd').type('salainen')
			cy.contains('login').click()
		})

		it.only('A blog can be created', function() {


			cy.contains(`create new blog`)
		})
	})
})