const Instagram = () => {
  return (
    <section className="mx-auto max-w-7xl mt-10 md:mt-20  h-64 md:h-80 md:bg-[url('./assets/footerimage.webp')] bg-[url('./assets/mobile.webp')] bg-cover bg-center ">
      <div className="w-full   h-full flex  justify-center items-center backdrop-brightness-75">
        <div className=" flex flex-col h-full items-center justify-center text-white">
          <h3 className="mb-4  text-4xl font-semibold  sm:text-4xl text-center">
            Our Instagram
          </h3>
          <p className="mb-6 text-xl font-medium">
            Follow our store on Instagram
          </p>
          <button
            type="button"
            className="rounded shadow-md border-2 border-neutral-100 px-7 pb-[8px] pt-[10px] text-sm font-medium uppercase leading-normal  transition duration-150 ease-in-out hover:border-white hover:bg-neutral-500 hover:bg-opacity-10  focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200 "
            data-te-ripple-init
            data-te-ripple-color="light"
          >
            Follow Us
          </button>
        </div>
      </div>
    </section>
  );
};

export default Instagram;
