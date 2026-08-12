"use client";

import React, { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import Image from "@tiptap/extension-image";
import type { JSONContent } from "@tiptap/core";
import { MediaPicker } from "@/components/cms/MediaPicker";

const extensions = [
  StarterKit.configure({ heading: { levels: [2, 3, 4] } }),
  Underline,
  Link.configure({ openOnClick: false, autolink: true, protocols: ["http", "https", "mailto", "tel"] }),
  Table.configure({ resizable: true }), TableRow, TableHeader, TableCell, Image,
];

function initialContent(value: unknown): JSONContent | string {
  if (value && typeof value === "object" && (value as { type?: string }).type === "doc") return value as JSONContent;
  return typeof value === "string" ? value.split(/\n{2,}/).map((part) => `<p>${part.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>")}</p>`).join("") : "<p></p>";
}

export const RichTextEditor: React.FC<{ value: unknown; onChange: (value: JSONContent) => void }> = ({ value, onChange }) => {
  const [showImagePicker, setShowImagePicker] = useState(false);
  const editor = useEditor({
    extensions,
    content: initialContent(value),
    immediatelyRender: false,
    onUpdate: ({ editor: current }) => onChange(current.getJSON()),
    editorProps: { attributes: { class: "cms-rich-editor min-h-56 px-4 py-3 focus:outline-none" } },
  });

  useEffect(() => {
    if (!editor || editor.isFocused) return;
    const next = initialContent(value);
    if (JSON.stringify(editor.getJSON()) !== JSON.stringify(next)) editor.commands.setContent(next, { emitUpdate: false });
  }, [editor, value]);

  if (!editor) return <div className="min-h-56 animate-pulse rounded-xl bg-gray-100" />;
  const button = (label: string, active: boolean, action: () => void) => <button type="button" onClick={action} className={`rounded-lg px-2.5 py-1.5 text-xs font-bold ${active ? "bg-emerald-700 text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`}>{label}</button>;

  return <div className="overflow-hidden rounded-xl border border-gray-300 bg-white">
    <div className="flex flex-wrap gap-1.5 border-b border-gray-200 bg-gray-50 p-2">
      {button("Bold", editor.isActive("bold"), () => editor.chain().focus().toggleBold().run())}
      {button("Italic", editor.isActive("italic"), () => editor.chain().focus().toggleItalic().run())}
      {button("Underline", editor.isActive("underline"), () => editor.chain().focus().toggleUnderline().run())}
      {button("H2", editor.isActive("heading", { level: 2 }), () => editor.chain().focus().toggleHeading({ level: 2 }).run())}
      {button("H3", editor.isActive("heading", { level: 3 }), () => editor.chain().focus().toggleHeading({ level: 3 }).run())}
      {button("Bullets", editor.isActive("bulletList"), () => editor.chain().focus().toggleBulletList().run())}
      {button("Numbers", editor.isActive("orderedList"), () => editor.chain().focus().toggleOrderedList().run())}
      {button("Quote", editor.isActive("blockquote"), () => editor.chain().focus().toggleBlockquote().run())}
      {button("Link", editor.isActive("link"), () => { const href = window.prompt("Enter an https://, mailto:, or tel: link"); if (href) editor.chain().focus().extendMarkRange("link").setLink({ href }).run(); })}
      {button("Table", editor.isActive("table"), () => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run())}
      {button("Image", false, () => setShowImagePicker(true))}
      {button("Undo", false, () => editor.chain().focus().undo().run())}
      {button("Redo", false, () => editor.chain().focus().redo().run())}
    </div>
    <EditorContent editor={editor} />
    {showImagePicker && <MediaPicker kind="image" onClose={() => setShowImagePicker(false)} onSelect={(url) => { editor.chain().focus().setImage({ src: url }).run(); setShowImagePicker(false); }} />}
  </div>;
};

export { extensions as richTextExtensions };
