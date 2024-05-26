import Lottie from "lottie-web";
import { onMount } from "solid-js";

interface ILottieAnimationProps {
  animationData: any;
  config: {
    loop?: boolean;
    autoplay?: boolean;
  };
}

const LottieAnimation = ({ animationData, config }: ILottieAnimationProps) => {
  let lottieRef!: HTMLDivElement;
  onMount(() => {
    Lottie.loadAnimation({
      container: lottieRef,
      animationData,
      loop: config.loop || false,
      autoplay: config.autoplay || true,
      renderer: "svg",
    });
  });
  return (
    <div
      ref={lottieRef}
      class="w-[100%] h-[100%] max-h-[100%] max-w-[100%]"
    ></div>
  );
};

export default LottieAnimation;
