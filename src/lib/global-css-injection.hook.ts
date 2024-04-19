import { useContext, useMemo } from "react";

import { GlobalCssInjectionContext } from "./global-css-injection";

export const useGlobalCssInjection = () => {
    const context = useContext(GlobalCssInjectionContext);

    const memorizedContext = useMemo(() => context, [context]);

    return memorizedContext;
};

export default useGlobalCssInjection;
