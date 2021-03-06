import React from "react";
import { shallowWithTheme } from "utils/testUtils";

import SearchBar from "components/SearchBar";

describe("Component: SearchBar", () => {
  it("Render match Snapshot", () => {
    const wrapper = shallowWithTheme(<SearchBar />);
    expect(wrapper).toMatchSnapshot();
  });
});
