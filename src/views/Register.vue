<template>

    <div>
        <h1 class="titulo">Crie uma Conta</h1>

        <form class="login">

            <select 
                name="typeAccount" 
                required
                id="typeAccount"
                v-model="type_account"
            >   
                <option value="ong">Ong</option>
                <option value="particular">Particular</option>
            </select>

            <input 
                v-if="type_account === 'ong'" 
                id="imagem_produto" 
                type="file" 
                name="imagem_produto" 
                autocomplete="imagem_produto" 
                required 
                ref="imagem_produto"
            >

            <input type="text" id="name" name="name" placeholder="nome" v-model="form.name" required>

            <input type="text" id="username" name="username" placeholder="username" v-model="form.username" required>

            <input type="number" id="cep" name="cep" placeholder="cep" v-model="form.cep" @change="verifyCep(form.cep)" required>

            <input type="text" id="cidade" name="cidade" placeholder="cidade" v-model="form.cidade" required>

            <input type="text" id="bairro" name="bairro" placeholder="bairro" v-model="form.bairro" required>

            <input type="number" id="celular" name="celular" placeholder="celular" v-model="form.celular" required>

            <input type="email" id="email" name="email" placeholder="e-mail" v-model="form.email" required>

            <input type="password" id="password" name="password" placeholder="password" v-model="form.password" required>

            <button class="btn-form" type="submit">Login</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            type_account: 'Particular',
            form: {
                imagem_produto: null,
                name: '',
                username: '',
                cep: null,
                cidade: '',
                bairro: '',
                celular: null,
                email: '',
                password: ""
            },
        }
    },

    methods: {
        async verifyCep(cep) {
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(req => req.json())
            .then(res => {
                if(res.bairro) {
                    console.log(res)
                    this.form.cidade = res.localidade
                    this.form.bairro = res.bairro
                }
            })
        }
    }
}
</script>

<style scoped>

input {
    margin-bottom: 30px;
}

#typeAccount {
    background-color: #fff;
}

#typeAccount option {
    background-color: #36C9D2;
    color: #fff;
    border: none;
    font-size: 16px;
}

.login {
    margin-bottom: 60px;
}

</style>