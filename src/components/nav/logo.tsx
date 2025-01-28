import { Link } from "@tanstack/react-router"

interface NavLogoProps {
  showSubtitle: boolean;
}

const NavLogo = ({ showSubtitle }: NavLogoProps) => {
  return (
    <Link
      to="/"
      activeProps={{
        className: 'font-bold',
      }}
      activeOptions={{ exact: true }}
    >
      <div className='flex items-center gap-2 md:gap-3'>
        {showSubtitle ?
        <img className="size-12 md:size-16" src={"/enaleiaHub_logo.svg"} alt="Enaleia Logo" />
        : 
        <img className="size-7 md:size-10" src={"/enaleiaHub_logo.svg"} alt="Enaleia Logo" />
        }        
        <div>
          <p className='text-lg md:text-2xl'>ENALEIA Hub</p>
          {showSubtitle && <p className="text-xs font-extralight">A project built on Ethereum</p>}
        </div>
      </div>
    </Link>
  )
}

export { NavLogo };
