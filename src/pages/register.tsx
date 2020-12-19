import { Button, Box } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import Header from "../components/Header";

export const Register: React.FC<{}> = ({}) => {
	const [, register] = useRegisterMutation();
	const router = useRouter();

	return (
		<>
			<Header />
			<Wrapper variant='small'>
				<Formik
					initialValues={{ email: "", username: "", password: "" }}
					onSubmit={async (values, { setErrors }) => {
						const response = await register({ options: values });
						if (response.data?.register.errors) {
							setErrors(
								toErrorMap(response.data.register.errors)
							);
						} else if (response.data?.register.user) {
							// logged in
							router.push("/");
						}
					}}>
					{({ isSubmitting }) => (
						<Form>
							<InputField
								name='email'
								label='Email'
								type='email'
							/>
							<Box mt={4}>
								<InputField
									name='username'
									label='Username'
									type='text'
								/>
							</Box>
							<Box mt={4}>
								<InputField
									name='password'
									label='Password'
									type='password'
								/>
							</Box>
							<Button
								type='submit'
								colorScheme='teal'
								mt={4}
								isLoading={isSubmitting}>
								Register
							</Button>
						</Form>
					)}
				</Formik>
			</Wrapper>
		</>
	);
};

export default withUrqlClient(createUrqlClient)(Register);
