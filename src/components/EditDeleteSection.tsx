import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import React from "react";
import { useDeletePostMutation, useMeQuery } from "../generated/graphql";
import { NextChakraLink } from "./Link";

interface EditDeleteSectionProps {
	id: number;
	creatorId: number;
}

export const EditDeleteSection: React.FC<EditDeleteSectionProps> = ({
	id,
	creatorId,
}) => {
	const [{ data }] = useMeQuery();

	const [, deletePost] = useDeletePostMutation();

	return (
		<Flex
			flexDirection='column'
			justifyContent='center'
			alignItems='center'>
			{data?.me?.id !== creatorId ? null : (
				<>
					<NextChakraLink mb={4} href={`/post/edit/${id}`}>
						<IconButton
							variant='outline'
							aria-label='edit post'
							icon={<EditIcon w={4} h={4} />}
						/>
					</NextChakraLink>
					<IconButton
						variant='outline'
						onClick={() => deletePost({ id })}
						aria-label='delete post'
						icon={<DeleteIcon w={4} h={4} />}
					/>
				</>
			)}
		</Flex>
	);
};
