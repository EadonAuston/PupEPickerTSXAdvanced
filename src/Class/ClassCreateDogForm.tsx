import { Component } from "react";
import { dogPictures } from "../dog-pictures";
import { Requests } from "../api";
import { toast } from "react-hot-toast";

const defaultSelectedImage = dogPictures.BlueHeeler;

type ClassCreateDogFormProps = {
  fetchData: () => Promise<void>;
};

export class ClassCreateDogForm extends Component<ClassCreateDogFormProps> {
  state = {
    name: "",
    description: "",
    image: defaultSelectedImage,
    isFavorite: false,
  };
  render() {
    const { fetchData } = this.props;
    const { name, description, image, isFavorite } = this.state;
    return (
      <form
        action=""
        id="create-dog-form"
        onSubmit={async (e) => {
          toast("✅ Dog Successfully Created!");
          e.preventDefault();
          if (!image) {
            this.setState({ image: defaultSelectedImage });
          }
          await Requests.postDog({
            name,
            description,
            image,
            isFavorite,
          });
          fetchData();
          this.setState({ name: "" });
          this.setState({ description: "" });
        }}>
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input
          type="text"
          disabled={false}
          onChange={(e) => {
            this.setState({ name: e.target.value });
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
            this.setState({ description: e.target.value });
          }}
          value={description}></textarea>
        <label htmlFor="picture">Select an Image</label>
        <select
          id="picture"
          onChange={(e) => {
            this.setState({ image: e.target.value });
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
  }
}
