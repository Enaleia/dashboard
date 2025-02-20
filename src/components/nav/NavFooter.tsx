import { NavLogo } from './NavLogo'
import { NavLinks } from './NavLinks'

const GithubLink = () => {
  return (
    <a 
      href='https://github.com/Enaleia'
      target="_blank"
      rel="noopener noreferrer"
    >
      <img className="size-8" src={"/logos/gitHub_logo.png"} alt="github icon" />
    </a>
  )
}

const NavFooter = () => {
	return (
		<>
      <nav className='lg:hidden flex justify-between items-center m-auto px-8 pb-16'>
        <NavLogo showSubtitle={true}/>
        <GithubLink />
      </nav>

      <nav className='hidden lg:flex justify-between items-center m-auto pb-16 max-w-[1500px]'>
        <NavLogo showSubtitle={true}/>
        <NavLinks />
        <GithubLink />
      </nav>
		</>
	);
};

export { NavFooter }