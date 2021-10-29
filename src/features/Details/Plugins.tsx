import React from 'react';
import styled from 'styled-components';
// import { Text } from 'components/common';

const Table = styled.table`
  flex-direction: column;
  color: rgba(255, 255, 255, 0.8);
  align-items: center;
  cursor: pointer;
  width: 100%;
  border-collapse: collapse;
  border: none;
  th {
    text-align: start;
    padding: 5px;
    position: sticky;
    top: 0;
    border-bottom: 2px solid;
    background-color:  #222222;
    border-color: ${({ theme }) => theme.background.fraction};
  }

  #name {
    width: 60%;
  }
  #type {
    width: 15%;
  }

  tr {
    padding: 0;
    margin: 0;
    overflow: hidden;
    height: 2em;
    white-space: nowrap;
  }
  tr td {
    padding-left: 5px;
  }
`;
const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: scroll;
  padding: 0;
  background-color: ${({ theme }) => theme.background.fraction};
`;
const Plugin = ({ Name, type }: any) => (
  <tr>
    <td id="name">{Name}</td>
    <td id="type">{type}</td>
  </tr>
);

export default function Plugins({ plugins }: any) {
  return (
    <Container>
      <Table>
        <colgroup>
          <col />
          <col />
          <col />
        </colgroup>
        <thead>
          <tr>
            {['Plugin', 'Type'].map((title) => (
              <th key={title}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {plugins
            && Object.entries(plugins).map(([key, { Name, type }]: any) => (
              <Plugin {...{ Name, type, key }} />
            ))}
        </tbody>
      </Table>
    </Container>
  );
}
