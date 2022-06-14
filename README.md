# Search Pet :dog:

> Link do projeto: https://adotapet.netlify.app/
> 
> Status do Projeto: Finalizado!

## Um PWA para ONGs anunciarem seus pets para doação / perdidos


### O que o site é capaz de fazer 💥

Lado usuário:
- Criar um usuário novo (autenticado com firebase)
- Fazer login com usuário existente (autenticado com firebase)
- Resetar senha com envio por e-mail
- Visualizar os pets do site
- Favoritar um pet para ver depois
- Visualizar a página de favoritos
- Atualizar dados de usuário
- Visualizar detalhes de algum pet
- Visualizar quem adotou / encontrou um pet
- Filtrar os pets

Lado ONG:
- Inserir um novo pet no site
- Adicionar um pet aos favoritos
- Atualizar os dados do pet anunciado
- Atualizar perfil da ONG
- Visualizar anúncios ativos/inativos criados pela ONG
- Visualizar todos os anuncios criados pela ONG
- Visualizar favoritos
- Finalizar anuncio de um pet

## Projeto integrado com Firebase
- Para fazer login/registro e reset de senha é utilizado o autenticador do firebase
- Para salvar os anuncios, dados da ong e favoritos é utilizado o Real Time Database
- Para salvar as imagens do site é utilizado o storage do firebase

## Como rodar a aplicação na sua máquina :rocket:
No terminal clone o projeto:

```sh
  git clone https://github.com/nerylucastoledo/SearchPet-Tcc.git
```

Com o projeto na sua maquina, rode

```sh
  npm install
```

Depois de instaladas as dependências, rode

```sh
  npm run serve
```

Acesse

```sh
  http://localhost:8080/
```
