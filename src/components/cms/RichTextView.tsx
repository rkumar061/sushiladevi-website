"use client";

import React, { useMemo } from "react";
import { generateHTML, type JSONContent } from "@tiptap/core";
import sanitizeHtml from "sanitize-html";
import { richTextExtensions } from "@/components/cms/RichTextEditor";

export const RichTextView: React.FC<{ value: unknown; className?: string }> = ({ value, className = "" }) => {
  const html = useMemo(() => {
    if (typeof value === "string") return value.split(/\n{2,}/).map((paragraph) => `<p>${paragraph.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>")}</p>`).join("");
    if (!value || typeof value !== "object" || (value as { type?: string }).type !== "doc") return "";
    const generated = generateHTML(value as JSONContent, richTextExtensions);
    return sanitizeHtml(generated, {
      allowedTags: ["p", "h2", "h3", "h4", "strong", "em", "u", "a", "ul", "ol", "li", "blockquote", "br", "table", "thead", "tbody", "tr", "th", "td", "img"],
      allowedAttributes: { a: ["href", "target", "rel"], th: ["colspan", "rowspan"], td: ["colspan", "rowspan"], img: ["src", "alt", "title", "width", "height"] },
      allowedSchemes: ["http", "https", "mailto", "tel"],
      transformTags: { a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }, true) },
    });
  }, [value]);
  return <div className={`cms-rich-content ${className}`} dangerouslySetInnerHTML={{ __html: html }} />;
};
