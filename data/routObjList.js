const routObjList = [
  {
    id: "0000",
    path: "/",
    redirect: null,
    text: [
      { name: "Home", language: "en" },
      { name: "Ana Sayfa", language: "tr" },
    ],
  },
  {
    id: "0001",
    path: "/success",
    redirect: null,
    text: [
      { name: "Success", language: "en" },
      { name: "Başarı", language: "tr" },
    ],
  },
  {
    id: "0002",
    path: "/userSuccessList",
    redirect: null,
    text: [
      { name: "User Success List", language: "en" },
      { name: "Kullanıcı Başarı Listesi", language: "tr" },
    ],
  },
  {
    id: "0003",
    path: "/login",
    redirect: { type: "authenticated", link: "/" },
    text: [
      { name: "User Login", language: "en" },
      { name: "Kullanıcı Giriş", language: "tr" },
    ],
  },
  {
    id: "0004",
    path: "/register",
    redirect: { type: "authenticated", link: "/" },
    text: [
      { name: "Register", language: "en" },
      { name: "Kayıt", language: "tr" },
    ],
  },
  {
    id: "0005",
    path: "/editUser",
    redirect: { type: "unauthenticated", link: "/login" },
    text: [
      { name: "Edit User", language: "en" },
      { name: "Kullanıcı Düzenleme", language: "tr" },
    ],
  },
  {
    id: "0006",
    path: "/addSuccess",
    redirect: { type: "unauthenticated", link: "/login" },
    text: [
      { name: "Add Success", language: "en" },
      { name: "Başarı Ekle", language: "tr" },
    ],
  },
];

export default routObjList;

export function getRoutObj(path, language = "en") {
  const routObj = routObjList.filter((item) => item.path === path)[0];

  routObj.name = routObj.text.filter(
    (item) => item.language === language,
  )[0].name;

  return routObj;
}
