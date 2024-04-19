import styled from "@emotion/styled";
import Home from "./components/Home/Home";
import AboutMe from "./components/AboutMe/AboutMe";
import ContactMe from "./components/ContactMe/ContactMe";
import CVComponent from "./components/CVComponent/CVComponent";
import ThreeColumn from "./components/ThreeColumn/ThreeColumn";
import GlobalCssInjection from "./lib/global-css-injection";
import { gci_config } from "./config/gci_config";
import ModeButton from "./components/ModeButton/ModeButton";

const Main = styled.main``;

const App = () => {
  return (
    <GlobalCssInjection config={gci_config.config}>
      <Main className="dark on-background">
        <ModeButton />
        <Home />
        <AboutMe />
        <CVComponent />
        <ContactMe />
        <ThreeColumn />
      </Main>
    </GlobalCssInjection>
  );
};

export default App;
