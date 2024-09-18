import React, { useEffect, useState } from "react";
import Blogs from "../components/Blogs";
import axios from "axios";
import { Link } from "react-router-dom";
import Slider1 from "../assets/images/slider1.jpg";
import Slider2 from "../assets/images/slider2.jpg";
import Hero from "../assets/images/Hero.webp";


function Home() {
  const [posts, setPosts] = useState("");
  const [value, setvalue] = useState("blogs");
  const [relaod, setReload] = useState(false);

  const [numberPages, setNumberPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchPosts();
  }, [relaod, currentPage]);

  const fetchPosts = async () => {
    await axios
      .get(`http://localhost:3000/api/all?page=${currentPage}&limit=6`)
      .then((res) => {
        if (res.status == 200) {
          console.log(res.data);
          setPosts(res.data.allPosts);
          setNumberPages(Number(res.data.pages));
        }
      });
  };
  const handleReset = async () => {
    setReload(true);
    setCurrentPage(1);
  };

  console.log(currentPage);

  const handleSearch = (e) => {
    e.preventDefault();

    try {
      axios
        .post(`http://localhost:3000/api/post/serach?title=${value}`)
        .then((res) => {
          if (res.status == 200) {
            setPosts(res.data.posts);
            setReload(false);
            setNumberPages(0);
          }
        });
    } catch (error) {
      console.log("error in api");
    }
  };
  return (
    <>
    
      <section class="text-gray-600 body-font">
      <section class="">
    <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div class="mr-auto place-self-center lg:col-span-7">
            <h1 class="font-bold text-6xl py-10 text-black">Spare fixes cities’ outdated transport services </h1>
            <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">The company’s technology and approach have garnered the attention of investors who want to see Spare scale into new verticals and geographic regions. The company raised a $30 million ($42 million CAD) Series B round led by Inovia Capital, with participation from Kensington Capital and Nicola Wealth, TechCrunch has exclusively learned..</p>
            <a href="#" class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-black rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                Get started
                <svg class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </a>
            
        </div>
        <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
              <img src={Hero } alt="mockup" className="w-full object-contain " />
        </div>                
    </div>
</section>
</section>

      <section class="text-gray-600 body-font bg-gray-50">
        <div class="max-w-screen-xl px-5 py-10 mx-auto">
          <div className="flex justify-center">
            <h2 className="font-bold text-3xl py-10 text-black">
              {" "}
              Latest Articles
            </h2>
          </div>
          <div className="flex justify-end py-5">
            <div className="flex ">
              <form className="" onSubmit={handleSearch}>
                <div className="p-5">
                  <input
                    type="search"
                    onChange={(e) => setvalue(e.target.value)}
                    className=" mx-2 px-2 py-2 rounded  border "
                  />
                  <button className="border px-5 py-2">Search</button>
                  <button className="border mx-2 px-5 py-2" onClick={handleReset}>
                    reset posts
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1   ">
            {posts.length === 0
              ? "no post to show"
              : posts.map((p) => {
                  return (
                    <Blogs
                      data={p}
                      image={p.image}
                      title={p.title}
                      desc={p.description}
                    />
                  );
                })}
          </div>
        </div>
        <div className="flex  justify-center  py-10">
          <div className="flex flex-col">
            {numberPages == 1 ? (
              ""
            ) : (
              <div className="flex justify-center p-2">
                <p className="">
                  Showing <span className="font-bold">{currentPage} </span> of{" "}
                  <span className="font-bold"> {numberPages} </span>
                </p>
              </div>
            )}
            <div>
              {Array.from({ length: numberPages }, (_, index) => (
                <button
                  key={index + 1}
                  className="  border border-gray-200 px-5 hover:bg-yellow-200 active:bg-yellow-400 "
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
