import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";
import Form from "../../../components/Form.js";
import { StyledLink } from "../../../components/StyledLink.js";
import useSWRMutation from "swr/mutation";

export default function EditPage() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const { data: place, isLoading, error } = useSWR(`/api/places/${id}`);
  const { trigger, isMutating } = useSWRMutation(
    `/api/places/${id}`,
    editPlace,
  );
  async function editPlace(place) {
    const response = await fetch(`/api/places/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(place),
    });

    if (response.ok) {
      // await trigger(place)
      router.push(`/places/${id}`);
      console.log("Place edited ");
    }
  }

  if (!isReady || isLoading || error) return <h2>Loading...</h2>;
  console.log(place);
  return (
    <>
      <h2 id="edit-place">Edit Place</h2>
      <Link href={`/places/${id}`} passHref legacyBehavior>
        <StyledLink justifySelf="start">back</StyledLink>
      </Link>
      <Form
        onSubmit={editPlace}
        formName={"edit-place"}
        defaultData={place.place}
      />
    </>
  );
}
