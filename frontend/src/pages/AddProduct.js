import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import greencheck from "../assets/greencheck.svg";

const AddProduct = () => {
  const storage = getStorage(app);
  const navigate = useNavigate();
  const [formdata, setFormdata] = useState({});
  const [imageFiles, setImageFiles] = useState([]);
  const [imagesUrl, setImagesUrl] = useState([]);
  const [showError, setShowError] = useState(null);
  const [uploadCheck, setUploadCheck] = useState(false);
  const handleImageChange = (e) => {
    setImageFiles([]);
    const files = e.target.files;
    if (files.length > 4) {
      for (let i = 0; i < 4; i++) {
        setImageFiles((prevState) => [...prevState, files.item(i)]);
      }
    } else {
      for (let i = 0; i < files.length; i++) {
        setImageFiles((prevState) => [...prevState, files.item(i)]);
      }
    }
  };
  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value });
  };
  const handleImageUpload = (e) => {
    e.preventDefault();
    setImagesUrl([]);
    setUploadCheck(false);
    const promises = [];
    Object.keys(imageFiles).map((imageIndex) => {
      const imageFileName =
        new Date().getTime() + `${imageFiles[imageIndex].name}`;
      const storageRef = ref(storage, imageFileName);
      const uploadTask = uploadBytesResumable(
        storageRef,
        imageFiles[imageIndex]
      );
      promises.push(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          progress === 100 && setUploadCheck(true);
        },
        (error) => {
          console.log(error);
        },
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            setImagesUrl((prevState) => [...prevState, downloadUrl]);
            console.log(imagesUrl);
          });
        }
      );
    });
    Promise.all(promises)
      .then(() => {
        console.log("All images have uploaded");
      })
      .catch((error) => console.log(error));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowError(null);
    if (
      !formdata.title ||
      !formdata.category ||
      !formdata.brand ||
      !formdata.price ||
      !formdata.stock ||
      !imagesUrl ||
      formdata.title === "" ||
      formdata.category === "" ||
      formdata.brand === "" ||
      formdata.price === "" ||
      formdata.stock === "" ||
      imagesUrl.length === 0
    ) {
      setShowError("Please fill all the fields");
    } else {
      try {
        const res = await fetch("/product/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: formdata.title,
            category: formdata.category,
            brand: formdata.brand,
            price: formdata.price,
            stock: formdata.stock,
            images: imagesUrl,
          }),
        });
        const data = await res.json();
        if (res.ok) {
          console.log(data);
          navigate("/");
        } else {
          setShowError(data);
        }
      } catch (error) {
        setShowError(error)
      }
    }
  };

  return (
    <div className="h-[90vh] flex flex-col gap-5 justify-center items-center">
      <h2 className="font-bold text-3xl">Add a product</h2>
      <form
        onSubmit={handleSubmit}
        className="border-2 bg-gradient-to-r from-cyan-400 to-blue-400 p-10 flex flex-col gap-4 shadow-md rounded-lg"
      >
        <div className="flex items-center gap-2">
          <label className="font-semibold">Title : </label>
          <input
            onChange={handleChange}
            className="px-3 flex-grow py-2 border-black rounded-md border"
            placeholder="product title..."
            id="title"
            type="text"
          />
        </div>
        <div className="flex justify-between">
          <div>
            <label className="font-semibold">Upload image : </label>
            <input
              onChange={handleImageChange}
              className="border border-black rounded-tr-lg rounded-br-lg"
              type="file"
              id="images"
              accept="image/png, image/webp, image/jpeg, image/avif"
              multiple
            />
          </div>
          {uploadCheck && (
            <img src={greencheck} width={20} alt="Upload complete" />
          )}
        </div>
        <div className="flex items-center justify-between">
          <span className="font-semibold text-blue-700 w-2/3 flex-wrap">
            Max 4 images are allowed : if more than 4 images are selected, only
            the first 4 will be uploaded
          </span>
          <button
            className="bg-yellow-400 hover:bg-yellow-500 rounded-md text-black px-3 py-2 h-fit"
            onClick={handleImageUpload}
          >
            Upload images
          </button>
        </div>
        <div>
          <label className="font-semibold">Category : </label>
          <select
            className="border rounded-lg px-3 py-2 border-black"
            onChange={(e) =>
              setFormdata({ ...formdata, category: e.target.value })
            }
          >
            <option value="uncategorized">Select a category</option>
            <option value="shirt">Men's shirt</option>
            <option value="trouser">Men's trouser</option>
            <option value="shoes">Men's shoes</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="font-semibold">Brand : </label>
          <input
            onChange={handleChange}
            className="px-3 flex-grow py-2 border-black rounded-md border"
            placeholder="product brand..."
            id="brand"
            type="text"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="font-semibold">Price : </label>
          <input
            onChange={handleChange}
            className="px-3 flex-grow py-2 border-black rounded-md border"
            placeholder="product price..."
            id="price"
            type="number"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="font-semibold">Stock : </label>
          <input
            onChange={handleChange}
            className="px-3 flex-grow py-2 border-black rounded-md border"
            placeholder="product stock..."
            id="stock"
            type="number"
          />
        </div>
        <button className="bg-yellow-400 hover:bg-yellow-500 py-2 rounded-md text-black">
          Add
        </button>
        {showError && <p className="text-red-700 text-center">{showError}</p>}
      </form>
    </div>
  );
};

export default AddProduct;
