"use client";

import React, { useState } from "react";
import axios from "axios";
import Loader from "../../components/Loader";
import Head from "next/head";
import { FiFile } from "react-icons/fi";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function CompressPDF() {
  const [file, setFile] = useState(null);
  const [grayscale, setGrayscale] = useState(false);
  const [compressedPDF, setCompressedPDF] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleGrayscaleChange = (e) => {
    setGrayscale(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please provide a PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", file);
    formData.append("grayscale", grayscale ? "true" : "false");

    console.log("Form data prepared:");
    console.log(file);
    console.log(`Grayscale: ${grayscale ? "true" : "false"}`);

    setLoading(true);
    try {
      const response = await axios.post(
        `${apiBaseUrl}/compress-pdf`,
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
            console.log(`Upload progress: ${percentCompleted}%`);
          },
        }
      );
      const pdfUrl = URL.createObjectURL(response.data);
      setCompressedPDF(pdfUrl);
    } catch (error) {
      console.error("Error compressing PDF:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 md:p-6">
      <Head>
        <title>Compress PDF</title>
        <meta
          name="description"
          content="Compress your PDF files to a desired size."
        />
      </Head>
      <h1 className="text-2xl font-bold mb-4 sm:text-3xl md:text-4xl">
        Compress PDF
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center space-y-4 w-full max-w-md"
      >
        <div className="w-full">
          <label className="block mb-2">
            Upload PDF:
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              required
              className="block w-full mt-1"
            />
          </label>
        </div>
        <div className="w-full">
          <label className="block mb-2">
            Convert to Grayscale:
            <input
              type="checkbox"
              checked={grayscale}
              onChange={handleGrayscaleChange}
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
      {compressedPDF && (
        <div className="mt-6 text-center">
          <h2 className="text-xl font-bold mb-4 sm:text-2xl md:text-3xl">
            Compressed PDF:
          </h2>
          <a href={compressedPDF} download="compressed-pdf">
            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center">
              <FiFile className="mr-2" />
              Download
            </button>
          </a>
        </div>
      )}
    </div>
  );
}
