import { Link } from "@tanstack/react-router"
import { ArrowUpRight } from "lucide-react"
import { useMediaQuery } from "@/hooks/ui/useMediaQuery"
import { DESKTOP_BREAKPOINT } from "@/config/constants"


interface NavLinksProps {
  closeMenu?: (closeMenu: boolean) => void;
}

const NavLinks = ({ closeMenu }: NavLinksProps) => {
  const isDesktop = useMediaQuery(DESKTOP_BREAKPOINT)

  return (
    <div className='flex flex-col lg:flex-row gap-6 text-right lg:text-center md:gap-8 text-2xl md:text-3xl lg:text-base font-extralight'>
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
        Collectors
      </Link>
      {/* save for future release */}
      {/* <Link
        to="/economy"
        onClick={() => closeMenu && closeMenu(true)}
        activeProps={{
          className: 'font-bold',
        }}
      >
        Circular Economy
      </Link> */}
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
