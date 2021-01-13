import { Button, Box, Flex, Link } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React from "react";
import { InputField } from "../components/InputField";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { Layout } from "../components/Layout";
import withApollo from "../utils/withApollo";

export const Login: React.FC<{}> = () => {
	const [login] = useLoginMutation();
	const router = useRouter();

	return (
		<Layout variant='small'>
			<Formik
				initialValues={{ usernameOrEmail: "", password: "" }}
				onSubmit={async (values, { setErrors }) => {
					const response = await login({
						variables: values,
						update: (cache, { data }) => {
							cache.writeQuery<MeQuery>({
								query: MeDocument,
								data: {
									__typename: "Query",
									me: data?.login.user,
								},
							});
							cache.evict({ fieldName: "posts:{}" });
						},
					});
					if (response.data?.login.errors) {
						setErrors(toErrorMap(response.data.login.errors));
					} else if (response.data?.login.user) {
						// logged in
						if (typeof router.query.next === "string") {
							router.push(router.query.next);
						} else {
							router.push("/");
						}
					}
				}}>
				{({ isSubmitting }) => (
					<Form>
						<InputField
							name='usernameOrEmail'
							label='Username or Email'
						/>
						<Box mt={4}>
							<InputField
								name='password'
								label='Password'
								type='password'
							/>
						</Box>
						<Flex justifyContent='flex-end'>
							<Box mt={2}>
								<Link href='/forgot-password'>
									forgot password?
								</Link>
							</Box>
						</Flex>
						<Button
							type='submit'
							colorScheme='teal'
							mt={4}
							isLoading={isSubmitting}>
							Login
						</Button>
					</Form>
				)}
			</Formik>
		</Layout>
	);
};

export default withApollo({ ssr: false })(Login);
