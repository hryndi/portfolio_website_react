/* eslint-disable @typescript-eslint/ban-types */

import type { ComponentType } from "react";

export type ConfigKeys = "colors" | "typography" | "dark" | "light" | "tokens";

export type ScrollBarConfig = "scrollbarThickness" | "scrollbarRadius";

export type OptionalScrollBarConfig = "lightScrollbarThickness" | "lightScrollbarRadius";

export type AddonSchema<IT = Record<string, unknown>> = {
    name: string;
    description: string;
    author: string;
    github?: string;
    provider?: {
        component: ComponentType<IT>;
        wrapper: boolean;
    };
    injections?: IT;
};

export type CustomFontObject = {
    name: string;
    importUrl: string;
};

export type CustomFontString = string;

export type CustomFont<T> = T extends string ? CustomFontString : Array<CustomFontObject>;

export type GCIOptions<IT = Record<string, unknown>> = {
    use_provider: null | "mui";
    addons: Array<AddonSchema<IT>>;
    customFonts?: CustomFontString | Array<CustomFontObject>;
    primaryFontName?: string;
    additionalCSS?: string;
};

export type GlobalCSSInjectionProps = {
    config?: Partial<
        Record<ConfigKeys, string> & Record<OptionalScrollBarConfig, number> & Record<ScrollBarConfig, number>
    >;
    options?: Partial<GCIOptions>;
};

export type GlobalCSSInjectionContextProps = Partial<GlobalCSSInjectionProps> & {
    mode?: "light" | "dark";
    setMode?: () => void;
};

export type CSSProviderProps<P = {}> = P &
    HTMLDivElement & {
        injection: string;
    };

export enum ClassNames {}
