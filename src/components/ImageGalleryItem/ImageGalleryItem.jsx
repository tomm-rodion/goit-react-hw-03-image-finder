export const ImageGalleryItem = ({ image }) => {
  const { webformatURL } = image;
  console.log(image);
  return (
    <li className="ImageGalleryItem">
      <img className="ImageGalleryItem-image" src={webformatURL} alt="img" />
    </li>
  );
};
