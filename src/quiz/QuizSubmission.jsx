import ConfirmationModal from '../components/ConfirmationModal.jsx';

export default function QuizSubmission({ open, answered, total, onConfirm, onCancel }) {
  const left = total - answered;
  return (
    <ConfirmationModal open={open} title="Submit quiz?" confirmText="Submit now" onConfirm={onConfirm} onCancel={onCancel}>
      <p>You answered <b>{answered}</b> of <b>{total}</b> questions.</p>
      {left > 0 && <p className="warn">⚠️ {left} question{left > 1 ? 's are' : ' is'} unanswered and will score zero.</p>}
      <p>You cannot change your answers after submitting.</p>
    </ConfirmationModal>
  );
}
