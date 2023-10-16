const setEnv = () => {
  const fs = require("fs");
  const writeFile = fs.writeFile;
  const targetPath = "./src/environments/environment.ts";
  require("dotenv").config({
    path: "./.env",
  });
  // `environment.ts` file structure
  const envConfigFile = `export const environment = {
    auth0: {
    domain: '${process.env.AUTH0_DOMAIN}',
    clientId: '${process.env.AUTH0_CLIENT}',
    redirectUri:'${process.env.AUTH0_REDIRECT_URI}',
    production: true,
    },
    backend:{
      ApiUrl: '${process.env.API_URL}',
      AuthToken: '${process.env.API_AUTH_TOKEN}'
  }
    `;
  writeFile(targetPath, envConfigFile, (err) => {
    if (err) {
      console.error(err);
      throw err;
    }
  });
};

setEnv();
