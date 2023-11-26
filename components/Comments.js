import styled from "styled-components";
import { FormContainer, Input, Label } from "./Form";
import { StyledButton } from "./StyledButton.js";
import { useRouter } from "next/router.js";

export default function Comments({ locationName, comments }) {
  const Article = styled.article`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 5px solid black;
    border-radius: 0.8rem;
    padding: 0.5rem;
    text-align: center;
    p {
      border-bottom: solid 1px black;
      padding: 20px;
    }
  `;
  const router = useRouter();
  const { id } = router.query;

  async function handleSubmitComment(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const comment = Object.fromEntries(formData);
    try {
      const response = await fetch(`/api/places/${id}`, {
        method: "PUT",
        body: JSON.stringify(comment),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // router.push(`/places/${id}`);
        router.reload();
        console.log("Comment Posted");
      }
    } catch (error) {
      console.log(error);
    }
  }

  // ------- frontEnd Comment submit ---------
  async function onCommentSubmit(comment) {}
  return (
    <Article>
      <FormContainer onSubmit={handleSubmitComment}>
        <Label htmlFor="name">Your Name</Label>
        <Input type="text" name="name" placeholder="name" />
        <Label htmlFor="comment">Your Comment</Label>
        <Input type="text" name="comment" placeholder="comment here..." />
        <StyledButton type="submit">Send</StyledButton>
      </FormContainer>
      {comments && (
        <>
          <h1> {comments.length} fans commented on this place:</h1>
          {comments.map(({ name, comment }, idx) => {
            return (
              <div key={idx}>
                <p>
                  <small>
                    <strong>{name}</strong> commented on {locationName}
                  </small>
                </p>
                <span>{comment}</span>
              </div>
            );
          })}
        </>
      )}
    </Article>
  );
}
