"use strict"

import { connect } from "react-redux"
import { resetRace } from "../ducks/currentRace"
import { moveKartsToStart } from "../ducks/karts"
import RaceResult from "../components/RaceResult"

function mapStateToProps(state, ownProps) {
	return {
		user: state.user.toJS(),
		currentRace: state.currentRace.toJS(),
		karts: state.karts.toJS()
	}
}

function mapDispatchToProps(dispatch, ownProps) {
	return {
		resetRace: () => {dispatch(resetRace())}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RaceResult)
