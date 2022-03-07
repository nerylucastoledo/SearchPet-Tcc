<template>

    <div class="login-form">
        <h1 class="titulo">Resetar Senha</h1>

        <form class="login">

            <img 
                src="../assets/logo.png" 
                alt=""
            >

            <div>
                <label for="email">seu e-mail</label>

                <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="e-mail" 
                    v-model="form.email" 
                    required
                >
            </div>

            <button 
                class="btn-form" 
                type="submit" 
                @click.prevent="recoverPassword">
                Recuperar
            </button>
        </form>

        <h2 class="subtitulo">
            <router-link to="/login">Login</router-link>
        </h2>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                email: "",
            },
        }
    },

    methods: {
        recoverPassword() {
            console.log('clicou')
        }
    }
}
</script>

<style scoped>

.login div {
    width: 300px;
    display: block;
    margin: 0 auto;
}

.login label {
    font-weight: bold;
    display: block;
    margin-bottom: 10px;
}

.login div span {
    left: 250px;
    top: 40px;
}

</style>