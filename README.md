# Web — Gerenciador de cartões de crédito

## Setup

1. Instale as dependências:
   ```bash
   npm install
   ```

2. No mesmo projeto Firebase usado pela API, vá em **Configurações do projeto > Geral > Seus apps**, crie um "app da Web" (ícone `</>`) caso ainda não tenha um, e copie os valores de configuração.

3. Copie `.env.example` para `.env` e preencha com esses valores, além da URL da API (local: `http://localhost:8080`).

4. Rode em modo desenvolvimento:
   ```bash
   npm run dev
   ```

## Estrutura de pastas

```
src/
  pages/        → telas (Login, Dashboard, CardDetail)
  components/    → componentes reutilizáveis (ainda vazio, próximos passos)
  context/       → AuthContext (próximo passo)
  lib/
    firebase.ts  → inicialização do Firebase client SDK (só autenticação)
    api.ts       → cliente HTTP da API (próximo passo)
  types/         → tipos espelhando o modelo de dados da API
```

## Próximos passos

- [x] Setup do projeto + Tailwind
- [ ] AuthContext + tela de Login funcional
- [ ] Cliente da API (`lib/api.ts`)
- [ ] Dashboard consumindo a API
- [ ] Tela de detalhe do cartão + adicionar compra
