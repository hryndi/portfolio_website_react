import { render } from "@testing-library/react";

import GlobalCssInjection from "./global-css-injection";

describe("GlobalCssInjection", () => {
    it("should render successfully", () => {
        const { baseElement } = render(<GlobalCssInjection />);
        expect(baseElement).toBeTruthy();
    });
});
