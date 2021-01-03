import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Spinner } from "@chakra-ui/react";
import React from "react";
import { RegularPostFragment, useVoteMutation } from "../generated/graphql";

interface VoteSectionProps {
	post: RegularPostFragment;
}

export const VoteSection: React.FC<VoteSectionProps> = ({ post }) => {
	const [{ fetching }, vote] = useVoteMutation();

	const handleVote = (value: number) => {
		vote({
			value,
			post: post.id,
		});
	};

	return (
		<Flex
			mr={4}
			flexDirection='column'
			justifyContent='center'
			alignItems='center'>
			<IconButton
				onClick={() => handleVote(1)}
				aria-label='vote post up'
				icon={<ChevronUpIcon w={6} h={6} />}
			/>
			{!fetching ? post.points : <Spinner />}
			<IconButton
				onClick={() => handleVote(-1)}
				aria-label='vote post down'
				icon={<ChevronDownIcon w={6} h={6} />}
			/>
		</Flex>
	);
};
