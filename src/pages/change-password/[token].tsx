import { Box, Button, Flex, Link } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { InputField } from "../../components/InputField";
import { Layout } from "../../components/Layout";
import {
	MeDocument,
	MeQuery,
	useChangepasswordMutation,
} from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import withApollo from "../../utils/withApollo";

const ChangePassword: React.FC<{}> = ({}) => {
	const router = useRouter();
	const [tokenError, setTokenError] = useState("");
	const [changePassword] = useChangepasswordMutation();

	return (
		<Layout variant='small'>
			<Formik
				initialValues={{ newPassword: "" }}
				onSubmit={async ({ newPassword }, { setErrors }) => {
					const response = await changePassword({
						variables: {
							token:
								typeof router.query.token === "string"
									? router.query.token
									: "",
							newPassword,
						},
						update: (cache, { data }) => {
							cache.writeQuery<MeQuery>({
								query: MeDocument,
								data: {
									__typename: "Query",
									me: data?.changePassword.user,
								},
							});
							cache.evict({ fieldName: "posts:{}" });
						},
					});
					if (response.data?.changePassword.errors) {
						const errorMap = toErrorMap(
							response.data.changePassword.errors
						);
						if ("token" in errorMap) {
							setTokenError(errorMap.token);
						}
						setErrors(errorMap);
					} else if (response.data?.changePassword.user) {
						// logged in
						router.push("/");
					}
				}}>
				{({ isSubmitting }) => (
					<Form>
						<InputField
							name='newPassword'
							label='New Password'
							placeholder='New Password'
							type='password'
						/>
						{tokenError && (
							<Flex justifyContent='space-between'>
								<Box style={{ color: "red" }}>{tokenError}</Box>
								<Link href='/forgot-password'>
									go get a new one
								</Link>
							</Flex>
						)}
						<Button
							type='submit'
							colorScheme='teal'
							mt={4}
							isLoading={isSubmitting}>
							Change Password
						</Button>
					</Form>
				)}
			</Formik>
		</Layout>
	);
};

export default withApollo({ ssr: false })(ChangePassword);
