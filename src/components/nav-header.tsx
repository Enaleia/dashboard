import { useState } from 'react'
import { NavLogo } from './nav-logo'
import { NavLinks } from './nav-links'
import { NavMenu } from './nav-menu'
import { Menu } from 'lucide-react'

const NavHeader = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false)
	return (
		<>
      <nav className='md:hidden flex justify-between items-center m-4 mb-0 border border-black rounded-full px-8 py-3'>
        <NavLogo showSubtitle={false}/>
        <Menu onClick={() => setIsMenuOpened(true)} />
        {isMenuOpened && <NavMenu closeMenu={() => setIsMenuOpened(false)} />}
      </nav>
      <nav className='px-16 py-8'>
        <div className='hidden md:flex justify-between items-center m-auto border border-black rounded-full px-14 py-4 max-w-[1400px]'>
          <NavLogo showSubtitle={false}/>
          <NavLinks />
      </div>
      </nav>
		</>
	);
};

export { NavHeader };
