<template>

    <div>
        <h1 class="titulo">Login</h1>

        <form class="login">

            <img src="../assets/logo.png" alt="">

            <div>
                <input type="email" id="email" name="email" placeholder="e-mail" v-model="form.email">
                <span>
                    <img id="logo-email" src="../assets/email.png" alt="">
                </span>
            </div>

            <div>
                <input type="password" id="password" name="password" placeholder="password" v-model="form.password">
                <span>
                    <img id="logo-password" src="../assets/cadeado.png" alt="">
                </span>
            </div>

            <button class="btn-form" type="submit" @click="login">Login</button>

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
            console.log(this.form.password)
        }
    }
}
</script>

<style>

.login {
    background-color: #fff;
    box-shadow: 0px 7px 7px rgba(0, 0, 0, 0.25);
    border-radius: 15px;
    max-width: 600px;
    display: block;
    margin: 60px auto 0;
    padding: 40px 0;
}

.login input, select{
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

.login input:nth-child(1), select {
    margin-bottom: 30px;
}

input:focus {
    outline: none !important;
    border: none;
    box-shadow: 0 0 10px #36C9D2;
}

select {
    width: 300px;
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

.login div {
    position: relative;
}

.login div span {
    position: absolute;
    top: 10px;
    left: 400px;
}

</style>