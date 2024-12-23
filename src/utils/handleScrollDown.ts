export const handleScrollToTop = () => {
  window.scrollTo({
    // top: document.body.scrollHeight,
    top: window.innerHeight,
    behavior: "smooth",
  });
};

// export const handleScrollDown = (scrollOneScreenHeight = false) => {
//   const scrollAmount = scrollOneScreenHeight
//     ? window.innerHeight
//     : document.body.scrollHeight;

//   window.scrollTo({
//     top: scrollAmount,
//     behavior: "smooth",
//   });
// };
