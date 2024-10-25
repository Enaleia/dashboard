import { Link } from '@tanstack/react-router'
import { X } from 'lucide-react'

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

export { NavMenu };