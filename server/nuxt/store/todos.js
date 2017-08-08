export const state = () => {
	return {
		counter: 1
	}
}

export const mutations = {
	increment(state) {
		state.counter++;
		alert(state.counter)
	}
}
