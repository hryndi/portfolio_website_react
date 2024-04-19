import styled from "@emotion/styled";
const Section = styled.section``;
const MainH1 = styled.h1``;
const MainP = styled.p``;
const SecondaryP = styled.p``;

const AboutMe = () => {
  return (
    <Section>
      <MainH1>About Me</MainH1>
      <MainP>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus quo
        dicta eveniet qui porro iusto daseo ato patam.
      </MainP>

      <SecondaryP>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
        doloremque autem ut voluptatibus a dolores commodi perferendis iste
        nihil ullam repudiandae voluptatem ab unde amet at voluptatum blanditiis
        aperiam assumenda, incidunt eius est exercitationem. Labore dolores
        recusandae iste dolorem similique dolore quia assumenda impedit expedita
        officia cumque, porro autem, ab repellendus reiciendis tenetur culpa ea!
      </SecondaryP>
    </Section>
  );
};

export default AboutMe;
