<template>
	<nav class='top-header'>
		<div class='top-header__left-content'>
			<div class='logo'>
				<h3 class='logo__text'>Hardcorers</h3>
			</div>
		</div>

		<div class='top-header__right-content'>
			<div class='top-header__login' v-if='user == null'>
				<label class='input-label'>Tên đăng nhập</label>
				<input type="text" class='input'/>	
				<label class='input-label'>Mật khẩu</label>
				<input type="text" class='input'/>		
				<button class='button button_theme-blue' @click='login'>Đăng nhập</button>
				<a class='link link_theme-blue' href="#">Đăng ký</a>
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

<style>
    .top-header {
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
    
    .logo {
        display: flex;
        vertical-align: middle;
        cursor: none;
    }
    
    .logo__text {
        margin: 14px;
        margin-left: 0;
    }
</style>