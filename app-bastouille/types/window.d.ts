export {};

declare global {
  interface Window {
    App: {
      Navigation: {
        registerMenu: (...args: any[]) => any;
        unregisterMenu: (...args: any[]) => any;
        changeActiveMenu: (...args: any[]) => any;
        getMenu: (...args: any[]) => any;
      };
    };
  }
}

