"use strict"

import React from "react"

import { 
	NUMBER_OF_KARTS,
	RACE_DISTANCE,
	MOVE_KART_DISTANCE,
	RACE_SPEED
} from "../../core/constants"

import { 
	calculateWinnings,
	calculateLoss
} from "../../ducks/karts"

import RaceLine from "../RaceLine"
import styles from "./styles.scss"

// -------------------------------------------------------------------------------
const RaceTrack = React.createClass({

	// race in set in motion inside this lifecycle function
	componentDidMount: function() {
		this.setState({			
			race: setInterval(this._race, RACE_SPEED)
		})	
	},

	componentWillUnmount: function() {		
		clearInterval(this.state.race)
	},	

	/**
		Checks all karts to see if any of them have completd the race

		@returns: id of winning kart (if none returns null)
	*/
	_winner: function() {

		for (let i = 1; i <= NUMBER_OF_KARTS; i = i + 1) {
			if (this.props.karts[i].distance >= RACE_DISTANCE - MOVE_KART_DISTANCE) {
				return this.props.karts[i].id
			}
		}

		return null
	},

	/**
		Handles the race itself i.e. moving karts and crowning the winner
	*/
	_race: function() { 			

		//** Is there a winner? If so then end the race
		let winner = this._winner()
		if (winner) {			

			let winnings, losses

			//  stop the race logic loop
			clearInterval(this.state.race)			
			
			// calculate winnings/losses


			// user bet on a winner
			if (this.props.user.selectedKart === winner) {

				winnings = calculateWinnings(
					this.props.karts[this.props.user.selectedKart],
					this.props.currentRace.betAmount
				)

				this.props.winsIncrementUser()
				this.props.balanceAdd(winnings)

			} 
			// user bet on a loser
			else {		

				losses = calculateLoss(
					this.props.karts[this.props.user.selectedKart],
					this.props.currentRace.betAmount
				)

				this.props.lossesIncrementUser()
				this.props.balanceSubtract(losses)

			}

			// record win for the winning kart...
			this.props.winsIncrementKart(winner)
			// ... and record losses for the ther karts
			for (let i = 1; i <= NUMBER_OF_KARTS; i = i + 1) {				
				if (this.props.karts[i].id !== winner) {
					this.props.lossesIncrementKart(this.props.karts[i].id)
				}
			}			
				
			// update kart rankings before race logging
			this.props.updateRankings(this.props.karts)

			// archive race results in the log
			this.props.logRace({
				raceId: this.props.currentRace.currentRaceId,
				results: this.props.currentRace.rankings,
				selectedKart: this.props.user.selectedKart,				

				betResult: 	this.props.user.selectedKart === winner
							? winnings
							: -losses,

				odds: 0			

			})		

			this.props.endRace(winner)	
		}
		// there is no winner yet so continue the race
		else {
			// move a randomly chosen kart further along the track
			this.props.moveKart(Math.floor(Math.random() * (NUMBER_OF_KARTS)) + 1)		
		}
		//*

	},	

	// -------------------------------------------------------------------------------
	render: function() {

		let raceLines = []

		for (let i = 1; i <= NUMBER_OF_KARTS; i = i + 1) {			

			raceLines.push(			
				<RaceLine
					key={i}
					kartImage={this.props.karts[i].image}
					distanceTraveled={this.props.karts[i].distance * 100 / RACE_DISTANCE}
					selected={this.props.karts[i].id === this.props.user.selectedKart} 
					winner={this.props.currentRace.winnerId === this.props.karts[i].id} />
			)		
		}

		return (		
			<div id={styles.wrapper}>
				{raceLines}
			</div>	
		)

	}

})

export default RaceTrack