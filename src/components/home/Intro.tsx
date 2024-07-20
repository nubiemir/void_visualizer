// import Search from "./Search";

const Intro = () => {
  return (
    <section class="md:w-[70%] w-[90%] m-auto mt-4 bg-gray-100 rounded-lg overflow-hidden">
      <div class="h-[480px] bg-intro-image bg-cover bg-center bg-no-repeat relative flex flex-col justify-end">
        <div class="bg-intro-image-color absolute left-0 top-0 w-[100%] h-[100%] z-0"></div>
        <div class="relative z-10  px-10 py-5">
          <div class="flex flex-col gap-4">
            <div>
              <h1 class="text-4xl font-bold text-white">
                Learn Algorithms and Data Structures
              </h1>
              <p class="text-md text-gray-200 font-medium">
                Understand the fundamentals of computer science through
                interactive visualizations.
              </p>
            </div>
            {/* <div class="lg:w-[400px] md:w-[300px]">
              <Search />
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
