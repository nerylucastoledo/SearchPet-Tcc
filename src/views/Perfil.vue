<template>

    <div class="container">
        <h1 class="titulo">Editar Perfil</h1>

        <div class="perfil">
            <div class="info-perfil">
                <img :src="form.imagem_produto" alt="Foto da ONG">

                <input 
                    id="imagem_produto" 
                    type="file" 
                    name="imagem_produto" 
                    autocomplete="imagem_produto" 
                    required 
                    ref="imagem_produto">
            </div>

            <form class="form-perfil">
                <div>
                    <div>
                        <label for="name">Nome da Ong</label>
                        <input 
                            type="text"
                            id="name" 
                            name="name"
                            placeholder="Nome da ong"
                            required 
                            v-model="form.name"
                        >
                    </div>

                    <div>
                        <label for="cep">Cep</label>
                        <input 
                            id="cep" 
                            name="cep" 
                            required 
                            autofocus 
                            v-mask="'#####-###'"
                            v-model="form.cep"
                            placeholder="xxxxx-xxx"
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
                            class="read-only"
                            name="district" 
                            required 
                            autofocus 
                            v-model="form.district"
                            placeholder="Digite o bairro"
                            readonly
                        >
                    </div>
                </div>  

                <div>
                    <div>
                        <label for="street">Rua</label>
                        <input 
                            id="street" 
                            class="read-only"
                            name="street"
                            placeholder="Digite a rua"
                            required 
                            v-model="form.street"
                            readonly
                        >
                    </div>

                    <div>
                        <label for="cellphone">whatssapp</label>
                        <input 
                            id="cellphone" 
                            name="cellphone" 
                            required 
                            autofocus 
                            v-model="form.number_whatsapp"
                            v-mask="'(##) # ####-####'"
                            placeholder="(xx) x xxxx-xxxx"
                        >
                    </div>
                </div>   

                <button class="btn-form" type="submit" @click.prevent="saveImageAndCallUpdate">Salvar</button>
            </form>
        </div>
    </div>
</template>

<script>

import firebase from 'firebase'

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
            imagem_produto: '',
            picture: ''
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

            } else {
                document.getElementById('cep').style.border = '1px solid red'
            }
        },

        async saveImageAndCallUpdate() {
            const file = this.$refs.imagem_produto.files[0];
            this.picture = null;

            const storageRef = firebase.storage()
                                        .ref(`${file.name}`)
                                        .put(file);
            
            storageRef.on(`state_changed`, () => {
                storageRef.snapshot.ref
                .getDownloadURL()
                .then((url) => {
                    this.picture = url;

                    this.uploadPerfil()
                });
            });
        },

        async uploadPerfil() {
            const displayName = sessionStorage.getItem('displayName')

            firebase.database()
            .ref(displayName)
            .update({
               cep: this.form.cep,
               city: this.form.city,
               district: this.form.district,
               image: this.picture,
               nameOng: this.form.name,
               street: this.form.street,
               whatsapp: this.form.number_whatsapp
            })
            .then(() => {
                setTimeout(() => this.$router.push(
                    {name: 'home'}
                ), 1000);
            })
        }
    },

    created() {
        const displayName = sessionStorage.getItem('displayName')

        firebase.database()
        .ref(displayName)
        .once("value", snapshot => {
            this.form = {
                imagem_produto: snapshot.val()["image"],
                name: snapshot.val()["nameOng"],
                cep: snapshot.val()["cep"],
                city: snapshot.val()["city"],
                district: snapshot.val()["district"],
                street: snapshot.val()["street"],
                number_whatsapp: snapshot.val()["whatsapp"],
            }
        })
    },

    beforeCreate() {
        const logado = sessionStorage.getItem('login')
        
        if(!logado)
            this.$router.replace({ name: "login" });
    }
}
</script>

<style scoped>

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