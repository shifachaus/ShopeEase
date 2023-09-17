const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className=" bg-[#a99985] mx-auto grid grid-cols-1 space-y-10 bg-primary px-5 py-8 tracking-wider text-white md:grid-cols-4 md:space-y-0 xl:px-28 xl:py-20 ">
      <section className="space-y-4">
        <h1 className="text-4xl font-black tracking-wider">
          <span className="text-white">Shop</span>
          <span className="text-[#252323]">Ease</span>
        </h1>
        <p className="w-2/3 text-sm font-light">
          Explore the various kind of products for your Home, office and Room.
        </p>
      </section>

      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="uppercase ">Contact us</h2>
          <div className="w-1/6 border-t"></div>
        </div>
        <div className="space-y-4 text-sm font-light">
          <p className="flex items-center space-x-1">
            <span>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 16 16"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"></path>
              </svg>{" "}
            </span>
            <span> (+88) 1234 567898</span>
          </p>
          <p className="flex items-center space-x-1">
            <span>
              {" "}
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>{" "}
            </span>
            <span> shoptik@gmail.com</span>
          </p>
          <p className="flex items-center space-x-1">
            <span>
              {" "}
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 16 16"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022zM6 8.694 1 10.36V15h5V8.694zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15z"
                ></path>
                <path d="M2 11h1v1H2v-1zm2 0h1v1H4v-1zm-2 2h1v1H2v-1zm2 0h1v1H4v-1zm4-4h1v1H8V9zm2 0h1v1h-1V9zm-2 2h1v1H8v-1zm2 0h1v1h-1v-1zm2-2h1v1h-1V9zm0 2h1v1h-1v-1zM8 7h1v1H8V7zm2 0h1v1h-1V7zm2 0h1v1h-1V7zM8 5h1v1H8V5zm2 0h1v1h-1V5zm2 0h1v1h-1V5zm0-2h1v1h-1V3z"></path>
              </svg>{" "}
            </span>
            <span> 469, Hog Camp Road, California</span>
          </p>
          <div className="flex space-x-6">
            <a href="#" aria-label="Facebook">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 1024 1024"
                className="h-5 w-5"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-32 736H663.9V602.2h104l15.6-120.7H663.9v-77.1c0-35 9.7-58.8 59.8-58.8h63.9v-108c-11.1-1.5-49-4.8-93.2-4.8-92.2 0-155.3 56.3-155.3 159.6v89H434.9v120.7h104.3V848H176V176h672v672z"></path>
              </svg>
            </a>
            <a href="#" aria-label="Twitter">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 1024 1024"
                className="h-5 w-5"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zM727.3 401.7c.3 4.7.3 9.6.3 14.4 0 146.8-111.8 315.9-316.1 315.9-63 0-121.4-18.3-170.6-49.8 9 1 17.6 1.4 26.8 1.4 52 0 99.8-17.6 137.9-47.4-48.8-1-89.8-33-103.8-77 17.1 2.5 32.5 2.5 50.1-2a111 111 0 0 1-88.9-109v-1.4c14.7 8.3 32 13.4 50.1 14.1a111.13 111.13 0 0 1-49.5-92.4c0-20.7 5.4-39.6 15.1-56a315.28 315.28 0 0 0 229 116.1C492 353.1 548.4 292 616.2 292c32 0 60.8 13.4 81.1 35 25.1-4.7 49.1-14.1 70.5-26.7-8.3 25.7-25.7 47.4-48.8 61.1 22.4-2.4 44-8.6 64-17.3-15.1 22.2-34 41.9-55.7 57.6z"></path>
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 1024 1024"
                className="h-5 w-5"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M847.7 112H176.3c-35.5 0-64.3 28.8-64.3 64.3v671.4c0 35.5 28.8 64.3 64.3 64.3h671.4c35.5 0 64.3-28.8 64.3-64.3V176.3c0-35.5-28.8-64.3-64.3-64.3zm0 736c-447.8-.1-671.7-.2-671.7-.3.1-447.8.2-671.7.3-671.7 447.8.1 671.7.2 671.7.3-.1 447.8-.2 671.7-.3 671.7zM230.6 411.9h118.7v381.8H230.6zm59.4-52.2c37.9 0 68.8-30.8 68.8-68.8a68.8 68.8 0 1 0-137.6 0c-.1 38 30.7 68.8 68.8 68.8zm252.3 245.1c0-49.8 9.5-98 71.2-98 60.8 0 61.7 56.9 61.7 101.2v185.7h118.6V584.3c0-102.8-22.2-181.9-142.3-181.9-57.7 0-96.4 31.7-112.3 61.7h-1.6v-52.2H423.7v381.8h118.6V604.8z"></path>
              </svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 1024 1024"
                className="h-5 w-5"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M512 306.9c-113.5 0-205.1 91.6-205.1 205.1S398.5 717.1 512 717.1 717.1 625.5 717.1 512 625.5 306.9 512 306.9zm0 338.4c-73.4 0-133.3-59.9-133.3-133.3S438.6 378.7 512 378.7 645.3 438.6 645.3 512 585.4 645.3 512 645.3zm213.5-394.6c-26.5 0-47.9 21.4-47.9 47.9s21.4 47.9 47.9 47.9 47.9-21.3 47.9-47.9a47.84 47.84 0 0 0-47.9-47.9zM911.8 512c0-55.2.5-109.9-2.6-165-3.1-64-17.7-120.8-64.5-167.6-46.9-46.9-103.6-61.4-167.6-64.5-55.2-3.1-109.9-2.6-165-2.6-55.2 0-109.9-.5-165 2.6-64 3.1-120.8 17.7-167.6 64.5C132.6 226.3 118.1 283 115 347c-3.1 55.2-2.6 109.9-2.6 165s-.5 109.9 2.6 165c3.1 64 17.7 120.8 64.5 167.6 46.9 46.9 103.6 61.4 167.6 64.5 55.2 3.1 109.9 2.6 165 2.6 55.2 0 109.9.5 165-2.6 64-3.1 120.8-17.7 167.6-64.5 46.9-46.9 61.4-103.6 64.5-167.6 3.2-55.1 2.6-109.8 2.6-165zm-88 235.8c-7.3 18.2-16.1 31.8-30.2 45.8-14.1 14.1-27.6 22.9-45.8 30.2C695.2 844.7 570.3 840 512 840c-58.3 0-183.3 4.7-235.9-16.1-18.2-7.3-31.8-16.1-45.8-30.2-14.1-14.1-22.9-27.6-30.2-45.8C179.3 695.2 184 570.3 184 512c0-58.3-4.7-183.3 16.1-235.9 7.3-18.2 16.1-31.8 30.2-45.8s27.6-22.9 45.8-30.2C328.7 179.3 453.7 184 512 184s183.3-4.7 235.9 16.1c18.2 7.3 31.8 16.1 45.8 30.2 14.1 14.1 22.9 27.6 30.2 45.8C844.7 328.7 840 453.7 840 512c0 58.3 4.7 183.2-16.2 235.8z"></path>
              </svg>
            </a>
          </div>
        </div>
      </section>
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="uppercase ">Userful links</h2>
          <div className="w-1/6 border-t"></div>
        </div>
        <div className="flex flex-col space-y-4 text-sm font-light">
          <a href="#" className="hover:text-white/80">
            About Shoptik
          </a>
          <a href="#" className="hover:text-white/80">
            Contact us
          </a>
          <a href="#" className="hover:text-white/80">
            FAQ
          </a>
          <a href="#" className="hover:text-white/80">
            Supports
          </a>
          <a href="#" className="hover:text-white/80">
            Blog
          </a>
          <a href="#" className="hover:text-white/80">
            Privacy Policy
          </a>
        </div>
      </section>
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="uppercase ">Latest news</h2>
          <div className="w-1/6 border-t"></div>
        </div>
        <div className="flex flex-col space-y-3 font-light ">
          <article className="flex items-center  justify-start space-x-4 md:flex-col md:items-start md:space-x-0 lg:flex-row xl:space-x-4 ">
            <img
              width="300"
              height="200"
              src="/assets/Blog1.fd44f1e6.webp"
              alt="Furniture Decoration idea"
              className="h-12 w-20 object-cover object-center"
            />
            <div className=" capitalize ">
              <a href="#" className="text-sm hover:text-white/80 ">
                Furniture Decoration idea
              </a>
              <p className="text-xs text-gray-200"> October 20, 2022 </p>
            </div>
          </article>
          <article className="flex items-center  justify-start space-x-4 md:flex-col md:items-start md:space-x-0 lg:flex-row xl:space-x-4 ">
            <img
              width="300"
              height="200"
              src="/assets/Blog2.f15de6e7.webp"
              alt="Decorate your idea in house"
              className="h-12 w-20 object-cover object-center"
            />
            <div className=" capitalize ">
              <a href="#" className="text-sm hover:text-white/80 ">
                Decorate your idea in house
              </a>
              <p className="text-xs text-gray-200"> November 03, 2022 </p>
            </div>
          </article>
          <article className="flex items-center  justify-start space-x-4 md:flex-col md:items-start md:space-x-0 lg:flex-row xl:space-x-4 ">
            <img
              width="300"
              height="200"
              src="/assets/Blog3.c67cc420.webp"
              alt="Dining Table decorate"
              className="h-12 w-20 object-cover object-center"
            />
            <div className=" capitalize ">
              <a href="#" className="text-sm hover:text-white/80 ">
                Dining Table decorate
              </a>
              <p className="text-xs text-gray-200"> December 15, 2022 </p>
            </div>
          </article>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
