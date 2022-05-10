<template>
    <div>
        <div class="filter-home">
            <select v-model="city" class="filter-selected">
                <option disabled value="">Selecione a Cidade</option>
                <option 
                    v-for="cidade of citys" 
                    :key="cidade" 
                    :value="cidade"
                    >
                    {{cidade}}
                </option>
            </select>

            <select v-model="type" class="filter-selected">
                <option disabled value="">Selecione a Categoria</option>
                <option value="Adocao">Adoção</option>
                <option value="Perdido">Perdidos</option>
            </select>

            <select v-model="pausado" class="filter-selected">
                <option disabled value="">Tipo de anúncio</option>
                <option :value="false">Ativo</option>
                <option :value="true">Inativo</option>
            </select>
            {{pausado}}
        </div>

        <p 
            class="clear-filter" 
            v-if="type || city || pausado.toString()" 
            @click="clearFiler"
            >
            Limpar filtro
            <span>X</span>
        </p>
    </div>
</template>

<script>
export default {
    props: ["citys"],

    data() {
        return {
            city: "",
            type: "",
            pausado: ""
        }
    },

    watch: {
        city() {
            if(this.city.length) {
                this.$root.$emit('filterPageHome', { 
                    'filter': ['cidade', this.city] 
                })
            }
        },

        type() {
            if(this.type.length) {
                this.$root.$emit('filterPageHome', { 
                    'filter': ['categoria', this.type] 
                })
            }
        },

        pausado() {
            if(this.pausado.toString().length) {
                this.$root.$emit('filterPageHome', { 
                    'filter': ['pausado', this.pausado]
                })
            }
        }
    },

    methods: {
        clearFiler() {
            this.$root.$emit('filterPageHome', 'limpar')
            this.city = ''
            this.type = ''
            this.pausado = ''
        },
    }
}
</script>

<style>

.clear-filter {
    cursor: pointer;
    padding: 10px;
    display: block;
    margin: 0 auto 20px;
    text-align: center;
    max-width: 140px;
    border-radius: 15px;
    margin-right: 40px;
    box-shadow: 0px 7px 7px rgba(0, 0, 0, 0.25);
    margin-top: -30px;
}

.clear-filter span {
    color: red;
    font-weight: bold;
}

.filter-home {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0 30px;
}

.filter-home select {
    background-color: #36C9D2;
    border-radius: 10px;
    width: 32%;
    height: 50px;
    border: none;
    color: #fff;
    font-size: 16px;
    margin-bottom: 60px;
}


@media (max-width: 405px) {
    .filter-home {
        display: block !important;
    }

    .filter-home select {
        width: 100%;
        margin-bottom: 30px;
    }

    .clear-filter {
        margin-top: -10px;
    }
}

</style>