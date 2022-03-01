<template>

    <div class="login-form">
        <h1 class="titulo">Seus Dados</h1>

        <form class="login">

            <img src="../assets/image_ong.png" alt="">

            <input 
                id="imagem_produto" 
                type="file" 
                name="imagem_produto" 
                autocomplete="imagem_produto" 
                required 
                ref="imagem_produto">


            <div>
                <input type="text" id="name" name="name" placeholder="nome da ONG" v-model="form.name" required>
                <input type="number" id="cep" name="cep" placeholder="cep" v-model="form.cep" required>
            </div>           

            <div>
                <input type="text" id="city" name="city" placeholder="cidade" v-model="form.city" required>

                <input type="text" id="district" name="district" placeholder="bairro" v-model="form.district" required>
            </div>    
        
            <div>
                <input type="number" id="street" name="street" placeholder="rua" v-model="form.street" required>

                <input type="number" id="number_whatsapp" name="number_whatsapp" placeholder="whatsapp" v-model="form.number_whatsapp" required>
            </div>

            <button class="btn-form" type="submit" @click.prevent="updatePerfil">Salvar</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                imagem_produto: null,
                name: "",
                cep: "",
                city: "",
                district: "",
                street: "",
                number_whatsapp: "",
            },
        }
    },

    methods: {
        updatePerfil() {
            console.log('clicou')
        }
    },

    beforeCreate() {
        const logado = localStorage.getItem('login')
        
        if(!logado) {
        this.$router.replace({ name: "login" });
        }
    }
}
</script>

<style scoped>

.login {
    margin-bottom: 60px;
}

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