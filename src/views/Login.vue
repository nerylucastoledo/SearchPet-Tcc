<template>

    <div class="form-geral">
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

<style scoped>

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

@media (max-width: 847px) {
    .form-geral {
        padding: 0 30px;
    }

    .login {
        padding: 25px !important;
    }
}

@media (max-width: 767px) {
    .login {
        border-radius: 15px;
    }

    .login .titulo {
        text-align: center;
    }

    .login-img {
        display: none;
    }

    .login-form {
        display: block;
    }

    .login input {
        width: 95%;
    }

    .new-user {
        display: block;
    }

    .new-user p {
        text-align: center;
    }

    .new-user a {
        display: block;
        text-align: center;
        max-width: 200px;
        margin: 20px auto;
    }

    .login .btn-form {
        max-width: 100%;
    } 
}

</style>