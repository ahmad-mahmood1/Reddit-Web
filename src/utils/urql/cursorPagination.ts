import { Resolver } from "@urql/exchange-graphcache";

export const cursorPagination = (): Resolver => {
  return (_parent, args, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;
    const allFields = cache.inspectFields(entityKey);
    const fieldsInfos = allFields.filter(
      (info) => info.fieldName === fieldName
    );
    const size = fieldsInfos.length;
    if (size === 0) {
      return undefined;
    }

    const isInCache = cache.resolve({ __typename: entityKey }, fieldName, args);
    info.partial = !isInCache;

    let hasMore = true;
    const results: string[] = [];
    fieldsInfos.forEach((fi) => {
      const key = cache.resolve(entityKey, fi.fieldKey) as string;
      const data = cache.resolve(key, "posts") as string[];
      const _hasMore = cache.resolve(key, "hasMore");
      if (!_hasMore) {
        hasMore = _hasMore as boolean;
      }
      results.push(...data);
    });

    return {
      __typename: "PaginatedPosts",
      hasMore,
      posts: results,
    };
  };
};
