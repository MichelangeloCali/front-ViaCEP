# Via Cep [FRONTEND]

Esse é o repositório frontend do desafio proposto para dar usabilidade à API criada no desafio [backend](https://github.com/MichelangeloCali/back-ViaCEP) 


## O projeto foi desenvolvido com as seguintes stacks

- React JS (utilizou o TS-SWC como compilador) 
- Typescript (para tipagem em tempo de desenvolvimento, visando boas práticas de código em legibilidade e manuntenibilidade).
- SASS (.scss para estilização de em module)
- React Hook Form 
- Zod (para validação de formulário e tipagem integrada com Typescript)
- Husky (para utilização de hooks, automatizando o linter fix e leitura de testes unitários).
- Eslint.
- Prettier.

## Design de Software (arquitetura frontend)

```
/public
/src
  └── /components
        └── /AddressCard
        └── /Button
        └── /Input
  └── /@types
  └── /config
  └── /hooks
  └── /screen
  └── /styles
  └── /utils
```

## Para rodar localmente o repositório: 

- certifique-se que você tem instalado Node v.18.17 em sua máquina.
- clone o repositório em sua máquina `https://github.com/MichelangeloCali/front-ViaCEP.git`
- entre na pasta do projeto e rode `npm install`
- rode o comando `npm run dev`


## Boas práticas:

- O código foi a todo momento desenvolvido para que pudesse ser o máximo componentizado, tornando reutilizável e menos repetitido possível.
- O código Javascript está tipado, evitando erros de tipos em tempo de desenvolvimento, facilitando o debug.
- Foi integrado um sistema de validação de inputs para que os dados possam ser tratados antes de salvos ou enviados no backend
- Foi configurando triggers com Husky, através de scripts pre-commit, onde é feito o fix do código, e pre-push, onde é rodado os testes unitários, evitando que todo e qualquer componente criado ou alterado suba para produção quebrado ou com algum bug. 

## Observações:

- Antes de rodar este projeto, recomenda-se rodar o backend na porta 3000, conforme as instruções do repositório.
- Certifique-se que o backend está rodando, e crie o `.env` na raiz do projeto frontend com a seguinte variável de ambiente:
```
VITE_API_BASE_URL="http://localhost:3000/address"
```


### Contato do desenvolvedor:

- [LinkedIn](https://www.linkedin.com/in/michelangelocali/)
- Email: michelangelocali@hotmail.com

