import { FC } from 'react';
import { IconProps } from '.';

const CommentIcon: FC<IconProps> = ({ height = 16, width = 16, size = 16, ...props }) => {
	return (
		<svg
			width={size || width}
			height={size || height}
			viewBox='0 0 117 107'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path d='M109.588 77.1722C113.795 69.694 115.993 61.408 116 52.9996C116 23.7775 89.9791 0 58 0C26.0209 0 0 23.7775 0 52.9996C0 82.2216 26.0209 105.999 58 105.999C67.1851 105.999 76.2858 103.98 84.4585 100.145L109.451 105.855C110.334 106.058 111.259 106.048 112.137 105.826C113.014 105.604 113.813 105.177 114.455 104.587C115.099 103.999 115.565 103.268 115.809 102.466C116.052 101.664 116.063 100.818 115.842 100.01L109.588 77.1722ZM98.8689 77.7022L103.477 94.5561L85.0333 90.3402C83.7294 90.0461 82.3519 90.2148 81.1789 90.8124C74.1003 94.4459 66.119 96.3572 58 96.3629C31.8315 96.3629 10.5455 76.9072 10.5455 52.9996C10.5455 29.092 31.8315 9.63629 58 9.63629C84.1685 9.63629 105.455 29.092 105.455 52.9996C105.447 60.4164 103.358 67.7074 99.3856 74.1753C98.7246 75.2469 98.5396 76.5096 98.8689 77.7022Z' />
			<path d='M109.588 77.1722C113.795 69.694 115.993 61.408 116 52.9996C116 23.7775 89.9791 0 58 0C26.0209 0 0 23.7775 0 52.9996C0 82.2216 26.0209 105.999 58 105.999C67.1851 105.999 76.2858 103.98 84.4585 100.145L109.451 105.855C110.334 106.058 111.259 106.048 112.137 105.826C113.014 105.604 113.813 105.177 114.455 104.587C115.099 103.999 115.565 103.268 115.809 102.466C116.052 101.664 116.063 100.818 115.842 100.01L109.588 77.1722ZM98.8689 77.7022L103.477 94.5561L85.0333 90.3402C83.7294 90.0461 82.3519 90.2148 81.1789 90.8124C74.1003 94.4459 66.119 96.3572 58 96.3629C31.8315 96.3629 10.5455 76.9072 10.5455 52.9996C10.5455 29.092 31.8315 9.63629 58 9.63629C84.1685 9.63629 105.455 29.092 105.455 52.9996C105.447 60.4164 103.358 67.7074 99.3856 74.1753C98.7246 75.2469 98.5396 76.5096 98.8689 77.7022Z' />
		</svg>
	);
};

export default CommentIcon;
