import { Button, Box } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React from "react";
import { InputField } from "../components/InputField";
import { MeDocument, MeQuery, useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { Layout } from "../components/Layout";
import withApollo from "../utils/withApollo";

export const Register: React.FC<{}> = ({}) => {
	const [register] = useRegisterMutation();
	const router = useRouter();

	return (
		<Layout variant='small'>
			<Formik
				initialValues={{ email: "", username: "", password: "" }}
				onSubmit={async (values, { setErrors }) => {
					const response = await register({
						variables: { options: values },
						update: (cache, { data }) => {
							cache.writeQuery<MeQuery>({
								query: MeDocument,
								data: {
									__typename: "Query",
									me: data?.register.user,
								},
							});
						},
					});
					if (response.data?.register.errors) {
						setErrors(toErrorMap(response.data.register.errors));
					} else if (response.data?.register.user) {
						// logged in
						router.push("/");
					}
				}}>
				{({ isSubmitting }) => (
					<Form>
						<InputField name='email' label='Email' type='email' />
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
		</Layout>
	);
};

export default withApollo({ ssr: false })(Register);
