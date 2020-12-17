import { Box } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import Header from "../components/Header";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
	const [{ data }] = usePostsQuery();
	return (
		<>
			<Header />
			<div>Home /</div>
			<br />
			{!data ? (
				<div>Loading...</div>
			) : (
				data.posts.map((post) => (
					<Box key={post.id}>
						{post.id}
						<Box>{post.title}</Box>
					</Box>
				))
			)}
		</>
	);
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
