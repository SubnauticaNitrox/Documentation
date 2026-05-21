---
sidebar_position: 2
sidebar_label: Using Docker
title: Setup with Docker
---

:::note
Only use this option if you have a specific reason: like running a containerized server on a VPS, or working around local environment issues for development purposes.
:::

## Prerequisites

- Docker Engine 24+ (or Docker Desktop)
- A copy of Subnautica on the host machine

## Setup

Clone the repo if you haven't already, then navigate to the `docker/` directory and create a `.env` file:

```env
SUBNAUTICA_PATH=/path/to/your/subnautica
```

Start the server:

```bash
docker compose up -d
```

The server will be available on **UDP port 11000**.

## Managing the server

```bash
# View logs
docker compose logs -f

# Stop the server
docker compose down

# Restart
docker compose restart
```

## Data and saves

| Volume | Contains |
|---|---|
| `/subnautica` | Subnautica game files (read-only) |
| `/data` | World saves and server config |

World saves are stored in the `nitrox-data` Docker volume and persist across restarts and image updates.

:::warning
Running `docker compose down -v` will delete the `nitrox-data` volume and all world saves with it. Back it up first.
:::

## Updating

```bash
docker compose down
docker compose build --no-cache
docker compose up -d
```