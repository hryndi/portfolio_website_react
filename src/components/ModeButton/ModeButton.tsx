import useGlobalCssInjection from "../../lib/global-css-injection.hook";

const ModeButton = () => {
  const gci = useGlobalCssInjection();
  return (
    <button onClick={() => (gci.setMode ? gci.setMode() : null)}>
      {gci.mode === "light" ? "Switch to dark" : "Switch to light"}
    </button>
  );
};

export default ModeButton;
