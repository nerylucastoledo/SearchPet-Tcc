<template>
    <div class="container">
        <div v-if="mensagem.length">
            <ModalSuccess 
                :mensagem="mensagem" 
                :success="success"
                >
            </ModalSuccess>
        </div>

        <h1 class="titulo">Editar Perfil</h1>

        <div class="perfil">
            <div class="info-perfil" v-if="imagemBanco">
                <img :src="imagemBanco" alt="Foto da ONG">

                <input 
                    id="newImagem" 
                    type="file" 
                    name="newImagem" 
                    autocomplete="newImagem" 
                    required 
                    ref="newImagem"
                >
            </div>

            <form class="form-perfil" @submit.prevent="atualizarPerfil">
                <div>
                    <div>
                        <label for="name">Seu nome</label>
                        <input 
                            type="text"
                            id="name" 
                            name="name"
                            placeholder="Nome da ong"
                            required 
                            v-model="form.nameOng"
                        >
                    </div>

                    <div>
                        <label for="cep">Cep</label>
                        <input 
                            id="cep" 
                            name="cep" 
                            autofocus 
                            placeholder="xxxxx-xxx"
                            required 
                            v-mask="'#####-###'"
                            v-model="form.cep"
                            @keyup="addCep()"
                        >
                    </div>
                </div>           

                <div>
                    <div>
                        <label for="city">Cidade</label>
                        <input 
                            id="city" 
                            class="read-only"
                            name="city"
                            placeholder="Cidade"
                            required 
                            v-model="form.city"
                            readonly
                        >
                    </div>

                    <div>
                        <label for="district">Bairro</label>
                        <input 
                            id="district" 
                            name="district" 
                            placeholder="Digite o bairro"
                            required 
                            v-model="form.district"
                        >
                    </div>
                </div>  

                <div>
                    <div>
                        <label for="street">Rua</label>
                        <input 
                            id="street" 
                            name="street"
                            placeholder="Digite a rua"
                            required 
                            v-model="form.street"
                        >
                    </div>

                    <div>
                        <label for="cellphone">Whatsapp</label>
                        <input 
                            id="cellphone" 
                            name="cellphone" 
                            required 
                            placeholder="(xx) x xxxx-xxxx"
                            v-mask="'(##) # ####-####'"
                            v-model="form.whatsapp"
                        >
                    </div>
                </div>   

                <button class="btn-form" type="submit">Salvar</button>
            </form>
        </div>
    </div>
</template>

<script>

import firebase from 'firebase'
import ModalSuccess from '../components/ModalSuccess.vue'

export default {

    components: {
        ModalSuccess,
    },

    data() {
        return {
            form: {
                nameOng: "",
                cep: "",
                city: "",
                district: "",
                street: "",
                whatsapp: "",
            },
            typeAccount: "",
            imagemBanco: null,
            newImagem: '',
            picture: '',
            success: true,
            mensagem: "",
        }
    },

    methods: {
        addCep() {
            var cepDiditado = this.form.cep
            var tamanhoMaxCep = 9

            if(cepDiditado.length === tamanhoMaxCep) {
                fetch(`https://viacep.com.br/ws/${cepDiditado}/json/`)
                .then(req => req.json())
                .then(res => {
                    this.form.city = res.localidade,
                    this.form.district = res.bairro,
                    this.form.street = res.logradouro
                    document.getElementById('cep').style.border = 'none'
                })
                return
            }
                
            document.getElementById('cep').style.border = '1px solid red'
        },

        atualizarPerfil() {
            if(this.typeAccount === 'particular') {
                this.atualizarDados()
                return
            }

            const file = this.$refs.newImagem.files[0];
            if(file) {
                this.salvarNovaImagem(file)
                return
            }

            this.atualizarDados()
        },

        async salvarNovaImagem(imagem) {
            const storageRef = firebase.storage().ref(`${imagem.name}`).put(imagem)
            storageRef.on(`state_changed`, () => {
                storageRef.snapshot.ref
                .getDownloadURL()
                .then((url) => {
                    this.picture = url
                    this.atualizarDados()
                })
            })
        },

        async atualizarDados() {
            const displayName = localStorage.getItem('displayName')
            var imagem = this.picture ? this.picture : this.imagemBanco

            if(this.typeAccount === 'particular') {
                imagem = ""
            }

            firebase.database()
            .ref(displayName)
            .update({
                ...this.form,
                image: imagem,
            })
            .then(() => {
                this.success = true
                this.mensagem = 'Perfil atualizado com sucesso!'
                setTimeout(() => this.$router.push({name: 'home'}), 1500)
            })
            .catch(() => {
                this.success = false
                this.mensagem = 'Não foi possível atualizar!'
            })
        }
    },

    created() {
        document.title = "Meu perfil"
        const displayName = localStorage.getItem('displayName')

        firebase.database()
        .ref(displayName)
        .once("value", snapshot => {
            this.imagemBanco = snapshot.val()["image"],
            this.form = {
                nameOng: snapshot.val()["nameOng"],
                cep: snapshot.val()["cep"],
                city: snapshot.val()["city"],
                district: snapshot.val()["district"],
                street: snapshot.val()["street"],
                whatsapp: snapshot.val()["whatsapp"],
            }
            this.typeAccount = snapshot.val()["type"]
        })
    },
}
</script>

<style>

.perfil {
    margin: 60px 0;
    display: flex;
    padding: 0 30px;
}

.info-perfil {
    box-shadow: 0px 7px 7px rgba(0, 0, 0, 0.25);
    padding: 20px;
    border-radius: 10px;
    margin-right: 30px;
}

.info-perfil img {
    display: block;
    margin: 0 auto 40px;
    max-width: 250px;
    height: 200px;
    object-fit: cover;
}

#imagem_produto {
    display: block;
    margin: 0 auto;
}

/* FORM */
.form-perfil {
    width: 100%;
}

.form-perfil > div {
    display: flex;
    width: 100%;
    justify-content: space-between;
}

.form-perfil > div div {
    width: 100%;
}

.form-perfil label {
    display: block;
    margin-bottom: 10px;
}

.form-perfil input {
    padding: 15px 0;
    box-shadow: 0px 7px 7px rgba(0, 0, 0, 0.25);
    border: none;
    border-radius: 10px;
    padding-left: 15px;
    color: #222;
    font-size: 18px;
    margin-bottom: 30px;
    width: 90%;
}

.form-perfil input:focus {
    outline: none !important;
    border: none;
    box-shadow: 0 0 10px #36C9D2;
}

.read-only {
    background-color: rgb(209, 205, 200);
}

@media (max-width: 845px) {
    .form-perfil > div {
        display: block;
    }

    .info-perfil img {
        max-height: 300px;
    }
}

@media (max-width: 720px) {
    .perfil {
        display: block;
    }

    .info-perfil {
        margin-right: 0px;
        margin-bottom: 40px;
    }

    .form-perfil input {
        width: 96%;
    }
}

</style>