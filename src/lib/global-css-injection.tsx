import type { FC, PropsWithChildren } from "react";

import { Global, css } from "@emotion/react";
import styled from "@emotion/styled";
import { createContext, useCallback, useDebugValue, useMemo, useState } from "react";

import * as colors from "./css/colors.module.css?raw";
import * as dark from "./css/theme.dark.css?raw";
import * as light from "./css/theme.light.css?raw";
import * as tokens from "./css/tokens.css?raw";
import * as typography from "./css/typography.module.css?raw";
import { InjectAddons } from "./global-css-injection.component";
import { applyCustomFontMapping, applyCustomFonts } from "./global-css-injection.helper";

import type { GlobalCSSInjectionContextProps, GlobalCSSInjectionProps } from "./global-css-injection.types";

export * from "./global-css-injection.hook";

const containerPadding: number = 0;
const containerFramewidth: number = 2 * containerPadding;

const defaultScrollbarThickness: number = 8;

const StylesAppContainer = styled.div`
    max-height: calc(100vh - ${containerFramewidth}px);
    max-width: calc(100% - ${containerFramewidth + containerPadding}px);
    padding: ${containerPadding}px;
    margin: 0;
`;

const defaultCssConfig: GlobalCSSInjectionContextProps["config"] = {
    colors: colors.default,
    typography: typography.default,
    dark: dark.default,
    light: light.default,
    tokens: tokens.default,
    scrollbarRadius: undefined,
    scrollbarThickness: defaultScrollbarThickness,
    lightScrollbarRadius: undefined,
    lightScrollbarThickness: undefined,
};

const defaultGCIOptions: GlobalCSSInjectionContextProps["options"] = {
    use_provider: null,
    addons: [],
    additionalCSS: "",
};

export const GlobalCssInjectionContext = createContext<GlobalCSSInjectionContextProps>({
    config: defaultCssConfig,
    options: defaultGCIOptions,
    mode: "light",
    setMode: () => null,
});

export const GlobalCssInjection: FC<PropsWithChildren<Partial<GlobalCSSInjectionProps>>> = ({
    children,
    config,
    options,
}) => {
    const [mode, setMode] = useState<"dark" | "light">("dark");

    const currectMode = useMemo(() => mode, [mode]);

    const usedConfig: GlobalCSSInjectionContextProps["config"] = useMemo(
        () => (config ? { ...defaultCssConfig, ...config } : defaultCssConfig),
        [config]
    );

    const usedOptions: GlobalCSSInjectionContextProps["options"] = useMemo(() => {
        const used = options ? { ...defaultGCIOptions, ...options } : defaultGCIOptions;

        const injectedAddons = used.addons;

        const addons = [
            {
                name: "Global CSS Injection - Core",
                author: "Dominic Seel",
                description:
                    "Global CSS Injection core package which applies the global css files to inject into the head-tag of the page.",
            },
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            ...(injectedAddons || []),
        ];

        return { ...used, addons };
    }, [options]);

    const switchMode = useCallback(() => {
        if (mode === "light") {
            setMode("dark");
        } else {
            setMode("light");
        }
    }, [mode, setMode]);

    const parsedConfig = useMemo(
        () => usedConfig.colors + " " + usedConfig.typography + " " + usedConfig[mode] + " " + usedConfig.tokens,
        [mode, usedConfig]
    );

    const scrollbarConfig = useMemo(
        () => ({
            thickness: usedConfig.scrollbarThickness || defaultScrollbarThickness,
            radius: usedConfig.scrollbarRadius || (usedConfig.scrollbarThickness || defaultScrollbarThickness) / 2,
            lightThickness:
                usedConfig.lightScrollbarThickness || (usedConfig.scrollbarThickness || defaultScrollbarThickness) / 2,
            lightRadius:
                usedConfig.lightScrollbarRadius ||
                (usedConfig.lightScrollbarThickness ||
                    (usedConfig.scrollbarThickness || defaultScrollbarThickness) / 2) / 2,
        }),
        [
            usedConfig.lightScrollbarRadius,
            usedConfig.lightScrollbarThickness,
            usedConfig.scrollbarRadius,
            usedConfig.scrollbarThickness,
        ]
    );

    const values = useMemo(
        () => ({
            options: usedOptions,
            config: usedConfig,
            mode: currectMode,
            setMode: switchMode,
        }),
        [currectMode, switchMode, usedConfig, usedOptions]
    );

    useDebugValue(values);

    return (
        <GlobalCssInjectionContext.Provider value={values}>
            <Global
                styles={css`
                    ${applyCustomFontMapping(usedOptions.customFonts)}
                    ${parsedConfig}

                    ${usedOptions.primaryFontName
                        ? `
                        p {
                            font-family: ${usedOptions.primaryFontName} !important;
                        };
                        :root {
                            --force-primary-font-family: {
                                font-family: ${usedOptions.primaryFontName} !important;
                            };
                        };
                        ${
                            Array.isArray(usedOptions.customFonts)
                                ? applyCustomFonts(usedOptions.customFonts).cssVar
                                : ""
                        }
                        `
                        : ""}
                    ${usedOptions.additionalCSS}

                    .scroll-container {
                        /* width */
                        ::-webkit-scrollbar {
                            width: ${scrollbarConfig.thickness}px;
                            height: ${scrollbarConfig.thickness}px;
                        }

                        /* Track */
                        ::-webkit-scrollbar-track {
                            margin: 8px 0px;
                            background: var(--md-sys-color-primary-container);
                        }

                        /* Handle */
                        ::-webkit-scrollbar-thumb {
                            border-radius: ${scrollbarConfig.radius}px;
                            background: var(--md-sys-color-primary);
                        }

                        /* Handle on hover */
                        ::-webkit-scrollbar-thumb:hover {
                            border-radius: ${scrollbarConfig.radius}px;
                            background: var(--md-sys-color-primary);
                        }
                        .light-scrollbar {
                            height: 100%;
                            width: 100%;
                            /* width */
                            ::-webkit-scrollbar {
                                width: ${scrollbarConfig.lightThickness}px;
                                height: ${scrollbarConfig.lightThickness}px;
                            }

                            /* Track */
                            ::-webkit-scrollbar-track {
                                background: var(--md-sys-color-primary-container);
                            }

                            /* Handle */
                            ::-webkit-scrollbar-thumb {
                                border-radius: ${scrollbarConfig.lightRadius}px;
                                background: var(--md-sys-color-primary);
                            }

                            /* Handle on hover */
                            ::-webkit-scrollbar-thumb:hover {
                                border-radius: ${scrollbarConfig.lightRadius}px;
                                background: var(--md-sys-color-primary);
                            }
                        }
                    }
                `}
            />
            <InjectAddons addon={usedOptions.addons || []}>
                <StylesAppContainer className="light-scrollbar">{children}</StylesAppContainer>
            </InjectAddons>
        </GlobalCssInjectionContext.Provider>
    );
};

GlobalCssInjection.displayName = "GlobalCssInjection";

export default GlobalCssInjection;
