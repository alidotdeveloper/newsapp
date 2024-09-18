import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/Context";
import axios from "axios";

function Sidebar({ model, setUpdatePost, editPost, setEditPost, updatePost, fav }) {
  const { user } = useContext(AuthContext);
  const [values, setvalues] = useState({
    title: editPost ? editPost.title : "",
    description: editPost ? editPost.description : "",
    postImage: editPost ? editPost.image : "",
  });

  const handleclose = () => {
    model(false);
    setEditPost("");
  };

  const token = localStorage.getItem("token");

  const handlesubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("userId", user);
    formData.append("postImage", values.postImage);

    if (editPost) {
      console.log(values);
      await axios
        .put(`http://localhost:3000/api/post/${editPost.id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res);
          model(false);
          setUpdatePost(!updatePost);
        })
        .catch((err) => console.log("error while getting post", err));
    } else {
      await axios
        .post("http://localhost:3000/api/post/add", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res);
          console.log("post created successfully");
          model(false);
          setUpdatePost(!updatePost);
        })
        .catch((err) => console.log("error while updating post", err));
    }
  };

  return (
    <>
      <div
        id="crud-modal"
        tabindex="-1"
        aria-hidden="true"
        class=" flex overflow-y-auto overflow-x-hidden fixed top-10 right-50 left-0 z-50 justify-center items-center w-full md:inset-0  max-h-full bg-[#696a6b] bg-opacity-35 "
      >
        <div class="relative p-4 w-full max-w-md max-h-full">
          <div class="relative bg-white rounded-lg shadow ">
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-black">
                Create New Post
              </h3>
              <button
                type="button"
                onClick={handleclose}
                class="text-black bg-transparentrounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                data-modal-toggle="crud-modal"
              >
                <svg
                  class="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>

            <form
              class="p-4 md:p-5"
              onSubmit={handlesubmit}
              action="POST"
              enctype="multipart/form-data"
            >
              <div class="grid gap-4 mb-4 grid-cols-2">
                <div class="col-span-2">
                  <label
                    for="name"
                    class="block mb-2 text-sm font-medium  dark:text-black"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    defaultValue={editPost ? editPost.title : ""}
                    onChange={(e) =>
                      setvalues({ ...values, title: e.target.value })
                    }
                    id="title"
                    class="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:focus:border-primary-500"
                    placeholder="Title "
                    required=""
                  />
                </div>
                <div class="col-span-2">
                  <label
                    for="name"
                    class="block mb-2 text-sm font-medium  dark:text-black"
                  >
                    Description
                  </label>
                  <textarea
                    type="text"
                     cols="30" 
                    rows="10"
                    name="description" 
                    defaultValue={editPost ? editPost.description : ""}
                    onChange={(e) =>
                      setvalues({ ...values, description: e.target.value })
                    }
                    id="name"
                    class="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:focus:border-primary-500"
                    placeholder="Description"
                    required=""
                  />
                </div>
                <div class="col-span-2">
                  <label
                    for="name"
                    class="block mb-2 text-sm font-medium  dark:text-black"
                  >
                    Uploads
                  </label>
                  {editPost ? (
                    <>
                      <img src={editPost?.image} className="p-2" />{" "}
                      <input
                        type="file"
                        name="postImage"
                        id="file"
                        onChange={(e) =>
                          setvalues({ ...values, postImage: e.target.files[0] })
                        }
                        defaultValue={editPost ? editPost.file : ""}
                        class="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:focus:border-primary-500"
                        required=""
                      />
                    </>
                  ) : (
                    <input
                      type="file"
                      name="postImage"
                      id="file"
                      onChange={(e) =>
                        setvalues({ ...values, postImage: e.target.files[0] })
                      }
                      defaultValue={editPost ? editPost.file : ""}
                      class="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:focus:border-primary-500"
                      required=""
                    />
                  )}
                </div>
              </div>
              <button
                type="submit"
                class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {editPost ? "Update" : "Add new Post"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
