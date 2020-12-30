import { Box, Button, Flex, Skeleton, Stack, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import Feature from "../components/Feature";
import { Layout } from "../components/Layout";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
	const [variables, setVariables] = useState({
		limit: 5,
		cursor: null as null | string,
	});
	const [{ data, fetching }] = usePostsQuery({
		variables,
	});

	if (!fetching && !data) {
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
				{!data && fetching ? (
					<>
						<Skeleton height='50px' />
						<Skeleton height='50px' />
						<Skeleton height='50px' />
					</>
				) : (
					data?.posts.posts.map((post) => (
						<Feature key={post.id} post={post} />
					))
				)}
			</Stack>
			{data && data.posts.hasMore ? (
				<Flex my={8} justifyContent='center'>
					<Button
						colorScheme='teal'
						onClick={() =>
							setVariables({
								limit: variables.limit,
								cursor:
									data?.posts.posts[
										data.posts.posts.length - 1
									].createdAt,
							})
						}
						isLoading={fetching}>
						Load more...
					</Button>
				</Flex>
			) : null}
		</Layout>
	);
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
