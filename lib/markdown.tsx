import {
  BLOCKS,
  INLINES,
  Document,
  Block,
  Inline,
  Node,
} from "@contentful/rich-text-types";
import {
  documentToReactComponents,
  NodeRenderer,
} from "@contentful/rich-text-react-renderer";
import Image from "next/image";
import { ContentfulAsset } from "./types";

interface RichTextAssetProps {
  id: string;
  assets: ContentfulAsset[];
}

function RichTextAsset({ id, assets }: RichTextAssetProps) {
  const asset = assets?.find((asset) => asset.sys.id === id);

  if (!asset?.url) {
    return null;
  }

  return (
    <div className="relative w-full my-8">
      <div className="relative aspect-[3/4] md:aspect-[9/16] bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
        <Image
          src={asset.url}
          alt={asset.description || ""}
          fill
          className="object-contain p-4"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          unoptimized
          style={{ objectPosition: "center", marginTop: 0 }}
        />
      </div>
    </div>
  );
}

interface MarkdownProps {
  content: Document;
  assets?: ContentfulAsset[];
}

export function Markdown({ content, assets = [] }: MarkdownProps) {
  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node: Node) => {
        if (node.nodeType === BLOCKS.EMBEDDED_ASSET) {
          return <RichTextAsset id={node.data.target.sys.id} assets={assets} />;
        }
        return null;
      },
      [BLOCKS.PARAGRAPH]: (node: Node, children: React.ReactNode) => {
        return <p className="mb-4">{children}</p>;
      },
      [BLOCKS.HEADING_1]: (node: Node, children: React.ReactNode) => {
        return <h1 className="text-4xl font-bold mb-4">{children}</h1>;
      },
      [BLOCKS.HEADING_2]: (node: Node, children: React.ReactNode) => {
        return <h2 className="text-3xl font-bold mb-4">{children}</h2>;
      },
      [BLOCKS.HEADING_3]: (node: Node, children: React.ReactNode) => {
        return <h3 className="text-2xl font-bold mb-4">{children}</h3>;
      },
      [BLOCKS.UL_LIST]: (node: Node, children: React.ReactNode) => {
        return <ul className="list-disc pl-6 mb-4">{children}</ul>;
      },
      [BLOCKS.OL_LIST]: (node: Node, children: React.ReactNode) => {
        return <ol className="list-decimal pl-6 mb-4">{children}</ol>;
      },
      [BLOCKS.LIST_ITEM]: (node: Node, children: React.ReactNode) => {
        return <li className="mb-2">{children}</li>;
      },
      [INLINES.HYPERLINK]: (node: Node, children: React.ReactNode) => {
        if (node.nodeType === INLINES.HYPERLINK) {
          return (
            <a
              href={node.data.uri}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {children}
            </a>
          );
        }
        return null;
      },
    } as Record<string, NodeRenderer>,
  };

  return documentToReactComponents(content, options);
}
