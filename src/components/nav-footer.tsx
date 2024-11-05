import { NavLogo } from './nav-logo'
import { NavLinks } from './nav-links'

const GithubLink = () => {
  return (
    <a 
      href='https://github.com/Enaleia'
      target="_blank"
      rel="noopener noreferrer"
    >
      <img className="size-8" src={"/gitHub_icon.png"} alt="github icon" />
    </a>
  )
}

const NavFooter = () => {
	return (
		<>
      <nav className='md:hidden flex justify-between items-center m-auto px-10 pb-24'>
        <NavLogo showSubtitle={true}/>
        <GithubLink />
      </nav>
      <nav className='hidden md:flex justify-between items-center m-auto px-16 pb-24 max-w-[1500px]'>
        <NavLogo showSubtitle={true}/>
        <NavLinks />
        <GithubLink />
      </nav>
		</>
	);
};

export { NavFooter };