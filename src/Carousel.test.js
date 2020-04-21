import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

it("SMOKE TEST: Renders without crashing", function () {
  render(<Carousel />);
})

it("SNAPSHOT TEST: Matches Snapshot", function () {
  const { asFragment } = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
})

it("Handles Left Button", function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);
  const rightArrow = queryByTestId("right-arrow");

  // Fire off the button
  fireEvent.click(rightArrow);

  // Fire off left button
  const leftArrow = queryByTestId('left-arrow');
  fireEvent.click(leftArrow);

  // expect the thir image to show, but not the first
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
})

it("Hides Left Arror on First Picture", function () {
  const { queryByTestId } = render(<Carousel />);
  const leftArrow = queryByTestId('left-arrow');
  expect(leftArrow).toBe(null);
})

it("Hides Right Arror on Last Picture", function () {
  const { queryByTestId } = render(<Carousel />);
  const rightArrow = queryByTestId("right-arrow");

  // Move to the last picture (2 firing of right arrow)
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);

  // Try to grab right arrow again
  const lastRightArrow = queryByTestId("right-arrow");
  expect(lastRightArrow).toBe(null);
})

it("works when you click on the right arrow", function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});
