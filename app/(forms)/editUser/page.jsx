import EditUserForm from "./EditUserForm";
import requireRedirectPath from "@/lib/requireRedirectPath";
// TODO EditUser formunda hata çıkıyor. Muhtemelen api'de yapılan düzeltmeden.
// Sorun büyük ihtimalle session'dan kullanıcı bilgisini alıp çekmekten kaynaklanıyor.
// bunun yerine params id ile sorun düzeltilebilir
async function EditUser() {
  await requireRedirectPath("/editUser");

  return <EditUserForm />;
}

export default EditUser;
