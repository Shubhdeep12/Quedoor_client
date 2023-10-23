import { FC } from 'react';
import { IconProps } from '.';

const LikeIcon: FC<IconProps> = ({ height = 16, width = 16, size = 16, color = '#737373', ...props }) => {
	return (
		<svg
			width={size || width}
			height={size || height}
			viewBox={props.filled ? '0 0 24 24' : '0 0 16 16'}
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			{props.filled ? (
				<>
					<path
						d='M8.39 18.49V8.32998C8.39 7.92998 8.51 7.53998 8.73 7.20998L11.46 3.14998C11.89 2.49998 12.96 2.03998 13.87 2.37998C14.85 2.70998 15.5 3.80997 15.29 4.78997L14.77 8.05998C14.73 8.35998 14.81 8.62998 14.98 8.83998C15.15 9.02998 15.4 9.14997 15.67 9.14997H19.78C20.57 9.14997 21.25 9.46997 21.65 10.03C22.03 10.57 22.1 11.27 21.85 11.98L19.39 19.47C19.08 20.71 17.73 21.72 16.39 21.72H12.49C11.82 21.72 10.88 21.49 10.45 21.06L9.17 20.07C8.68 19.7 8.39 19.11 8.39 18.49Z'
						fill={color}
					/>
					<path
						d='M5.21 6.37998H4.18C2.63 6.37998 2 6.97998 2 8.45998V18.52C2 20 2.63 20.6 4.18 20.6H5.21C6.76 20.6 7.39 20 7.39 18.52V8.45998C7.39 6.97998 6.76 6.37998 5.21 6.37998Z'
						fill={color}
					/>
				</>
			) : (
				<path
					d='M7.05309 13.8334L7.40665 13.4798L7.38424 13.4574L7.35918 13.438L7.05309 13.8334ZM12.7198 12.8334L12.2448 12.6772L12.2391 12.6945L12.2347 12.7121L12.7198 12.8334ZM14.3198 7.96673L13.8487 7.7985L13.8448 7.81057L14.3198 7.96673ZM9.71976 5.43339L9.22571 5.3562L9.22478 5.36268L9.71976 5.43339ZM10.0531 3.30006L9.565 3.19159L9.56154 3.20714L9.55909 3.22287L10.0531 3.30006ZM9.18643 1.83339L9.01086 2.30156L9.01953 2.30481L9.02831 2.30774L9.18643 1.83339ZM7.71976 2.30006L8.13474 2.57898L8.13578 2.57741L7.71976 2.30006ZM4.68034 12.6288L6.74701 14.2288L7.35918 13.438L5.29251 11.838L4.68034 12.6288ZM6.69954 14.1869C6.92177 14.4092 7.2351 14.5387 7.49906 14.6142C7.77527 14.6931 8.07147 14.7334 8.31976 14.7334V13.7334C8.16805 13.7334 7.96424 13.707 7.77379 13.6526C7.57109 13.5947 7.45108 13.5243 7.40665 13.4798L6.69954 14.1869ZM8.31976 14.7334H10.8531V13.7334H8.31976V14.7334ZM10.8531 14.7334C11.3729 14.7334 11.8911 14.541 12.3067 14.2369C12.7226 13.9325 13.071 13.49 13.2048 12.9547L12.2347 12.7121C12.1685 12.9768 11.9835 13.2342 11.7162 13.4299C11.4484 13.6258 11.1333 13.7334 10.8531 13.7334V14.7334ZM13.1947 12.9896L14.7947 8.12289L13.8448 7.81057L12.2448 12.6772L13.1947 12.9896ZM14.7906 8.1349C15.0066 7.53006 14.9321 6.9191 14.589 6.45346C14.2482 5.99102 13.6884 5.73339 13.0531 5.73339V6.73339C13.4178 6.73339 13.658 6.87577 13.7839 7.04666C13.9075 7.21436 13.9662 7.47006 13.8489 7.79856L14.7906 8.1349ZM13.0531 5.73339H10.3864V6.73339H13.0531V5.73339ZM10.3864 5.73339C10.3265 5.73339 10.2809 5.70919 10.253 5.67758C10.2287 5.65008 10.2013 5.59833 10.2147 5.5041L9.22478 5.36268C9.11386 6.13913 9.69086 6.73339 10.3864 6.73339V5.73339ZM10.2138 5.51058L10.5471 3.37725L9.55909 3.22287L9.22575 5.3562L10.2138 5.51058ZM10.5412 3.40853C10.7341 2.54054 10.1699 1.63416 9.34454 1.35905L9.02831 2.30774C9.403 2.43263 9.63878 2.85958 9.565 3.19159L10.5412 3.40853ZM9.36199 1.36523C8.96397 1.21597 8.5418 1.24814 8.19055 1.36888C7.84267 1.48847 7.50981 1.7136 7.30373 2.02271L8.13578 2.57741C8.19637 2.48652 8.33018 2.37832 8.51563 2.31457C8.69772 2.25198 8.87555 2.25081 9.01086 2.30156L9.36199 1.36523ZM7.30478 2.02114L4.57145 6.08781L5.4014 6.64565L8.13473 2.57898L7.30478 2.02114ZM2.08643 12.2334V5.70006H1.08643V12.2334H2.08643ZM2.08643 5.70006C2.08643 5.28973 2.17642 5.14488 2.24223 5.08413C2.31787 5.01431 2.49142 4.93339 2.91976 4.93339V3.93339C2.41477 3.93339 1.92165 4.01914 1.56395 4.34933C1.19643 4.68858 1.08643 5.17705 1.08643 5.70006H2.08643ZM2.91976 4.93339H3.58643V3.93339H2.91976V4.93339ZM3.58643 4.93339C4.01477 4.93339 4.18832 5.01431 4.26395 5.08413C4.32976 5.14488 4.41976 5.28973 4.41976 5.70006H5.41976C5.41976 5.17705 5.30976 4.68858 4.94223 4.34933C4.58454 4.01914 4.09142 3.93339 3.58643 3.93339V4.93339ZM4.41976 5.70006V12.2334H5.41976V5.70006H4.41976ZM4.41976 12.2334C4.41976 12.6437 4.32976 12.7886 4.26395 12.8493C4.18832 12.9191 4.01477 13.0001 3.58643 13.0001V14.0001C4.09142 14.0001 4.58454 13.9143 4.94223 13.5841C5.30976 13.2449 5.41976 12.7564 5.41976 12.2334H4.41976ZM3.58643 13.0001H2.91976V14.0001H3.58643V13.0001ZM2.91976 13.0001C2.49142 13.0001 2.31787 12.9191 2.24223 12.8493C2.17642 12.7886 2.08643 12.6437 2.08643 12.2334H1.08643C1.08643 12.7564 1.19643 13.2449 1.56395 13.5841C1.92165 13.9143 2.41477 14.0001 2.91976 14.0001V13.0001Z'
					fill={color}
				/>
			)}
		</svg>
	);
};

export default LikeIcon;