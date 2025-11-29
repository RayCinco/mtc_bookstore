import { useState } from "react";
import { FaTrash, FaEnvelope, FaCircle, FaCheck, FaPlus } from "react-icons/fa";
import Spinner from "../../components/Spinner";
import toast from "react-hot-toast";
import { useMessages } from "../account/accountHooks/useMessages";
import { useCreateContact } from "../contact/contactHooks/useCreateContact";
import { useDeleteMessage } from "./accountHooks/useDeleteMessage";
function Messages() {
  const { isLoading: loadingMessages, messages: fetchedMessages } =
    useMessages();
  const { createContact } = useCreateContact();
  const { deleteMessageApi, isDeleting } = useDeleteMessage();
  const [selectedId, setSelectedId] = useState(null);
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const selected = fetchedMessages?.find((m) => m.id === selectedId) || null;

  function selectMessage(id) {
    setSelectedId(id);
    setShowNewMessage(false);
    toast.dismiss();
  }

  function deleteMessage(id) {
    deleteMessageApi(id);
  }

  function handleSendMessage(e) {
    e.preventDefault();

    if (!subject || !message) {
      toast.error("Subject and message are required");
      return;
    }

    createContact({ subject, message });

    setSubject("");
    setMessage("");
    setShowNewMessage(false);
  }

  if (loadingMessages) return <Spinner />;

  return (
    <div className="container-fluid" style={{ backgroundColor: "#fff" }}>
      {/* FIX #1: Prevent right side from stretching */}
      <div className="container" style={{ maxWidth: "1100px" }}>
        <div className="row">
          {/* LEFT SIDE */}
          <div className="col-md-4">
            <div
              className="py-4 px-3"
              style={{ background: "#fff", borderRight: "1px solid #e9ecef" }}
            >
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 style={{ fontWeight: 500, color: "#333" }}>Messages</h5>

                <button
                  onClick={() => {
                    setShowNewMessage(true);
                    setSelectedId(null);
                  }}
                  className="btn btn-primary me-2"
                >
                  <FaPlus /> New
                </button>
              </div>

              <p className="text-muted small">Inbox</p>

              <div style={{ marginTop: 12 }}>
                {(!fetchedMessages || fetchedMessages.length === 0) && (
                  <div className="text-center text-muted py-4">No messages</div>
                )}

                {fetchedMessages?.map((m) => {
                  const isSelected = selectedId === m.id;

                  return (
                    <div
                      key={m.id}
                      role="button"
                      onClick={() => selectMessage(m.id)}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        padding: "12px",
                        borderBottom: "1px solid #f1f1f1",
                        background: isSelected ? "#f7fbff" : "transparent",
                        cursor: "pointer",

                        borderLeft: isSelected
                          ? "3px solid #28a745"
                          : "3px solid transparent",

                        borderTop: isSelected
                          ? "1px solid rgba(43,124,255,0.08)"
                          : "1px solid transparent",
                        borderRight: isSelected
                          ? "1px solid rgba(43,124,255,0.08)"
                          : "1px solid transparent",
                        borderBottom: isSelected
                          ? "1px solid rgba(43,124,255,0.08)"
                          : "1px solid transparent",

                        borderRadius: 6,
                        marginLeft: -3,
                      }}
                    >
                      <div style={{ marginRight: 12, marginTop: 4 }}>
                        {m.status === "read" ? (
                          <FaCheck color="#28a745" />
                        ) : (
                          <FaCircle color="#ffc107" />
                        )}
                      </div>

                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <strong
                            style={{
                              maxWidth: 220,
                              textOverflow: "ellipsis",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {m.subject}
                          </strong>

                          <small className="text-muted">
                            {new Date(m.created_at).toLocaleString()}
                          </small>
                        </div>

                        <div
                          style={{
                            marginTop: 6,
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div style={{ maxWidth: 220 }}>
                            <div
                              className="small text-muted"
                              style={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                maxWidth: 220,
                              }}
                            >
                              {m.message}
                            </div>
                          </div>

                          <button
                            className="btn btn-sm btn-link text-danger"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteMessage(m.id);
                            }}
                          >
                            {isDeleting ? "Deleting..." : <FaTrash />}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-md-8">
            <div
              className="p-4"
              style={{
                background: "#fff",
                border: "1px solid rgba(0,0,0,0.06)",
                borderRadius: 6,
                minHeight: "55vh",
              }}
            >
              {showNewMessage ? (
                <>
                  <h4>Send New Message</h4>

                  <form onSubmit={handleSendMessage} className="mt-4">
                    <div className="form-group mb-3">
                      <label>Subject</label>
                      <input
                        type="text"
                        className="form-control"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label>Message</label>
                      <textarea
                        className="form-control"
                        rows={6}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      ></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary me-2">
                      Send
                    </button>

                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowNewMessage(false)}
                    >
                      Cancel
                    </button>
                  </form>
                </>
              ) : !selected ? (
                <div className="text-center text-muted py-5">
                  <FaEnvelope size={40} />
                  <h5>No message selected</h5>
                  <p>Select a message from the left or click “New”.</p>
                </div>
              ) : (
                <>
                  <div className="d-flex justify-content-between mb-3">
                    <div>
                      <h4>{selected.subject}</h4>
                      <small className="text-muted">
                        {new Date(selected.created_at).toLocaleString()}
                      </small>
                    </div>

                    {/* FIX #2 — Delete button no longer stretches */}
                    <button
                      className="btn btn-danger btn-sm"
                      style={{ width: "90px", height: "36px" }}
                      onClick={() => deleteMessage(selected.id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>

                  <div style={{ whiteSpace: "pre-wrap" }}>
                    {selected.message}
                  </div>

                  {selected.reply_message && (
                    <div
                      className="p-3 mt-4"
                      style={{
                        borderLeft: "3px solid #28a745",
                        background: "#f8f9fa",
                        borderRadius: 4,
                      }}
                    >
                      <small className="text-muted">
                        Reply from Tytana Bookstore ·{" "}
                        {new Date(selected.replied_at).toLocaleString()}
                      </small>

                      <div className="mt-2" style={{ whiteSpace: "pre-wrap" }}>
                        {selected.reply_message}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messages;
