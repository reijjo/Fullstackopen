describe('Blog app', function() {
	const user = {
		name: 'Luisa Lore',
		username: 'oivittumunreidet',
		password: 'salainen'
	}

	const user2 = {
		name: 'Repe Wow',
		username: 'reijjo_wow',
		password: 'salainen'
	}

	beforeEach(function() {
		cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
		cy.visit(`/`)
		cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
		cy.request('POST', `${Cypress.env('BACKEND')}/users`, user2)
	})

	it('Login form is shown', function() {
		cy.contains('log in to application')
		cy.get('#username')
		cy.get('#passwd')
		cy.get('button').contains('login')
	})

	describe('Login', function() {
		it('succeeds with correct credentials', function() {
			cy.get('#username').type('oivittumunreidet')
			cy.get('#passwd').type('salainen')
			cy.contains('login').click()

			cy.contains(`${user.name} logged in`)
		})

		it('fails with wrong credentials', function() {
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
			cy.login({ username: 'oivittumunreidet', password: 'salainen' })
			cy.createBlog({ title: 'automatic juttu', author: 'funktio mies', url: 'www.fi' })
		})

		it('A blog can be created', function() {
			cy.get('button').contains(`create new blog`).click()
			cy.get('#title').type('Cypressin seikkailut')
			cy.get('#author').type('Luiska')
			cy.get('#url').type('www.luisalore.com')
			cy.get('#createButton').click()

			cy.contains('Cypressin seikkailut')
		})

		it('You can like a blog', function() {
			cy.get('button').contains('view').click()
			cy.contains('likes 0')
			cy.get('button').contains('like').click()
			cy.contains('likes 1')
		})

		it('You can remove your own blog',function(){
			cy.get('button').contains('view').click()
			cy.get('button').contains('remove').click()
			cy.get('html').should('not.contain', 'automatic juttu funktio mies')
		})

		it('Delete button visible only on your own blogs', function() {
			cy.get('button').contains('log out').click()
			cy.login({ username: 'reijjo_wow', password: 'salainen' })
			cy.get('button').contains('view').click()
			cy.get('.title-author').find('button').contains('remove').should('not.exist')
		})

		it.only('Most liked blog on top', function() {
			cy.createBlog({ title: 'juttu1', author: 'funktio mies', url: 'www.fi' })
			cy.createBlog({ title: 'juttu2', author: 'funktio mies', url: 'www.fi' })

			cy.get('.blog').eq(0).should('contain', 'automatic juttu')
			cy.get('.blog').eq(1).should('contain', 'juttu1')
			cy.get('.blog').eq(2).should('contain', 'juttu2')

			cy.get('.blog').eq(1).contains('view').click()
			cy.get('button').contains('like').click()

			cy.get('.blog').eq(0).should('contain', 'juttu1')
			cy.get('.blog').eq(1).should('contain', 'automatic juttu')
			cy.get('.blog').eq(2).should('contain', 'juttu2')

			cy.get('.blog').eq(2).contains('view').click()
			cy.get('.blog').eq(2).contains('like').click()
			cy.get('.blog').eq(1).contains('like').click()

			cy.get('.blog').eq(0).should('contain', 'juttu2')
			cy.get('.blog').eq(1).should('contain', 'juttu1')
			cy.get('.blog').eq(2).should('contain', 'automatic juttu')

			cy.get('.blog').eq(0).contains('hide').click()
			cy.get('.blog').eq(1).contains('hide').click()
		})
	})
})