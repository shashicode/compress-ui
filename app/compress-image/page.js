"use client";

import React, { useState } from "react";
import axios from "axios";
import Loader from "../../components/Loader";
import Head from "next/head";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function CompressImage() {
  const [file, setFile] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please provide an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    setLoading(true);
    try {
      const response = await axios.post(
        `${apiBaseUrl}/compress-image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "blob",
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            console.log(percentCompleted);
          },
        }
      );
      const imageUrl = URL.createObjectURL(response.data);
      setCompressedImage(imageUrl);
    } catch (error) {
      console.error("Error compressing image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 md:p-6">
      <Head>
        <title>Compress Image</title>
        <meta
          name="description"
          content="Compress your images to the maximum possible compressed size."
        />
      </Head>
      <h1 className="text-2xl font-bold mb-4 sm:text-3xl md:text-4xl">
        Compress Image
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center space-y-4 w-full max-w-md"
      >
        <div className="w-full">
          <label className="block mb-2">
            Upload Image:
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
              className="block w-full mt-1"
            />
          </label>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Compress
        </button>
      </form>
      {loading && <Loader />}
      {compressedImage && (
        <div className="mt-6 text-center">
          <h2 className="text-xl font-bold mb-4 sm:text-2xl md:text-3xl">
            Compressed Image:
          </h2>
          <img
            src={compressedImage}
            alt="Compressed"
            className="max-w-full h-auto mb-4"
          />
          <a href={compressedImage} download="compressed-image">
            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              Download
            </button>
          </a>
        </div>
      )}
    </div>
  );
}
