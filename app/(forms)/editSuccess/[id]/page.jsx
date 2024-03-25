import EditSuccessForm from "@/app/(forms)/editSuccess/[id]/EditSuccessForm";
import requireRedirectPath from "@/lib/requireRedirectPath";
import GetSuccessById from "@/lib/getSuccessById";

export const dynamicParams = true;

async function EditSuccess({ params }) {
  await requireRedirectPath("/editSuccess");
  const success = await GetSuccessById(params.id);

  return (
    <>
      <EditSuccessForm success={success} />
    </>
  );
}

export default EditSuccess;
