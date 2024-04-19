import styled from "@emotion/styled";

const HomeSection = styled.section``;
const Header = styled.header``;
const HeaderLogo = styled.div``;
const HomeUl = styled.ul``;
const HomeLi = styled.li``;
const ContentArticle = styled.article``;
const ContentWrappDiv = styled.div``;
const MainContent = styled.div``;
const HeroMainH1 = styled.h1``;
const HeroMainParagrapf = styled.p``;
const HeroContactButton = styled.button``;
const SocialWrap = styled.div``;
const HeroImgDiv = styled.div``;
const HeroImg = styled.img``;

const Home = () => {
  return (
    <HomeSection id="home-section">
      <Header>
        <HeaderLogo className="logo">Name</HeaderLogo>
        <HomeUl className="links">
          <HomeLi>home</HomeLi>
          <HomeLi>about me</HomeLi>
          <HomeLi>projects</HomeLi>
          <HomeLi>contact me</HomeLi>
        </HomeUl>
      </Header>
      <ContentArticle className="content">
        <ContentWrappDiv className="content-wrapper">
          <MainContent>
            <HeroMainH1>
              Hi, my name is Dmytro Hrynov, and i am a Frontend Developer
            </HeroMainH1>
            <HeroMainParagrapf>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Asperiores officiis accusamus alias voluptas enim fugiat amor
              turam.
            </HeroMainParagrapf>
            <HeroContactButton>Contact me</HeroContactButton>
            <SocialWrap>
              <HomeUl>
                <HomeLi>Github</HomeLi>
                <HomeLi>Insta</HomeLi>
                <HomeLi>Facebook</HomeLi>
              </HomeUl>
            </SocialWrap>
          </MainContent>
        </ContentWrappDiv>
        <HeroImgDiv className="hero-img-wrapper">
          <HeroImg src="" alt="hero-image" />
        </HeroImgDiv>
      </ContentArticle>
    </HomeSection>
  );
};

export default Home;
