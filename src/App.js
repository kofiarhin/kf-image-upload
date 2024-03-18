import "./App.css";
import { useState } from "react";
import { uploadImage } from "./utils/helper";
import Spinner from "./components/Spinner/Spinner";

const App = () => {
  const [file, setFile] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const url = await uploadImage(file);
    setImgUrl(url);
    setIsLoading(false);
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="container">
      <h1 className="heading">Upload Image</h1>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <input type="file" name="file" onChange={handleChange} />
          <button>Submit</button>
        </form>
      </div>

      {imgUrl && (
        <div className="content">
          <div class="img-wrapper">
            <img src={imgUrl} alt="" />
          </div>
          <p> {imgUrl} </p>
        </div>
      )}
    </div>
  );
};

export default App;
