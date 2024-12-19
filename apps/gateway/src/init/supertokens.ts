import supertokens from "supertokens-node";
import Session from "supertokens-node/recipe/session";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import ThirdParty from "supertokens-node/recipe/thirdparty";
import { ENV } from "../constants/env";
import Dashboard from "supertokens-node/recipe/dashboard";

export const superTokensInit = async () => {
  console.log("🟡 Initializing Supertokens...");

  supertokens.init({
    framework: "express",
    supertokens: {
      connectionURI: ENV.SUPERTOKENS_CONNECTION_URI,
      apiKey: ENV.SUPERTOKENS_API_KEY,
    },
    appInfo: {
      appName: "media-shifter",
      apiDomain: "http://localhost:3000",
      websiteDomain: "http://localhost:3001",
      apiBasePath: "/auth",
      websiteBasePath: "/auth",
    },
    recipeList: [
      EmailPassword.init(),
      //   ThirdParty.init({
      //     /*TODO: See next step*/
      //   }),
      Session.init(),
      Dashboard.init(),
    ],
  });

  console.log("🟢 Supertokens initialized");
};
