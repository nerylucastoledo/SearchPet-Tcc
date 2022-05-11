<template>
    <div class="container login-form">
        <div v-if="mensagem.length">
            <ModalSuccess 
                :mensagem="mensagem" 
                :success="success">
            </ModalSuccess>
        </div>

        <div class="login">
            <div class="new-user">
                <p>Já possui conta?</p>

                <router-link to="/login" class="go-register">Login</router-link>
            </div>

            <img src="../assets/logo.webp" alt="Logo">

            <h1 class="titulo">Criar conta 🐶</h1>

            <div class="type-account">
                <label class="form-control">
                    <input 
                        type="radio" 
                        checked 
                        name="radio" 
                        value="ONG" 
                        v-model="typeAccount"
                    >
                    ONG
                </label>

                <label class="form-control">
                    <input 
                        type="radio" 
                        name="radio" 
                        value="particular" 
                        v-model="typeAccount"
                    >
                    Particular
                </label>
            </div>

            <form action="#" @submit.prevent="registrarCadastro">
                <div>
                    <div>
                        <label for="name">Nome</label>
                        <input 
                            type="text"
                            id="name" 
                            name="name"
                            placeholder="Nome"
                            required 
                            v-model="form.nameOng"
                        >
                    </div>

                    <div>
                        <label for="username">Username</label>
                        <input 
                            type="text"
                            id="username" 
                            name="username"
                            placeholder="Username"
                            maxlength="10"
                            minlength="4"
                            required 
                            v-model="username"
                            @change="validarUsername(username)"
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
                            v-model="email"
                        >
                    </div>

                    <div>
                        <label for="password">Sua senha</label>
                        <input 
                            type="password"
                            id="password" 
                            name="password"
                            placeholder="Sua senha"
                            autocomplete="off"
                            required 
                            v-model="password"
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
                            minlength="7"
                            maxlength="8"
                            v-model="form.cep"
                            @keyup="validarCep(form.cep)"
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
                            readonly
                            v-model="form.city"
                        >
                    </div>
                </div>

                <div>
                    <div>
                        <label for="district">Bairro</label>
                        <input 
                            type="text"
                            id="district" 
                            name="district"
                            placeholder="Bairro"
                            required 
                            v-model="form.district"
                        >
                    </div>

                    <div>
                        <label for="street">Rua</label>
                        <input 
                            type="text"
                            id="street" 
                            name="street"
                            placeholder="Rua"
                            required 
                            v-model="form.street"
                        >
                    </div>
                </div>

                <div v-if="typeAccount === 'ONG'">
                    <div>
                        <label for="whatsapp">Whatsapp</label>
                        <input 
                            id="whatsapp" 
                            name="whatsapp"
                            placeholder="Celular"
                            required 
                            v-mask="'(##) # ####-####'"
                            v-model="form.whatsapp"
                        >
                    </div>

                    <div>
                        <label for="image">Foto de perfil</label>
                        <input 
                            required
                            type="file" 
                            ref="imageData"
                            accept="image/*"
                        >
                    </div>
                </div>

                <p class="termos">
                    Ao se inscrever, você concorda com os 
                    <router-link to="termos-de-uso">Termos de Uso</router-link>.
                </p>

                <button class="btn-form" type="submit">Cadastrar</button>
            </form>
        </div>
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
                image: null,
                nameOng: "",
                cep: "",
                city: "",
                district: "",
                street: "",
                whatsapp: "",
            },
            username: "",
            email: "",
            password: "",
            imageData: '',
            typeAccount: '',
            success: true,
            mensagem: "",
            cepError: '',
            usernameApproved: null,
            termoDeUso: false
        }
    },

    methods: {
        registrarCadastro() {
            if(this.typeAccount === 'ONG' && this.usernameApproved) {
                this.adicionarFoto()
                return
            }
            
            if(this.usernameApproved) {
                this.criarUsuario()
                return
            }
            
            this.mostrarMensagem('Username já em uso', false, 2000)
        },

        async adicionarFoto() {
            const file = this.$refs.imageData.files[0];
            
            const storageRef = firebase.storage().ref(`${file.name}`).put(file)
            storageRef.on(`state_changed`, snapshot => {}, error => {}, () => {
                    storageRef.snapshot.ref.getDownloadURL()
                    .then((url) => {
                        this.form.image = url
                        this.criarUsuario()
                    })
                    .catch(() => this.mostrarMensagem('Essa imagem já existe', false, 2000))
                }
            )
        },

        async criarUsuario() {
            await firebase.auth()
            .createUserWithEmailAndPassword(this.email, this.password)
            .then(() => {
                firebase.auth().currentUser.updateProfile({ displayName: this.username })  
                this.mostrarMensagem('Conta criada com sucesso', true, 2000)
                this.inserirOsDadosDaPessoa(this.username)
            })
            .catch(() => this.mostrarMensagem('Já existe uma conta com esse e-mail', false, 2000))
        },

        async inserirOsDadosDaPessoa(username) {
            await firebase.database()
            .ref(`/${username}`)
            .once("value", () => {
                firebase.database()
                .ref(`/${username}`)
                .update({
                    ...this.form,
                    type: this.typeAccount
                })
                .then(() => {
                    localStorage.setItem('displayName', username)
                    this.$router.push({name: 'home'}), 4000
                })
            })
        },

        mostrarMensagem(message, boolean, time) {
            this.mensagem = message
            this.success = boolean
            setTimeout(() => this.mensagem = '', time)
        },

        validarCep(cepDiditado) {
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
                return
            }
                
            document.getElementById('cep').style.border = '1px solid red'
        },

        validarUsername(username) {
            firebase.database()
            .ref(username)
            .once("value", snapshot => {
                if(snapshot.exists()) {
                    document.getElementById('username').style.border = '1px solid red'
                    this.mostrarMensagem('Username existente!', false, 2000)
                    this.usernameApproved = false
                    return
                }

                document.getElementById('username').style.border = 'none'
                this.usernameApproved = true
            })
        }
    },

    mounted() {
        document.title = "Novo cadastro"
        this.typeAccount = 'ONG'
    }
}
</script>

<style scoped>

.type-account {
    margin-bottom: 60px;
}

.form-control {
  font-weight: bold;
  display: grid;
  grid-template-columns: 1em auto;
  gap: 0.5em;
  height: 0px;
}

input[type="radio"] {
    appearance: none;
    color: currentColor;
    border: 0.15em solid currentColor;
    transform: translateY(-0.075em);
    display: grid;
    padding: 13px 10px !important;
    cursor: pointer;
}

input[type="radio"]:checked {
    background-color: #36C9D2;
}

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

.termos {
    text-align: center;
    margin: 20px 0 40px;
    padding: 0 30px;
}

.termos a {
    color: #36C9D2;
}

@media (max-width: 745px) {
    .login div {
        display: block;
    }

    .login .type-account {
        display: flex !important;
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
    .login {
        padding: 50px 0px
    }

    .login img {
        display: block;
        max-width: 100%;
        padding: 0 10px;
    }

    .btn-form {
        text-align: center;
        width: 70%;
    }

    .login div, .login .type-account {
        padding: 0 10px;
        margin-right: 10px;
    }

    .login .type-account {
        margin-bottom: 30px;
    }

    .form-control {
        font-weight: bold;
        display: grid;
        grid-template-columns: 30px auto;
        gap: 0.5em;
        height: 60px;
    }
}

@media (max-width: 400px) {
    .login .type-account {
        display: grid !important;
    }
}

</style>