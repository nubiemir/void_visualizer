import MenuCard from "./MenuCard";
import testImage from "../../assets/test-image.png";
// import { A } from "@solidjs/router";
import Carousel from "../common/Carousel";
import { For, createSignal, onMount } from "solid-js";

const MenuList = () => {
    const [_, setCardWidth] = createSignal(0);
    let ref: HTMLElement | undefined;

    onMount(() => {
        if (!ref) return;
        const width = ref.offsetWidth;
        setCardWidth(Math.max(Math.round(width / 4) || 200))
    })
    const data = new Array(5).fill("hello")
    return (
        <section ref={ele => ref = ele} class="md:w-[70%] w-[90%] m-auto my-6">
            <Carousel title="Featured Visualization" offset={220} len={5}>
            <For each={data}>
            {(_, idx) => <div
                    class="min-w-[180px] md:min-w-[220px]"
                >
                    <MenuCard title={"" + idx()} image={testImage} subtitle="this is a test"/>
                </div>
            }
            </For>
            </Carousel>
        </section>
    );
};

export default MenuList;
