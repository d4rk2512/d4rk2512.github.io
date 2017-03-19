<template>
	<nav>
		<div class='left-content'>
			<div class='brand'>
				<h3>Hardcorers</h3>
			</div>
		</div>

		<div class='right-content'>
			<div v-if='user == null'>
				<button @click='login'>Đăng nhập</button>

			</div>
			<div v-else>Welcome, {{ user.userName }}</div>
		</div>
	</nav>
</template>

<script>
	import Vue from 'vue'

	export default Vue.component('top-header', {
		props: ['user'],
		methods: {
			login() {
				console.log('login clicked')
			}
		}
	})

</script>

<style scoped>
	nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: fixed;
		height: 50px;
		margin: 0;
		padding: 0 20px;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #fff;
		box-shadow: 0 0 4px rgba(0, 0, 0, .14), 0 4px 8px rgba(0, 0, 0, .28);
		z-index: 1000;
	}
	
	.left-content {

	}
	
	.brand {
		display: flex;
		vertical-align: middle;
		cursor: pointer;
	}
	
	.brand h3 {
		margin: 14px;
		margin-left: 0;
	}
	
	.header-container {
		float: right;
	}
</style>