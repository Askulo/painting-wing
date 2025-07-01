"use client";
import React, { useRef } from "react";

const cloudName = "dk3wehfrd";
const uploadPreset = "Direct_browser_upload";
const scriptURL = "https://script.google.com/macros/s/AKfycbxUHQxlklfBkdvKrMjMBoCVMiET7qtpx_SHScE5Uknams2Y6WvCKC_3ErkYOGOddqQr/exec";

export default function CloudinaryForm() {
  const formRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const file = fileInputRef.current.files[0];
    const name = formRef.current.name.value;
    const email = formRef.current.email.value;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    // Upload to Cloudinary
    const cloudinaryResponse = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
      method: "POST",
      body: formData
    });

    const cloudinaryData = await cloudinaryResponse.json();
    const fileUrl = cloudinaryData.secure_url;

    // Send to Google Apps Script Web App
    await fetch(scriptURL, {
      method: 'POST',
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ name, email, fileUrl })
    });

    alert("Form submitted successfully!");
  };

  return (
    <>
      <form id="inductionForm" ref={formRef} onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Your Name" required /><br/>
        <input type="email" name="email" placeholder="Your Email" required /><br/>
        <input type="file" id="fileInput" ref={fileInputRef} required /><br/>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
