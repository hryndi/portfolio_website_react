import styled from "@emotion/styled";

const Section = styled.section``;
const H1 = styled.h1``;
const ContentWrapp = styled.div``;
const Form = styled.form``;
const UserInput = styled.input``;
const CVWrapp = styled.div``;
const CVP = styled.p``;
const ContactInfoWrapp = styled.div``;
const ContactInfoP = styled.p``;
const SocialUl = styled.ul``;
const SocialLi = styled.p``;

const ContactMe = () => {
  return (
    <Section>
      <H1>Ways to contact me</H1>
      <ContentWrapp>
        <Form>
          <UserInput />
          <UserInput />
          <UserInput />
        </Form>
        <CVWrapp>
          <CVP>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti
            quae quidem eum, doloremque atque aliquid dolor, sit amet
            consectetur .
          </CVP>

          <ContactInfoWrapp>
            <ContactInfoP>E-mail:something@gmail.com</ContactInfoP>
            <ContactInfoP>Phone Number:+491765143251 </ContactInfoP>
            <SocialUl>
              <SocialLi>Facebook</SocialLi>
              <SocialLi>Git</SocialLi>
              <SocialLi>Twitter</SocialLi>
            </SocialUl>
          </ContactInfoWrapp>
        </CVWrapp>
      </ContentWrapp>
    </Section>
  );
};

export default ContactMe;
