import LottieAnimation from "../components/lottie";
import animationData from "../assets/lotties/404.json";
import BreadCrumbs from "../components/common/BreadCrumbs";

const NotFoundPage = () => {
  return (
      <section class="w-[70%] m-auto mt-4">
        <BreadCrumbs />
        <div class="w-[100%] h-[90vh] flex items-center justify-center">
          <div class="flex flex-col items-center">
            <div class="w-[400px] h-[250px] overflow-hidden">
              <LottieAnimation
                animationData={animationData}
                config={{ loop: true }}
              />
            </div>
            <h2 class="text-3xl font-bold">Page Not found</h2>
          </div>
        </div>
      </section>
  );
};

export default NotFoundPage;
