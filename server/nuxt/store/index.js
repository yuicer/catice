export const state = () => {
	return {
		counter: 0
	}
}
export const mutations = {
	increment(state) {
		state.counter++;
		alert(state.counter)
	}
}
