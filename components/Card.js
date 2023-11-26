import Link from "next/link.js";
import styled from "styled-components";
import { StyledImage } from "./StyledImage.js";

const Article = styled.article`
  border: 5px solid black;
  border-radius: 0.8rem;
  padding: 0.5rem;
`;

const ImageContainer = styled.div`
  position: relative;
  height: 10rem;
`;

const Figure = styled.figure`
  position: relative;
  margin: 0;
`;

const Anchor = styled.a`
  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
`;

const ScreenReaderOnly = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;

export default function Card({ name, image, location, id }) {
  return (
    <Article>
      <Figure>
        <ImageContainer>
          <StyledImage
            src={image || 'https://images.unsplash.com/photo-1471623320832-752e8bbf8413?q=80&w=2859&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
            fill
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            alt=""
          />
        </ImageContainer>
        <figcaption>{name}</figcaption>
      </Figure>
      <p>Location: {location}</p>
      <Link href={`places/${id}`} passHref legacyBehavior>
        <Anchor>
          <ScreenReaderOnly>More Info</ScreenReaderOnly>
        </Anchor>
      </Link>
    </Article>
  );
}
