import { Flex, Stack, Skeleton, Box, Heading, Divider } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React from "react";
import { EditDeleteSection } from "../../components/EditDeleteSection";
import { Layout } from "../../components/Layout";
import { NextChakraLink } from "../../components/Link";
import { VoteSection } from "../../components/VoteSection";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useGetPostFromInt } from "../../utils/useGetPostFromInt";

const Post: React.FC<{}> = ({}) => {
	const [{ data, fetching }] = useGetPostFromInt();

	if (fetching) {
		return (
			<Layout>
				<Stack spacing={8}>
					<Skeleton height='500px'></Skeleton>
				</Stack>
			</Layout>
		);
	}
	if (!data?.post) {
		return (
			<Layout>
				<Flex my={8} justifyContent='center'>
					You got no post for some reason
				</Flex>
			</Layout>
		);
	}

	return (
		<Layout>
			<Flex p={5} shadow='md' borderWidth='1px'>
				<VoteSection post={data?.post} />
				<Flex flex={1} flexDirection='column' ml={2} mr={4}>
					<Box>
						posted by{" "}
						<NextChakraLink
							href='/post/[id]'
							as={"/author/" + data?.post?.creatorId}>
							{data?.post?.creator.username}
						</NextChakraLink>
					</Box>
					<Box my={4}>
						<Heading>{data?.post?.title}</Heading>
					</Box>
					<Divider mb={4} />
					<Box>{data?.post?.text}</Box>
				</Flex>
				<EditDeleteSection
					id={data.post.id}
					creatorId={data.post.creatorId}
				/>
			</Flex>
		</Layout>
	);
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
