'use client';

import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import PageLoader from '@/components/PageLoader';
import Text from '@/ui/Text';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useInfinitePeopleList } from '@/queries/people';
import { UserProps } from '@/lib/constants';
import { Skeleton } from '@/ui/skeleton';
import NoPost from '@/assets/icons/NoPost';
import PeopleCard from '@/components/PeopleCard';
import clsx from 'clsx';

const PeopleSkeletonLoader = () => (
	<div className='flex flex-col gap-6 w-full items-center'>
		{Array(5)
			.fill(1)
			.map((e) => (
				<div key={e} className='flex flex-col gap-2 w-full'>
					<Skeleton className='rounded-lg h-4 w-full ' />
					<Skeleton className='rounded-lg h-4 w-full' />
				</div>
			))}
	</div>
);

const EmptyContainer = () => (
	<div className='empty-container w-full h-[calc(100vh-112px)] flex flex-col justify-center items-center'>
		<div className='flex flex-col items-center gap-2'>
			<NoPost />
			<Text className='text-sm font-semibold text-gray-500'>No User available.</Text>
		</div>
	</div>
);
const People = () => {
	const router = useRouter();
	const { user } = useAuth();
	const [activeListType, setActiveListType] = useState('all');
	const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfinitePeopleList({
		type: activeListType,
		userId: user?.id,
	});

	const peopleListTypes = [
		{
			id: 'all',
			title: 'All',
		},
		{
			id: 'following',
			title: 'Following',
		},
		{
			id: 'followers',
			title: 'Followers',
		},
	];
	const isEmpty = () =>
		data?.pages.every((page: any) => {
			return page.data && Array.isArray(page.data) && page.data.length === 0;
		});

	useEffect(() => {
		if (!(user && user.id)) {
			router.push('/login');
		}
	}, [user, router]);

	if (!user) {
		return <PageLoader />;
	}

	return (
		<>
			<div className='pb-4 pt-10 flex justify-between items-center bg-white w-[700px] fixed z-10'>
				<Text className='text-3xl font-black'>People</Text>

				<div className='flex items-center gap-4'>
					{peopleListTypes.map((type) => (
						<Text
							key={type.id}
							onClick={() => setActiveListType(type.id)}
							className={clsx(
								activeListType === type.id ? 'text-black' : 'text-gray-400',
								'text-base font-semibold cursor-pointer transition'
							)}
						>
							{type.title}
						</Text>
					))}
				</div>
			</div>

			<div className='flex w-[700px] justify-between my-28 '>
				<InfiniteScroll
					next={fetchNextPage}
					hasMore={hasNextPage || false}
					className='!w-full'
					scrollableTarget='feedscrollable'
					loader={(isLoading || isFetchingNextPage) && <PeopleSkeletonLoader />}
					dataLength={data?.pages.length || 0}
				>
					{isLoading ? (
						<PeopleSkeletonLoader />
					) : isEmpty() ? (
						<EmptyContainer />
					) : (
						<div className='flex flex-col gap-6 w-full'>
							{data?.pages.map((page) =>
								page.data.map((user: UserProps) => (
									<PeopleCard key={JSON.stringify(user)} activeListType={activeListType} user={user} />
								))
							)}
						</div>
					)}
				</InfiniteScroll>
			</div>
		</>
	);
};

export default People;
