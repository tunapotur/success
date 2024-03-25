const routObjList = [
  {
    id: "0000",
    path: "/login",
    redirect: { type: "authenticated", link: "/" },
  },
  {
    id: "0001",
    path: "/register",
    redirect: { type: "authenticated", link: "/" },
  },
  {
    id: "0002",
    path: "/editUser",
    redirect: { type: "unauthenticated", link: "/login" },
  },
  {
    id: "0003",
    path: "/addSuccess",
    redirect: { type: "unauthenticated", link: "/login" },
  },
  {
    id: "0004",
    path: "/editSuccess",
    redirect: { type: "unauthenticated", link: "/login" },
  },
];

export default routObjList;

export function getRoutObj(path) {
  return routObjList.filter((item) => item.path === path)[0];
}
