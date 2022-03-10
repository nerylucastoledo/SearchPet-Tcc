<template>

    <div class=" container login-form">
        <div v-if="mensagem.length">
            <ModalSuccess :mensagem="mensagem" :success="success"></ModalSuccess>
        </div>

        <form action="#" class="login">

            <div class="new-user">
                <p>Já possui conta?</p>

                <router-link to="/login" class="go-register">
                    Login
                </router-link>
            </div>

            <img src="../assets/logo.png" alt="">

            <h1 class="titulo">Criar conta 🐶</h1>

            <div>
                <div>
                    <label for="name">Nome da ONG</label>
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
                    <label for="username">Username</label>
                    <input 
                    type="text"
                    id="username" 
                    name="username"
                    max="10"
                    placeholder="Username"
                    required 
                    v-model="form.username"
                    >
                </div>
            </div>

            <div>
                <div>
                    <label for="email">Seu email</label>
                    <input 
                    type="email"
                    id="email" 
                    name="email"
                    placeholder="email"
                    required 
                    v-model="form.email"
                    >
                </div>

                <div>
                    <label for="password">Sua senha</label>
                    <input 
                    type="password"
                    id="password" 
                    name="password"
                    placeholder="Sua senha"
                    required 
                    v-model="form.password"
                    >
                </div>
            </div>

            <div>
                <div>
                    <label for="cep">Cep</label>
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
                    <label for="city">Cidade</label>
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
                </div>
            </div>

            <div>
                <div>
                    <label for="district">Bairro</label>
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
                    <label for="street">Rua</label>
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
                </div>
            </div>

            <div>
                <div>
                    <label for="cellphone">Whatsapp</label>
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
                    <label for="image">Foto de perfil</label>
                    <input 
                    type="file" 
                    @change="previewImage" 
                    accept="image/*"
                    >
                </div>
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

                        console.log(this.picture)
                        
                        this.insertDatOfPeople(this.form.username)
                    });

                }
            );
        },

        async createUser() {
            console.log(this.form, 'e', this.picture)
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
            console.log(username)
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

.login-form {
    margin-bottom: 60px;
    padding: 0 30px;
}

.login {
    margin-top: 60px;
    background-color: #fff;
    box-shadow: 0px 7px 7px rgba(0, 0, 0, 0.25);
    border-radius: 15px !important;
}

.login img {
    margin: 0 auto;
    display: block;
}

.login .titulo {
    margin-bottom: 60px;
    color: #36C9D2;
    text-align: center;
    font-size: 3rem;
    margin-top: 60px;
}

.login div {
    display: flex;
    flex: 1;
    flex-wrap: wrap;
    justify-content: space-around;
}

.login input{
    width: 91%;
}

.login label {
    color: #36C9D2;
}

.progress {
    font-weight: bold;
    text-align: center;
    margin-top: 30px;
}

#progress {
    height: 20px;
}

.read {
    background-color: rgb(212, 212, 212);
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
    .login div {
        display: block;
    }

    .login input{
        width: 100%;
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

    .go-register {
        width: 100%;
    }
}

@media (max-width: 500px) {
    .login img {
        display: block;
        max-width: 100%;
    }

    .btn-form {
        max-width: 100%;
    }
}

</style>