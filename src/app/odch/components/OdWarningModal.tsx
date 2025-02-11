interface OdWarningModalProps {
  onClose: () => void;
}

export default function OdWarningModal({ onClose }: OdWarningModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Warning: OD Limit Exceeded</h2>
        <p>This student has already reached or exceeded the maximum OD limit of 5.</p>
        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="bg-blue-500 text-white px-4 py-2 rounded">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
