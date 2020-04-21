import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Card from "./Card";

it("SMOKE TEST: Renders without crashing", function () {
  render(<Card />);
})

it("SNAPSHOT TEST: Matches Snapshot", function () {
  const { asFragment } = render(<Card />);
  expect(asFragment()).toMatchSnapshot();
})