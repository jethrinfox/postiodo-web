// import React from 'react'
import { Box, Heading, Text } from "@chakra-ui/react";

interface FeatureProps {
	title: string;
	text: string;
}

const Feature: React.FC<FeatureProps> = ({ title, text }) => {
	return (
		<Box p={5} shadow='md' borderWidth='1px'>
			<Heading fontSize='xl'>{title}</Heading>
			<Text mt={4}>{text}</Text>
		</Box>
	);
};

export default Feature;
