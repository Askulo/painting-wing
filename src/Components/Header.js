'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <div className="flex fixed items-center px-4 py-2 md:px-10 justify-between w-full z-10">
      {/* Left Side */}
      <div className="py-1">
        <Link href="/"    className="text-xl md:text-2xl   font-semibold tracking-widest">
          PAINTING WING
        </Link>
        <h4      className="text-xs md:text-sm font-medium tracking-wider">
          Let Satisfaction Prevail
        </h4>
      </div>

      {/* Right Side Logo */}
      <div>
        <Image src="/logo.png" width={110} height={80} alt="logo" />
      </div>
    </div>
  );
};

export default Header;
