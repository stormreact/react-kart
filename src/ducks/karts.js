"use strict"

import clone from "clone"
import { NUMBER_OF_KARTS } from "../core/constants"

// The Ducks File Structure for Redux
// - https://medium.com/@scbarrus/the-ducks-file-structure-for-redux-d63c41b7035c#.6rrizzva3


// CONSTANTS
// ----------------------------------------------------------------
const WINS_INCREMENT = "react-kart/karts/WINS_INCREMENT"
const LOSSES_INCREMENT = "react-kart/karts/LOSSES_INCREMENT"
const SELECT_KART = "react-kart/karts/SELECT_KART"

// REDUCER
// ----------------------------------------------------------------

/**
	@state - state of karts
	@action - action to be peformed on karts
*/
export default function reducer(state = createInitialKarts(NUMBER_OF_KARTS), action) {	

	let stateClone // some actions will need this variable to clone existing state into
	let objectToChange // some actions will need this variable to change a state object's value/s

	switch (action.type) {
		case WINS_INCREMENT:

			stateClone = clone(state) // clone state to avoid mutation
			objectToChange = stateClone[action.kartId]

			objectToChange.wins = objectToChange.wins + 1

			return stateClone

		case LOSSES_INCREMENT:

			stateClone = clone(state) // clone state to avoid mutation
			objectToChange = stateClone[action.kartId]

			objectToChange.losses = objectToChange.losses + 1

			return stateClone

		case SELECT_KART:

			return selectKartWithinKarts(state, action.kartId)

		default:
			return state
	}
}

// ACTION CREATORS
// ----------------------------------------------------------------

/**
	@kartId - kart to increase win total for
*/
export function winsIncrement(kartId) {
	return { 
		type: WINS_INCREMENT,
		kartId
	}
}

/**
	@kartId - kart to increase losses total for
*/
export function lossesIncrement(kartId) {
	return { 
		type: LOSSES_INCREMENT,
		kartId
	}
}

/**
	@kartId - kart to select
*/
export function selectKart(kartId) {
	return { 
		type: SELECT_KART,
		kartId
	}
}

// OTHER
// ----------------------------------------------------------------

/**
	@numberOfKarts - number of karts to account for in state

	Note: this function is exported as it is used by the unit test script also.
*/
export function createInitialKarts(numberOfKarts) {

	let initialKarts = {}

	for (let i = 1; i <= numberOfKarts; i = i + 1) {
		initialKarts[i] = { kartId: i, name: "kart" + i, image: "", wins: 0, losses: 0, selected: false }
	}

	return initialKarts
}

/**
	@prevKarts - current karts state passed so that we don't need to reference an outside variable
	@kartId - id of kart we would like to select

	Note: this function is exported as it is used by the unit test script also.
*/
export function selectKartWithinKarts(prevKarts, kartId) {

	let nextKarts = clone(prevKarts) // make copy of karts to keep function pure

	// cancel previous kart selection
	Object.keys(nextKarts).map(
		kart => nextKarts[kart].selected = false
	)

	// select kart
	nextKarts[kartId].selected = true
	return nextKarts
}
