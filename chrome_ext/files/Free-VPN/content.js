(void 0===globalThis.browser||Object.getPrototypeOf(globalThis.browser)!==Object.prototype?globalThis.chrome:globalThis.browser).runtime.onMessage.addListener((function(e,o,s){"use_domain"===e.message&&(document.dispatchEvent(new CustomEvent("extCsEvent",{detail:e.domain})),s({message:"OK"}))}));