# Documentacao da API

Este documento centraliza os endpoints da API de notas.

## Base URL (desenvolvimento)

```text
http://localhost:3000
```

## Convencoes

- Formato: JSON
- Content-Type: application/json
- Endpoints principais em `/notes`

## Endpoints

- `GET /notes?page=1&limit=10`
- `POST /notes`
- `DELETE /notes/:id`

## GET /notes

Lista notas em ordem decrescente de criacao com metadados de paginacao.

### Query params

- `page` (opcional): pagina atual
- `limit` (opcional): limite por pagina

### Resposta de sucesso

Status: `200 OK`

```json
{
  "data": [
    {
      "id": 1,
      "title": "Minha nota",
      "content": "Conteudo",
      "created_at": "2026-04-20T12:00:00.000Z",
      "updated_at": "2026-04-20T12:00:00.000Z"
    }
  ],
  "pagy": {
    "page": 1,
    "next": 2,
    "limit": 10
  }
}
```

## POST /notes

Cria uma nova nota.

### Body

```json
{
  "note": {
    "title": "Titulo",
    "content": "Conteudo opcional"
  }
}
```

### Resposta de sucesso

Status: `201 Created`

```json
{
  "id": 1,
  "title": "Titulo",
  "content": "Conteudo opcional",
  "created_at": "2026-04-20T12:00:00.000Z",
  "updated_at": "2026-04-20T12:00:00.000Z"
}
```

### Erro de validacao

Status: `422 Unprocessable Entity`

```json
{
  "errors": ["Title can't be blank"]
}
```

## DELETE /notes/:id

Remove uma nota por ID.

### Resposta de sucesso

Status: `204 No Content`

Sem body na resposta.

### Erro quando nao encontra a nota

Status: `404 Not Found`

```json
{
  "errors": ["Nota nao encontrada"]
}
```
