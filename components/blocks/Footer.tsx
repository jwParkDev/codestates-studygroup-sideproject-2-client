import React from "react";
import styled from "styled-components"
import { useEffect, useState } from 'react';

const StyledFooter = styled.footer`
  width:100%;
  border-top: 1px solid #e5e5e5;
  margin-top: 50px;
`;

const FooterContainer = styled.div`
  height:100px;
  width:1000px;
  margin:0 auto;
  display:flex;
  justify-content: space-between;
  align-items: center;
`;

const FooterInfoWrapper = styled.div``;

const FooterInfoText = styled.div`
  color: #777;
  margin-bottom: 10px;
`;

const FooterInfoIconWrapper = styled.ul`
  display:flex;
`;

const FooterInfoIcon = styled.li`
  list-style: none;
  padding-right: 15px;

  & > a > img {
    width:25px;
  }
`;

const FooterGoTopButton = styled.button`
  background-color: #fff;
  border:0;
  & > img {
    width:30px;
  }
`;

function TopButton() {
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
      window.scroll({
          top: 0,
          behavior: 'smooth'
      })

  }
  useEffect(() => {
      const handleShowButton = () => {
          if (window.scrollY > 100) {
              setShowButton(true)
          } else {
              setShowButton(false)
          }
      }

      console.log(window.scrollY)
      window.addEventListener("scroll", handleShowButton)
      return () => {
          window.removeEventListener("scroll", handleShowButton)
      }
  }, [])

  return showButton && (
      <div className="scroll__container">
          <FooterGoTopButton onClick={scrollToTop} type="button"><img src='/images/top_button.png' alt='go to top button' /></FooterGoTopButton>
      </div>

  )
}

export default function Footer():React.ReactElement {
  return (
    <StyledFooter>
      <FooterContainer>
        <FooterInfoWrapper>
          <FooterInfoText>
            © 2022 jwParkDev
          </FooterInfoText>
          <FooterInfoIconWrapper>
            <FooterInfoIcon>
              <a target='_blank' href='https://github.com/jwParkDev' rel='jwpark github repository' >
                <img src='/images/github_logo.png' alt='github logo' />
              </a>
            </FooterInfoIcon>
            <FooterInfoIcon>
              <a target='_blank' href='https://charm-antimony-6ba.notion.site/jwParkDev-s-Blog-7c73001d76a740eea7976bbfc8162357' rel='jwpark notion blog' >
                <img src='/images/notion_logo.png' alt='notion logo' />
              </a>
            </FooterInfoIcon>
            <FooterInfoIcon>
              <a target='_blank' href='mailto:pjwp94@gmail.com' rel='jwpark gmail' >
                <img src='/images/gmail_logo.png' alt='gmail logo' />
              </a>
            </FooterInfoIcon>
          </FooterInfoIconWrapper>
        </FooterInfoWrapper>
          <TopButton />
      </FooterContainer>
    </StyledFooter>
  )
}