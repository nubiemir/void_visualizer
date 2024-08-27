import Visualizer from "../../../components/visualizer";
import { PreviewProvider } from "../../../context";
import SortingSetting from "./Setting";

const SortingVisualizer = () => {
  return (
    <PreviewProvider>
      <Visualizer>
        <SortingSetting />
      </Visualizer>
    </PreviewProvider>
  );
};

export default SortingVisualizer;
