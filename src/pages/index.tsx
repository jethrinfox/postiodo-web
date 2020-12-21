import { Box } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { Layout } from "../components/Layout";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
	const [{ data }] = usePostsQuery();
	return (
		<Layout>
			<div>Home /</div>
			<br />
			{!data ? (
				<div>Loading...</div>
			) : (
				data.posts.map((post) => (
					<Box mt={4} key={post.id}>
						<Box>{post.title}</Box>
						<Box>{post.text}</Box>
					</Box>
				))
			)}
		</Layout>
	);
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
