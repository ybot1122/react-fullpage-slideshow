module.exports = {

  "**/*.{js,jsx,ts,tsx,json}": [
    "prettier --write",
    "npm run lint",
  ],
  "**/*.{ts,tsx}": [
    () => "npm run typecheck", 
  ],
}