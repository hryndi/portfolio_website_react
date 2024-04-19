import * as colors from "./css/colors.module.css?raw";
import * as tokens from "./css/tokens.css?raw";
import * as typography from "./css/typography.module.css?raw";
import * as dark from "./css/theme.dark.css?raw";
import * as light from "./css/theme.light.css?raw";

import { GlobalCSSInjectionContextProps } from "../lib/global-css-injection.types";

export const gci_config: GlobalCSSInjectionContextProps = {
  config: {
    tokens: tokens.default,
    colors: colors.default,
    typography: typography.default,
    dark: dark.default,
    light: light.default,
  },
};
