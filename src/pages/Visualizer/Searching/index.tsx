import Visualizer from "../../../components/visualizer";
import { PreviewProvider } from "../../../context";
import SearchingSetting from "./Setting";

const SearchingVisualizer = () => {
  return (
    <PreviewProvider>
      <Visualizer>
        <SearchingSetting />
      </Visualizer>
    </PreviewProvider>
  );
};

export default SearchingVisualizer;
