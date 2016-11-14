export const tap = fn => (ret) => {
  fn(ret);
  return ret;
};

export const assert = (err, test) => {
  if (!test) {
    throw new Error(err);
  }
};
