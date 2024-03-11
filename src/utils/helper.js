export const formatPrice = (number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(number / 100);
};

export const clearFilter = (
  setInputKeyword,
  setCategory,
  setRatings,
  setPriceV
) => {
  setInputKeyword("");
  setCategory("all");
  setRatings(0);
  setPriceV(4000000);
};

export const debounce = (func, delay) => {
  let timeoutId;

  const debouncedFunction = function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };

  debouncedFunction.cancel = function () {
    clearTimeout(timeoutId);
  };

  return debouncedFunction;
};
