import { NavLogo } from './NavLogo'
import { NavLinks } from './NavLinks'

/**
 * GithubLink - Component for the GitHub repository link
 * 
 * Renders a link to the project's GitHub repository with the GitHub logo.
 * The link opens in a new tab with proper security attributes.
 */
const GithubLink = () => {
  return (
    <a 
      href='https://github.com/Enaleia'
      target="_blank"
      rel="noopener noreferrer"
    >
      <img 
        className="size-8" 
        src={"/logos/gitHub_logo.png"} 
        alt="github icon" 
        loading="lazy" 
      />
    </a>
  )
}

/**
 * NavFooter - Footer navigation component for the application
 * 
 * Provides responsive footer navigation with different layouts for mobile and desktop:
 * - Mobile: Shows logo with subtitle and GitHub link
 * - Desktop: Shows logo with subtitle, navigation links, and GitHub link
 * 
 * Similar to NavHeader, this component uses Tailwind's responsive classes
 * for conditional rendering based on screen size.
 */
const NavFooter = () => {
	return (
		<>
      {/* Mobile Footer Navigation - Only visible on small screens (below lg breakpoint) */}
      <nav className='lg:hidden flex justify-between items-center m-auto px-8 pb-16'>
        {/* Logo component - showing subtitle in the footer for branding */}
        <NavLogo showSubtitle={true}/>
        {/* GitHub repository link */}
        <GithubLink />
      </nav>

      {/* Desktop Footer Navigation - Only visible on large screens (lg breakpoint and above) */}
      <nav className='hidden lg:flex justify-between items-center m-auto pb-16 max-w-[1500px]'>
        {/* Logo component with subtitle */}
        <NavLogo showSubtitle={true}/>
        {/* Navigation links - same as in header for consistent navigation */}
        <NavLinks />
        {/* GitHub repository link */}
        <GithubLink />
      </nav>
		</>
	);
};

export { NavFooter }