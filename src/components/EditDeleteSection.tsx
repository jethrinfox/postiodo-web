import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Link } from "@chakra-ui/react";
import React from "react";
import {
	RegularPostFragment,
	useDeletePostMutation,
	useMeQuery,
} from "../generated/graphql";
import { NextChakraLink } from "./Link";

interface EditDeleteSectionProps {
	post: RegularPostFragment;
}

export const EditDeleteSection: React.FC<EditDeleteSectionProps> = ({
	post,
}) => {
	const [{ data }] = useMeQuery();

	const [, deletePost] = useDeletePostMutation();

	return (
		<Flex
			flexDirection='column'
			justifyContent='center'
			alignItems='center'>
			{data?.me?.id !== post.creatorId ? null : (
				<>
					<NextChakraLink mb={4} href={`/post/edit/${post.id}`}>
						<IconButton
							variant='outline'
							aria-label='edit post'
							icon={<EditIcon w={4} h={4} />}
						/>
					</NextChakraLink>
					<IconButton
						variant='outline'
						onClick={() => deletePost({ id: post.id })}
						aria-label='delete post'
						icon={<DeleteIcon w={4} h={4} />}
					/>
				</>
			)}
		</Flex>
	);
};
