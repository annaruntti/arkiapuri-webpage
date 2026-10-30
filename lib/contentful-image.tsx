"use client";

import Image, { type ImageLoaderProps, type ImageProps } from "next/image";

const contentfulLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

export default function ContentfulImage(props: ImageProps) {
  return <Image {...props} alt={props.alt} loader={contentfulLoader} />;
}
