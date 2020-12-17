import React from "react";
import { Flex, Heading, Box, Button, Text, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useLogOutMutation, useMeQuery } from "../generated/graphql";

const MenuItems = ({ children }: any) => (
	<Text mt={{ base: 4, md: 0 }} mr={6} display='block'>
		{children}
	</Text>
);

// Note: This code could be better, so I'd recommend you to understand how I solved and you could write yours better :)
const Header = (props: any) => {
	const [show, setShow] = React.useState(false);
	const handleToggle = () => setShow(!show);
	const [{ data, fetching }] = useMeQuery();
	const [{ fetching: logoutFetching }, logout] = useLogOutMutation();

	let body = null;
	// data is loading
	if (fetching) {
		body = null;
		// user not logged in
	} else if (!data?.me) {
		body = (
			<Box
				display={{ sm: show ? "block" : "none", md: "block" }}
				mt={{ base: 4, md: 0 }}>
				<NextLink href='/register'>
					<Button mr={4} bg='transparent' border='1px'>
						Register
					</Button>
				</NextLink>
				<NextLink href='/login'>
					<Button bg='transparent' border='1px'>
						Login
					</Button>
				</NextLink>
			</Box>
		);
		// user logged in
	} else {
		body = (
			<Box
				display={{ sm: show ? "block" : "none", md: "block" }}
				mt={{ base: 4, md: 0 }}>
				<Flex align='center' justify='space-between'>
					<MenuItems>Welcome {data?.me?.username}</MenuItems>
					<Button
						onClick={() => logout()}
						bg='transparent'
						border='1px'
						isLoading={logoutFetching}>
						LogOut
					</Button>
				</Flex>
			</Box>
		);
	}

	return (
		<Flex
			as='nav'
			align='center'
			justify='space-between'
			wrap='wrap'
			padding='1.5rem'
			bg='teal.500'
			color='white'
			{...props}>
			<Flex align='center' mr={5}>
				<NextLink href='/'>
					<Link>
						<Heading as='h1' size='lg' letterSpacing={"-.1rem"}>
							Lireddit
						</Heading>
					</Link>
				</NextLink>
			</Flex>

			<Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
				<svg
					fill='white'
					width='12px'
					viewBox='0 0 20 20'
					xmlns='http://www.w3.org/2000/svg'>
					<title>Menu</title>
					<path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
				</svg>
			</Box>

			{body}
		</Flex>
	);
};

export default Header;
