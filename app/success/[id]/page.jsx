import requireRedirectPath from "@/lib/requireRedirectPath";

async function Success() {
  await requireRedirectPath("/success");
  return <div>Success Detail</div>;
}

export default Success;
