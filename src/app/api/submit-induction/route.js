// src/app/api/submit-induction/route.js
import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { writeFile } from "fs/promises";
import path from "path";
import { mkdir } from "fs/promises";

export async function POST(request) {
  try {
    // Parse the form data from the request
    const formData = await request.formData();

    // Extract form fields
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

    // Check for required fields
    if (
      !name ||
      !whatsappNumber ||
      !email ||
      !branch ||
      !rollNumber ||
      !preferredTeam
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Process artwork file if exists
    const artworkFile = formData.get("artwork");
    let artworkPath = null;

    if (artworkFile && artworkFile.size > 0) {
      const uploadsDir = path.join(process.cwd(), "public/uploads");

      // Create uploads directory if it doesn't exist
      try {
        await mkdir(uploadsDir, { recursive: true });
      } catch (error) {
        console.error("Failed to create uploads directory:", error);
      }

      // Generate unique filename
      const fileExtension = artworkFile.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 15)}.${fileExtension}`;
      const filePath = path.join(uploadsDir, fileName);

      // Write file to disk
      const fileBuffer = Buffer.from(await artworkFile.arrayBuffer());
      await writeFile(filePath, fileBuffer);

      // Store relative path for database
      artworkPath = `/uploads/${fileName}`;
    }

    console.log("Connecting to MongoDB...");
    const client = await MongoClient.connect(process.env.MONGODB_URI, {});
    console.log("Connected to MongoDB");
    const db = client.db(process.env.MONGODB_DB);

    // Prepare data for MongoDB insertion
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
      artworkPath,
      submittedAt: new Date(),
    };

    // Insert data into MongoDB
    await db.collection("Inducties").insertOne(submissionData);

    // Close MongoDB connection
    await client.close();

    const response = NextResponse.json(
      {
        message: "Form submitted successfully",
      },
      { status: 200 }
    );

    // Set a custom header to validate success page access
    response.headers.set("X-Form-Submit-Success", "true");

    return response;
  } catch (error) {
    console.error("Error submitting form:", error);

    return NextResponse.json(
      {
        message: "Failed to submit form",
      },
      { status: 500 }
    );
  }
}
