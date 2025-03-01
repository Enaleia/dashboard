import { Link } from "@tanstack/react-router"

/**
 * Interface for the NavLogo component props
 * @property {boolean} showSubtitle - Whether to display the subtitle text under the logo
 */
interface NavLogoProps {
  showSubtitle: boolean;
}

/**
 * NavLogo - Component that renders the application logo with optional subtitle
 * 
 * Provides a clickable logo that navigates to the home page with:
 * - Variable logo size based on context
 * - Optional subtitle for additional branding
 * - Active state highlighting for the home page
 * 
 * Used in both the header and footer, with different configurations:
 * - Header: Usually without subtitle
 * - Footer: Usually with subtitle for additional branding
 */
const NavLogo = ({ showSubtitle }: NavLogoProps) => {
  return (
    <Link
      to="/"
      activeProps={{
        className: 'font-bold',
      }}
      activeOptions={{ exact: true }}   // Only highlight when on the exact home path
    >
      <div className='flex items-center gap-2 md:gap-3'>
        {/* Conditionally render different sized logo based on showSubtitle */}
        {showSubtitle ?
        // Larger logo when subtitle is shown (in footer)
        <img className="size-12 md:size-16" src={"/logos/enaleiaHub_logo.svg"} alt="Enaleia Logo" />
        : 
        // Smaller logo when subtitle is hidden (in header)
        <img className="size-7 md:size-10" src={"/logos/enaleiaHub_logo.svg"} alt="Enaleia Logo" />
        }        
        <div>
          {/* Main logo text */}
          <p className='text-lg md:text-2xl'>ENALEIA Hub</p>
          {/* Optional subtitle text */}
          {showSubtitle && <p className="text-xs font-extralight">A project built on Ethereum</p>}
        </div>
      </div>
    </Link>
  )
}

export { NavLogo }
