import { DeleteIcon } from "@chakra-ui/icons";
import {
	Flex,
	Stack,
	Skeleton,
	Box,
	Heading,
	Divider,
	IconButton,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { Layout } from "../../components/Layout";
import { NextChakraLink } from "../../components/Link";
import { VoteSection } from "../../components/VoteSection";
import { useDeletePostMutation, usePostQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";

const Post: React.FC<{}> = ({}) => {
	const router = useRouter();
	const intId =
		typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
	const [{ data, fetching }] = usePostQuery({
		pause: intId === -1,
		variables: {
			id: intId,
		},
	});
	const [, deletePost] = useDeletePostMutation();

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
				<Flex flexDirection='column'>
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
					<Box>
						{data?.post?.text}
						<Flex
							mt={4}
							justifyContent='center'
							alignItems='center'>
							<IconButton
								onClick={() =>
									deletePost({ id: data?.post?.id })
								}
								aria-label='delete post'
								colorScheme='red'
								icon={<DeleteIcon w={4} h={4} />}
							/>
						</Flex>
					</Box>
				</Flex>
			</Flex>
		</Layout>
	);
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
