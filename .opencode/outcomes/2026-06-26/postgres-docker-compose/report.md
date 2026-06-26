# PostgreSQL Docker Compose Setup

## Date: 2026-06-26

## Summary

Added PostgreSQL 16 as the primary database for the rewriter-engine project via Docker Compose.

## Files Created

| File | Description |
|------|-------------|
| `docker-compose.yml` | PostgreSQL 16 Alpine service definition |
| `.env.example` | Environment variable template |
| `.appdata/db/.gitkeep` | Persistent data volume directory |

## Configuration

- **Image**: `postgres:16-alpine`
- **Container name**: `rewriter-postgres`
- **Port**: `${POSTGRES_PORT:-5432}`
- **User**: `${POSTGRES_USER:-rewriter}`
- **Password**: `${POSTGRES_PASSWORD:-rewriter_secret}`
- **Database**: `${POSTGRES_DB:-rewriter}`
- **Volume**: `.appdata/db` → `/var/lib/postgresql/data` (persistent, host-mounted)
- **Healthcheck**: `pg_isready` every 10s, 5 retries
- **Restart policy**: `unless-stopped`

## Data Volume

Data is mounted to `.appdata/db/` within the project directory (not a named Docker volume). This keeps data portable and easily accessible.

## Usage

```bash
# Copy and configure environment
cp .env.example .env

# Start PostgreSQL
docker compose up -d

# Check status
docker compose ps

# Connect
docker compose exec postgres psql -U rewriter -d rewriter

# Stop (data persists)
docker compose down

# Stop + remove data
docker compose down -v
```

## Decisions

- **PostgreSQL 16 Alpine**: Latest stable, lightweight image.
- **Host-mounted volume** (`.apps/data/pg`): Preferred over named Docker volume for portability and easier backup.
- **Default credentials**: Development-only defaults; `.env` is gitignored.
- **Healthcheck**: Ensures DB is ready before dependent services connect.
