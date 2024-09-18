import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/Context";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";

function Posts() {
  const { user, role } = useContext(AuthContext);
  const [model, setModel] = useState(false);
  const [posts, setposts] = useState("");
  const [edit, setEdit] = useState("");
  const [fav, setFav] = useState("");
  const token = localStorage.getItem("token");

  const [updatePost, setUpdatePost] = useState(false);

  useEffect(() => {
    fetchposts();
  }, [updatePost]);

  const fetchposts = async () => {
    if (role == "admin") {
      axios
        .get(`http://localhost:3000/api/all`)
        .then((res) => {
          console.log(res);
          setposts(res.data.allPosts);
        })
        .catch((err) => console.log("error while getting post", err));
      
    } else {
      axios
        .get(`http://localhost:3000/api/post/${user}`)
        .then((res) => {
          console.log(res);
          setposts(res.data.userInfo.posts);
        })
        .catch((err) => console.log("error while getting post"));
    };
  }
  const handleAdd = () => {
    setModel(true);
    setUpdatePost(false);
  };

  const handleEdit = (p) => {
    setEdit(p);
    setModel(true);
  };
  const handleDelete = async (id) => {
    axios
      .delete(`http://localhost:3000/api/post/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setUpdatePost(!updatePost);
      })
      .catch((err) => console.log("error while getting post", err));
  };

  return (
    <>
      {model ? (
        <Sidebar
          model={setModel}
          setUpdatePost={setUpdatePost}
          editPost={edit}
          setEditPost={setEdit}
          updatePost={updatePost}
        />
      ) : (
        <section class="text-gray-600 body-font bg-gray-50 md:h-screen  ">
          <div class="max-w-screen-xl px-5 py-10  mx-auto">
            <div>
              <div className="flex justify-center">
                <h2 className="font-bold text-3xl py-5 text-black">
                  {" "}
                  Your Posts
                </h2>
              </div>
              <div className="flex justify-end p-2 ">
                <button
                  className="bg-blue-700 p-3 text-white rounded"
                  onClick={() => handleAdd()}
                >
                  Add Post
                </button>
              </div>
              {posts.length === 0 ? (
                "no posts"
              ) : (
                <div class=" overflow-x-auto shadow-md sm:rounded-lg">
                  <table class="w-full text-sm text-left rtl:text-right text-black dark:text-gray-400 ">
                    <thead class="text-xs text-black uppercase bg-gray-50  dark:bg-white-100 border dark:text-gray-400">
                      <tr>
                        <th scope="col" class="px-6 py-3">
                          Post Image
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Post title
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Description
                        </th>

                        <th scope="col" class="px-6 py-3">
                          Action
                        </th>
                      </tr>
                    </thead>
                    {posts.map((p) => {
                      return (
                        <tbody>
                          <tr class="bg-white border-b text-black ">
                            <th
                              scope="row"
                              class="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-black"
                            >
                              <img src={p.image} width={100} alt="img"></img>
                            </th>
                            <td class="px-6 py-4">{p.title}</td>
                            <td class="px-6 py-4">{p.description}</td>

                            <td class="px-6 py-4 flex">
                              {role != "admin" &&
                                <button
                                  onClick={() => handleEdit(p)}
                                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline p-2"
                                >
                                  Edit
                                </button>
                              }
                              <button
                                onClick={() => handleDelete(p.id)}
                                class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      );
                    })}
                  </table>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Posts;
