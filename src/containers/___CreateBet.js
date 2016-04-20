"use strict"

import { connect } from "react-redux"
import { startRace } from "../ducks/currentRace"
import CreateBet from "../components/CreateBet"

function mapStateToProps(state, ownProps) {
	return {
		user: state.user
	}
}

function mapDispatchToProps(dispatch, ownProps) {
	return {
		startRace : betAmount => {
			dispatch(startRace(betAmount))
		}
	}
}

export default connect(	
	mapStateToProps,
	mapDispatchToProps
)(CreateBet)
