import { ParentComponent, createEffect, createSignal } from "solid-js";

interface CarouselProps {
    title?: string;
    offset: number;
    len: number;
}
const Carousel: ParentComponent<CarouselProps> = (props) => {
    const [activeIndex, setActiveIndex] = createSignal(0)
    let slider: HTMLDivElement;

    const nextSlide = () => {
        if (activeIndex() >= props.len) return;
        setActiveIndex(prev => prev + 1)
        slider.style.transform = `translateX(${-props.offset * (activeIndex())}px)`
    }
    const prevSlide = () => {
        if (activeIndex() <= 0) return;
        slider.style.transform = `translateX(${-(activeIndex() * props.offset - props.offset)}px)`
        setActiveIndex(prev => prev - 1)
    }

    return (
        <div class="w-[100%] h-[100%] py-4 overflow-x-hidden">
            <div class="w-[100%] h-[100%] flex flex-col gap-5">
                <div class="flex justify-between items-center">
                    <div class="flex items-center gap-4">
                        <h2 class="text-2xl font-bold">{props.title}</h2>
                        <a class="link">View all</a>
                    </div>
                    <div class="flex gap-2 items-center">
                        <button class="btn btn-circle shadow" onclick={prevSlide}>
                        <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={20} height={20}>
                            <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z"/>
                        </svg>
                        </button>
                        <button class="btn btn-circle shadow" onclick={nextSlide}>
                        <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={20} height={20}>
                            <path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"/>
                        </svg>
                        </button>
                    </div>
                </div>
                <div>
                    <div ref={ele => slider = ele} class="flex gap-3 transition-transform duration-700">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Carousel;
