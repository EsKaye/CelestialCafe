# Serafina Bot

Serafina is the council router. She bridges Discord, peer services, and in-world guardians.

## Setup

```bash
cd serafina
npm install --legacy-peer-deps
cp .env.example .env # fill secrets
npm start
```

## Environment

- `DISCORD_TOKEN`
- `OWNER_ID`
- `GUILD_ID`
- `MCP_URL`
- `CHN_COUNCIL`
- `NAV_REPOS`
- `WH_LILYBEAR`
- `PEER_HANDSHAKE`

## Commands

- `/councilreport` — immediate report dispatch

Run tests with `npm test`.
