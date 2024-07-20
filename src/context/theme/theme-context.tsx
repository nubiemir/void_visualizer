  import {
      Accessor,
  createContext,
  createSignal,
  ParentComponent,
  useContext,
} from "solid-js";


export type Theme = "dark" | "light"

type TThemeContext = {
  theme: Accessor<Theme>
  handleThemeChange: () => void
};

const Context = createContext<TThemeContext>();

const ThemeContext: ParentComponent = (props) => {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = createSignal<Theme>(isDark ? "dark" : "light");

  const handleThemeChange = () => {
    if(theme() === "dark") setTheme("light")
    else setTheme("dark");
  };

  return (
    <Context.Provider value={{theme, handleThemeChange}}>
      {props.children}
    </Context.Provider>
  );
};

export const useThemeContext = () => {
  const value = useContext(Context);
  if (value === undefined) {
    throw new Error("useMyContext must be used within a MyContext.Provider");
  }
  return value;
};

export default ThemeContext;
