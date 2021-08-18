import styled from 'styled-components'

const Text = ({children, props}: any) => <DefaultText {...props}>{children}</DefaultText>

const DefaultText = styled.p`
  font-family: montserrat;
  font-weight: bold;
  color: white;
  margin: 5px;
  padding-left: 5px;
  margin-left: ${({ inset }: any) => (inset ? ".5em" : "0")};
  font-size: ${({ fontSize }: any) => `${fontSize}px`};
`;

Text.Dimmed = styled(DefaultText)`
  color: #b3b3b3;
`

Text.Playlist = styled(DefaultText)`
  font-size: 76px;
`


export default Text;