import React, { useEffect, useReducer, useState } from "react";
import "./add.scss";
import { useNavigate } from "react-router-dom";
import { INITIAL_STATE, gigReducer } from "../../reducer/gigReducer";
import upload from "../../utils/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const Add = () => {
  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);
  const [singleFile, setSingleFile] = useState("");
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  useEffect(() => {
    (!currentUser || !currentUser?.isSeller) && navigate("/");
  }, [currentUser]);

  console.log(state);
  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleFeatures = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_FEATURES",
      payload: e.target[0].value,
    });
    e.target[0].value = "";
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      const cover = await upload(singleFile);
      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file); //fileList to Array => [...files]
          return url;
        })
      );
      setUploading(false);
      dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
    } catch (err) {
      console.log(err);
    }
  };
  const mutation = useMutation({
    mutationFn: (gigs) => {
      return newRequest.post("/gigs/", gigs);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(state);
    navigate("/myGigs");
  };
  return (
    <div className="add">
      <div className="container">
        <h1>Add New Gig</h1>
        <div className="sections">
          <div className="left">
            <label htmlFor="">Title</label>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              placeholder="e.g. I will do something I'm really good at"
            />
            <label htmlFor="">Category</label>
            <select name="cat" id="cats" onChange={handleChange} required>
              <option value=""></option>
              <option value="AI Artists">AI Artists</option>
              <option value="Logo Design">Logo Design</option>
              <option value="WordPress">WordPress</option>
              <option value="Voice Over">Voice Over</option>
              <option value="Video Explainer">Video Explainer</option>
              <option value="Social Media">Social Media</option>
              <option value="SEO">SEO</option>
              <option value="Illustration">Illustration</option>
            </select>
            <div className="images">
              <div className="imagesInput">
                <label htmlFor="">Cover Image</label>
                <input
                  type="file"
                  name="cover"
                  onChange={(e) => setSingleFile(e.target.files[0])}
                />
                <label htmlFor="">Upload Images</label>
                <input
                  type="file"
                  multiple
                  name="images"
                  onChange={(e) => setFiles(e.target.files)}
                />
              </div>
              <button onClick={handleUpload}>
                {uploading ? "Uploading" : "Upload"}
              </button>
            </div>
            <label htmlFor="">Description</label>
            <textarea
              name="desc"
              id=""
              cols="30"
              rows="16"
              onChange={handleChange}
              placeholder="Brief description to introduce your service to customers"
            ></textarea>
            <button onClick={handleSubmit}>Create</button>
          </div>
          <div className="right">
            <label htmlFor="">Service Title</label>
            <input
              type="text"
              name="shortTitle"
              onChange={handleChange}
              placeholder="e.g. One-page web design"
            />
            <label htmlFor="">Short Description</label>
            <textarea
              name="shortDesc"
              id=""
              cols="30"
              rows="10"
              onChange={handleChange}
              placeholder="Short description of your service"
            ></textarea>
            <label htmlFor="">Delivery Time(e.g. 3 days)</label>
            <input
              type="number"
              min={1}
              name="deliveryTime"
              onChange={handleChange}
            />
            <label htmlFor="">Revision Number</label>
            <input
              type="number"
              min={1}
              name="revisionNumber"
              onChange={handleChange}
            />
            <label htmlFor="">Add features</label>
            <form onSubmit={handleFeatures} className="addForm">
              <input
                type="text"
                placeholder="e.g. page design, file uploading, setting up a domain, hosting"
                name="features"
              />
              <button type="submit" className="addButton">
                Add
              </button>
            </form>
            <div className="addedFeatures">
              {state?.features?.map((feature) => (
                <div className="item" key={feature}>
                  <button
                    onClick={() =>
                      dispatch({ type: "REMOVE_FEATURE", payload: feature })
                    }
                  >
                    {feature} <span>X</span>
                  </button>
                </div>
              ))}
            </div>
            {/* <input type="text" placeholder="e.g. file uploading" />
            <input type="text" placeholder="e.g. setting up a domain" />
            <input type="text" placeholder="e.g. hosting" /> */}
            <label htmlFor="">Price</label>
            <input type="number" onChange={handleChange} min={1} name="price" />
            <label htmlFor="">Sales</label>
            <input type="number" onChange={handleChange} min={1} name="sales" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
