import { Component } from "react";
import { dogPictures } from "../dog-pictures";
import { Requests } from "../api";

const defaultSelectedImage = dogPictures.BlueHeeler;

type ClassCreateDogFormProps = {
  updatePage: () => Promise<void>;
};

export class ClassCreateDogForm extends Component<ClassCreateDogFormProps> {
  state = {
    name: "",
    description: "",
    image: "",
    isFavorite: false,
  };
  render() {
    const { updatePage } = this.props;
    const { name, description, image, isFavorite } = this.state;
    return (
      <form
        action=""
        id="create-dog-form"
        onSubmit={async (e) => {
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
          updatePage();
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
          <option value="" selected disabled hidden>
            Choose photo here
          </option>
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
