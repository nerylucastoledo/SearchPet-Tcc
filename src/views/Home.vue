<template>
    <main class="container content-principal">
        <div class="filter-home">
            <select v-model="city" class="filter-selected">
                <option disabled value="">Selecione a Cidade</option>

                <option value="Pouso Alegre">Pouso Alegre</option>

                <option value="Santa Rita do Sapucai">Santa Rita do Sapucai</option>
            </select>

            <select v-model="type" class="filter-selected">
                <option disabled value="">Buscar por</option>

                <option value="Adocao">Adoção</option>

                <option value="Perdidos">Perdidos</option>
            </select>
        </div>

        <div class="cards">

            <div>
                <img id="image-animal" src="../assets/cachorro.png" alt="">

                <div>
                    <div class="info-animal">
                        <h2 id="name-animal">Scooby</h2>
                        <span>
                            <img id="logo-ong" src="../assets/image_ong.png" alt="">
                        </span>
                    </div>

                    <div class="local-animal">
                        <span>
                            <img src="../assets/local.png" alt="">
                        </span>

                        <p>São Francisco de Assis</p>
                    </div>

                    <div class="category">
                        <p>Para Adoção</p>
                    </div>

                    <div class="quality">
                        <span>Macho</span>

                        <span>7 Meses</span>

                        <span>Não castrado</span>
                    </div>
                </div>
            </div>

            <div>
                <img id="image-animal" src="../assets/cachorro.png" alt="">

                <div>
                    <div class="info-animal">
                        <h2 id="name-animal">Scooby</h2>
                        <span>
                            <img id="logo-ong" src="../assets/image_ong.png" alt="">
                        </span>
                    </div>

                    <div class="local-animal">
                        <span>
                            <img src="../assets/local.png" alt="">
                        </span>

                        <p>Arvore Grande</p>
                    </div>

                    <div class="category">
                        <p>Para Adoção</p>
                    </div>

                    <div class="quality">
                        <span>Macho</span>

                        <span>7 Meses</span>

                        <span>Não castrado</span>
                    </div>
                </div>
            </div>

            <div>
                <img id="image-animal" src="../assets/cachorro.png" alt="">

                <div>
                    <div class="info-animal">
                        <h2 id="name-animal">Scooby</h2>
                        <span>
                            <img id="logo-ong" src="../assets/image_ong.png" alt="">
                        </span>
                    </div>

                    <div class="local-animal">
                        <span>
                            <img src="../assets/local.png" alt="">
                        </span>

                        <p>Santa Rita II</p>
                    </div>

                    <div class="category">
                        <p>Para Adoção</p>
                    </div>

                    <div class="quality">
                        <span>Macho</span>

                        <span>7 Meses</span>

                        <span>Não castrado</span>
                    </div>
                </div>
            </div>

            <div>
                <img id="image-animal" src="../assets/cachorro.png" alt="">

                <div>
                    <div class="info-animal">
                        <h2 id="name-animal">Scooby</h2>
                        <span>
                            Particular
                        </span>
                    </div>

                    <div class="local-animal">
                        <span>
                            <img src="../assets/local.png" alt="">
                        </span>

                        <p>Santa Rita II</p>
                    </div>

                    <div class="category">
                        <p>Para Adoção</p>
                    </div>

                    <div class="quality">
                        <span>Macho</span>

                        <span>7 Meses</span>

                        <span>Não castrado</span>
                    </div>
                </div>
            </div>

            <div>
                <img id="image-animal" src="../assets/cachorro.png" alt="">

                <div>
                    <div class="info-animal">
                        <h2 id="name-animal">Scooby</h2>
                        <span>
                            Particular
                        </span>
                    </div>

                    <div class="local-animal">
                        <span>
                            <img src="../assets/local.png" alt="">
                        </span>

                        <p>Santa Rita II</p>
                    </div>

                    <div class="category">
                        <p>Para Adoção</p>
                    </div>

                    <div class="quality">
                        <span>Macho</span>

                        <span>7 Meses</span>

                        <span>Não castrado</span>
                    </div>
                </div>
            </div>

            <div>
                <img id="image-animal" src="../assets/cachorro.png" alt="">

                <div>
                    <div class="info-animal">
                        <h2 id="name-animal">Scooby</h2>
                        <span>
                            Particular
                        </span>
                    </div>

                    <div class="local-animal">
                        <span>
                            <img src="../assets/local.png" alt="">
                        </span>

                        <p>Santa Rita II</p>
                    </div>

                    <div class="category">
                        <p>Para Adoção</p>
                    </div>

                    <div class="quality">
                        <span>Macho</span>

                        <span>7 Meses</span>

                        <span>Não castrado</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="porque-adotar">
            <h1 class="titulo">Porque Adotar?</h1>

            <div>
                <div>
                    <img src="../assets/cahcorro_adocao.png" alt="Logo Dog">

                    <p>
                        Você estará ajudando a reduzir a quantidade de animais abadonados da rua que já passaram por muito sofrimento e que só querem ser feliz.
                    </p>
                </div>

                <div>
                    <img src="../assets/cahcorro_adocao_2.png" alt="Logo Dog">

                    <p>
                        Não existe coisa melhor do que vê-los felizes e saudáveis após receber muito amor e carinho. Então a pergunta é:  Se pode ajudar, porquê não ajudar?
                    </p>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    data() {
        return {
            city: "",
            type: ""
        }
    }
}
</script>

<style scoped>

.content-principal {
    margin-top: 60px;
}

.filter-home {
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.filter-home select {
    background-color: #36C9D2;
    border-radius: 10px;
    width: 45%;
    height: 50px;
    border: none;
    color: #fff;
    font-size: 16px;
    margin-bottom: 30px;
}

.cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 20px;
    margin-bottom: 60px;
}

.cards > div {
    background-color: #fff;
    box-shadow: 0px 7px 7px rgba(0, 0, 0, 0.25);
    border-radius: 15px;
    display: flex;
    max-width: 100%;
    margin-top: 30px;
}

#image-animal {
    max-width: 150px;
    object-fit: cover;
    border-radius: 10px 0 0 10px;
}

.info-animal {
    display: flex;
    padding: 10px 10px 0 0;
    justify-content: space-between;
    align-items: center;
}

#name-animal {
    margin-left: 20px;
}

#logo-ong {
    width: 30px;
    height: 30px;
}

.local-animal {
    margin-top: 10px;
    display: flex;
    font-size: 14px;
    align-items: center;
}

.local-animal p {
    max-width: 150px;
}

.local-animal span {
    margin-left: 20px;
    margin-right: 10px;
}

.category {
    background-color: #6DB662;
    text-align: center;
    color: #fff;
    margin: 10px 0 0 20px;
    padding: 5px; 
    width: 150px;
    border-radius: 15px;
}

.quality {
    display: flex;
    font-size: 12px;
    margin-top: 10px;
    justify-content: space-between;
    align-items: center;
    margin-left: 15px;
    padding-bottom: 10px;
    font-weight: bold;
}

.quality span {
    margin: 0 5px;
}

/* PORQUE ADOTAR */

.porque-adotar {
    margin-bottom: 60px;
}

.porque-adotar h1 {
    margin-bottom: 60px;
}

.porque-adotar div {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
}

.porque-adotar div img {
    height: 150px;
}

.porque-adotar div p {
    max-width: 300px;
    margin-left: 20px;
}

</style>