// creates a parallax effect on all elements with "parallax" class

export function parallax (speed) {
    const isWebKit = 'WebkitAppearance' in document.documentElement.style;
    const isMobileDevice = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    const isWidth = $(window).width() >= 1020;

    if(isWebKit && isWidth && !isMobileDevice) {
        ((() => {
            const parallax = document.querySelectorAll(".parallax");

            window.onscroll = () => {
              [].slice.call(parallax).forEach((el, i) => {
                  const windowYOffset = window.pageYOffset;
                  const elementYOffset = el.offsetTop;
                  const elBackgrounPos = `100% ${(windowYOffset - elementYOffset) * speed}px`;

                  el.style.backgroundPosition = elBackgrounPos;
              });
            };
        }))();
    }
}
