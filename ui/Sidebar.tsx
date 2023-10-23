'use client';

import Text from '@/ui/Text';
import useAuth from '@/hooks/useAuth';
import { Avatar, Button } from '@chakra-ui/react';
import clsx from 'clsx';
import { FC, useState } from 'react';
import { BiSolidCommentDetail } from 'react-icons/bi';
import { BsFilePost } from 'react-icons/bs';
import { IoCreate } from 'react-icons/io5';
import { FaCircleChevronUp } from 'react-icons/fa6';
import { CgPushChevronLeftO, CgPushChevronRightO } from 'react-icons/cg';

type SidebarProps = {
	onCreate: () => void;
};
const Sidebar: FC<SidebarProps> = ({ onCreate }) => {
	const { user } = useAuth();
	const [recentActivityCollapsed, setRecentActivityCollapsed] = useState<boolean>(true);
	const [recentFollowersCollapsed, setRecentFollowersCollapsed] = useState<boolean>(true);
	const [sidebarOpen, setSidebarOpen] = useState(true);

	return (
		<div
			className={clsx(
				'left-section p-6 border-r border-r-slate-300 w-96 min-w-max h-[calc(100vh-65px)] sticky bg-primary-light-50',
				'backdrop-blur-[10px] backdrop-saturate-200	flex flex-col gap-10',
				'transform transition',
				sidebarOpen ? 'translate-x-0' : '-translate-x-96'
			)}
		>
			<div className='flex items-center gap-2'>
				<Avatar size='sm' name={user?.name} src={user?.profile_img} />
				<Text className='text-sm font-bold'>Shubhdeep Chhabra</Text>
			</div>

			<Button
				className='bg-primary-light-400 transition hover:bg-opacity-90 py-2 flex items-start gap-1'
				colorScheme='bg-primary-light-400'
				size='medium'
				onClick={onCreate}
			>
				<IoCreate size={18} />
				<Text className='font-medium text-sm'>Create</Text>
			</Button>

			<div className='flex flex-col items-start gap-4'>
				<div
					className='w-full flex items-center justify-between cursor-pointer transition-all p-2 rounded-md hover:bg-primary-light-100'
					onClick={() => setRecentActivityCollapsed((prev) => !prev)}
				>
					<Text className='text-sm font-bold'>Recent Activity</Text>
					<FaCircleChevronUp
						className={clsx({
							'transition-all': true,
							'rotate-180': recentActivityCollapsed,
							'cursor-pointer': true,
						})}
						size={18}
					/>
				</div>
				<div
					className={clsx({
						'w-full flex flex-col items-start gap-2 overflow-hidden transition-height duration-200 ease-in-out': true,
						'h-52': !recentActivityCollapsed,
						'h-0': recentActivityCollapsed,
					})}
				>
					<Text className='text-sm font-medium flex items-center gap-2 cursor-pointer hover:underline underline-offset-2'>
						<BsFilePost size={14} />
						Title of post created by you...
					</Text>
					<Text className='text-sm font-medium flex items-center gap-2 cursor-pointer hover:underline underline-offset-2'>
						<BsFilePost size={14} />
						Title of post created by you...
					</Text>
					<Text className='text-sm font-medium flex items-center gap-2 cursor-pointer hover:underline underline-offset-2'>
						<BiSolidCommentDetail size={14} />
						Title of comment created by you...
					</Text>
					<Text className='text-sm font-medium flex items-center gap-2 cursor-pointer hover:underline underline-offset-2'>
						<BsFilePost size={14} />
						Title of post created by you...
					</Text>
					<Text className='text-sm font-medium flex items-center gap-2 cursor-pointer hover:underline underline-offset-2'>
						<BiSolidCommentDetail size={14} />
						Title of comment created by you...
					</Text>
					<Text className='text-sm font-medium flex items-center gap-2 cursor-pointer hover:underline underline-offset-2'>
						<BsFilePost size={14} />
						Title of post created by you...
					</Text>
					<Text className='text-sm font-medium flex items-center gap-2 cursor-pointer hover:underline underline-offset-2'>
						<BsFilePost size={14} />
						Title of post created by you...
					</Text>
				</div>
			</div>

			<div className='flex flex-col items-start gap-4'>
				<div
					className='w-full flex items-center justify-between cursor-pointer transition-all p-2 rounded-md hover:bg-primary-light-100'
					onClick={() => setRecentFollowersCollapsed((prev) => !prev)}
				>
					<Text className='text-sm font-bold'>Recent Followers</Text>
					<FaCircleChevronUp
						className={clsx({
							'transition-all': true,
							'rotate-180': recentFollowersCollapsed,
							'cursor-pointer': true,
						})}
						size={18}
					/>
				</div>
				<div
					className={clsx({
						'w-full flex flex-col items-start gap-2 overflow-hidden transition-height duration-200 ease-in-out': true,
						'h-80': !recentFollowersCollapsed,
						'h-0': recentFollowersCollapsed,
					})}
				>
					{Array(7)
						.fill(1)
						.map((id) => (
							<div
								key={id}
								className='text-sm font-medium flex items-center gap-2 cursor-pointer hover:underline underline-offset-2'
							>
								<Avatar size='xs' name={user?.name} src={user?.profile_img} />
								<Text className='text-sm'>Shubhdeep Chhabra</Text>
							</div>
						))}
					<Text className='text-sm text-gray-500 font-semibold hover:underline underline-offset-2 cursor-pointer transition'>
						Show All
					</Text>
				</div>
			</div>

			<div
				className='absolute top-4 -right-4 hover:scale-105 transition bg-white rounded-full'
				onClick={() => setSidebarOpen((prev) => !prev)}
			>
				{sidebarOpen ? <CgPushChevronLeftO size={24} /> : <CgPushChevronRightO size={24} />}
			</div>
		</div>
	);
};

export default Sidebar;
