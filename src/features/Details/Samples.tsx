import React from 'react';
import styled from 'styled-components';

const Table = styled.table`
  flex-direction: column;
  color: rgba(255, 255, 255, 0.8);
  align-items: center;
  cursor: pointer;
  width: 100%;
  overflow: hidden;
  /* height: 100%; */
  border: none;
  padding: 5px;
  border-collapse: collapse;
  margin-bottom: 5px;
  th {
    color: white;
    text-align: start;
    padding: 5px;
    position: sticky;
    top: 0;
    border-bottom: 2px solid;
    background-color:  #222222;
    border-color: ${({ theme }) => theme.background.fraction};
  }
  #duration {
    width: 15%;
  }
  #name {
    width: 60%;
  }
  tr {
    overflow: hidden;
    height: 2em;
    white-space: nowrap;
  }
  tr td {
    padding-left: 5px;
  }
  #row:hover {
    background-color: ${({ theme }) => theme.background.fraction};
    color: white;
  }
`;
const Container = styled.div`
  background-color: ${({ theme }) => theme.background.fraction};
  width: 100%;
  height: 100%;

  overflow: scroll;
`;
const HHMMSS = (sec_num: number) => {
  let hours: number | string = Math.floor(sec_num / 3600);
  let minutes: number | string = Math.floor((sec_num - hours * 3600) / 60);
  let seconds: number | string = Math.floor(
    sec_num - hours * 3600 - minutes * 60,
  );

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  return `${minutes}:${seconds}`;
};

function truncate(str: string, n: number) {
  return str.length > n ? `${str.substr(0, n - 1)}...` : str;
}

const Sample = ({ name, length, verified }: any) => (
  <tr id="row">
    <td id="name">
      {' '}
      {verified ? '✓' : 'x'}
      {' '}
      {name}
    </td>
    <td id="duration">{length}</td>
  </tr>
);

export default function Samples({ samples, verifiedSamples }: any) {
  return (
    <Container>
      <Table>
        <colgroup>
          <col />
          <col />
        </colgroup>
        <thead>
          <tr>
            {['Sample', 'Duration'].map((title) => (
              <th key={title}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {samples
            && Object.entries(samples).map(
              ([
                key,
                { FileName, DefaultDuration, DefaultSampleRate },
              ]: any) => (
                <Sample
                  key={key}
                  name={truncate(FileName, 20)}
                  length={HHMMSS(DefaultDuration / DefaultSampleRate)}
                  verified={verifiedSamples[key]}
                />
              ),
            )}
        </tbody>
      </Table>
    </Container>
  );
}
