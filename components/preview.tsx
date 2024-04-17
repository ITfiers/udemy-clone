import dynamic from "next/dynamic";
import { useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

interface PreviewProps {
  value: string;
}
export const Preview = ({ value }: PreviewProps) => {
  const ReactQuillComponent = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  return <ReactQuillComponent theme="bubble" value={value} readOnly />;
};