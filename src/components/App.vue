<template>
    <div id="app">
        <top-header :user='user'></top-header>
    </div>
</template>

<script>
    import Vue from 'vue'
    import { auth, db } from './../Libs/FirebaseManager.js'
    import TopHeader from './TopHeader.vue'

    export default {
        name: 'app',
        data() {
            return {
                user: auth.currentUser
            }
        },
        created() {
            auth.onAuthStateChanged((user) => {
                this.user = user
                console.log(user)
                // user.getToken().then(token => { console.log(token) })
            });
        }
    }

</script>

<style>
    /*Global style*/
    
    html,
    body {
        font-family: 'Varela Round', sans-serif;
        font-size: 16px;
        background-color: #ECEFF1;
        overflow: hidden;
        user-select: none;
    }
    
    .button {
        cursor: pointer;
        min-width: 88px;
        min-height: 32px;
        line-height: 32px;
        border-radius: 2px;
        outline: none;
        border: 0;
        white-space: nowrap;
        text-transform: uppercase;
        font-weight: 600;
        font-family: inherit;
        padding: 0 12px;
        margin: 6px 8px;
        background: transparent;
        white-space: nowrap;
        overflow: hidden;
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
        transition: color .3s;
        transition: background-color .3s;
        color: #039be5;
        background-color: #ffffff;
    }
    
    .button:hover {
        background-color: #e1f3fc;
    }
    
    .button_theme-blue {
        color: rgb(255, 255, 255);
        background-color: #039be5;
    }
    
    .button_theme-blue:hover {
        background-color: #0388ca;
    }
    
    .input-label {
        margin-left: 5px;
    }
    
    .input {
        border: 1px solid #ebebeb;
        border-radius: 2px;
        color: #212121;
        font-family: inherit;
        margin: 0 5px 0 0;
        max-width: 100%;
        outline: 0;
        padding: 7px;
        vertical-align: middle;
    }
    
    .link {
        border-bottom: 2px solid transparent;
        border-top: 2px solid transparent;
        margin: 0 5px;
        transition: color .2s;
        color: #757575;
        cursor: pointer;
        text-decoration: underline;
    }
    
    .link:hover {
        color: #000000;
    }
    
    .link_theme-blue {
        color: #039be5;
        text-decoration: none;
    }
    
    .link_theme-blue:hover {
        color: #0277bd;
    }
</style>