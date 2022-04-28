<template>
    <div>
        <div class="intro-termos">
            <h1>Termos de Serviço da Search Pet</h1>
        </div>

        <div class="termos-uso container">
            <h1>1. Quem pode utilizar os Serviços</h1>

            <p>
                Você poderá utilizar os Serviços somente se concordar em celebrar um contrato vinculamente com a Search Pet e não for uma pessoa impedida de receber serviços sob as leis da jurisdição aplicável.
            </p>

            <h1>2. Sua conta</h1>

            <p>
                Você pode precisar criar uma conta para utilizar alguns de nossos Serviços. Você é responsável por proteger sua conta, portanto, use uma senha forte e limite seu uso para esta conta. 
            </p>
                
            <p>
                Nós não podemos ser e não seremos responsáveis por qualquer perda ou dano resultante do seu não cumprimento com o descrito acima.
            </p>

            <h1>3. Privacidade</h1>

            <p>
                Ao se cadastrar, você estará de acordo que a Search Pet poderá usar seu número de telefone cadastrado para que as outras pessoas usuárias do site possam entrar em contato com você. (Esse telefone so estará visível para outras pessoas quando você inserir um novo anúncio).
            </p>

            <p>
                Sua foto cadastrada será usada publicamente no seu anúncio assim que você criar um novo, a mesma irá aparecer ao lado do nome do pet.
            </p>

            <p>
                Todos os seus dados e fotos inseridas no ato de criação da conta irão ser salvos em um banco de dados que só poderá ser acessado por pessoas da Searrch Pet e que tenham autorização para tal.
            </p>

            <p>
                Sua senha não será visualizada por nenhuma pessoa pois será criptografada na hora da criação da conta, para isso, é um dever seu gravar a senha corretamente.
            </p>

            <h1>4. Seus Direitos e a Concessão de direitos sobre o Conteúdo</h1>
        
            <p>
                Você manterá seus direitos sobre qualquer Conteúdo que publicar no site. O que for seu será seu; você é o proprietário do seu Conteúdo (e suas fotos incorporados são considerados parte do Conteúdo).
            </p>

            <p>
                Ao enviar, publicar ou exibir Conteúdo no site,  você nos outorga uma licença mundial gratuita, não exclusiva (com direito a sublicenciar) para utilizar, copiar, adaptar, modificar, publicar, transmitir, exibir e distribuir esse Conteúdo em qualquer e todos os tipos de mídia ou métodos de distribuição já disponíveis ou que venham a ser desenvolvidos (para maior clareza, esses direitos incluem, por exemplo, curadoria, transformação, e tradução). Esta licença nos autoriza a tornar seu Conteúdo disponível para o restante do mundo e permite que outros usuários façam o mesmo. 
            </p>

            <p>
                Você declara e garante que possui ou que obteve todos os direitos, licenças, consentimentos, permissões, poderes e/ou autorizações necessários para outorgar os direitos aqui citados para qualquer Conteúdo enviado, postado ou exibido por você nos Serviços ou por meio deles. Você concorda que o Conteúdo não conterá materiais protegidos por direitos autorais ou outros direitos exclusivos a menos que você tenha a permissão necessária ou seja de outra forma legalmente autorizado a postar o material e a conceder a Search Pet a licença descrita acima.
            </p>
        </div>
    </div>
</template>

<script>
export default {
    
    created() {
        window.scrollTo({ top: 0, behavior: "smooth" })
        document.title = 'Termo de serviço - Search Pet'
    }

}
</script>

<style scoped>

.container {
    max-width: 1200px;
    padding: 0 30px;
}

.intro-termos {
    padding: 120px 30px;
    background-color: #36C9D2;
    color: #fff;
    text-align: center;
    margin-bottom: 60px;
    font-size: 2rem;
}

.termos-uso {
    padding-left: 300px;
    margin-bottom: 60px;
}

.termos-uso h1 {
    color: #36C9D2;
    margin-bottom: 20px;
    margin-top: 40px;
}

.termos-uso p {
    font-size: 18px;
    margin-bottom: 20px;
    max-width: 900px;
    font-weight: 500;
    padding-left: 30px;
}

@media(max-width: 1200px) {
    .termos-uso {
        padding-left: 100px;
    }
}

@media(max-width: 900px) {
    .termos-uso {
        padding-left: 30px;
    }
}

@media(max-width: 660px) {
    .intro-termos {
        font-size: 1rem;
    }

    .termos-uso h1 {
        font-size: 1rem;
    }

    .termos-uso p {
        font-size: 16px;
    }
}

</style>