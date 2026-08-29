import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Rise Your Health | The PCOS Rebalance Protocol",
    short_name: "Rise Your Health",
    description:
      "A structured 4-Month PCOS Rebalance Protocol for sustainable hormonal and metabolic health.",
    start_url: "/",
    display: "standalone",
    background_color: "#022342",
    theme_color: "#287417",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
