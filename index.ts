import * as _cs from './public-api.ts';
declare global {
    interface Window {
        alpha: any;
        ap: any;
    }
}

const setup = () => {
    const style = document.createElement('style');
    document.querySelector('head')?.appendChild(style);
};
/**
 * Store all the component instances in globalThis.aci
 * for testing purposes
 */
globalThis.aci = {} as any;
const addComponent = (name: string, { inputs, outputs }: ComponentConfig) => {
    const customElem = document.createElement(name) as any;
    const fieldSet = document.createElement('fieldset');
    const legend = document.createElement('legend');
    legend.textContent = name;
    fieldSet.appendChild(legend);
    const key = name.slice('alpha'.length + 1);
    (globalThis.aci[key] = globalThis.aci[key] || []).push(customElem);
    for (let [key, val] of Object.entries(inputs || {})) {
        customElem[key] = val;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = val;
        input.placeholder = key;
        input.addEventListener('change', (e) => {
            customElem[key] = (e.target as any).value;
        });
        fieldSet.appendChild(input);
    }
    fieldSet.appendChild(customElem);
    const outputEvents = outputs?.events || ['change'];
    outputEvents.forEach((event) => {
        customElem.addEventListener(event, (e: any) => {
            console.log(`[${name}][event:${event}]`, e);
        });
    });
    document.body.appendChild(fieldSet);
};

const components: Record<string, ComponentConfig> = (() => {
    console.log(_cs);
    const comps = {};
    for (const [_, _class] of Object.entries(_cs)) {
        const inputs = Reflect.getMetadata('AlphaAttribute', _class.prototype);
        const c = Reflect.getMetadata('AlphaComponent', _class.prototype);
        const selector = `${c.selector}-${c.componentVersion}`;
        comps[selector] = {
            inputs: inputs?.reduce((acc, { fieldMappings, defaultValue }) => {
                acc[fieldMappings] = defaultValue ?? '';
                return acc;
            }, {}),
            outputs: {
                events: ['change'],
            },
        };
    }
    return comps;
})();
document.addEventListener('DOMContentLoaded', async () => {
    setup();
    for (let [name, config] of Object.entries(components)) {
        addComponent(name, config);
    }
});

interface ComponentConfig {
    class?: string;
    inputs?: {
        disabled?: boolean;
        readonly?: boolean;
        value?: any;
        name?: any;
        id?: any;
        [key: string]: any;
    };
    outputs?: {
        events: string[];
    };
}
