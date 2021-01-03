// import React from 'react'
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { RegularPostFragment } from "../generated/graphql";
import { VoteSection } from "./VoteSection";

interface FeatureProps {
	post: RegularPostFragment;
}

const Feature: React.FC<FeatureProps> = ({ post }) => {
	return (
		<Flex p={5} shadow='md' borderWidth='1px'>
			<VoteSection post={post} />
			<Box>
				<Heading fontSize='xl'>{post.title}</Heading>
				posted by {post.creator.username}
				<Text mt={4}>{post.textSnippet}</Text>
			</Box>
		</Flex>
	);
};

export default Feature;
