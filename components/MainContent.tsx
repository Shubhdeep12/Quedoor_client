import MobileComingSoon from './MobileComingSoon';
import Navbar from './Navbar';

type MainProps = {
	children?: React.ReactNode;
};
export default function MainContent({ children }: MainProps) {
	return (
		<main
			className='
      animate-page-transition
      [animation-delay:150ms]
      w-full
			h-screen
			
      '
			// pt-[110px]
			// pb-10
			// overflow-x-hidden
			// px-2
		>
			<Navbar />
			<div className='hidden laptop:block'>{children}</div>
			<MobileComingSoon />
		</main>
	);
}
