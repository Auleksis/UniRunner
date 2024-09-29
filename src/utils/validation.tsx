export type Inputs = {
  username: string;
  password: string;
};

export const validateUser = async (value: Inputs) => {
  //console.log(value);
  await new Promise((resolve) => {
    setTimeout(resolve, 500);
  });
  return false;
};
