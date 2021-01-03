import React from "react";
import { Flex, Heading, Box, Button, Text, Link } from "@chakra-ui/react";
import { useLogOutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { useRouter } from "next/router";

const MenuItems = ({ children }: any) => (
	<Text mt={{ base: 4, md: 0 }} mr={6} display='block'>
		{children}
	</Text>
);

const Header = (props: any) => {
	const [show, setShow] = React.useState(false);
	const handleToggle = () => setShow(!show);
	const [{ fetching: logoutFetching }, logout] = useLogOutMutation();
	const [{ data, fetching }] = useMeQuery({
		pause: isServer(),
	});
	const router = useRouter();

	const handleLogout = () => {
		logout();
		router.push("/login");
	};

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
				<Link href='/register'>
					<Button mr={4} bg='transparent' border='1px'>
						Register
					</Button>
				</Link>
				<Link href='/login'>
					<Button bg='transparent' border='1px'>
						Login
					</Button>
				</Link>
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
					<Link mr={4} href='/create-post'>
						<Button bg='transparent' border='1px'>
							Create Post
						</Button>
					</Link>
					<Button
						onClick={() => handleLogout()}
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
			padding='1.5rem'
			bg='teal.500'
			color='white'
			align='center'
			justify='center'
			{...props}>
			<Flex
				as='nav'
				flex='1'
				align='center'
				justify='space-between'
				wrap='wrap'
				maxW='900px'>
				<Flex align='center' mr={5}>
					<Link href='/'>
						<Heading as='h1' size='lg' letterSpacing={"-.1rem"}>
							Postiodo
						</Heading>
					</Link>
				</Flex>

				<Box
					display={{ base: "block", md: "none" }}
					onClick={handleToggle}>
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
		</Flex>
	);
};

export default Header;
