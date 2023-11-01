import React, { FC, memo, useRef, useState } from 'react';

import { createComment, updateComment } from '@/queries/feed';
import { deleteAttachment, uploadAttachment } from '@/queries/misc';
import { CommentProps, PostProps } from '@/lib/constants';
import { Textarea } from '@/ui/textarea';
import { Button } from '@/ui/button';
import { RiImage2Fill } from 'react-icons/ri';
import { file2Base64 } from '@/lib/misc';
import { Dialog, DialogContent } from '@/ui/dialog';
import Image from 'next/image';
import { IoCloseCircleSharp } from 'react-icons/io5';
import { BiLoaderAlt } from 'react-icons/bi';

type CreateCommentProps = {
	post: PostProps;
	isEdit?: boolean;
	comment?: CommentProps;
	setComments: any;
};

const CreateComment: FC<CreateCommentProps> = ({ isEdit = false, post, comment, setComments }) => {
	const imageRef = useRef<any>();
	const [imagePreview, setImagePreview] = useState(false);
	const [commentValue, setCommentValue] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [image, setImage] = useState<{ image_url: string; file?: Blob; image_text: string }>({
		image_url: post.image_url || '',
		image_text: post.image_text || '',
		file: undefined,
	});

	const checkAddCommentDisabled = () => {
		if (!(image.image_url || image.file) && (commentValue || '').trim()?.length === 0) {
			return true;
		}
		return false;
	};

	const handleCommentValue = (e: any) => {
		setCommentValue(e.target.value);
	};

	const handlePrimaryCTA = async () => {
		setIsLoading(true);

		let image_url = comment?.image_url || '';
		let image_text = comment?.image_text || '';
		try {
			if (comment?.image_url !== image?.image_url) {
				if (comment?.image_url && comment.image_url.length > 0 && isEdit)
					await deleteAttachment({ image_url: comment?.image_url });

				if (image.image_url && image.file) {
					const data = new FormData();
					data.append('with_image_text', 'true');
					data.append('image', image.file);
					const res = await uploadAttachment(data);
					if (res.status < 300) {
						image_text = res.result.image_text;
						image_url = res.result.image_url;
					}
				}
			}

			if (!isEdit) {
				const payload = {
					image_url,
					description: (commentValue || '').trim(),
					rich_description: (commentValue || '').trim(),
					image_text,
				};

				try {
					const res: { data: CommentProps } = await createComment(post?._id, payload);
					setComments((prev: CommentProps[]) => [res.data, ...prev]);
				} catch (error) {
					// Handle error
				}
			} else {
				const payload = {
					image_url,
					description: (commentValue || '').trim(),
					rich_description: (commentValue || '').trim(),
					image_text,
				};

				try {
					if (comment?._id) {
						const res = await updateComment({ id: comment._id, body: payload });
						setComments((prev: CommentProps[]) =>
							prev.map((_comment: CommentProps) => {
								if (_comment._id === res.data._id) {
									return res.data;
								}
								return _comment;
							})
						);
					}
				} catch (error) {
					// Handle error
				}
			}
			setImage({ image_url: '', image_text: '', file: undefined });
			setCommentValue('');
		} catch (e: any) {
			/* empty */
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='flex gap-2 items-start flex-col'>
			<Textarea
				value={commentValue}
				onChange={handleCommentValue}
				rows={4}
				className='!max-h-[80px] resize-none'
				placeholder='Type your message here.'
			/>
			<div className='flex gap-3 w-full'>
				<Button
					// disabled={image.image_url ? image.image_url.length > 0 : false}
					className='transition'
					onClick={(e) => {
						e.preventDefault();
						if (image.image_url || image.file) {
							setImagePreview(true);
						} else document.getElementById('tiptap-comment-image')?.click();
					}}
				>
					{!(image.image_url || image.file) ? (
						<RiImage2Fill size={18} />
					) : (
						<div className='flex items-center justify-between min-w-[80px] w-full '>
							<div className='bg-slate-300 rounded-md'>
								<Image
									objectFit='contain'
									layout='fill'
									className='!w-[25px] !h-[25px] !relative'
									alt='img'
									src={image.image_url}
								/>
							</div>

							<div
								className='cursor-pointer top-2 right-2 rounded-full'
								onClick={(e) => {
									e.stopPropagation();
									setImage({ image_url: '', image_text: '', file: undefined });
									setImagePreview(false);
								}}
							>
								<IoCloseCircleSharp size={20} />
							</div>
						</div>
					)}
				</Button>
				<Button className='flex-1' disabled={isLoading || checkAddCommentDisabled()} onClick={handlePrimaryCTA}>
					{isLoading ? <BiLoaderAlt className='mr-2 h-4 w-4 animate-spin' /> : 'Add Comment'}
				</Button>
			</div>

			<Dialog open={imagePreview} onOpenChange={() => setImagePreview(false)}>
				<DialogContent className='laptop:max-w-[800px]'>
					<Image
						objectFit='contain'
						layout='fill'
						className='!w-full !h-full !relative mt-2'
						alt='img'
						src={image.image_url}
					/>
				</DialogContent>
			</Dialog>

			<input
				style={{ display: 'none' }}
				type='file'
				id='tiptap-comment-image'
				ref={imageRef}
				onChange={async (event: any) => {
					const file = event.target.files[0];
					console.log({ file });
					const image_url = await file2Base64(file);
					setImage({
						image_url,
						image_text: '',
						file,
					});
				}}
			/>
		</div>
	);
};

export default memo(CreateComment);
