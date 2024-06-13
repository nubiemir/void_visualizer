import Layout from "../../../components/layout";
import Visualizer from "../../../components/visualizer";
import { PreviewProvider } from "../../../context";

const SortingVisualizer = () => {
  return (
    <Layout>
      <PreviewProvider>
        <Visualizer />
      </PreviewProvider>
    </Layout>
  );
};

export default SortingVisualizer;
