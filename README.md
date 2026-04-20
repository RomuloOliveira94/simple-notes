# Simple Notes

## Run with Docker Compose (development)

Start everything needed for local development:

```bash
docker compose up --build
```

Application URL:

```text
http://localhost:3000
```

Useful commands:

```bash
# Stop containers
docker compose down

# Stop and remove named volumes (bundle, node_modules, storage, tmp)
docker compose down -v

# Open a shell in the app container
docker compose exec app bash

# Run frontend tests
docker compose exec app bun run test:frontend

# Run request specs
docker compose exec app bundle exec rspec spec/requests/notes_spec.rb
```
