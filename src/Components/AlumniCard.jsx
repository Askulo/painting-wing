"use client";

import Atropos from "atropos/react";
import "atropos/css";
import { FaTwitter, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";

export default function AlumniCard({
  name,
  image,
  position,
  quote,
  twitter,
  linkedin,
  instagram,
  email,
}) {
  return (
    <div className="flex flex-col items-center w-full max-w-[300px] mx-auto my-4 group">
      <Atropos
        className="w-full h-96 rounded-xl overflow-hidden cursor-pointer"
        activeOffset={40}
        shadowScale={1.05}
        rotateXMax={15}
        rotateYMax={15}
        highlight={true}
      >
        {/* Background image with gradient overlay */}
        <div className="relative w-full h-full">
          <img
            src={image}
            alt={`${name}'s profile`}
            className="absolute w-full h-full object-cover"
            data-atropos-offset="-5"
          />

          {/* Gradient overlay with depth - now transitions on hover */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/0 via-black/0 to-transparent transition-all duration-300 ease-in-out group-hover:from-black/80 group-hover:via-black/40"
            data-atropos-offset="-3"
          />

          {/* Content container with depth effect - now transitions on hover */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 text-white opacity-0 transform translate-y-4 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-y-0">
            {/* Name with strong depth effect */}
            <h2
              className="text-2xl font-bold mb-2 text-center transform transition-all"
              data-atropos-offset="8"
            >
              {name}
            </h2>

            {/* Position with medium depth effect */}
            <h3
              className="text-sm text-gray-300 mb-1 text-center"
              data-atropos-offset="5"
            >
              {position}
            </h3>

            {/* Quote with subtle depth effect */}
            {quote && (
              <p
                className="text-sm italic text-gray-300 mb-1 text-center"
                data-atropos-offset="3"
              >
                "{quote}"
              </p>
            )}

            {/* Social icons with hovering depth effect */}
            <div
              className="flex justify-center gap-4 mt-1"
              data-atropos-offset="6"
            >
              {twitter && (
                <a
                  href={twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-orange-400 transition-all transform hover:scale-110"
                  data-atropos-offset="9"
                >
                  <FaTwitter size={20} />
                </a>
              )}
              {linkedin && (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-orange-400 transition-all transform hover:scale-110"
                  data-atropos-offset="9"
                >
                  <FaLinkedin size={20} />
                </a>
              )}
              {instagram && (
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-orange-400 transition-all transform hover:scale-110"
                  data-atropos-offset="9"
                >
                  <FaInstagram size={20} />
                </a>
              )}
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="text-white hover:text-orange-400 transition-all transform hover:scale-110"
                  data-atropos-offset="9"
                >
                  <FaEnvelope size={20} />
                </a>
              )}
            </div>

            {/* Decorative element with extreme depth for visual flair */}
            <div
              className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 opacity-0 transition-opacity duration-300 group-hover:opacity-80"
              data-atropos-offset="12"
            />
          </div>
        </div>
      </Atropos>
    </div>
  );
}