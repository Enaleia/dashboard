import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

const NavLinks = () => {
  return (
    <div className='flex flex-col md:flex-row gap-6 text-right md:text-center md:gap-8 text-2xl md:text-base font-extralight'>
      <Link
        to="/locations"
        activeProps={{
          className: 'font-bold',
        }}
      >
        Locations
      </Link>
      <Link
        to="/vessels"
        activeProps={{
          className: 'font-bold',
        }}
      >
        Vessels
      </Link>
      <Link
        to="/economy"
        activeProps={{
          className: 'font-bold',
        }}
      >
        Circular Economy
      </Link>
      <Link
        to="/about"
        activeProps={{
          className: 'font-bold',
        }}
      >
        About
      </Link>
      <a 
        href='https://optimism.easscan.org/'
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className='flex gap-1 justify-end'>
          <p>Attestations</p>
          <ArrowUpRight strokeWidth={1}/>
        </div>
      </a>
    </div>
  )
}

export { NavLinks };
