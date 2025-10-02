# Guia de Contribuição - Jogo Secreto 🎮

Olá, incrível contribuidor(a)! Ficamos muito felizes com o seu interesse em colaborar com o projeto "Jogo Secreto", especialmente durante o **Hacktoberfest 2025**!

Este guia foi criado para tornar o processo de contribuição o mais claro e simples possível. Se tiver qualquer dúvida, não hesite em abrir uma [issue](https://github.com/SEU-USUARIO/SEU-REPOSITORIO/issues) para perguntar.

## O que é o Hacktoberfest?

O **Hacktoberfest** é uma celebração global do software de código aberto, que acontece durante todo o mês de outubro. O evento é organizado pela DigitalOcean e parceiros, com o objetivo de incentivar pessoas de todo o mundo a contribuírem para projetos open source.

Ao completar o desafio (geralmente, fazer 4 contribuições válidas em repositórios participantes), você pode ganhar uma recompensa exclusiva, como uma camiseta ou o plantio de uma árvore em seu nome. É uma oportunidade fantástica para aprender, construir seu portfólio e fazer parte de uma comunidade incrível.

**Datas do Evento:** 1 a 31 de Outubro de 2025.

Para que sua contribuição conte para o Hacktoberfest, seu Pull Request (PR) deve ser feito em um repositório com o tópico "hacktoberfest" e ser aceito pelos mantenedores do projeto, ou seja Eu , seu amigo de todas as horas.

## 📜 Como Contribuir

Para manter o projeto organizado e justo para todos, pedimos que siga os passos abaixo:

### Passo 1: Encontre uma Issue para Trabalhar

1.  Vá para a nossa [lista de Issues](https://github.com/adalbertobrant/secretgamenumber/issues).
2.  Use as etiquetas (`labels`) para filtrar, como `bug`, `feature`, `documentation`, `good first issue`, etc.
3.  Escolha uma issue, cada issue pode ser designada para até 10 pessoas, não se preocupe se outra pessoa estiver fazendo faça também.
4.  **Comente na issue** que você gostaria de trabalhar nela (ex: `"Olá! Gostaria de trabalhar nesta issue."`).
5.  Aguarde que um mantenedor atribua a issue a você. 

### Passo 2: Prepare seu Ambiente de Desenvolvimento

1.  **Faça um Fork** do projeto clicando no botão "Fork" no topo da página. Isso criará uma cópia do repositório na sua conta do GitHub.
2.  **Clone o seu fork** para a sua máquina local:
    ```bash
    git clone [https://github.com/adalbertobrant/secretgamenumber.git](https://github.com/adalbertobrant/secretgamenumber.git)
    ```
3.  **Adicione o repositório original** como um "remote" para manter seu fork atualizado.
    ```bash
    git remote add upstream [https://github.com/adalbertobrant/secretgamenumber.git](https://github.com/adalbertobrant/secretgamenumber.git)
    ```

### Passo 3: Codifique!

1.  **Crie uma nova branch** para sua contribuição. Use um nome descritivo, siga as informações do [README.md](https://github.com/adalbertobrant/secretgamenumber/README.md)
    ```bash
    git checkout -b nome-descritivo-da-sua-branch
    ```
    > ⚠️ **Regra Especial para Tutoriais de Deploy:** Se você estiver trabalhando em uma issue de tutorial de deploy, a branch **deve** ter o seu nome de usuário do GitHub.
    >
    > ```bash
    > git checkout -b seu-nome-de-usuario-github-tutorial-issueNumber
    > ```

2.  Faça as alterações necessárias no código para resolver a issue.
3.  **Faça commits** claros e atômicos. Uma boa mensagem de commit explica *o que* e *por que* você mudou.
    ```bash
    git add .
    git commit -m "feat: Adiciona botão de som no menu principal"
    ```

### Passo 4: Abra um Pull Request (PR)

1.  **Envie suas alterações** para o seu fork no GitHub.
    ```bash
    git push origin nome-descritivo-da-sua-branch
    ```
2.  Vá para a página do seu fork no GitHub. Você verá uma notificação para criar um "Pull Request".
3.  Abra o PR em direção à branch `main` do repositório original.
4.  Preencha o template do PR com uma descrição clara do que você fez. Vincule a issue que você resolveu usando a palavra-chave `Closes #NUMERO_DA_ISSUE`.
5.  Aguarde a revisão. Um mantenedor irá analisar seu código e, se necessário, solicitar algumas alterações. Assim que for aprovado, seu PR será mesclado ou vai aparecer o label hacktoberfest-accepted!

E pronto! Você fez sua contribuição. Muito obrigado! 🎉

---

## ✨ Nossos Contribuidores ✨

Agradecemos a todas as pessoas incríveis que dedicaram seu tempo e esforço para melhorar este projeto. Adicione seu nome a esta lista como parte do seu primeiro Pull Request!

**Como adicionar seu nome:**
1.  Edite este arquivo (`CONTRIBUTING.md`).
2.  Adicione uma nova linha na tabela abaixo com suas informações.
3.  Mantenha a ordem alfabética pelo nome.

| Nome               | País      | GitHub                                                    | LinkedIn                                               |
| ------------------ | --------- | --------------------------------------------------------- | ------------------------------------------------------ |
| *Adalberto Brant*  | *Brasil*  | [Link para seu GitHub](https://github.com/adalbertobrant) | [Link para seu LinkedIn](https://linkedin.com/in/ilha) |
|                    |           |                                                           |                                                        |

---

Obrigado por fazer parte da nossa comunidade!
