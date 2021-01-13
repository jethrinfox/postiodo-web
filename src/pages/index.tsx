import { Box, Button, Flex, Skeleton, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { Layout } from "../components/Layout";
import PostSection from "../components/PostSection";
import { usePostsQuery } from "../generated/graphql";
import withApollo from "../utils/withApollo";

const Index = () => {
	const { data, loading, fetchMore, variables } = usePostsQuery({
		variables: {
			limit: 5,
			cursor: null,
		},
		notifyOnNetworkStatusChange: true,
	});

	if (loading) {
		return (
			<Layout>
				<Stack spacing={8}>
					<Skeleton height='70px' />
					<Skeleton height='70px' />
					<Skeleton height='70px' />
					<Skeleton height='70px' />
					<Skeleton height='70px' />
				</Stack>
			</Layout>
		);
	}

	if (!data) {
		return (
			<Layout>
				<Flex my={8} justifyContent='center'>
					<Box>
						<Text fontSize='4xl'>
							You got no posts for some reason
						</Text>
					</Box>
				</Flex>
			</Layout>
		);
	}

	return (
		<Layout>
			<Stack spacing={8}>
				{data?.posts.posts.map((post) =>
					!post ? null : <PostSection key={post.id} post={post} />
				)}
			</Stack>
			{data.posts.hasMore ? (
				<Flex my={8} justifyContent='center'>
					<Button
						colorScheme='teal'
						onClick={() =>
							fetchMore({
								variables: {
									limit: variables?.limit,
									cursor:
										data?.posts.posts[
											data.posts.posts.length - 1
										].createdAt,
								},
							})
						}
						isLoading={loading}>
						Load more...
					</Button>
				</Flex>
			) : null}
		</Layout>
	);
};

export default withApollo({ ssr: true })(Index);
