const routIndexList = [
  {
    id: "0000",
    path: "",
    isId: false,
    isAuthenticated: false,
    text: [
      { name: "Home", language: "en" },
      { name: "Ana Sayfa", language: "tr" },
    ],
    authorization: ["user"],
  },
  {
    id: "0001",
    path: "success",
    isId: true,
    isAuthenticated: false,
    text: [
      { name: "Success", language: "en" },
      { name: "Başarı", language: "tr" },
    ],
    authorization: ["user"],
  },
  {
    id: "0002",
    path: "userSuccessList",
    isId: true,
    isAuthenticated: true,
    text: [
      { name: "User Success List", language: "en" },
      { name: "Kullanıcı Başarı Listesi", language: "tr" },
    ],
    authorization: ["user"],
  },
  {
    id: "0003",
    path: "addSuccess",
    isId: false,
    isAuthenticated: true,
    text: [
      { name: "Add Success", language: "en" },
      { name: "Başarı Ekle", language: "tr" },
    ],
    authorization: ["user"],
  },
  {
    id: "0004",
    path: "login",
    isId: false,
    isAuthenticated: false,
    text: [
      { name: "Login", language: "en" },
      { name: "Giriş", language: "tr" },
    ],
    authorization: ["user"],
  },
  {
    id: "0005",
    path: "register",
    isId: false,
    isAuthenticated: false,
    text: [
      { name: "Register", language: "en" },
      { name: "Kayıt", language: "tr" },
    ],
    authorization: ["user"],
  },
  {
    id: "0006",
    path: "editUser",
    isId: false,
    isAuthenticated: true,
    text: [
      { name: "Edit User", language: "en" },
      { name: "Kullanıcı Düzenleme", language: "tr" },
    ],
    authorization: ["user"],
  },
];

export default routIndexList;

export function getLinkName(id, language = "en") {
  return routIndexList
    .filter((item) => item.id === id)[0]
    .text.filter((item) => item.language === language)[0].name;
}
