<template>
    <div>
        <div class="box-imagem-nome">
            <img 
                :src="anuncio.imagem" 
                :class="{ finalizado: anuncio.pausado }"
                alt="Imagem de um animal">

            <div class="box-nome-logo">
                <h1>{{anuncio.nome}}</h1>

                <img 
                    v-if="anuncio.logo_ong" 
                    :src="anuncio.logo_ong" 
                    alt="Logo da ONG"
                >
            </div>

            <span 
                class="anuncio-finalizado"
                v-if="anuncio.pausado && anuncio.categoria === 'Adocao'"
                >
                Adotado 🐶
            </span>

            <span 
                class="anuncio-finalizado"
                v-else-if="anuncio.pausado"
                >
                Encontrado 🐶
            </span>
        </div>

        <div 
            :class="[anuncio.categoria === 'Adocao' ? 'adocao' : 'perdido']"
            id="category" 
            >
            <p>{{anuncio.categoria}}</p>
        </div>

        <div class="dados">
            <div>
                <div>
                    <p>{{anuncio.idade}}</p>

                    <span>
                        <img src="../assets/idade.png" alt="Icon Calendario">
                    </span>
                </div>

                <div>
                    <p v-if="anuncio.castrado === false">Não castrado</p>
                    <p v-else>Castrado</p>

                    <span>
                        <img src="../assets/castrado.png" alt="Logo pata">
                    </span>
                </div>
            </div>

            <div>
                <div>
                    <p :class="[anuncio.sexo === 'Macho' ? 'macho' : 'femea']">
                        {{anuncio.sexo}}
                    </p>
                    
                    <span>
                        <img src="../assets/sexo.png" alt="Icon Sexo">
                    </span>
                </div>

                <div>
                    <p>{{anuncio.peso}} Kg</p>
                    
                    <span>
                        <img src="../assets/peso.png" alt="Icon KG">
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["anuncio"]
}
</script>