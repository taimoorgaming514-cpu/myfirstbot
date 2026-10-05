const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "..", "data", "users.json");

function load() {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return {};
  }
}

function save(data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

function getUser(guildId, userId) {
  const data = load();
  data[guildId] ??= {};
  data[guildId][userId] ??= { xp: 0, level: 1, coins: 0, lastDaily: 0 };
  save(data);
  return data[guildId][userId];
}

function updateUser(guildId, userId, changes) {
  const data = load();
  data[guildId] ??= {};
  data[guildId][userId] ??= { xp: 0, level: 1, coins: 0, lastDaily: 0 };
  Object.assign(data[guildId][userId], changes);
  save(data);
  return data[guildId][userId];
}

function allUsers(guildId) {
  const data = load();
  return data[guildId] || {};
}

module.exports = { getUser, updateUser, allUsers };
