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
        </div>

        <p 
            class="clear-filter" 
            v-if="type || city || pausado" 
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
            this.$root.$emit('filterPageHome', {
                'cidade': this.city
            })
        },

        type() {
            this.$root.$emit('filterPageHome', {
                'categoria': this.type
            })
        },

        pausado() {
            this.$root.$emit('filterPageHome', {
                'pausado': this.pausado
            })
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
    margin-bottom: 60px;
}

@media (max-width: 705px) {
    .filter-home {
        padding: 0 30px;
    }
}

@media (max-width: 405px) {
    .filter-home {
        display: block !important;
    }

    .filter-home select {
        width: 100%;
    }
}

</style>