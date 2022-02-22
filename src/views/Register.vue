<template>

    <div class="login-form">
        <h1 class="titulo">Crie sua Conta</h1>

        <form class="login">

            <img src="../assets/logo.png" alt="">

            <div>
                <input 
                    id="imagem_produto" 
                    type="file" 
                    name="imagem_produto" 
                    autocomplete="imagem_produto" 
                    required 
                    ref="imagem_produto">

                <input type="text" id="name" name="name" placeholder="nome da ONG" v-model="form.name" required>
            </div>

            <div>
                <input type="text" id="username" name="username" placeholder="username" v-model="form.username" required>

                <input type="number" id="cep" name="cep" placeholder="cep" v-model="form.cep" required>
            </div>

            <div>
                <input type="text" id="city" name="city" placeholder="city" v-model="form.city" required>

                <input type="text" id="district" name="district" placeholder="district" v-model="form.district" required>
            </div>

            <div>
                <input type="text" id="street" name="street" placeholder="street" v-model="form.street" required>

                <input type="number" id="cellphone" name="cellphone" placeholder="cellphone" v-model="form.cellphone" required>
            </div>


            <div>
                <input type="email" id="email" name="email" placeholder="e-mail" v-model="form.email" required>

                <input type="password" id="password" name="password" placeholder="password" v-model="form.password" required>
            </div>

            <button class="btn-form" type="submit" @click.prevent="register">Cadastrar</button>
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
                imagem_produto: null,
                name: "",
                username: "",
                cep: "",
                city: "",
                district: "",
                street: "",
                cellphone: "",
                email: "",
                password: ""
            },
        }
    },

    methods: {
        register() {
            console.log('clicou')
        }
    }
}
</script>

<style scoped>

.login div {
    display: flex;
    align-items: center;
    flex: 1;
    flex-wrap: wrap;
    justify-content: space-around;
}

input {
    width: 250px;
}

.login div div span{
    left: 240px;
}

</style>