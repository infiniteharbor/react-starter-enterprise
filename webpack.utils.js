

/**
 * ENVIRONMENT CONSTANTS
 */
export const NODE_ENV_DEVELOPMENT = 'development';
export const NODE_ENV_PRODUCTION = 'development';
export const NODE_ENV = process.env.NODE_ENV || NODE_ENV_DEVELOPMENT;

/**
 * Detect if the environment doesn't match the configured environments
 */
if(![NODE_ENV_DEVELOPMENT, NODE_ENV_PRODUCTION].includes(NODE_ENV)) {
  console.error(`Error: Environment 'NODE_ENV' must be one of the following:\n1. ${NODE_ENV_DEVELOPMENT}\n2. ${NODE_ENV_PRODUCTION}`);
  process.exit(2);
}

/**
 * ENVIRONMENT UTILS
 */
export function isDev()  {
  return getNodeEnv() === NODE_ENV_DEVELOPMENT;
}

export function isProd() {
  return getNodeEnv() === NODE_ENV_PRODUCTION;
}

export function getNodeEnv() {
  return NODE_ENV || NODE_ENV_DEVELOPMENT;
}

export function devOrProd(dev, prod) {
  return isDev() ? dev : prod;
}

/**
 * PATH UTILS
 */
export function getAliasesForDir(dir) {
  const dirs = require('fs').readdirSync(dir);
  const path = require('path');
  const aliases = dirs.reduce( (acc, subDir) => {
    acc['~' + subDir] = path.resolve(path.join(__dirname, dir, subDir));
    return acc;
  }, {});
  return aliases;
}