<template>

    <div class="login-form">
        <h1 class="titulo">Anuncio do Scooby</h1>

        <form class="login">

            <img src="../assets/cachorro.png" alt="">

            <input 
                id="imagem_produto" 
                type="file" 
                name="imagem_produto" 
                autocomplete="imagem_produto" 
                required 
                ref="imagem_produto">


            <div>
                <input type="text" id="name" name="name" placeholder="nome" v-model="form.name" required>

                <input type="text" id="peso" name="peso" placeholder="peso" v-model="form.peso" required>
            </div>           

            <div>
                <input type="number" id="idade" name="idade" placeholder="idade" v-model="form.idade" required>

                <select v-model="sexo" class="filter-selected">
                    <option disabled value="">Sexo</option>

                    <option value="Macho">Macho</option>

                    <option value="Femea">Fêmnea</option>
                </select>
            </div>    
        
            <div>
                <select v-model="motivo" class="filter-selected">
                    <option disabled value="">Motivo</option>

                    <option value="Adocao">Adoção</option>

                    <option value="Perdidos">Perdidos</option>
                </select>

                <select v-model="castrado" class="filter-selected">
                    <option disabled value="">Castrado</option>

                    <option value="Sim">Sim</option>

                    <option value="Nao">Não</option>
                </select>
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
                sexo: "",
                castrado: "",
                motivo: ""
            },
        }
    },

    methods: {
        updatePerfil() {
            console.log('clicou')
        }
    }
}
</script>

<style scoped>

.login {
    margin-bottom: 60px;
    box-shadow: none;
}

.login img {
    margin-top: -40px;
    width: 500px;
    max-width: 500px;
    height: 300px;
    max-height: 300px;
    border-radius: 10px;
    object-fit: cover;
    margin-bottom: 40px;
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

.filter-selected {
    display: block;
    margin: 0 auto 30px;
    padding: 15px 0;
    width: 265px;
    box-shadow: 0px 7px 7px rgba(0, 0, 0, 0.25);
    border: none;
    border-radius: 10px;
    padding-left: 15px;
    color: #000;
    font-size: 16px;
    background-color: #fff;
    font-size: 18px;
}
</style>