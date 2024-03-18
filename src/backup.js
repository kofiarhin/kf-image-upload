import "./App.css";
import { storage } from "./firebase/firebase";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { useState, useEffect } from "react";
import { v4 } from "uuid";
const App = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [imageListUrl, setImageListUrl] = useState([]);

  useEffect(() => {
    const imageListRef = ref(storage, "images/");

    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageListUrl((prev) => [...prev, url]);
        });
      });
    });
  }, []);
  const handleChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleClick = () => {
    const imageRef = ref(storage, `images/${imageFile.name + v4()}`);
    uploadBytes(imageRef, imageFile).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((response) => {
        setImgUrl(response);
        console.log(response);
      });
    });
  };
  return (
    <div className="container">
      <input type="file" name="file" onChange={handleChange} />
      <button onClick={handleClick}>upload Image</button>

      {imageListUrl.length > 0 ? (
        imageListUrl.map((item, index) => {
          return <img src={item} key={index} />;
        })
      ) : (
        <h1> Image not found </h1>
      )}
    </div>
  );
};

export default App;
