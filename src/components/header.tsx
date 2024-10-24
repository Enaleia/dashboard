import { Link } from '@tanstack/react-router'
import { useState } from 'react';
import { Menu, X } from 'lucide-react'

const NavBar = () => {
	return (
		<div>
			<MobileNavBar />
			<DesktopNavBar />
		</div>
	);
};

const NavMenu = ({ closeMenu }: { closeMenu: () => void }) => {
	return (
		<div className='fixed z-3 top-0 left-0 w-full h-full bg-black opacity-80 px-10 py-16'>
      <div className='flex flex-col gap-8 items-end text-white text-xl'>
        <X color="white" size={40} onClick={closeMenu}/>
        <div>
          <Link
            to="/locations"
            onClick={closeMenu}
            activeProps={{
              className: 'font-bold',
            }}
          >
            Locations
          </Link>
        </div>
        <div>
          <Link
            to="/vessels"
            onClick={closeMenu}
            activeProps={{
              className: 'font-bold',
            }}
          >
            Vessels
          </Link>
        </div>
        <div>
          <Link
            to="/economy"
            onClick={closeMenu}
            activeProps={{
              className: 'font-bold',
            }}
          >
            Circular Economy
          </Link>
        </div>
        <div>
          <Link
            to="/about"
            onClick={closeMenu}
            activeProps={{
              className: 'font-bold',
            }}
          >
            About
          </Link>
        </div>
        <div>
          <a 
            onClick={closeMenu}
            href='https://optimism.easscan.org/'
            target="_blank"
            rel="noopener noreferrer"
          >
            EAS Explorer ↗️
          </a>
        </div>
      </div>
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
      <div className='hidden md:flex justify-between p-10'>
        <div className=''>
          <Link
            to="/"
            activeProps={{
              className: 'font-bold',
            }}
            activeOptions={{ exact: true }}
          >
            Enaleia
          </Link>
        </div>
        <div className='flex gap-16'>
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
            EAS Explorer ↗️
          </a>
        </div>
      </div>
      <hr/>
    </nav>
  )
}

export { NavBar };