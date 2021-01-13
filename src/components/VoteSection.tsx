import { ApolloCache, gql } from "@apollo/client";
import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Spinner } from "@chakra-ui/react";
import React from "react";
import {
	RegularPostFragment,
	useVoteMutation,
	VoteMutation,
} from "../generated/graphql";

interface VoteSectionProps {
	post: RegularPostFragment;
}

const updateAfterVote = (
	value: number,
	postId: number,
	cache: ApolloCache<VoteMutation>
) => {
	const data = cache.readFragment<RegularPostFragment>({
		id: "Post:" + postId,
		fragment: gql`
			fragment _ on Post {
				id
				points
				voteStatus
			}
		`,
	});
	if (data) {
		if (data.voteStatus === value) return;
		const newPoints = data.points + (!data.voteStatus ? 1 : 2) * value;
		cache.writeFragment({
			id: "Post:" + postId,
			fragment: gql`
				fragment _ on Post {
					id
					points
					voteStatus
				}
			`,
			data: {
				points: newPoints,
				voteStatus: value,
			},
		});
	}
};

export const VoteSection: React.FC<VoteSectionProps> = ({ post }) => {
	const [vote, { loading }] = useVoteMutation({
		notifyOnNetworkStatusChange: true,
	});

	const handleVote = (value: number) => {
		if (value === post.voteStatus) return;
		vote({
			variables: {
				value,
				postId: post.id,
			},
			update: (cache) => updateAfterVote(value, post.id, cache),
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
				colorScheme={post.voteStatus === 1 ? "green" : undefined}
				icon={<ChevronUpIcon w={6} h={6} />}
			/>
			{!loading ? post.points : <Spinner />}
			<IconButton
				onClick={() => handleVote(-1)}
				aria-label='vote post down'
				colorScheme={post.voteStatus === -1 ? "red" : undefined}
				icon={<ChevronDownIcon w={6} h={6} />}
			/>
		</Flex>
	);
};
