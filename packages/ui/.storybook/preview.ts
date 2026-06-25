import type { Preview } from "@storybook/react";
import "../src/globals.css";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "dark-canvas",
      values: [
        { name: "dark-canvas", value: "#010102" },
        { name: "light", value: "#ffffff" },
      ],
    },
  },
};

export default preview;
