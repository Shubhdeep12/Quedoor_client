'use client';
import MobileComingSoon from './MobileComingSoon';

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
		>
			<div className='hidden laptop:block'>{children}</div>
			<MobileComingSoon />
		</main>
	);
}
