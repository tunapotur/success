import EditUserForm from "../EditUserForm";
import requireRedirectPath from "@/lib/requireRedirectPath";
import getUserById from "@/lib/getUserById";

export const dynamicParams = true;

// TODO EditUser formunda hata çıkıyor. Muhtemelen api'de yapılan düzeltmeden.
// Sorun büyük ihtimalle session'dan kullanıcı bilgisini alıp çekmekten kaynaklanıyor.
// bunun yerine params id ile sorun düzeltilebilir
async function EditUser({ params }) {
  await requireRedirectPath("/editUser");
  const user = await getUserById(params.id);

  return <EditUserForm user={user} />;
}

export default EditUser;
