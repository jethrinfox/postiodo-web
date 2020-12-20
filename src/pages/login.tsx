import { Button, Box, Flex, Link } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import Header from "../components/Header";
import NextLink from "next/link";

export const Login: React.FC<{}> = () => {
	const [, login] = useLoginMutation();
	const router = useRouter();

	return (
		<>
			<Header />
			<Wrapper variant='small'>
				<Formik
					initialValues={{ usernameOrEmail: "", password: "" }}
					onSubmit={async (values, { setErrors }) => {
						const response = await login(values);
						if (response.data?.login.errors) {
							setErrors(toErrorMap(response.data.login.errors));
						} else if (response.data?.login.user) {
							// logged in
							router.push("/");
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
									<NextLink href='/forgot-password'>
										<Link>forgot password?</Link>
									</NextLink>
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
			</Wrapper>
		</>
	);
};

export default withUrqlClient(createUrqlClient)(Login);
