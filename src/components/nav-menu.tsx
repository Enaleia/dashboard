import { NavLinks } from './nav-links';
import { X } from 'lucide-react'

const NavMenu = ({ closeMenu }: { closeMenu: () => void }) => {
	return (
		<div className='fixed z-3 top-0 left-0 w-full h-full bg-black opacity-80 px-10 py-16'>
      <div className='flex flex-col gap-8 items-end text-white text-xl'>
        <X color="white" size={40} onClick={closeMenu}/>
        <NavLinks />
      </div>
		</div>
	);
};

export { NavMenu };