import { NavLinks } from './links';
import { X } from 'lucide-react'

const NavMenu = ({ closeMenu }: { closeMenu: () => void }) => {
	return (
		<div className='fixed z-10 top-0 left-0 w-full h-full bg-black px-10 py-6'>
      <div className='flex flex-col gap-10 items-end text-white text-xl'>
        <X color="white" size={40} onClick={closeMenu}/>
        <NavLinks closeMenu={closeMenu}/>
      </div>
		</div>
	);
};

export { NavMenu };