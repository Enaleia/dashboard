import { Link } from '@tanstack/react-router'

const NavBar = () => {
	return (
		<div className="">
			<MobileNavBar />
			<DesktopNavBar />
		</div>
	);
};

const MobileNavBar = () => {
	return (
		<nav className='md:hidden'>
      
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
          </Link>{' '}
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