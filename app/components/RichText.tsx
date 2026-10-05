import Link from "next/link";
import type { ReactNode } from "react";

// Minimal, safe rich-text renderer for admin-authored content.
// Supported syntax (line-based, no raw HTML — everything renders as React):
//   "## heading"   -> h2
//   "### heading"  -> h3
//   "- item"       -> bullet list
//   blank line     -> paragraph break
//   [label](/path) -> internal link (relative paths only)

type Block =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "p"; text: string };

function parseBlocks(source: string): Block[] {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length > 0) {
      blocks.push({ type: "p", text: paragraph.join(" ") });
      paragraph = [];
    }
  };
  const flushList = () => {
    if (list.length > 0) {
      blocks.push({ type: "ul", items: list });
      list = [];
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (line.length === 0) {
      flushParagraph();
      flushList();
      continue;
    }
    if (line.startsWith("### ")) {
      flushParagraph();
      flushList();
      blocks.push({ type: "h3", text: line.slice(4).trim() });
      continue;
    }
    if (line.startsWith("## ")) {
      flushParagraph();
      flushList();
      blocks.push({ type: "h2", text: line.slice(3).trim() });
      continue;
    }
    if (line.startsWith("- ")) {
      flushParagraph();
      list.push(line.slice(2).trim());
      continue;
    }
    flushList();
    paragraph.push(line);
  }

  flushParagraph();
  flushList();
  return blocks;
}

const LINK = /\[([^\]]+)\]\((\/(?!\/)[^)\s]*)\)/g;

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  let index = 0;

  for (const match of text.matchAll(LINK)) {
    const start = match.index ?? 0;
    if (start > last) nodes.push(text.slice(last, start));
    nodes.push(
      <Link
        key={`${keyPrefix}-${index}`}
        href={match[2]}
        className="text-emerald-400 underline-offset-2 hover:text-emerald-300 hover:underline"
      >
        {match[1]}
      </Link>,
    );
    last = start + match[0].length;
    index += 1;
  }

  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export default function RichText({ content }: { content: string }) {
  const blocks = parseBlocks(content);

  return (
    <div className="space-y-4">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={index}
                className="mt-8 text-2xl font-semibold text-white first:mt-0"
              >
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={index} className="mt-6 text-xl font-semibold text-white">
                {block.text}
              </h3>
            );
          case "ul":
            return (
              <ul key={index} className="list-disc space-y-2 pl-5 text-zinc-300">
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{renderInline(item, `${index}-${itemIndex}`)}</li>
                ))}
              </ul>
            );
          default:
            return (
              <p key={index} className="text-base leading-relaxed text-zinc-300">
                {renderInline(block.text, String(index))}
              </p>
            );
        }
      })}
    </div>
  );
}
