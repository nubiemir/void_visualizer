import {
  Accessor,
  createContext,
  createSignal,
  ParentComponent,
  useContext,
} from "solid-js";

type TTabContext = {
  index: Accessor<number>;
  handleTabChange: (index: number) => void;
};

const Context = createContext<TTabContext>();

const TabContext: ParentComponent = (props) => {
  const [index, setIndex] = createSignal(0);

  const handleTabChange = (index: number) => {
    setIndex(index);
  };

  return (
    <Context.Provider value={{ index, handleTabChange }}>
      {props.children}
    </Context.Provider>
  );
};

export const useTabContext = () => {
  const value = useContext(Context);
  if (value === undefined) {
    throw new Error("useMyContext must be used within a MyContext.Provider");
  }
  return value;
};

export default TabContext;
