<template>

    <div class="login-form">
        <h1 class="titulo">Login</h1>

        <form class="login">

            <img src="../assets/logo.png" alt="">

            <input type="email" id="email" name="email" placeholder="e-mail" v-model="form.email" required>

            <input type="password" id="password" name="password" placeholder="password" v-model="form.password" required>

            <button class="btn-form" type="submit" @click.prevent="login">Login</button>

            <p>Esqueceu a senha?
                <router-link to="/reset-password">
                    <span>Clique aqui</span>
                </router-link>
            </p>
        </form>

        <h2 class="subtitulo">
            <router-link to="/register">Crie uma conta</router-link>
        </h2>
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
    }
}
</script>

<style>

.login-form {
    padding: 0 20px;
}

.login {
    background-color: #fff;
    box-shadow: 0px 7px 7px rgba(0, 0, 0, 0.25);
    border-radius: 15px;
    max-width: 600px;
    display: block;
    margin: 60px auto 0;
    padding: 40px 0;
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
    color: #000;
    font-size: 16px;
}

.login input:nth-child(1) {
    margin-bottom: 30px;
}

input:focus {
    outline: none !important;
    border: none;
    box-shadow: 0 0 10px #36C9D2;
}

.login img {
    max-width: 330px;
    max-height: 150px;
    display: block;
    margin: 0 auto 30px;
}

.login p {
    text-align: center;margin-top: 10px;
}

.login span {
    color: #36C9D2;
}

.login span:hover {
    text-decoration: underline;
}

.subtitulo a {
    color: #36C9D2;
}

</style>