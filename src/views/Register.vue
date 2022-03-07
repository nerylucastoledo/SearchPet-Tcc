<template>

    <div class="login-form">
        <h1 class="titulo">Crie sua Conta</h1>

        <div v-if="mensagem.length">
            <ModalSuccess :mensagem="mensagem" :success="success"></ModalSuccess>
        </div>

        <form action="#" class="login">

            <img src="../assets/logo.png" alt="">

            <div>
                <input 
                    type="file" 
                    @change="previewImage" 
                    accept="image/*"
                >

                <input 
                    type="text"
                    id="name" 
                    name="name"
                    placeholder="Nome da Ong"
                    required 
                    v-model="form.name"
                >
            </div>

            <div>
                <input 
                    type="text"
                    id="username" 
                    name="username"
                    placeholder="username"
                    required 
                    v-model="form.username"
                >

                <input 
                    type="number"
                    id="cep" 
                    name="cep"
                    placeholder="Cep"
                    required 
                    v-mask="'########'"
                    v-model="form.cep"
                    @keyup="addCep()"
                >
            </div>

            <div>
                <input 
                    class="read"
                    type="text"
                    id="city" 
                    name="city"
                    placeholder="Cidade"
                    required 
                    v-model="form.city"
                    readonly
                >

                <input 
                    class="read"
                    type="text"
                    id="district" 
                    name="district"
                    placeholder="Bairro"
                    required 
                    v-model="form.district"
                    readonly
                >
            </div>

            <div>
                <input 
                    class="read"
                    type="text"
                    id="street" 
                    name="street"
                    placeholder="Rua"
                    required 
                    v-model="form.street"
                    readonly
                >

                <input 
                    id="cellphone" 
                    name="cellphone"
                    placeholder="Celular"
                    required 
                    v-mask="'(##) # ####-####'"
                    v-model="form.cellphone"
                >
            </div>


            <div>
                <input 
                    type="email"
                    id="email" 
                    name="email"
                    placeholder="Seu e-mail"
                    required 
                    v-model="form.email"
                >

                <input 
                    type="password"
                    id="password" 
                    name="password"
                    placeholder="Sua senha"
                    required 
                    v-model="form.password"
                >
            </div>

            <button 
                class="btn-form" 
                type="submit" 
                @click.prevent="register">
                Cadastrar
            </button>
        
            <p class="progress">Cadastro: {{uploadValue.toFixed()+"%"}}
            <progress id="progress" :value="uploadValue" max="100" ></progress>  
            </p>
        </form>

        <h2 class="subtitulo">
            <router-link to="/login">Login</router-link>
        </h2>
    </div>
</template>

<script>

import * as firebase from 'firebase';
import ModalSuccess from '../components/ModalSuccess.vue'

export default {

    components: {
        ModalSuccess
    },

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
            success: true,
            mensagem: "",
            imageData: null,
            picture: null,
            uploadValue: 0,
            cepError: ''
        }
    },

    methods: {
        addCep() {
            var cepDiditado = this.form.cep
            var tamanhoMaxCep = 8

            if(cepDiditado.length === tamanhoMaxCep) {
                fetch(`https://viacep.com.br/ws/${cepDiditado}/json/`)
                .then(req => req.json())
                .then(res => {
                    this.form.city = res.localidade,
                    this.form.district = res.bairro,
                    this.form.street = res.logradouro

                    document.getElementById('cep').style.border = 'none'
                })
            } else {
                document.getElementById('cep').style.border = '1px solid red'
            }
        },

        previewImage(event) {
            this.uploadValue=0;
            this.picture=null;
            this.imageData = event.target.files[0];
        },

        register() {
            this.addPhotoAndSaveUrl()
            console.log(form)
        },

        async addPhotoAndSaveUrl() {
            this.picture = null;

            const storageRef = firebase.storage().ref(`${this.imageData.name}`).put(this.imageData);
            
            storageRef.on(`state_changed`, snapshot => {
                this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                }, error => {
                    this.mensagem = 'Imagem invalida';
                    this.success = false

                    setTimeout(() => {
                        this.mensagem = ''
                    }, 1000);
                }, () => {
                    this.uploadValue=100;
                    storageRef.snapshot.ref.getDownloadURL().then((url)=>{
                        this.picture = url;
                        
                        this.insertDatOfPeople(this.form.username)
                    });

                }
            );
        },

        async createUser() {
            await firebase.auth().createUserWithEmailAndPassword(this.form.email, this.form.password)
            .then(data => {
                firebase.auth().currentUser.updateProfile({
                    displayName: this.form.username
                })  
                this.$store.dispatch("fetchUser", data)
                this.mensagem = 'Usuario criado com sucesso!';
                this.success = true

                setTimeout(() => {
                    this.$router.push({name: 'home'})
                }, 1000);
            })
            .catch(() => {
                this.mensagem = 'Não foi possível criar!';
                this.success = false

                setTimeout(() => {
                    this.mensagem = ''
                }, 1000);
            });
        },

        insertDatOfPeople(username) {
            firebase.database()
            .ref(`/${username}`)
            .once("value", snapshot => {
                if(snapshot.exists()) {
                    this.success = false
                    this.mensagem =  'Username existente!'

                    setTimeout(() => {
                        this.mensagem =  ''
                    }, 1000);

                } else {
                    firebase.database()
                    .ref(`/${username}`)
                    .update({
                        image: this.picture,
                        nameOng: this.form.name,
                        cep: this.form.cep,
                        city: this.form.city,
                        district: this.form.district,
                        street: this.form.street,
                        whatsapp: this.form.cellphone,
                    }).then(() => {
                        this.createUser()
                    })
                }
            })
        }
    },
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

.progress {
    font-weight: bold;
    margin-bottom: 40px;
}

#progress {
    height: 20px;
}

.read {
    background-color: rgb(212, 212, 212);
}

</style>