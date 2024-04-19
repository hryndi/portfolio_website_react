import styled from "@emotion/styled";

const Section = styled.section``;
const ThreeColumnWrapper = styled.div``;
const CountNum = styled.span``;
const DescribeP = styled.p``;

const ThreeColumn = () => {
  return (
    <Section>
      <ThreeColumnWrapper>
        <CountNum>+100</CountNum>
        <DescribeP>Commits was done</DescribeP>
      </ThreeColumnWrapper>
      <ThreeColumnWrapper>
        <CountNum>+10</CountNum>
        <DescribeP>Projects was build</DescribeP>
      </ThreeColumnWrapper>
      <ThreeColumnWrapper>
        <CountNum>+5</CountNum>
        <DescribeP>internships was absolved</DescribeP>
      </ThreeColumnWrapper>
    </Section>
  );
};

export default ThreeColumn;
