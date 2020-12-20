import { Box, Button, Flex, Link } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Header from "../../components/Header";
import { InputField } from "../../components/InputField";
import { Wrapper } from "../../components/Wrapper";
import { useChangepasswordMutation } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { toErrorMap } from "../../utils/toErrorMap";
import NextLink from "next/link";

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
	const router = useRouter();
	const [, changePassword] = useChangepasswordMutation();
	const [tokenError, setTokenError] = useState("");

	return (
		<>
			<Header />
			<Wrapper variant='small'>
				<Formik
					initialValues={{ newPassword: "" }}
					onSubmit={async ({ newPassword }, { setErrors }) => {
						const response = await changePassword({
							token,
							newPassword,
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
									<Box style={{ color: "red" }}>
										{tokenError}
									</Box>
									<NextLink href='/forgot-password'>
										<Link>go get a new one</Link>
									</NextLink>
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
			</Wrapper>
		</>
	);
};

ChangePassword.getInitialProps = ({ query }) => {
	return {
		token: query.token as string,
	};
};

export default withUrqlClient(createUrqlClient)(ChangePassword);
