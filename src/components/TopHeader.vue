<template>
	<div>
		<h1>{{ message }}</h1>
		<h1>{{ appMessage }}</h1>
	</div>
</template>

<script>
	import Vue from 'vue'
	import { FirebaseDB } from './../Libs/FirebaseManager.js'

	export default Vue.component('top-header', {
		props: ['appMessage'],
		firebase: {
			message: {
				source: FirebaseDB.ref('test'),
				asObject: true
			}
		}
	})

</script>

<style>

</style>