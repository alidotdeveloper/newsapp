import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/Context";

function Favourite() {
  const token = localStorage.getItem("token");
  const { user } = useContext(AuthContext);
  const [fav, setFav] = useState("");

  useEffect(() => {
    getAllFavourites();
  }, []);
console.log(user)
  const getAllFavourites = async () => {
    await axios.get(`http://localhost:3000/api/favourite/${user}`, { headers: { Authorization: `Bearer ${token}` } }
    ).then((res) => {
      console.log(res);
      setFav(res.data.getPosts);
    });
  };

  const handleDelete = async(p) => {
    console.log(p);
    try {
      const data = await axios.delete(`http://localhost:3000/api/favourite/${p.id}`, p, { headers: { Authorization: `Bearer ${token}` } });
      if (!data) {
        console.log("erro while fetching");
      }
      getAllFavourites();
      console.log("delete successfully")
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <section class="text-gray-600 body-font bg-gray-50 h-screen  ">
        <div class="max-w-screen-xl px-5 py-10  mx-auto">
          <div className="flex justify-center">
            <h2 className="font-bold text-3xl py-5 text-black">
              {" "}
              Your Favourite Items
            </h2>
          </div>

          {fav.length === 0 ? (
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
                {fav.map((p) => {
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

                        <td class="px-6 py-4">
                          <Link
                            href="#"
                            class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            onClick={() => handleDelete(p)}
                          >
                            Delete
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Favourite;
