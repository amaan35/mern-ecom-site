import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import greencheck from "../assets/greencheck.svg";

const UpdateProduct = () => {
  const { currentProduct } = useSelector((state) => state.product);
  const storage = getStorage(app);
  const navigate = useNavigate();
  const [formdata, setFormdata] = useState({
    title: currentProduct.title,
    category: currentProduct.category,
    brand: currentProduct.brand,
    price: currentProduct.price,
    stock: currentProduct.stock,
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [imagesUrl, setImagesUrl] = useState(currentProduct.images);
  const [showError, setShowError] = useState(null);
  const [uploadCheck, setUploadCheck] = useState(false);
  console.log("formdata : ", formdata);
  console.log("imgesUrl : ",imagesUrl);
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
        const res = await fetch(`/product/update/${currentProduct._id}`, {
          method: "PUT",
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
        console.log(error.message);
      }
    }
  };

  return (
    <div className="h-[90vh] flex flex-col gap-5 justify-center items-center">
      <h2 className="font-bold text-3xl">Update a product</h2>
      <form
        onSubmit={handleSubmit}
        className="border-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white p-10 flex flex-col gap-4 shadow-md rounded-lg"
      >
        <div className="flex items-center gap-2">
          <label className="font-semibold">Update Title : </label>
          <input
            onChange={handleChange}
            className="px-3 flex-grow py-2 border-black text-black rounded-md border"
            placeholder="product title..."
            id="title"
            type="text"
            value={formdata.title}
          />
        </div>
        <div className="flex justify-between">
          <div>
            <label className="font-semibold">Update image : </label>
            <input
              onChange={handleImageChange}
              className="border border-black rounded-tr-lg rounded-br-lg"
              type="file"
              id="images"
              accept="image/png, image/webp, image/jpeg, image/avif"
              multiple
            />
            {!uploadCheck && (
              <span className="text-white">
                {" "}
                update images : choose and upload
              </span>
            )}
          </div>
          {uploadCheck && (
            <img src={greencheck} width={20} alt="Upload complete" />
          )}
        </div>
        <div className="flex items-center justify-between">
          <span className="font-semibold text-white w-2/3 flex-wrap">
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
          <label className="font-semibold">Update Category : </label>
          <select
            className="border rounded-lg px-3 py-2 text-black border-black"
            onChange={(e) =>
              setFormdata({ ...formdata, category: e.target.value })
            }
            value={formdata.category}
          >
            <option value="uncategorized">Select a category</option>
            <option value="shirt">Men's shirt</option>
            <option value="trouser">Men's trouser</option>
            <option value="shoes">Men's shoes</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="font-semibold">Update Brand : </label>
          <input
            onChange={handleChange}
            className="px-3 flex-grow py-2 border-black text-black rounded-md border"
            placeholder="product brand..."
            id="brand"
            type="text"
            value={formdata.brand}
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="font-semibold">Update Price : </label>
          <input
            onChange={handleChange}
            className="px-3 flex-grow py-2 text-black border-black rounded-md border"
            placeholder="product price..."
            id="price"
            type="number"
            value={formdata.price}
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="font-semibold">Update Stock : </label>
          <input
            onChange={handleChange}
            className="px-3 flex-grow py-2 border-black text-black rounded-md border"
            placeholder="product stock..."
            id="stock"
            type="number"
            value={formdata.stock}
          />
        </div>
        <button className="bg-yellow-400 hover:bg-yellow-500 py-2 rounded-md text-black">
          Update
        </button>
        {showError && <p className="text-white text-center">{showError}</p>}
      </form>
    </div>
  );
};

export default UpdateProduct;
