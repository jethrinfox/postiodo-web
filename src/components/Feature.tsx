// import React from 'react'
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { RegularPostFragment } from "../generated/graphql";
import { NextChakraLink } from "./Link";
import { VoteSection } from "./VoteSection";

interface FeatureProps {
	post: RegularPostFragment;
}

const Feature: React.FC<FeatureProps> = ({ post }) => {
	return (
		<Flex p={5} shadow='md' borderWidth='1px'>
			<VoteSection post={post} />
			<Box>
				<NextChakraLink href='/post/[id]' as={"/post/" + post.id}>
					<Heading fontSize='xl'>{post.title}</Heading>
				</NextChakraLink>
				posted by{" "}
				<NextChakraLink
					href='/post/[id]'
					as={"/author/" + post.creatorId}>
					{post.creator.username}
				</NextChakraLink>
				<Text mt={4}>{post.textSnippet}</Text>
			</Box>
		</Flex>
	);
};

export default Feature;
