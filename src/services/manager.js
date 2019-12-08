import {
  registerGlobalServices,
  serviceManager
} from "shared/services/manager";

import AppService from "./AppService";

export const registerServices = options => {
  registerGlobalServices(options);

  serviceManager.register("AppService", serviceManager => {
    let api = serviceManager.get("ApiService");

    return new AppService(api);
  });
};

export { serviceManager };
