import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Box } from "@chakra-ui/react";
import React, { useState } from "react";
import { PostSnippetFragment, PostsQuery } from "../generated/graphql";
import { useMutation } from "urql";
import { vote } from "../graphql/mutations/vote";

type Props = {
  post: PostSnippetFragment;
};

const VoteSection = ({ post }: Props) => {
  const [loadingState, setLoadingState] = useState<
    "updoot-loading" | "downdoot-loading" | "not-loading"
  >("not-loading");
  const [_, update] = useMutation(vote);
  return (
    <Flex direction={"column"} justifyContent={"center"} align="center" ml="4">
      <IconButton
        onClick={async () => {
          if (post.voteStatus === 1) {
            return;
          }
          setLoadingState("updoot-loading");
          await update({
            postId: post.id,
            value: 1,
          });
          setLoadingState("not-loading");
        }}
        colorScheme={post.voteStatus === 1 ? "green" : undefined}
        isLoading={loadingState === "updoot-loading"}
        aria-label="updoot post"
        icon={<ChevronUpIcon />}
      />
      <Box>{post.points}</Box>
      <IconButton
        onClick={async () => {
          if (post.voteStatus === -1) {
            return;
          }
          setLoadingState("downdoot-loading");
          await update({
            postId: post.id,
            value: -1,
          });
          setLoadingState("not-loading");
        }}
        colorScheme={post.voteStatus === -1 ? "red" : undefined}
        isLoading={loadingState === "downdoot-loading"}
        aria-label="downdoot post"
        icon={<ChevronDownIcon />}
      />
    </Flex>
  );
};

export default VoteSection;
