import Link from "next/link";
import { useRouter } from "next/router.js";
import useSWR from "swr";
import styled from "styled-components";
import { StyledLink } from "../../../components/StyledLink.js";
import { StyledButton } from "../../../components/StyledButton.js";
import { StyledImage } from "../../../components/StyledImage.js";
import Comments from "../../../components/Comments.js";
import { fallBackObject } from "../../../lib/utils/fallBackObject";
import Head from "next/head.js";
import useRegex from "../../../lib/utils/regexCheck.ts";
import { stringify } from "uuid";
import { PageNotFoundError } from "next/dist/shared/lib/utils.js";

const ImageContainer = styled.div`
  position: relative;
  height: 15rem;
`;

const ButtonContainer = styled.section`
  display: flex;
  justify-content: space-between;
  gap: 0.2rem;

  & > * {
    flex-grow: 1;
    text-align: center;
  }
`;

const StyledLocationLink = styled(StyledLink)`
  text-align: center;
  background-color: white;
  border: 3px solid lightsalmon;
`;

export default function DetailsPage() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const idCheck = useRegex(id);
  // if (!useRegex(id)) {
  //   console.log("not a valid place");
  //   // router.push("/");
  //   return <p> your are lost </p>;
  // }
  const {
    data: { place, comments } = {},
    isLoading,
    error,
  } = useSWR(`/api/places/${id}`);

  if (!isReady || isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.log(error);
    router.push("/404");
    // return <p>your are lost</p>;
  }

  // ------- frontEnd Delete ---------
  async function deletePlace() {
    try {
      const response = await fetch(`/api/places/${id}`, { method: "DELETE" });

      if (response.ok) {
        router.push("/");
        console.log("deleted");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Head>
        <title>{place?.name || "Tourio"}</title>
      </Head>
      <Link href={"/"} passHref legacyBehavior>
        <StyledLink justifySelf="start">back</StyledLink>
      </Link>
      <ImageContainer>
        <StyledImage
          src={place?.image || fallBackObject.image}
          priority
          fill
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          alt=""
        />
      </ImageContainer>
      <h2>
        {place?.name || fallBackObject.name},{" "}
        {place?.location || fallBackObject.location}
      </h2>
      <Link
        href={place?.mapURL || fallBackObject.mapURL}
        passHref
        legacyBehavior
      >
        <StyledLocationLink>Location on Google Maps</StyledLocationLink>
      </Link>
      <p>{place?.description}</p>
      <ButtonContainer>
        <Link href={`/places/${id}/edit`} passHref legacyBehavior>
          <StyledLink>Edit</StyledLink>
        </Link>
        <StyledButton onClick={deletePlace} type="button" variant="delete">
          Delete
        </StyledButton>
      </ButtonContainer>
      <Comments locationName={place?.name} comments={comments} />
    </>
  );
}
