import type { ComponentType, FC, PropsWithChildren, ReactNode } from "react";

import { Fragment } from "react";

import type { AddonSchema } from "./global-css-injection.types";

type AddonComponentProps = {
    Component: ComponentType<PropsWithChildren<Record<string, unknown>>>;
    injections?: Record<string, unknown>;
};

const AddonComponent: FC<PropsWithChildren<AddonComponentProps>> = ({ Component }) => <Component />;

export const InjectAddons: FC<PropsWithChildren<{ addon: Array<AddonSchema> }>> = ({ addon, children }) => {
    console.log(`---------------------------------------------`);
    console.log("-------------- Injecting addon  -------------");
    console.log(`---------------------------------------------`);

    const addonComponent = addon
        .map((currAddon) => ({
            addon: currAddon.name,
            Component: currAddon.provider?.component,
            wrapper: currAddon.provider?.wrapper,
            injections: currAddon.injections,
        }))
        .filter((unfilteredAddon) => unfilteredAddon.Component !== undefined);

    const addons: ReactNode = addonComponent.reduce((acc, currentComponent) => {
        // eslint-disable-next-line react/jsx-no-useless-fragment
        if (!currentComponent.Component) return <Fragment key={currentComponent.addon} />;
        console.log(`Addon: ${currentComponent.addon}`);
        console.log(`---------------------------------------------`);

        return (
            <AddonComponent
                key={currentComponent.addon}
                Component={currentComponent.Component}
                injections={currentComponent.injections}
            >
                {acc}
            </AddonComponent>
        );
    }, children);

    console.log(`-------------- Addons injected --------------`);
    console.log(`---------------------------------------------`);

    return addons;
};
