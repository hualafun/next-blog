export const deletePostById = async (id: any) => {
  const res = await fetch(`/api/posts?id=${id}`, {
    method: "DELETE",
    cache: "no-store",
  });
  return res;
};
