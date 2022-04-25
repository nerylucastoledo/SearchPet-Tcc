<template>
    <div class="container">
        <div class="introducao">
            <div class="mensagem-inicial">
                <h1 class="titulo">Faça uma adoção, porque o amor não tem preço e nem raça.</h1>

                <p>Nós da <strong>Search Pet</strong> acreditamos que nenhum dinheiro é capaz de comprar o amor, com isso, criamos esse site para que você possa encontrar o amiguinho que é a sua cara, seja ele um <strong>cachorro</strong>, <strong>gato</strong> ou até um <strong>passarinho</strong>.</p>
                <p>Aqui você também irá ajudar a encontrar os animaizinhos que estão desaparecidos dos seus respectivos donos. Você pode encontrar algum animalzinho perdido em qualquer cidade, ajudar nunca é demais, ne? ❤️</p>
                <p>Caso você encontre um amiguinho a sua cara conosco, você pode publicar um final feliz no nosso blog e mostrar pra todos o quão bom é fazer o bem para uma vida!</p>
                <p>Você pode ter a <strong>Search Pet</strong> no seu celular, clique abaixo para baixar</p>
            
               <button
                    v-if="deferredPrompt"
                    ref="addBtn"
                    class="btn-padrao"
                    @click="clickCallback"
                    >
                    BAIXAR APP ➡︎
                </button>
            </div>

            <div class="carrossel">
                <Carousel :per-page="1" :mouse-drag="true" :autoplay="true">
                    <slide>
                        <img class="imagem-carrossel" src="../assets/app-background.png" alt="Imagem celular">
                    </slide>
                    <slide>
                        <img class="imagem-carrossel" src="../assets/app-background-2.png" alt="Imagem celular">
                    </slide>
                </Carousel>
            </div>
        </div>
    </div>
</template>

<script>

import { Carousel, Slide } from 'vue-carousel';

export default {

    components: {
        Carousel,
        Slide,
    },

    data: () => ({
        deferredPrompt: null,
    }),

    mounted() {
        this.captureEvent()
    },

    methods: {
        captureEvent() {
            window.addEventListener('beforeinstallprompt', (e) => {
                console.log(e)
                e.preventDefault()
                this.deferredPrompt = e
            })
        },
        clickCallback() {
            this.deferredPrompt.prompt()
            this.deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                }
                this.deferredPrompt = null
            })
        },
    }
}
</script>

<style scoped>

.container {
    padding: 0 30px;
}

.introducao {
    margin-top: 60px;
    display: flex;
    justify-content: space-around;
}

img {
    height: 650px;
}

.carrossel {
    text-align: center;
    max-width: 400px;
}

.mensagem-inicial h1 {
    max-width: 700px;
    margin: 40px 0px;
    color: #222;
}

.mensagem-inicial p {
    max-width: 700px;
    margin: 30px 10px;
    font-size: 18px;
    color: #7A7A7A;
    line-height: 1.5rem;
}

.mensagem-inicial p strong {
    color: #36C9D2;
}


.btn-padrao {
    display: block;
    margin: 0px;
}

@media (max-width: 930px) {
    .introducao {
        align-items: center;
    }

    .titulo {
        text-align: initial;
    }

    .mensagem-inicial p {
        margin-right: 0px;
        margin-left: 0px;
    }

    img {
        margin-top: 60px;
        height: 500px;
    }
}

@media (max-width: 800px) {
    .introducao {
        display: block;
    }

    .carrossel {
        display: block;
        margin: 0 auto;
    }
}

</style>