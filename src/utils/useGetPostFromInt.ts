import { usePostQuery } from "../generated/graphql";
import { useGetIntUrl } from "./useGetIntUrl";

export const useGetPostFromInt = () => {
	const intId = useGetIntUrl();
	return usePostQuery({
		skip: intId === -1,
		variables: {
			id: intId,
		},
	});
};
