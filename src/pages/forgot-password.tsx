import { Button, Box, Flex, Link } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import { InputField } from "../components/InputField";
import { useForgotPasswordMutation } from "../generated/graphql";
import { Layout } from "../components/Layout";
import withApollo from "../utils/withApollo";

const ForgotPassword: React.FC<{}> = ({}) => {
	const [complete, setComplete] = useState(false);
	const [forgotPassword] = useForgotPasswordMutation();

	return (
		<Layout variant='small'>
			<Formik
				initialValues={{ email: "" }}
				onSubmit={async (values) => {
					await forgotPassword({ variables: values });
					setComplete(true);
				}}>
				{({ isSubmitting }) =>
					complete ? (
						<Box>
							if an account with that email exist, we sent you an
							email
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
								Forgot password
							</Button>
						</Form>
					)
				}
			</Formik>
		</Layout>
	);
};

export default withApollo({ ssr: false })(ForgotPassword);
