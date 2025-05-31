"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function InductionForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [artworkFile, setArtworkFile] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const isArtist = watch("isArtist") === "Yes";

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const formData = new FormData();

      // Append fields to FormData
      formData.append("name", data.name);
      formData.append("whatsappNumber", data.whatsappNumber);
      formData.append("email", data.email);
      formData.append("branch", data.branch);
      formData.append("rollNumber", data.rollNumber);
      formData.append("isArtist", data.isArtist);
      formData.append("preferredTeam", data.preferredTeam);
      formData.append("qualities", data.qualities);
      formData.append("hobbies", data.hobbies);
      formData.append("weakness", data.weakness);
      formData.append("whySelect", data.whySelect);
      formData.append("queries", data.queries || "");

      // Conditional file append
      if (isArtist && artworkFile) {
        formData.append("artwork", artworkFile);
      }

      const response = await fetch("/api/submit-induction", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Submission failed");
      }

      const result = await response.json();

      toast.success(result.message || "Form submitted successfully!");

      // Add await to ensure navigation happens after success message
      await router.replace("/success");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(error.message || "Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) {
      setArtworkFile(e.target.files[0]);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)" },
    tap: { scale: 0.95 },
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br  bg-gray-300">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <motion.div
          initial={{ rotateX: 10, scale: 0.95, opacity: 0 }}
          animate={{ rotateX: 0, scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            perspective: "1000px",
            transformStyle: "preserve-3d",
          }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="bg-gradient-to-r to-[#d25c25] from-gray-300 p-8 flex justify-center items-center">
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-3xl font-bold text-white"
            >
              Induction Form
            </motion.h1>
          </div>

          <motion.div
            className="p-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Personal Details */}
              <motion.div variants={itemVariants}>
                <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
                  Personal Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#d25c25] focus:ring focus:ring-[#d25c25] focus:ring-opacity-50 transition-all duration-200"
                      {...register("name", { required: "Name is required" })}
                    />
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-sm text-[#d25c25] mt-1"
                      >
                        {errors.name.message}
                      </motion.p>
                    )}
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <label
                      htmlFor="whatsappNumber"
                      className="block text-sm font-medium text-gray-700"
                    >
                      WhatsApp Number
                    </label>
                    <input
                      id="whatsappNumber"
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#d25c25] focus:ring focus:ring-[#d25c25] focus:ring-opacity-50 transition-all duration-200"
                      {...register("whatsappNumber", {
                        required: "WhatsApp number is required",
                        pattern: {
                          value: /^\d{10,12}$/,
                          message: "Enter a valid phone number",
                        },
                      })}
                    />
                    {errors.whatsappNumber && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-sm text-[#d25c25] mt-1"
                      >
                        {errors.whatsappNumber.message}
                      </motion.p>
                    )}
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#d25c25] focus:ring focus:ring-[#d25c25] focus:ring-opacity-50 transition-all duration-200"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Enter a valid email address",
                        },
                      })}
                    />
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-sm text-[#d25c25] mt-1"
                      >
                        {errors.email.message}
                      </motion.p>
                    )}
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <label
                      htmlFor="branch"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Branch
                    </label>
                    <input
                      id="branch"
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#d25c25] focus:ring focus:ring-[#d25c25] focus:ring-opacity-50 transition-all duration-200"
                      {...register("branch", {
                        required: "Branch is required",
                      })}
                    />
                    {errors.branch && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-sm text-[#d25c25] mt-1"
                      >
                        {errors.branch.message}
                      </motion.p>
                    )}
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <label
                      htmlFor="rollNumber"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Roll Number
                    </label>
                    <input
                      id="rollNumber"
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#d25c25] focus:ring focus:ring-[#d25c25] focus:ring-opacity-50 transition-all duration-200"
                      {...register("rollNumber", {
                        required: "Roll number is required",
                      })}
                    />
                    {errors.rollNumber && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-sm text-[#d25c25] mt-1"
                      >
                        {errors.rollNumber.message}
                      </motion.p>
                    )}
                  </motion.div>
                </div>
              </motion.div>

              {/* Artist Information */}
              <motion.div variants={itemVariants}>
                <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
                  Artist Information
                </h2>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Are you an Artist?
                  </label>
                  <div className="flex space-x-6">
                    <motion.label
                      className="inline-flex items-center cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <input
                        type="radio"
                        value="Yes"
                        {...register("isArtist", {
                          required: "Please select an option",
                        })}
                        className="h-5 w-5 text-[#d25c25] focus:ring-[#d25c25]"
                      />
                      <span className="ml-2 text-gray-700">Yes</span>
                    </motion.label>
                    <motion.label
                      className="inline-flex items-center cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <input
                        type="radio"
                        value="No"
                        {...register("isArtist", {
                          required: "Please select an option",
                        })}
                        className="h-5 w-5 text-[#d25c25] focus:ring-[#d25c25]"
                      />
                      <span className="ml-2 text-gray-700">No</span>
                    </motion.label>
                  </div>
                  {errors.isArtist && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm text-[#d25c25] mt-1"
                    >
                      {errors.isArtist.message}
                    </motion.p>
                  )}
                </div>

                {isArtist && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label
                      htmlFor="artwork"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Upload your artwork
                    </label>
                    <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 transition-all hover:border-[#d25c25]">
                      <input
                        id="artwork"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <p className="mt-1 text-sm text-gray-600">
                          {artworkFile
                            ? `Selected: ${artworkFile.name}`
                            : "Click or drag file to upload"}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* Team Preferences */}
              <motion.div variants={itemVariants}>
                <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
                  Team Preferences
                </h2>
                <div className="mb-6">
                  <label
                    htmlFor="preferredTeam"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Which team do you prefer to join?
                  </label>
                  <select
                    id="preferredTeam"
                    {...register("preferredTeam", {
                      required: "Please select a team",
                    })}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#d25c25] focus:ring focus:ring-[#d25c25] focus:ring-opacity-50 transition-all duration-200"
                  >
                    <option value="">Select a team</option>
                    <option value="Artist">Artist</option>
                    <option value="Graphic Designer">Graphic Designer</option>
                    <option value="Content Writer">Content Writer</option>
                    <option value="Video Editor">Video Editor</option>
                    <option value="Management">Web Developer</option>
                  </select>
                  {errors.preferredTeam && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm text-[#d25c25] mt-1"
                    >
                      {errors.preferredTeam.message}
                    </motion.p>
                  )}
                </div>
              </motion.div>

              {/* Additional Info */}
              <motion.div variants={itemVariants}>
                <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
                  About You
                </h2>
                <div className="space-y-6">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <label
                      htmlFor="qualities"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Three qualities that define you
                    </label>
                    <textarea
                      id="qualities"
                      rows={3}
                      {...register("qualities", {
                        required: "Please mention your qualities",
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#d25c25] focus:ring focus:ring-[#d25c25] focus:ring-opacity-50 transition-all duration-200"
                    ></textarea>
                    {errors.qualities && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-sm text-[#d25c25] mt-1"
                      >
                        {errors.qualities.message}
                      </motion.p>
                    )}
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <label
                      htmlFor="hobbies"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Hobbies & Interests
                    </label>
                    <textarea
                      id="hobbies"
                      rows={3}
                      {...register("hobbies", {
                        required: "Please share your hobbies",
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#d25c25] focus:ring focus:ring-[#d25c25] focus:ring-opacity-50 transition-all duration-200"
                    ></textarea>
                    {errors.hobbies && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-sm text-[#d25c25] mt-1"
                      >
                        {errors.hobbies.message}
                      </motion.p>
                    )}
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <label
                      htmlFor="weakness"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Mention your weakness
                    </label>
                    <input
                      id="weakness"
                      type="text"
                      {...register("weakness", {
                        required: "Please mention your weakness",
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#d25c25] focus:ring focus:ring-[#d25c25] focus:ring-opacity-50 transition-all duration-200"
                    />
                    {errors.weakness && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-sm text-[#d25c25] mt-1"
                      >
                        {errors.weakness.message}
                      </motion.p>
                    )}
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <label
                      htmlFor="whySelect"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Why should we select you?
                    </label>
                    <textarea
                      id="whySelect"
                      rows={3}
                      {...register("whySelect", {
                        required: "Please explain why we should select you",
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#d25c25] focus:ring focus:ring-[#d25c25] focus:ring-opacity-50 transition-all duration-200"
                    ></textarea>
                    {errors.whySelect && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-sm text-[#d25c25] mt-1"
                      >
                        {errors.whySelect.message}
                      </motion.p>
                    )}
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <label
                      htmlFor="queries"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Any queries?
                    </label>
                    <textarea
                      id="queries"
                      rows={2}
                      {...register("queries")}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#d25c25] focus:ring focus:ring-[#d25c25] focus:ring-opacity-50 transition-all duration-200"
                    ></textarea>
                  </motion.div>
                </div>
              </motion.div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                className={`w-full py-4 px-6 font-semibold text-white rounded-lg transition duration-300 ${
                  isSubmitting
                    ? "bg-gray-400"
                    : "bg-gradient-to-r to-[#d25c25] from-gray-300"
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    <span>Submitting...</span>
                  </div>
                ) : (
                  "Submit Application"
                )}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
