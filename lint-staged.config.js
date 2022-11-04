module.exports = {
  "*.{js,jsx}": ["eslint --fix .", "prettier --write"],
  "*.{json,md,yml,scss,css,ts,tsx}": ["prettier --write"],
};
