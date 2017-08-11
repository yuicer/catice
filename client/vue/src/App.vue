<template>
  <div id="app">
    <transition name="fade"，>
    	
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
	body {
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
