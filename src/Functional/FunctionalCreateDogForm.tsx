import { dogPictures } from "../dog-pictures";
import { Requests } from "../api";
import { useState } from "react";
import { toast } from "react-hot-toast";

const defaultSelectedImage = dogPictures.BlueHeeler;

export const FunctionalCreateDogForm = ({
  fetchData,
}: {
  fetchData: () => Promise<void>;
}) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const isFavorite = false;

  return (
    <form
      action=""
      id="create-dog-form"
      onSubmit={async (e) => {
        e.preventDefault();
        toast("✅ Dog Successfully Created!");
        if (!image) {
          setImage(defaultSelectedImage);
        }
        await Requests.postDog({
          name,
          description,
          image,
          isFavorite,
        });
        fetchData();
        setName("");
        setDescription("");
      }}>
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        type="text"
        disabled={false}
        onChange={(e) => {
          setName(e.target.value);
        }}
        value={name}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        name=""
        id=""
        cols={80}
        rows={10}
        disabled={false}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        value={description}></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select
        id="picture"
        onChange={(e) => {
          setImage(e.target.value);
        }}
        value={image}>
        {Object.entries(dogPictures).map(([label, pictureValue]) => {
          return (
            <option value={pictureValue} key={pictureValue}>
              {label}
            </option>
          );
        })}
      </select>
      <input type="submit" />
    </form>
  );
};
