<template>
	<div id="app">
		<top-header :user='user'></top-header>
	</div>
</template>

<script>
	import Vue from 'vue'
	import { FirebaseAuth, FirebaseDB } from './../Libs/FirebaseManager.js'
	import TopHeader from './TopHeader.vue'

	export default {
		name: 'app',
		data() {
			return {
				user: FirebaseAuth.currentUser
			}
		},
		created: function () {
			FirebaseAuth.onAuthStateChanged((user) => {
				this.user = user
			});
		}
	}

</script>

<style>
	html,
	body {
		font-family: Roboto, Arial, sans-serif;
		background-color: #ECEFF1;
		overflow: hidden;
	}
</style>