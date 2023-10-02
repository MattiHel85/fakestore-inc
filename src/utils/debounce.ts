export const debounce = (func: any, delay: any) => {
    let timeoutId: any;
  
    return (...args: any) => {
      clearTimeout(timeoutId);
  
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };