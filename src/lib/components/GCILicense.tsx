import type { FC, PropsWithChildren } from "react";

import styled from "@emotion/styled";

import { getLicenseText } from "../global-css-injection.helper";
import useGlobalCssInjection from "../global-css-injection.hook";

import type { AddonSchema } from "../global-css-injection.types";

type Props = {
    addons?: Array<AddonSchema>;
};

type AddonTextProps = {
    addon: AddonSchema;
    injectionText?: string;
};

const LicenseTextStyled = styled("p")(`
    color: var(--md-sys-color-primary);
`);

const LicenseContainerStyled = styled("div")(
    `
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    max-height: 550px!important;
    height: fit-content !important;
    overflow: auto;
    width: 1150px !important;  
    padding: 10px 15px;
    margin: 5px auto;
    @media (max-width: 500px) {
        width: 250px !important;
    };
    @media (min-width: 499px) and (max-width: 700px) {
        width: 450px !important;
    };
    @media (min-width: 699px) and (max-width: 900px) {
        width: 650px !important;
    };
    @media (min-width: 899px) and (max-width: 1200px) {
        width: 850px !important;
    };
    box-shadow: 0px 0.917px 1.290px -0.583px rgba(0,0,0,0.2), 0px 2px 3.166px 0.250px rgba(0,0,0,0.14), 0px 0.750px 3.832px 0.667px rgba(0,0,0,0.12);
    `
);

const AddonContainerStyled = styled("div")(`
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-content: flex-start;
    width: 80%;
    @media (max-width: 500px) {
        width: 200px !important;
    };
    @media (min-width: 499px) and (max-width: 700px) {
        width: 300px !important;
    };
    @media (min-width: 699px) and (max-width: 900px) {
        width: 500px !important;
    };
    @media (min-width: 899px) and (max-width: 1200px) {
        width: 700px !important;
    };
    -webkit-box-shadow: -10px 0px 13px -7px var(--md-sys-color-primary), 10px 0px 13px -7px var(--md-sys-color-primary), 0px 0px 0px 0px rgba(0,0,0,0); 
    box-shadow: -10px 0px 13px -7px var(--md-sys-color-primary), 10px 0px 13px -7px var(--md-sys-color-primary), 0px 0px 0px 0px rgba(0,0,0,0);
    margin: 10px auto;
    padding: 0px 10px;
    `);

const GenerateAddonText = ({ addon, injectionText }: AddonTextProps) => (
    <AddonContainerStyled>
        <LicenseTextStyled className="body-small">
            Addon: {addon.name}
            <br />
            Author: {addon.author}
            <br />
            Description: {addon.description}
            <br />
            {addon.github && (
                <>
                    GitHub: {addon.github}
                    <br />
                </>
            )}
            {injectionText && (
                <>
                    Injections: {injectionText}
                    <br />
                </>
            )}
        </LicenseTextStyled>
    </AddonContainerStyled>
);

const GenerateLicenseComponent = ({
    addons,
    singleLines,
}: Props & {
    singleLines: {
        header: string;
        body: string;
        footer: string;
        injectionsText: (_injections?: Record<string, unknown> | undefined) => string;
        addonText: string;
    };
}) => {
    const addonText =
        addons?.reduce(
            (acc, cur) => (
                <>
                    {acc}
                    <GenerateAddonText
                        key={cur.name}
                        addon={cur}
                        injectionText={singleLines.injectionsText(cur.injections)}
                    />
                </>
            ),
            // eslint-disable-next-line react/jsx-no-useless-fragment
            <></>
        ) || "";
    return (
        <LicenseContainerStyled className="light-scrollbar">
            <LicenseTextStyled className="headline-medium">{singleLines.header}</LicenseTextStyled>
            <LicenseTextStyled className="body-medium">{singleLines.body}</LicenseTextStyled>
            <LicenseTextStyled className="body-large">Used GCI addons:</LicenseTextStyled>
            {addonText}
            <LicenseTextStyled>{singleLines.footer}</LicenseTextStyled>
        </LicenseContainerStyled>
    );
};

export const GCILicense: FC<PropsWithChildren<Props>> = ({ addons }) => {
    const { options } = useGlobalCssInjection();

    const usedAddons = options?.addons || addons || [];

    const license = getLicenseText(usedAddons);

    console.info(license.license);

    return <GenerateLicenseComponent singleLines={license.singleLines} addons={usedAddons} />;
};

export default GCILicense;
