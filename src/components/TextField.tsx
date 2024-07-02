import { useState } from "react";
import { SuggestionModal } from "./SuggestionModal";
import { validateCourse } from "../api";

export const TextField = () => {
  const [text, setText] = useState("");
  const [revisedText, setRevisedText] = useState("");
  const [errorText, setErrorText] = useState("Errors");
  const [suggest, setSuggestion] = useState(false);

  const handleOnBlur = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!text) return;
    const { revision_required, failed_reason, revised_text } =
      await validateCourse(text);

    if (revision_required) {
      setErrorText(failed_reason);
      setRevisedText(revised_text);
      setSuggestion(true);

      return;
    }
  };

  const onInsertText = () => {
    setText(revisedText);
    setSuggestion(false);
  };

  const handleOnClose = () => {
    setSuggestion(false);
  };

  const onOpenModal = () => {
    (
      document.getElementById("suggest_modal") as HTMLDialogElement
    )?.showModal();
  };

  return (
    <>
      <textarea
        className={`textarea ${
          suggest ? "textarea-error" : "textarea-primary"
        } w-full h-52`}
        placeholder="Type your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      {suggest && (
        <div
          className="h-6 bg-red-500 text-white p-3 rounded-full flex items-center justify-center text-xs cursor-pointer"
          onClick={onOpenModal}
        >
          Validation Errors
        </div>
      )}
      <button
        className="mt-4 btn btn-neutral"
        onClick={handleOnBlur}
        disabled={!text}
      >
        Submit
      </button>
      <SuggestionModal
        onClose={handleOnClose}
        errorText={errorText}
        handleInsertText={onInsertText}
        suggestedText={revisedText}
      />
    </>
  );
};
