import { BLOCKS, INLINES, Document, Node } from "@contentful/rich-text-types";
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
      <div className="relative aspect-[3/5] md:aspect-[2/3] rounded-lg md:rounded-md overflow-hidden border border-gray-200 md:p-4 md:flex md:items-center md:justify-center">
        <style
          dangerouslySetInnerHTML={{
            __html: `
            @media (min-width: 768px) {
              .desktop-gray-bg {
                background-color: #eeeeec !important;
              }
            }
          `,
          }}
        />
        <div className="desktop-gray-bg absolute inset-0 rounded-lg md:rounded-md -z-10"></div>
        <div className="mobile-height relative w-full h-full md:w-4/5 md:h-4/5">
          <style
            dangerouslySetInnerHTML={{
              __html: `
              @media (max-width: 767px) {
                .mobile-height {
                  height: 103% !important;
                }
              }
            `,
            }}
          />
          <Image
            src={asset.url}
            alt={asset.description || ""}
            fill
            className="object-cover md:object-contain md:rounded-[5px]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            unoptimized
            style={{ objectPosition: "center 15%", marginTop: "-1.3em" }}
          />
        </div>
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
      [BLOCKS.PARAGRAPH]: (_, children: React.ReactNode) => {
        return <p className="mb-4">{children}</p>;
      },
      [BLOCKS.HEADING_1]: (_, children: React.ReactNode) => {
        return <h1 className="text-4xl font-semibold mb-4">{children}</h1>;
      },
      [BLOCKS.HEADING_2]: (_, children: React.ReactNode) => {
        return <h2 className="text-3xl font-semibold mb-4">{children}</h2>;
      },
      [BLOCKS.HEADING_3]: (_, children: React.ReactNode) => {
        return <h3 className="text-2xl font-semibold mb-4">{children}</h3>;
      },
      [BLOCKS.HEADING_4]: (_, children: React.ReactNode) => {
        return <h4 className="text-xl font-semibold mb-4">{children}</h4>;
      },
      [BLOCKS.HEADING_5]: (_, children: React.ReactNode) => {
        return <h5 className="text-lg font-semibold mb-4">{children}</h5>;
      },
      [BLOCKS.HEADING_6]: (_, children: React.ReactNode) => {
        return <h6 className="text-base font-semibold mb-4">{children}</h6>;
      },
      [BLOCKS.HR]: () => {
        return <hr className="my-8 border-gray-200" />;
      },
      [BLOCKS.QUOTE]: (_, children: React.ReactNode) => {
        return (
          <blockquote className="border-l-4 border-gray-200 pl-4 italic my-4">
            {children}
          </blockquote>
        );
      },
      [BLOCKS.EMBEDDED_ENTRY]: (node: Node) => {
        // Embedded entries differently based on the type of entry
        return (
          <div
            className="my-4 p-4 rounded"
            style={{ backgroundColor: "#eeeeec" }}
          >
            Embedded Entry
          </div>
        );
      },
      [BLOCKS.UL_LIST]: (_, children: React.ReactNode) => {
        return <ul className="list-disc pl-6 mb-4">{children}</ul>;
      },
      [BLOCKS.OL_LIST]: (_, children: React.ReactNode) => {
        return <ol className="list-decimal pl-6 mb-4">{children}</ol>;
      },
      [BLOCKS.LIST_ITEM]: (_, children: React.ReactNode) => {
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
      [INLINES.ENTRY_HYPERLINK]: (node: Node, children: React.ReactNode) => {
        if (node.nodeType === INLINES.ENTRY_HYPERLINK) {
          return (
            <a
              href={`/posts/${node.data.target.sys.id}`}
              className="text-blue-600 hover:underline"
            >
              {children}
            </a>
          );
        }
        return null;
      },
      [INLINES.ASSET_HYPERLINK]: (node: Node, children: React.ReactNode) => {
        if (node.nodeType === INLINES.ASSET_HYPERLINK) {
          const asset = assets?.find(
            (asset) => asset.sys.id === node.data.target.sys.id
          );
          if (asset?.url) {
            return (
              <a
                href={asset.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {children}
              </a>
            );
          }
        }
        return null;
      },
      [INLINES.EMBEDDED_ENTRY]: (node: Node) => {
        // Embedded entries differently based on the type of entry
        return (
          <div
            className="my-2 p-2 rounded"
            style={{ backgroundColor: "#eeeeec" }}
          >
            Inline Entry
          </div>
        );
      },
    } as Record<string, NodeRenderer>,
  };

  return documentToReactComponents(content, options);
}
