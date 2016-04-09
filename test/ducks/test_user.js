"use strict"

import reducer,
	{
		winsIncrement,
		lossesIncrement,
		balanceAdd,
		balanceSubtract,
		racesIncrement
	}
	from "../../src/ducks/user"
import { expect } from "chai"


const initialState = {
	wins: 0,
	losses: 0,
	balance: 10,
	races: 0
}


describe('"user" reducer', () => {

	describe("wins", () => {
		it("incremented", () => {
			const nextState = reducer(initialState, winsIncrement())
			const expectedState = Object.assign({}, initialState, { wins: 1 })

			expect(nextState).to.deep.equal(expectedState)
		})
	})	

	//--------------------------------------------------------

	describe("losses", () => {
		it("incremented", () => {
			const nextState = reducer(initialState, lossesIncrement())
			const expectedState = Object.assign({}, initialState, { losses: 1 })
			
			expect(nextState).to.deep.equal(expectedState)
		})				
	})	

	//--------------------------------------------------------

	describe("balance", () => {
		it("added to", () => {			
			const nextState = reducer(initialState, balanceAdd(50))
			const expectedState = Object.assign({}, initialState, { balance: 60 })

			expect(nextState).to.deep.equal(expectedState)
		})

		it("subtracted from", () => {
			let amendedState = Object.assign({}, initialState, { balance: 100 })
			const nextState = reducer(amendedState, balanceSubtract(10))
			const expectedState = Object.assign({}, initialState, { balance: 90 })
			
			expect(nextState).to.deep.equal(expectedState)
		})			

		it("when subtracted from it never leaves you with a balance below 10", () => {
			const nextState = reducer(initialState, balanceSubtract(20))
			const expectedState = Object.assign({}, initialState, { balance: 10 })

			expect(nextState).to.deep.equal(expectedState)
		})			

	})			

	//--------------------------------------------------------

	describe("races", () => {
		it("incremented", () => {
			const nextState = reducer(initialState, racesIncrement())
			const expectedState = Object.assign({}, initialState, { races: 1 })

			expect(nextState).to.deep.equal(expectedState)
		})				
	})	

})