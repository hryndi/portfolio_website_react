import type { FC, PropsWithChildren } from "react";

export const LightScrollbar: FC<PropsWithChildren> = ({ children }) => (
    <div className="light-scrollbar">{children}</div>
);
