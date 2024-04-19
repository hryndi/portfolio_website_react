import type { AddonSchema, CustomFont, CustomFontObject } from "./global-css-injection.types";

/**
 * Returns the MIT License text with the given addons.
 * @param addons - The addons to add to the license.
 */
export function getLicenseText<IT extends object>(addons?: Array<AddonSchema<IT>>) {
    const year = new Date().getFullYear();
    const header = "MIT License of React Global CSS Injection";
    const body = `Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: \n\nThe above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. \n\nTHE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`;
    const footer = `(c) 2020-${year} by Dominic Seel`;

    const injectionsText = (injections?: IT) =>
        injections && Object.keys(injections).length > 0
            ? `Global CSS Injection Addons:\n\nInjections:\n${Object.keys(injections).reduce(
                  (acc, key, idx, keys) => `${acc}${key}${idx + 1 === keys.length ? ";" : ", "}`,
                  ""
              )}`
            : "";

    const addonText =
        addons?.reduce(
            (acc, cur) =>
                `${acc}Addon: ${cur.name}\nAuthor: ${cur.author}\nDescription: ${cur.description}\n${injectionsText(
                    cur.injections
                )}`,
            ""
        ) || "";

    const license = `${header}\n${body}\n\n${addonText}\n${footer}`;

    const singleLines = {
        header,
        body,
        footer,
        injectionsText,
        addonText,
    };

    return { license, singleLines };
}

export const applyCustomFonts = (customFonts?: Array<CustomFontObject>) => {
    if (customFonts === undefined)
        return {
            css: ``,
            classNames: {},
            cssVar: "",
        };
    const importUrl = customFonts.reduce((acc, cur) => `${acc}@import url("${cur.importUrl}");\n`, "");
    const classNameGenerator = customFonts.reduce(
        (acc, cur) => `${acc}
        .use-font-${cur.name.toLowerCase().replace(" ", "-")} {\n
            font-family: ${cur.name} !important;\
        }\n
    `,
        ""
    );

    const classNames = customFonts.reduce(
        (acc, cur) => ({ ...acc, [cur.name]: `use-font-${cur.name.toLowerCase().replace(" ", "-")}` }),
        {}
    );

    const cssVar = customFonts.reduce(
        (acc, cur) => `${acc}
        :root {\n
            --use-font-${cur.name.toLowerCase().replace(" ", "-")}: {\n
                font-family: ${cur.name} !important;\n
            };\n
        };\n
    `,
        ""
    );

    const values = {
        css: `${importUrl}\n${classNameGenerator}\n`,
        classNames,
        cssVar,
    };

    return values;
};

export function applyCustomFontMapping<CFT = string>(_customFonts?: CFT): string;
export function applyCustomFontMapping<CFT = Array<CustomFontObject>>(_customFonts?: CFT): string;
export function applyCustomFontMapping<CFT>(customFonts?: CustomFont<CFT>): string {
    if (customFonts === undefined) return "";
    if (Array.isArray(customFonts)) return applyCustomFonts(customFonts).css;
    return customFonts;
}
