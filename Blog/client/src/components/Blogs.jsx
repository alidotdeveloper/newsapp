import React, { useContext, useEffect, useRef, useState } from "react";
import Heart from "../assets/images/heart.png";
import { AuthContext } from "../Context/Context";
import axios from "axios";
import Single from "../pages/Single";
import { useNavigate } from "react-router-dom";

function Blogs({ title, image, desc, data }) {
  const ref = useRef();
  const { user, Auth, role } = useContext(AuthContext);
  const postId = data.id;
  const PostData = { postId, user };
  console.log(data, user);
  const [fav, setFav] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (user) {
      getAllFavourites();
    }
  }, [user]);
  const getAllFavourites = async () => {
    await axios
      .get(`http://localhost:3000/api/favourite/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        setFav(res.data.getPosts);
      });
  };

  useEffect(() => {
    if (user) {
      const isFavourite = fav.some((f) => f.id == data.id);
      if (isFavourite && ref.current) {
        ref.current.style.filter =
          "invert(36%) sepia(83%) saturate(4581%) hue-rotate(332deg) brightness(94%) contrast(101%)";
      }
    }
  }, [fav]);

  const handleHeart = (e) => {
    const checkfavourite = e.target.style.filter;

    if (!checkfavourite) {
      e.target.style.filter = "grayscale(0%)";
      e.target.style.filter =
        "invert(36%) sepia(83%) saturate(4581%) hue-rotate(332deg) brightness(94%) contrast(101%)";
      addFav();
    } else {
      e.target.style.filter = "";
      removeFav(postId);
    }
  };
  const addFav = () => {
    axios
      .post("http://localhost:3000/api/favourite", PostData, {
        headers: {
          Authorization: ` bearer ${token}`,
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log("eeror while catching ", err));
  };
  const removeFav = (postId) => {
    axios
      .delete(`http://localhost:3000/api/favourite/${postId}`, PostData, {
        headers: {
          Authorization: ` bearer ${token}`,
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log("eeror while catching ", err));
  };
  const handlesingle = () => {
    navigate(`/post/${data.id}`);
  };

  return (
    <>
      <div class=" justify-center sm:mb-0 border  md:mb-5  ml-5" key={data.id}>
        <button>
          {user && role != "admin" && (
            <div className="flex justify-end -mb-6 py-1 px-1" style={{ zIndex: 999, position: 'relative',  }}>
              <img
                ref={ref}
                src={Heart}
                width={25}
                className="p-0.5 "
                onClick={handleHeart}
              />
            </div>
          )}
          <button onClick={handlesingle}>
            <div
              class="rounded-lg h-64 overflow-hiddenv "
              role="presentation"
            >
              <img
                alt="content"
                class="object-cover object-center h-full w-full -mt-2"
                src={image}
              />
            </div>
            <h2 class="text-xl font-medium title-font text-gray-900 mt-5">
              {title}
            </h2>
            <p class="text-base leading-relaxed mt-2 mb-2 mx-2">{
              
              desc.length > 80 ? desc.slice(0,190)+"..." : desc
            
            
            }</p>
          </button>
          <div></div>
        </button>
      </div>
    </>
  );
}

export default Blogs;
