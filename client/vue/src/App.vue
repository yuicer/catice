<template>
  <div id="app">
    <transition name="fade" mode="out-in">
  	  <router-view></router-view>
    </transition>
  </div>
</template>

<script>
	export default {
		name: 'app'
	}

</script>

<style>
	html,
	body,
	#app {
		margin: 0;
		padding: 0;
		width: 100%;
	}
	
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity .2s
	}
	
	.fade-enter,
	.fade-leave-active {
		opacity: 0;
	}

</style>
