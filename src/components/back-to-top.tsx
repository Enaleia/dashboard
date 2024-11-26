import { CircleArrowUp } from "lucide-react"

const BackToTopButton = () => {
  return (
    <div 
      className='flex flex-row items-center gap-2 font-normal text-ocean cursor-pointer'
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth'})}
    >
      <CircleArrowUp color="#2985D0" strokeWidth={2}/>
      <p>Back to top</p>
    </div>
  )
}

export { BackToTopButton };
