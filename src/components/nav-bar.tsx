import { Link } from '@tanstack/react-router'
import { useState } from 'react';
import { Menu } from 'lucide-react'
import { NavMenu } from './nav-menu';
import { ArrowUpRight } from 'lucide-react';

const NavBar = () => {
	return (
		<div>
			<MobileNavBar />
			<DesktopNavBar />
		</div>
	);
};

const MobileNavBar = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false)
	return (
		<nav className='md:hidden flex justify-between p-6'>
      <Link
        to="/"
        activeProps={{
          className: 'font-bold',
        }}
        activeOptions={{ exact: true }}
      >
        Enaleia
      </Link>
      <Menu onClick={() => setIsMenuOpened(true)} />
      {isMenuOpened && <NavMenu closeMenu={() => setIsMenuOpened(false)} />}
    </nav>
  )
}

const DesktopNavBar = () => {
	return (
		<nav>
      <div className='hidden md:flex justify-between items-center'>
        <Link
          to="/"
          activeProps={{
            className: 'font-bold',
          }}
          activeOptions={{ exact: true }}
        >
          <div className='flex items-center gap-3'>
            <img className="size-10" src={"/hub-logo.svg"} alt="Enaleia Logo" />
            <p className='text-2xl'>ENALEIA Hub</p>
          </div>
        </Link>

        <div className='flex gap-8 font-extralight'>
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
            <div className='flex gap-1'>
              <p>Attestations</p>
              <ArrowUpRight strokeWidth={1}/>
            </div>
          </a>
        </div>
      </div>
    </nav>
  )
}

export { NavBar };