interface SuggestionModalProps {
  onClose: () => void;
  handleInsertText: () => void;
  errorText?: string;
  suggestedText?: string;
}

export const SuggestionModal = ({
  onClose,
  errorText = "",
  handleInsertText,
  suggestedText,
}: SuggestionModalProps) => {
  return (
    <dialog id="suggest_modal" className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <h3 className="font-bold text-lg">Validation Errors</h3>
        {errorText && (
          <div>
            <p className="font-semibold">
              The content you provided did not pass validation:
            </p>
            <p className="text-red-600">{errorText}</p>
          </div>
        )}

        <div className="py-4">
          {suggestedText && (
            <div>
              <p className="font-semibold text-green-600">Revised Text:</p>
              <p>{suggestedText}</p>
            </div>
          )}
        </div>
        <div className="modal-action">
          <form method="dialog">
            <button
              className="btn mr-2 btn-success"
              onClick={handleInsertText}
              disabled={!suggestedText}
            >
              Insert
            </button>
            <button className="btn" onClick={onClose}>
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};
