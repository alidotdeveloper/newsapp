import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Single() {
  const token = localStorage.getItem("token");
  const [post, setPost] = useState("");
  const { id } = useParams();

  useEffect(() => {
    getPost();
  }, []);

  const getPost = async () => {
    await axios
      .get(`http://localhost:3000/api/post/id/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        setPost(res.data.findPost);
      });
  };

  return (
    <>

      <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto flex flex-col">
          <div class="lg:w-4/6 mx-auto">
            <div class="rounded-lg  overflow-hidden">
              <img
                alt="content"
                class=" object-cover object-top   w-full relative"
                style={{height: '450px'}}
                src={post.image}
              />
            </div>
            <div class="flex flex-col sm:flex-row mt-10">
                          <div class="sm:w-full sm:pl-8 sm:py-8   mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                          <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">{post.title}</h1>
                <p class="leading-relaxed text-lg mb-4">
                {post.description}
                </p>
                
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Single;
