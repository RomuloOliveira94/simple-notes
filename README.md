# Simple Notes

Aplicacao de anotacoes full-stack com Rails 8 + Vue 3, API JSON e deploy automatizado.

[![CI](https://github.com/RomuloOliveira94/simple-notes/actions/workflows/ci.yml/badge.svg)](https://github.com/RomuloOliveira94/simple-notes/actions/workflows/ci.yml)
[![CD](https://github.com/RomuloOliveira94/simple-notes/actions/workflows/cd.yml/badge.svg)](https://github.com/RomuloOliveira94/simple-notes/actions/workflows/cd.yml)
[![Ruby](https://img.shields.io/badge/Ruby-4.0.1-CC342D?logo=ruby&logoColor=white)](https://www.ruby-lang.org/)
[![Rails](https://img.shields.io/badge/Rails-8.1-CC0000?logo=rubyonrails&logoColor=white)](https://rubyonrails.org/)
[![Vue](https://img.shields.io/badge/Vue-3-42B883?logo=vuedotjs&logoColor=white)](https://vuejs.org/)
[![Bun](https://img.shields.io/badge/Bun-1.x-000000?logo=bun&logoColor=white)](https://bun.sh/)
[![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)

![Tech Stack](https://skillicons.dev/icons?i=ruby,rails,vue,tailwind,bun,docker,githubactions,sqlite)

## Sumario

- [Visao Geral](#visao-geral)
- [Pre-requisitos](#pre-requisitos)
- [Como Rodar Sem Docker](#como-rodar-sem-docker)
- [Como Rodar Com Docker Compose](#como-rodar-com-docker-compose)
- [Scripts de Desenvolvimento](#scripts-de-desenvolvimento)
- [Documentacao da API](#documentacao-da-api)
- [Testes e Qualidade](#testes-e-qualidade)
- [Como Contribuir](#como-contribuir)
- [CI/CD](#cicd)
- [Build de Producao com Docker](#build-de-producao-com-docker)
- [Banco de Dados](#banco-de-dados)
- [Troubleshooting](#troubleshooting)

## Visao Geral

- Backend: Ruby on Rails 8.1
- Frontend: Vue 3 (Composition API) + vue-i18n
- Build frontend: esbuild
- CSS: Tailwind CSS v4
- Banco: SQLite
- Paginacao: Pagy Countless
- Serializacao JSON: Jbuilder
- Testes backend: RSpec
- Testes frontend: Vitest
- Qualidade e seguranca: RuboCop, Brakeman, bundler-audit, yarn audit

## Pre-requisitos

### Ambiente local sem Docker

- Ruby `4.0.1`
- Bun (com lockfile `bun.lock`)
- SQLite 3

### Ambiente com Docker

- Docker
- Docker Compose

## Como Rodar Sem Docker

### 1) Setup inicial

```bash
bin/setup
```

Esse comando:

- instala gems
- instala dependencias JS com Bun
- prepara banco de dados
- inicia o ambiente de desenvolvimento

### 2) Setup sem subir servidor

```bash
bin/setup --skip-server
```

### 3) Subir ambiente de desenvolvimento

```bash
bin/dev
```

Aplicacao local:

```text
http://localhost:3000
```

## Como Rodar Com Docker Compose

### 1) Subir tudo

```bash
docker compose up --build
```

Aplicacao local:

```text
http://localhost:3000
```

### 2) Comandos uteis

```bash
# parar containers
docker compose down

# parar e remover volumes
docker compose down -v

# abrir shell no container
docker compose exec app bash

# rodar testes frontend
docker compose exec app bun run test:frontend

# rodar testes backend
docker compose exec app bundle exec rspec

# preparar banco
docker compose exec app bin/rails db:prepare
```

## Scripts de Desenvolvimento

Processos iniciados por `bin/dev`:

- Rails server em `0.0.0.0:3000`
- Build JS em watch
- Build CSS em watch

Frontend:

```bash
bun run build
bun run build:css
bun run test:frontend
bun run test:frontend:coverage
```

Backend:

```bash
bundle exec rspec
bundle exec rspec spec/requests/notes_spec.rb
bin/rubocop
bin/brakeman --no-pager
bin/bundler-audit
```

## Documentacao da API

A documentacao completa da API esta em [docs/api.md](docs/api.md).

## Testes e Qualidade

Rodar pipeline local completa:

```bash
bin/ci
```

Etapas da pipeline local:

- setup do projeto
- RuboCop
- bundler-audit
- yarn audit (moderate)
- Brakeman
- RSpec
- Vitest
- seed/replant em ambiente de teste

## Como Contribuir

### 1) Crie uma branch

```bash
git checkout -b feat/minha-mudanca
```

### 2) Rode os checks locais

```bash
bin/ci
```

### 3) Faça commits claros

Padrao sugerido:

- `feat: ...`
- `fix: ...`
- `docs: ...`
- `chore: ...`
- `test: ...`

### 4) Abra um Pull Request

- descreva o contexto da mudanca
- liste o que foi alterado
- inclua evidencias (logs, prints ou resultados de testes)

### 5) Merge e deploy

- apos merge na `main`, o CI roda automaticamente
- o CD pode exigir aprovacao manual no environment `production`

## CI/CD

### CI (GitHub Actions)

Gatilhos:

- push em `main`
- pull requests

Jobs:

- `scan_ruby`: Brakeman + bundler-audit
- `lint`: RuboCop
- `test`: RSpec + testes frontend com Bun

### CD (GitHub Actions + CapRover)

Gatilhos:

- push em `main`
- execucao manual (`workflow_dispatch`)

Fluxo:

1. Build da imagem Docker de producao
2. Push da imagem para GHCR
3. Deploy da imagem no CapRover

O job usa `environment: production`, entao pode exigir aprovacao manual quando a protecao de environment estiver ativa no GitHub.

Segredos necessarios:

- `CAPROVER_SERVER`
- `CAPROVER_APP_NAME`
- `CAPROVER_APP_TOKEN`

### Release Automatizado (GitHub Releases)

O projeto tambem possui um workflow de release automatizado em [.github/workflows/release.yml](.github/workflows/release.yml).

Gatilho:

- push de tags no padrao `v*.*.*`

Exemplo:

```bash
git tag v1.0.0
git push origin v1.0.0
```

Fluxo:

1. o GitHub Actions detecta a nova tag
2. o workflow cria uma GitHub Release automaticamente
3. as release notes sao geradas automaticamente pelo GitHub

## Build de Producao com Docker

Build da imagem:

```bash
docker build -t simple_notes .
```

Executar container:

```bash
docker run -d -p 80:80 \
  -e RAILS_MASTER_KEY=<sua_master_key> \
  --name simple_notes \
  simple_notes
```

## Banco de Dados

- desenvolvimento: `storage/development.sqlite3`
- teste: `storage/test.sqlite3`
- producao: SQLite em `storage/` separado por papel (`primary`, `cache`, `queue`, `cable`)

## Troubleshooting

Porta ocupada:

```bash
PORT=3001 bin/dev
```

Dependencias JS fora de sincronia:

```bash
bun install --frozen-lockfile
```

Recriar banco local:

```bash
bin/rails db:reset
```

Recriar ambiente Docker limpo:

```bash
docker compose down -v
docker compose up --build
```
