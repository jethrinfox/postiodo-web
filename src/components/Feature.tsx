// import React from 'react'
import { Box, Heading, Text } from "@chakra-ui/react";

interface FeatureProps {
	post: {
		title: string;
		textSnippet: string;
	};
}

const Feature: React.FC<FeatureProps> = ({ post }) => {
	const { title, textSnippet } = post;

	return (
		<Box p={5} shadow='md' borderWidth='1px'>
			<Heading fontSize='xl'>{title}</Heading>
			<Text mt={4}>{textSnippet}</Text>
		</Box>
	);
};

export default Feature;
