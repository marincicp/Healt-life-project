export const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeot after ${s} second`));
    }, s * 1000);
  });
};
