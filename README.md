# All-In-One Discord Bot

A Discord.js community bot with moderation, tickets, welcome tools, persistent XP/levels, coins and fun commands.

## Commands

### Moderation
`/ban` `/kick` `/timeout` `/untimeout` `/clear`

### Server & Utility
`/ping` `/help` `/serverinfo` `/userinfo` `/avatar`

### Community
`/welcome` `/ticket` `/close`

### Leveling
`/level` `/rank` `/leaderboard`

Members automatically gain XP from chatting. XP and coins are saved in `data/users.json`.

### Economy
`/balance` `/daily`

Members earn coins from chatting and daily rewards.

### Fun
`/8ball` `/coinflip` `/dice` `/hug` `/slap` `/ship`

## Setup

```bash
npm install
```

Copy `.env.example` to `.env`:

```env
TOKEN=YOUR_BOT_TOKEN
CLIENT_ID=YOUR_BOT_CLIENT_ID
GUILD_ID=YOUR_TEST_SERVER_ID
```

Register slash commands:

```bash
npm run deploy
```

Start:

```bash
npm start
```

## GitHub Safety

Never upload `.env` or your bot token. `.gitignore` is included.

`data/users.json` contains server user data. You can keep it private or replace the JSON database with MongoDB/SQLite later.
