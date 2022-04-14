<template>
    <div>
        <div v-if="mensagem.length">
            <ModalSuccess 
                :mensagem="mensagem" 
                :success="success">
            </ModalSuccess>
        </div>

        <p class="fechar" @click="fecharModalFormulario">X</p>
        <form action="" class="form-perfil" @submit.prevent="finishAnuncio">
            <label for="">Quem adotou?</label>
            <input type="text" name="quem_adotou" placeholder="Nome" v-model="form.nome_finalizado" required>

            <label for="">Quando?</label>
            <input type="date" name="date_adocao" v-model="form.data_finalizado" required>

            <label for="">Contato da pessoa</label>
            <input 
                type="number"
                id="number_whatsapp" 
                name="number_whatsapp"
                placeholder="(XX)X-XXXX-XXXX"
                required 
                v-model="form.contato_finalizado"
            >

            <div>
                <button class="btn-form" type="submit">Finalizar</button>
            </div>
        </form>
    </div>
</template>

<script>

import firebase from 'firebase'
import ModalSuccess from '../components/ModalSuccess.vue'


export default {

    components: {
        ModalSuccess,
    },

    props: ["anuncio"],

    data() {
        return {
            form: {
                pausado: true,
                nome_finalizado: "",
                data_finalizado: "",
                contato_finalizado: "",
            },
            mensagem: "",
            success: true,
        }
    },
    
    methods: {
        fecharModalFormulario() {
            document.querySelector('.formulario').style.display = 'none'
        },

        finishAnuncio() {
            firebase.database()
            .ref('/Anuncios/' + this.anuncio.categoria)
            .child(this.anuncio.id)
            .update({...this.form})
            .then(() => {
                this.mensagem = `Que bacanaa :)! Mais um ${this.anuncio.type} ajudado! Parabéns`
                this.success = true

                setTimeout(() => this.mensagem = '', 1000)
                setTimeout(() => this.$router.replace({ name: "meus" }), 1500);
            })
        }
    }
}
</script>

<style scoped>

.fechar {
    position: absolute;
    top: 1px;
    right: 1px;
    font-size: 16px;
    color: #fff;
    background-color: red;
    padding: 2px 5px;
    cursor: pointer;
    border-radius: 50%;
    z-index: 2;
}

.form-perfil input {
    width: 95%;
}

.btn-form {
    margin-top: 0px;
    max-width: 300px;
    width: 100%;
}

</style>