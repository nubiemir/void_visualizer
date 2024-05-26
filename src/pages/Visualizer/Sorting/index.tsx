import BreadCrumbs from "../../../components/common/BreadCrumbs";
import Layout from "../../../components/layout";
import Container from "../../../components/visualizer/sorting/Container";

const SortingVisualizer = () => {
  return (
    <Layout>
      <section class="w-[70%] m-auto mt-4">
        <div class="mb-4">
          <BreadCrumbs />
        </div>
        <Container />
      </section>
    </Layout>
  );
};

export default SortingVisualizer;
