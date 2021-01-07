// import React from 'react'
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { RegularPostFragment } from "../generated/graphql";
import { EditDeleteSection } from "./EditDeleteSection";
import { NextChakraLink } from "./Link";
import { VoteSection } from "./VoteSection";

interface PostSectionProps {
	post: RegularPostFragment;
}

const PostSection: React.FC<PostSectionProps> = ({ post }) => {
	return (
		<Flex p={5} shadow='md' borderWidth='1px'>
			<VoteSection post={post} />
			<Box flex={1} mr={4}>
				<NextChakraLink href={`/post/${post.id}`}>
					<Heading fontSize='xl'>{post.title}</Heading>
				</NextChakraLink>
				posted by{" "}
				<NextChakraLink href={`/post/author/${post.creatorId}`}>
					{post.creator.username}
				</NextChakraLink>
				<Text mt={4}>{post.textSnippet}</Text>
			</Box>
			<EditDeleteSection post={post} />
		</Flex>
	);
};

export default PostSection;
