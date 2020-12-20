import { Button, Box, Flex, Link } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import Header from "../components/Header";
import NextLink from "next/link";
import { useForgotPasswordMutation } from "../generated/graphql";

const ForgotPassword: React.FC<{}> = ({}) => {
	const [complete, setComplete] = useState(false);
	const [, forgotPassword] = useForgotPasswordMutation();

	return (
		<>
			<Header />
			<Wrapper variant='small'>
				<Formik
					initialValues={{ email: "" }}
					onSubmit={async (values) => {
						await forgotPassword(values);
						setComplete(true);
					}}>
					{({ isSubmitting }) =>
						complete ? (
							<Box>
								if an account with that email exist, we sent you
								an email
							</Box>
						) : (
							<Form>
								<InputField
									name='email'
									label='Email'
									type='email'
								/>
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
									Forgot password
								</Button>
							</Form>
						)
					}
				</Formik>
			</Wrapper>
		</>
	);
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
