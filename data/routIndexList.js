/** if page doesn't need authentication, so it also doesn't need authorization.
 * That's why we can say;
 * if isAuthenticated is false authorization must be null. */
// authorization can have "user", "admin","superior", "etc." roles.

const routIndexList = [
  {
    id: "0000",
    path: "/",
    isId: false,
    isAuthenticated: false,
    redirect: null,
    text: [
      { name: "Home", language: "en" },
      { name: "Ana Sayfa", language: "tr" },
    ],
    authorization: null,
  },
  {
    id: "0001",
    path: "/success",
    isId: true,
    isAuthenticated: false,
    redirect: null,
    text: [
      { name: "Success", language: "en" },
      { name: "Başarı", language: "tr" },
    ],
    authorization: null,
  },
  {
    id: "0002",
    path: "/userSuccessList",
    isId: true,
    isAuthenticated: false,
    redirect: null,
    text: [
      { name: "User Success List", language: "en" },
      { name: "Kullanıcı Başarı Listesi", language: "tr" },
    ],
    authorization: null,
  },
  {
    id: "0003",
    path: "/login",
    isId: false,
    isAuthenticated: false,
    redirect: "authenticated",
    text: [
      { name: "User Login", language: "en" },
      { name: "Kullanıcı Giriş", language: "tr" },
    ],
    authorization: null,
  },
  {
    id: "0004",
    path: "/register",
    isId: false,
    isAuthenticated: false,
    redirect: "authenticated",
    text: [
      { name: "Register", language: "en" },
      { name: "Kayıt", language: "tr" },
    ],
    authorization: null,
  },
  {
    id: "0005",
    path: "/editUser",
    isId: false,
    isAuthenticated: true,
    redirect: "unauthenticated",
    text: [
      { name: "Edit User", language: "en" },
      { name: "Kullanıcı Düzenleme", language: "tr" },
    ],
    authorization: ["user"],
  },
  {
    id: "0006",
    path: "/addSuccess",
    isId: false,
    isAuthenticated: true,
    redirect: "unauthenticated",
    text: [
      { name: "Add Success", language: "en" },
      { name: "Başarı Ekle", language: "tr" },
    ],
    authorization: ["user"],
  },
];

export default routIndexList;

export function getRoutObjFromPath(path, language = "en") {
  const routObj = routIndexList.filter((item) => item.path === path)[0];

  routObj.name = routObj.text.filter(
    (item) => item.language === language,
  )[0].name;

  return routObj;
}
