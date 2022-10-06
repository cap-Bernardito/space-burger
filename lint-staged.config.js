module.exports = {
  "*.js": ["eslint --fix .", "prettier --write"],
  "*.{json,md,yml,scss,css,ts,jsx,tsx}": ["prettier --write"],
};
