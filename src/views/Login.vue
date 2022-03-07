<template>

    <div class="container login-form">
        <div class="login-img">
            <img 
                src="../assets/logo.png" 
                alt=""
            >
        </div>

        <form class="login">

            <div class="new-user">
                <p>Você é novo por aqui?</p>

                <router-link to="/register" class="go-register">
                    Inscreva-se
                </router-link>
            </div>

            <h1 class="titulo">Login</h1>

            <div>
                <label for="email">E-mail 🐶</label>
                <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="e-mail" 
                    v-model="form.email" 
                    required
                >
            </div>

            <div>
                <label for="password">Senha 🐿️</label>
                <input 
                type="password" 
                id="password" 
                name="password" 
                placeholder="password" 
                v-model="form.password" 
                required
                >
            </div>

            <p>
                Esqueceu a senha?
                <router-link to="/reset-password">
                    <span>Clique aqui</span>
                </router-link>
            </p>

            <button 
                class="btn-form" 
                type="submit" 
                @click.prevent="login">
                Login
            </button>
        </form>
    </div>
</template>

<script>

import firebase from 'firebase'

export default {
    data() {
        return {
            form: {
                email: "",
                password: ""
            },
        }
    },

    methods: {
        login() {
            firebase.auth().signInWithEmailAndPassword(this.form.email, this.form.password)
            .then(() => {
                this.$store.state.user.loggedIn = true
                this.$router.replace({ name: "home" });
            })
            .catch(() => {
                console.log('email incorreto')
            });
        }
    },
}
</script>

<style>

body {
    background-image: url("../assets/pattern.svg");
}

.login-form {
    background-color: #fff;
    box-shadow: 0px 7px 7px rgba(0, 0, 0, 0.25);
    border-radius: 15px;
    max-width: 800px;
    display: block;
    margin: 60px auto 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 60px;
}

.login {
    background-color: #36C9D2;
    padding: 50px 50px 50px 50px;
    border-radius: 15px 15px 15px 0px;
}

.login label {
    display: block;
    font-size: 24px;
    margin-bottom: 10px;
    color: #fff;
}

.login input{
    display: block;
    margin: 0 auto 30px;
    padding: 15px 0;
    width: 285px;
    box-shadow: 0px 7px 7px rgba(0, 0, 0, 0.25);
    border: none;
    border-radius: 10px;
    padding-left: 15px;
    color: #222;
    font-size: 18px;
}

input:focus {
    outline: none !important;
    border: none;
    box-shadow: 0 0 10px #fff;
}

.login .titulo {
    margin-bottom: 60px;
    color: #fff;
    text-align: initial;
    font-size: 3rem;
    margin-top: 40px;
}

.login p {
    text-align: end;
    margin-top: -10px;
    color: #EEE6E6;
    font-weight: bold;
}

.login p span {
    color: rgb(66, 66, 66);
}

.login-img {
    padding: 0 0 0 30px;
}

.login .btn-form {
    margin-top: 60px;
    background-color: #fff;
    color: #36C9D2;
} 

.new-user {
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.new-user p {
    margin-top: 5px;
}

.go-register {
    border-radius: 10px;
    color: #36C9D2;
    font-weight: bold;
    border: 1px solid #fff;
    padding: 10px;
    background-color: #fff;
}

</style>