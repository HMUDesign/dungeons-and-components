import React from "react"

import Container, { Page } from "../index"

export function withContainer(Child: React.FunctionComponent): JSX.Element {
  return (
    <Container>
      <Child />
    </Container>
  )
}

export function withHalfPage(Child: React.FunctionComponent): JSX.Element {
  return (
    <Container>
      <Page story="half">
        <Child />
      </Page>
    </Container>
  )
}

export function withFullPage(Child: React.FunctionComponent): JSX.Element {
  return (
    <Container>
      <Page story="full">
        <Child />
      </Page>
    </Container>
  )
}
