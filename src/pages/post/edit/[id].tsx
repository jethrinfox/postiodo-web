import { Box, Button, Flex, Skeleton, Stack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../../../components/InputField";
import { Layout } from "../../../components/Layout";
import { useUpdatePostMutation } from "../../../generated/graphql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { useGetPostFromInt } from "../../../utils/useGetPostFromInt";
import { useIsAuth } from "../../../utils/useIsAuth";

const EditPost: React.FC<{}> = ({}) => {
	useIsAuth();
	const router = useRouter();
	const [, updatePost] = useUpdatePostMutation();
	const [{ data, fetching }] = useGetPostFromInt();

	if (fetching) {
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
						id: data.post?.id!,
						input: { text: text!, title: title! },
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

export default withUrqlClient(createUrqlClient)(EditPost);
