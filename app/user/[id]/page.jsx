import getUserById from "@/lib/getUserById";
import FormWrapper from "@/components/forms/FormWrapper";
import FormHeader from "@/components/forms/FormHeader";
import FormAdditionWrapper from "@/components/forms/FormAdditionWrapper";
import ButtonBack from "@/components/forms/ButtonBack";
import ButtonEditUser from "@/components/forms/ButtonEditUser";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import ButtonUserSuccesList from "@/components/forms/ButtonUserSuccessList";

//65e7468b7672ad35816f191e
async function User({ params }) {
  const { name, email } = await getUserById(params.id);
  const session = await getServerSession(authOptions);

  return (
    <>
      <FormHeader header={"User Profile"} />
      <FormWrapper>
        <div className={"flex flex-col gap-8"}>
          <UserInfo header={"Name"} data={name} />
          <UserInfo header={"E-Mail"} data={email} />
        </div>

        <FormAdditionWrapper>
          {String(session.user.id) === params.id ? <ButtonEditUser /> : <></>}

          {/*TODO Sayfa yüklemesi süresinde bu butonlar disable yapılacak. Nextjs Suspense özelliği kullanılabilir*/}
          {/*<ButtonBack isDisabled={isLoading || !mounted} />*/}
          <ButtonUserSuccesList />
          <ButtonBack />
        </FormAdditionWrapper>
      </FormWrapper>
    </>
  );
}

function UserInfo({ header, data }) {
  return (
    <div className={"flex flex-col gap-2"}>
      <h2 className={"font-medium"}>{`${header}:`}</h2>
      <p className={"border-b p-[0.25rem] pl-2 text-xl"}>{data}</p>
    </div>
  );
}

export default User;
