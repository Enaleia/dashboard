import { Link } from "@tanstack/react-router"
import { ArrowUpRight } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"

interface NavLinksProps {
  closeMenu?: (closeMenu: boolean) => void;
}

const NavLinks = ({ closeMenu }: NavLinksProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)")

  return (
    <div className='flex flex-col md:flex-row gap-6 text-right md:text-center md:gap-8 text-2xl md:text-base font-extralight'>
      {!isDesktop && 
        <Link
          to="/"
          onClick={() => closeMenu && closeMenu(true)}
          activeProps={{
            className: 'font-bold',
          }}
        >
          Home
        </Link>
      }
      <Link
        to="/locations"
        onClick={() => closeMenu && closeMenu(true)}
        activeProps={{
          className: 'font-bold',
        }}
      >
        Locations
      </Link>
      <Link
        to="/vessels"
        onClick={() => closeMenu && closeMenu(true)}
        activeProps={{
          className: 'font-bold',
        }}
      >
        Vessels
      </Link>
      <Link
        to="/economy"
        onClick={() => closeMenu && closeMenu(true)}
        activeProps={{
          className: 'font-bold',
        }}
      >
        Circular Economy
      </Link>
      <Link
        to="/about"
        onClick={() => closeMenu && closeMenu(true)}
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
        onClick={() => closeMenu && closeMenu(true)}
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
