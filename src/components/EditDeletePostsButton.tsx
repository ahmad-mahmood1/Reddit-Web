import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, IconButton } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { useMutation, useQuery } from "urql";
import { useFragment } from "../generated/fragment-masking";
import { LoggedInUserFragmentDoc } from "../generated/graphql";
import { deletePostMutation } from "../graphql/mutations/deletePost";
import { currentUser } from "../graphql/queries/me";

interface EditDeletePostButtonsProps {
  id: number;
  creatorId: number;
}

export const EditDeletePostButtons: React.FC<EditDeletePostButtonsProps> = ({
  id,
  creatorId,
}) => {
  const [{ data: meData }] = useQuery({ query: currentUser });
  const loggedInUser = useFragment(LoggedInUserFragmentDoc, meData?.me);
  const [, onDelete] = useMutation(deletePostMutation);

  if (loggedInUser?.id !== creatorId) {
    return null;
  }

  return (
    <Box>
      <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
        <IconButton
          // as={NextLink}
          // href={`/post/edit/${id}`}
          mr={4}
          icon={<EditIcon />}
          aria-label="Edit Post"
          colorScheme={"green"}
        />
      </NextLink>
      <IconButton
        icon={<DeleteIcon />}
        aria-label="Delete Post"
        onClick={() => {
          onDelete({ id });
        }}
        colorScheme={"red"}
      />
    </Box>
  );
};
