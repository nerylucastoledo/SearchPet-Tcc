<template>

    <div class=" container login-form">
        <form action="#" class="login">
            <div class="new-user">
                <p>Já possui conta?</p>

                <router-link to="/login" class="go-register">
                    Login
                </router-link>
            </div>

            <h1 class="titulo">Resetar senha</h1>

            <div>
                <label for="email">E-mail</label>
                <input 
                type="text"
                id="email" 
                name="email"
                placeholder="Seu email"
                required 
                v-model="email"
                >
            </div>

            <button 
                class="btn-form" 
                type="submit" 
                @click.prevent="recoverPasssword()">
                Recuperar
            </button>
        </form>
    </div>
</template>

<script>

export default {

    data() {
        return {
            email: ''
        }
    },

    methods: {
        recoverPasssword() {
            console.log('cliquei')
        }
    },
}
</script>

<style scoped>

.login-form {
    padding: 0 30px;
}

.login {
    margin-top: 60px;
    background-color: #fff;
    box-shadow: 0px 7px 7px rgba(0, 0, 0, 0.25);
    border-radius: 15px !important;
}

.login .titulo {
    margin-bottom: 60px;
    color: #36C9D2;
    text-align: center;
    font-size: 3rem;
    margin-top: 60px;
}

.login input{
    width: 50%;
}

.login label {
    color: #36C9D2;
    text-align: center;
}

.progress {
    font-weight: bold;
    text-align: center;
    margin-top: 30px;
}

.new-user {
    justify-content: center !important;
    margin-bottom: 60px;
}

.new-user p {
    color: #36C9D2;
    font-weight: bold;
}

.go-register {
    margin-left: 20px;
    color: #fff;
    background-color: #36C9D2;
    text-align: center;
    width: 150px;
}

@media (max-width: 745px) {
    .login input{
        width: 100%;
    }

    .login label {
        text-align: initial;
    }

    .login .titulo {
        font-size: 2rem;
    }

    .go-register {
        margin: 20px auto 0;
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

    .btn-form {
        max-width: 100%;
    }

    .go-register {
        width: 100%;
    }
}
</style>