import React, { useState } from 'react'
import axios from 'axios';
import { useForm } from "react-hook-form";


function Contact() {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

   
    const handleOnSubmit = async (data) => {
       
     
        try {
          const response = await axios.post('http://localhost:3000/api/contact', data, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          if (response.status === 200) {
            alert('Message sent successfully!');
          } else {
            alert('Failed to send message.');
          }
        } catch (error) {
          alert('Error occurred: ' + error.message);
        }
      };
  return (
    <>
    <section class="bg-white pt-20 ">
  <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md border bg-yellow-300 ">
      <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-black dark:text-black">Contact Us</h2>
      <p class="mb-8 lg:mb-16 font-light text-center text-black  sm:text-xl">Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.</p>
      <form action="#" class="space-y-8 " onSubmit={handleSubmit(handleOnSubmit)}>
          <div>
              <label for="email" class="block mb-2 text-sm font-medium text-black ">Your email</label>
              <input type="email" {...register("email", {
                      required: { value: true, message: "email is required" },
                    })} id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="" required/>
          </div>
          <div class="sm:col-span-2">
              <label for="message"  class="block mb-2 text-sm font-medium text-black ">Your message</label>
              <textarea id="message" {...register("message", {
                      required: { value: true, message: "message is required" },
                    })} rows="6" class="block p-2.5 w-full text-sm text-black bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500  dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder=""></textarea>
          </div>
          <button type="submit" class="py-3 px-5 text-sm font-medium text-center  rounded-lg bg-black text-white sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Send message</button>
      </form>
  </div>
</section>
    </>
  )
}

export default Contact