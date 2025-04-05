# Projeto: Rick and Morty for Web

## Tecnologias

## Tecnologias

## Como rodar

## Link para acessar o projeto.

#### 2 - Criar um branch com o seu primeiro e último nome
```bash
git checkout -b joao-silva
```

#### 4 - Faça uma Pull Request

## Critérios de Aceitação
Para que seu teste tenha o mínimo necessário que atenda aos requisitos esperados, ele deve:
- Atender ao que foi proposto no [Desafio](https://github.com/dorotech/frontend-test#Desafio).
- Utilização de pré-processadores CSS (Sass, Less).
- Interfaces responsivas para desktop, tablets e smartphones.
- Compatibilidade entre browsers.
- Padrão de escrita CSS (BEM, OOCSS, SMACSS).
- Código TS escrito com base em algum guia de estilos: [AirBnB Standards](https://github.com/airbnb/javascript) ou [TypeScript Google Guide](https://google.github.io/styleguide/tsguide.html).
- Utilizar padrões semânticos em mensagens de commit. (Gostamos do padrão de commits do repositório [AngularJS](http://karma-runner.github.io/3.0/dev/git-commit-msg.html))
- Projeto feito upload: [Firebase hosting](https://firebase.google.com/docs/hosting/quickstart?hl=pt-br) ou [GitHub Pages](https://pages.github.com/).
- Caso você nao consiga completar tudo e tenha algum receio, não se preocupe, iremos avaliar o que foi entregue, mesmo com pendências.
- O diferencial para este desafio: layout, ux e ui, bem como implementação de boas práticas de segurança, performance e/ou estrutura.
- [JSDOC](https://jsdoc.app/) nos principais itens do projeto. 


## Dicas e Informações Valiosas

#### O que gostaríamos de ver em seu teste:
- **Bônus 1** Dark Mode, implementação sendo um botão que mude o padrão de cores da pagina para escuro e claro com 1 click. 
- **Bônus 2** QueryParams para buscas, quando uma busca e realizada, exibir na URL o parâmetro da busca realizado, caso recaregar a página com a URL, usar o parâmetro para preencher os itens da pagina.
- **Bônus 3** Listagem de favoritos, com algum mecanismo de cache.
- **Bônus 4** Outros filtros além dos sugeridos na descrição inicial
- **Bônus 5** GitHub action como serviço de publicação do projeto pronto.

**Observação:** Nenhum dos itens acima é obrigatório.

## Páginação 

São **826** personagens no total, conforme é setado o número de itens por página, ou seja, [5, 10 ou 20] personagens por vez, o total de páginas deve mudar:

226%20 = 41,3 então:    20 personagens = 42 páginas
226%10 = 82,6 então:    10 personagens = 83 páginas
226%5 = 165,2 então:    5 personanges = 166 páginas

OBS: https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout