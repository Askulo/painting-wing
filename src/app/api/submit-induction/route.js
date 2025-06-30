// src/app/api/submit-induction/route.js
import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import cloudinary from "@/lib/cloudinary";

export async function POST(request) {
  try {
    const formData = await request.formData();

    const name = formData.get("name");
    const whatsappNumber = formData.get("whatsappNumber");
    const email = formData.get("email");
    const branch = formData.get("branch");
    const rollNumber = formData.get("rollNumber");
    const isArtist = formData.get("isArtist");
    const preferredTeam = formData.get("preferredTeam");
    const qualities = formData.get("qualities");
    const hobbies = formData.get("hobbies");
    const weakness = formData.get("weakness");
    const whySelect = formData.get("whySelect");
    const queries = formData.get("queries");

    // Required field check
    if (
      !name ||
      !whatsappNumber ||
      !email ||
      !branch ||
      !rollNumber ||
      !preferredTeam
    ) {
      console.error("Missing required fields:", {
        name,
        whatsappNumber,
        email,
        branch,
        rollNumber,
        preferredTeam,
      });

      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Optional artwork upload
    const artworkFile = formData.get("artwork");
    let artworkCloudinaryUrl = null;

    if (artworkFile && artworkFile.size > 0) {
      try {
        const arrayBuffer = await artworkFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                folder: "induction-artworks",
                resource_type: "auto",
              },
              (error, result) => {
                if (error) {
                  console.error("Cloudinary upload error:", error);
                  reject(error);
                } else {
                  resolve(result);
                }
              }
            )
            .end(buffer);
        });

        artworkCloudinaryUrl = uploadResult.secure_url;
      } catch (uploadError) {
        console.error("Failed to upload artwork:", uploadError);
      }
    }

    // MongoDB connection
    console.log("Connecting to MongoDB...");
    console.log("MONGODB_URI:", process.env.MONGODB_URI);

    if (!process.env.MONGODB_URI || !process.env.MONGODB_DB) {
      throw new Error("Missing MongoDB environment variables");
    }

    const client = await MongoClient.connect(process.env.MONGODB_URI, {});
    const db = client.db(process.env.MONGODB_DB);
    console.log("Connected to MongoDB");

    const submissionData = {
      name,
      whatsappNumber,
      email,
      branch,
      rollNumber,
      isArtist,
      preferredTeam,
      qualities,
      hobbies,
      weakness,
      whySelect,
      queries: queries || "",
      artworkPath: artworkCloudinaryUrl,
      submittedAt: new Date(),
    };

    await db.collection("Inducties").insertOne(submissionData);
    await client.close();

    const response = NextResponse.json(
      { message: "Form submitted successfully" },
      { status: 200 }
    );

    response.headers.set("X-Form-Submit-Success", "true");
    return response;
  } catch (error) {
    console.error("Error submitting form:", error.message);
    console.error(error.stack); // Full stack trace for deployment logs

    return NextResponse.json(
      { message: "Failed to submit form", error: error.message },
      { status: 500 }
    );
  }
}
