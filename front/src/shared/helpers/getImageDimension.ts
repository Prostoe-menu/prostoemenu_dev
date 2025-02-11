export type TImageDimentions = {
  height: number;
  width: number;
};

const getImageDimension = (dataURL: string) =>
  new Promise<TImageDimentions>((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        height: img.height,
        width: img.width,
      });
    };
    img.src = dataURL;
  });

export default getImageDimension;
