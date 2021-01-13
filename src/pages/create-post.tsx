import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { useCreatePostMutation } from "../generated/graphql";
import { useIsAuth } from "../utils/useIsAuth";
import withApollo from "../utils/withApollo";

const CreatePost: React.FC<{}> = ({}) => {
	useIsAuth();
	const [createPost] = useCreatePostMutation();
	const router = useRouter();

	return (
		<Layout variant='small'>
			<Formik
				initialValues={{ title: "", text: "" }}
				onSubmit={async (values) => {
					const { errors } = await createPost({
						variables: { input: values },
						update: (cache) => {
							cache.evict({ fieldName: "posts:{}" });
						},
					});

					if (!errors) {
						router.back();
					}
				}}>
				{({ isSubmitting }) => (
					<Form>
						<InputField
							name='title'
							label='Title'
							placeholder='Title'
							type='text'
						/>
						<Box mt={4}>
							<InputField
								name='text'
								label='Body'
								placeholder='... text'
								textarea
							/>
						</Box>
						<Button
							type='submit'
							colorScheme='teal'
							mt={4}
							isLoading={isSubmitting}>
							create post
						</Button>
					</Form>
				)}
			</Formik>
		</Layout>
	);
};

export default withApollo({ ssr: false })(CreatePost);
