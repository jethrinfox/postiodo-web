import { Box, Button, Flex, Skeleton, Stack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../../../components/InputField";
import { Layout } from "../../../components/Layout";
import { useUpdatePostMutation } from "../../../generated/graphql";
import { useGetPostFromInt } from "../../../utils/useGetPostFromInt";
import { useIsAuth } from "../../../utils/useIsAuth";
import withApollo from "../../../utils/withApollo";

const EditPost: React.FC<{}> = ({}) => {
	useIsAuth();
	const router = useRouter();
	const [updatePost] = useUpdatePostMutation();
	const { data, loading } = useGetPostFromInt();

	if (loading) {
		return (
			<Layout variant='small'>
				<Stack spacing={8}>
					<Skeleton height='300px' />
				</Stack>
			</Layout>
		);
	}

	if (!data) {
		return (
			<Layout>
				<Flex my={8} justifyContent='center'>
					<Box>You got no post for some reason</Box>
				</Flex>
			</Layout>
		);
	}

	return (
		<Layout variant='small'>
			<Formik
				initialValues={{
					title: data.post?.title,
					text: data.post?.text,
				}}
				onSubmit={async ({ title, text }) => {
					await updatePost({
						variables: {
							id: data.post?.id!,
							input: { text: text!, title: title! },
						},
					});
					router.back();
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
							update post
						</Button>
					</Form>
				)}
			</Formik>
		</Layout>
	);
};

export default withApollo({ ssr: false })(EditPost);
