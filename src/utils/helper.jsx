export const formatPrice = (number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number(number) / 100);
};

export const clearFilter = (
  setInputKeyword,
  setCategory,
  setRatings,
  setPriceV,
) => {
  setInputKeyword("");
  setCategory("all");
  setRatings(0);
  setPriceV(2500000);
};

export const debounce = (func, delay) => {
  let timeoutId;

  const debouncedFunction = function (...args) {
    clearTimeout(timeoutId);

    const context = this;

    timeoutId = setTimeout(() => {
      timeoutId = undefined;
      func.apply(context, args);
    }, delay);
  };

  debouncedFunction.cancel = () => {
    clearTimeout(timeoutId);
    timeoutId = undefined;
  };

  return debouncedFunction;
};
