'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { cn } from '@/lib/utils';
import { Fragment, forwardRef, useRef, useState } from 'react';
import { AiOutlineBold, AiOutlineItalic } from 'react-icons/ai';
import { LuHeading1, LuHeading2 } from 'react-icons/lu';
import { RiCodeView, RiImage2Fill, RiListOrdered2, RiListUnordered, RiSeparator } from 'react-icons/ri';
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import CharacterCount from '@tiptap/extension-character-count';
import { IoCloseCircleSharp, IoSend } from 'react-icons/io5';
import Image from 'next/image';
import { Button } from '@/ui/button';
import { BiLoaderAlt } from 'react-icons/bi';
import { Dialog, DialogContent, DialogTrigger } from '@/ui/dialog';
import { file2Base64 } from '@/lib/misc';

const MenuItem = ({ Icon, title, action, isActive = null, disabled = false }: any) => (
	<button
		className={cn({
			'rounded-lg p-1 transition hover:bg-gray-400 hover:bg-opacity-50': true,
			'bg-gray-400 bg-opacity-50': isActive(),
			'cursor-default': disabled,
		})}
		onClick={() => !disabled && action()}
		title={title}
	>
		<Icon size='22' color='white' />
	</button>
);

const MenuBar = ({ editor, isLoading, handlePrimaryCTA, imageUrl }: any) => {
	const items = [
		{
			Icon: AiOutlineBold,
			title: 'Bold',
			action: () => editor.chain().focus().toggleBold().run(),
			isActive: () => editor.isActive('bold'),
		},
		{
			Icon: AiOutlineItalic,
			title: 'Italic',
			action: () => editor.chain().focus().toggleItalic().run(),
			isActive: () => editor.isActive('italic'),
		},

		{
			Icon: RiCodeView,
			title: 'Code',
			action: () => editor.chain().focus().toggleCode().run(),
			isActive: () => editor.isActive('code'),
		},
		{
			type: 'divider',
		},
		{
			Icon: LuHeading1,
			title: 'Heading 1',
			action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
			isActive: () => editor.isActive('heading', { level: 1 }),
		},
		{
			Icon: LuHeading2,
			title: 'Heading 2',
			action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
			isActive: () => editor.isActive('heading', { level: 2 }),
		},

		{
			Icon: RiListUnordered,
			title: 'Bullet List',
			action: () => editor.chain().focus().toggleBulletList().run(),
			isActive: () => editor.isActive('bulletList'),
		},
		{
			Icon: RiListOrdered2,
			title: 'Ordered List',
			action: () => editor.chain().focus().toggleOrderedList().run(),
			isActive: () => editor.isActive('orderedList'),
		},
		{
			type: 'divider',
		},
		{
			Icon: RiSeparator,
			title: 'Horizontal Rule',
			action: () => editor.chain().focus().setHorizontalRule().run(),
			isActive: () => false,
		},

		{
			Icon: RiImage2Fill,
			title: 'Upload Image',
			action: () => document.getElementById('tiptap-image')?.click(),
			isActive: () => imageUrl && imageUrl.length > 0,
			disabled: imageUrl && imageUrl.length > 0,
		},
	];

	const isPrimaryButtonActive = () =>
		(imageUrl && imageUrl.length > 0) || (editor && (editor.getText() || '')).length > 0;

	return (
		<div className='flex gap-2 items-center justify-between flex-wrap bg-primary px-2 py-2 relative'>
			<div className='flex gap-2 items-center '>
				{items.map((item, index) => (
					<Fragment key={index}>
						{item.type === 'divider' ? <div className='divider border-r h-6 mx-3 w-[1px]' /> : <MenuItem {...item} />}
					</Fragment>
				))}
			</div>

			<Button
				variant='secondary'
				className='transition flex items-center'
				disabled={isLoading || !isPrimaryButtonActive()}
				onClick={handlePrimaryCTA}
			>
				{isLoading ? (
					<BiLoaderAlt className='mr-2 h-4 w-4 animate-spin' />
				) : (
					<IoSend size={20} className='fill-primary' />
				)}
			</Button>
		</div>
	);
};

// eslint-disable-next-line react/display-name
const Tiptap = forwardRef(
	(
		{ isReadonly = false, content = null, defaultImage = {}, isLoading, handlePrimaryCTA, placeholder = '' }: any,
		ref: any
	) => {
		const imageRef = useRef<any>();
		const [image, setImage] = useState<{ imageUrl: string; file?: Blob; imageText: string }>({
			imageUrl: defaultImage.imageUrl,
			imageText: defaultImage.imageText,
			file: undefined,
		});

		const editor = useEditor({
			extensions: [
				StarterKit,
				Highlight,
				Placeholder.configure({
					placeholder: placeholder || 'Write something …',
				}),
				CharacterCount.configure({
					limit: 1000,
				}),
			],
			...(isReadonly ? {} : { autofocus: 'end' }),
			content: content,
			editable: !isReadonly,
			editorProps: {
				attributes: {
					class: cn(
						'prose dark:prose-invert prose-sm transition sm:prose-base overflow-hidden lg:prose-lg xl:prose-2xl mx-1 px-2 focus:outline-none',
						!isReadonly ? 'h-96' : '!px-0 !mx-0'
					),
				},
			},
		});

		ref.current = editor;
		return (
			<div
				className={cn(
					isReadonly ? '' : 'mt-6',
					'editor-container h-auto overflow-hidden flex flex-col justify-between'
				)}
			>
				<EditorContent editor={editor} />
				{editor && !isReadonly && (
					<input
						style={{ display: 'none' }}
						type='file'
						accept='.jpg, .jpeg, .png, .gif, .bmp'
						id='tiptap-image'
						ref={imageRef}
						onChange={async (event: any) => {
							const file = event.target.files[0];
							const imageUrl = await file2Base64(file);
							setImage({
								imageUrl,
								imageText: '',
								file,
							});
						}}
					/>
				)}

				{image.imageUrl && (
					<Dialog>
						<DialogTrigger asChild>
							<div
								className={cn(
									!isReadonly ? 'border-2 justify-center border-black m-4' : 'mt-4',
									'flex relative rounded-xl'
								)}
							>
								<Image
									objectFit='contain'
									layout='fill'
									className={cn(isReadonly ? '!rounded-xl' : '', '!w-[auto] !h-[250px] !relative')}
									alt='img'
									src={image.imageUrl}
								/>
								{!isReadonly && (
									<div
										className='absolute cursor-pointer top-2 right-2 rounded-full bg-white'
										onClick={() => setImage({ imageUrl: '', imageText: '' })}
									>
										<IoCloseCircleSharp size={20} />
									</div>
								)}
							</div>
						</DialogTrigger>

						<DialogContent className='laptop:max-w-[800px]'>
							<Image
								objectFit='contain'
								layout='fill'
								className='!w-full !h-full !relative mt-2'
								alt='img'
								src={image.imageUrl}
							/>
						</DialogContent>
					</Dialog>
				)}
				{editor && !isReadonly && (
					<MenuBar
						editor={editor}
						imageUrl={image.imageUrl}
						isLoading={isLoading}
						handlePrimaryCTA={() => handlePrimaryCTA(image)}
					/>
				)}
			</div>
		);
	}
);

export default Tiptap;
