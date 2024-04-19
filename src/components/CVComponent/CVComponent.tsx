import styled from "@emotion/styled";

const Section = styled.section``;
const MainH1 = styled.h1``;
const ContentWrapp = styled.div``;
const CompaniesUl = styled.ul``;
const CompaniesLi = styled.li``;
const CVContent = styled.div``;
const CVH1 = styled.h1``;
const CVP = styled.p``;

const CVComponent = () => {
  return (
    <Section>
      <MainH1>My internships and CV</MainH1>
      <ContentWrapp>
        <CompaniesUl>
          <CompaniesLi>Company1</CompaniesLi>
          <CompaniesLi>Company2</CompaniesLi>
          <CompaniesLi>Company3</CompaniesLi>
          <CompaniesLi>Company4</CompaniesLi>
        </CompaniesUl>
        <CVContent>
          <CVH1>Internships and CV</CVH1>
          <CVP>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Exercitationem consequuntur nam eligendi, harum distinctio repellat
            laboriosam suscipit provident ducimus eius!
          </CVP>
        </CVContent>
      </ContentWrapp>
    </Section>
  );
};
export default CVComponent;
